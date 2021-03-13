import { sendOtpRegister } from '../../../services/notification';
import { checkIndihomeNumber, registerUser, verifyRegister } from '../../../services/user';
import { setToken } from '../../../utils/storage';
import * as actions from '../actions';
import { FAILED, LOADING, REGISTERED, VERIFIED } from '../constants';

jest.mock('../../../services/notification', () => ({
  sendOtpRegister: jest.fn(),
}));

jest.mock('../../../services/user', () => ({
  checkIndihomeNumber: jest.fn(),
  registerUser: jest.fn(),
  verifyRegister: jest.fn(),
}));

jest.mock('../../../utils/storage');

jest.mock('../../../utils/redux-form-actions', () => ({
  updateSyncErrors: (fo, fi, me) => [ fo, fi, me ].join('-'),
}));

describe('src/pages/Register/actions', () => {
  test('fetchIndihomeNumber', async () => {
    const dispatch = jest.fn();
    const expectTest = expect(dispatch).toHaveBeenNthCalledWith;

    checkIndihomeNumber.mockResolvedValueOnce({ data: { accessToken: 'test.eyAiZXhwIjogMTIzIH0=' } });
    await actions.fetchIndihomeNumber()(dispatch);
    expectTest(1, { message: '', type: FAILED });
    expectTest(2, { isLoading: true, type: LOADING });

    checkIndihomeNumber.mockRejectedValueOnce({ message: 'error' });
    await actions.fetchIndihomeNumber()(dispatch);
    expectTest(7, { message: 'error', type: FAILED });
  });

  test('fetchRegisterUser', async () => {
    const dispatch = jest.fn();
    const expectTest = expect(dispatch).toHaveBeenNthCalledWith;

    registerUser.mockResolvedValueOnce({ data: { userId: 'test-id' } });
    await actions.fetchRegisterUser({ email: 'test-email' })(dispatch);
    expectTest(1, { message: '', type: FAILED });
    expectTest(2, { isLoading: true, type: LOADING });
    expectTest(3, { userData: { email: 'test-email' }, userId: 'test-id', type: REGISTERED });
    expectTest(4, '/register/request');

    registerUser.mockRejectedValueOnce({ code: 1001, message: 'Referral code not match' });
    await actions.fetchRegisterUser()(dispatch);
    expectTest(7, 'registerUser-referralCode-Referral code not match' );

    registerUser.mockRejectedValueOnce({ code: 1002, message: 'Email blacklist' });
    await actions.fetchRegisterUser()(dispatch);
    expectTest(11, 'registerUser-email-Email blacklist' );

    registerUser.mockRejectedValueOnce({ code: 1003 });
    await actions.fetchRegisterUser()(dispatch);
    expectTest(15, { message: '1003', type: FAILED });

    registerUser.mockRejectedValueOnce({ message: 'error' });
    await actions.fetchRegisterUser()(dispatch);
    expectTest(19, { message: 'error', type: FAILED });
  });

  test('fetchSendOtpRegister', async () => {
    const dispatch = jest.fn();
    const expectTest = expect(dispatch).toHaveBeenNthCalledWith;

    sendOtpRegister.mockResolvedValueOnce();
    await actions.fetchSendOtpRegister()(dispatch);
    expectTest(1, { message: '', type: FAILED });
    expectTest(2, { isLoading: true, type: LOADING });
    expectTest(3, '/register/verify');

    sendOtpRegister.mockRejectedValueOnce({ message: 'error' });
    await actions.fetchSendOtpRegister()(dispatch);
    expectTest(6, { message: 'error', type: FAILED });
  });

  test('fetchVerifyRegister', async () => {
    const dispatch = jest.fn();
    const expectTest = expect(dispatch).toHaveBeenNthCalledWith;

    verifyRegister.mockResolvedValueOnce({ data: { accessToken: 'test' } });
    await actions.fetchVerifyRegister({ accessToken: 'test' })(dispatch);
    expectTest(1, { message: '', type: FAILED });
    expectTest(2, { isLoading: true, type: LOADING });
    expectTest(3, { type: VERIFIED, accessToken: 'test' });
    expectTest(4, '/register/indihome-number');

    verifyRegister.mockRejectedValueOnce({ message: 'error' });
    await actions.fetchVerifyRegister()(dispatch);
    expectTest(7, { message: 'error', type: FAILED });
  });

  test('setVerifiedAccount', () => {
    const dispatch = jest.fn();
    actions.setVerifiedAccount('tes.eyAiZXhwIjogMTIzIH0', 'pic')(dispatch);
    expect(dispatch).toHaveBeenCalledWith({ message: '', type: FAILED });
    expect(setToken).toHaveBeenCalledWith('tes.eyAiZXhwIjogMTIzIH0');
  });

  test('resetMessage', () => {
    const result = actions.resetMessage();
    expect(result.type).toBe(FAILED);
    expect(result.message).toBe('');
  });
});
