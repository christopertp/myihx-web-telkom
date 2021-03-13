import { sendOtp } from '../../../services/notification';
import { checkUser, loginUser, verifyLogin } from '../../../services/user';
import * as actions from '../actions';
import { FAILED, LOADING, OTP_SENT } from '../constants';

jest.mock('../../../services/notification', () => ({
  sendOtp: jest.fn(),
}));

jest.mock('../../../services/user', () => ({
  checkUser: jest.fn(),
  loginUser: jest.fn(),
  verifyLogin: jest.fn(),
}));

jest.mock('../../../utils/storage');

jest.mock('../../../utils/redux-form-actions', () => ({
  updateSyncErrors: (fo, fi, me) => [fo, fi, me].join('-'),
}));

describe('src/pages/Login/actions', () => {
  test('fetchCheckUser', async () => {
    const dispatch = jest.fn();
    const expectTest = expect(dispatch).toHaveBeenNthCalledWith;

    checkUser.mockResolvedValueOnce({ data: { stepVerify: 0 } });
    await actions.fetchCheckUser('tes')(dispatch);
    expectTest(1, { isLoading: true, type: LOADING });
    expectTest(2, '/login/password');
    expectTest(3, { isLoading: false, type: LOADING });

    checkUser.mockResolvedValueOnce({ data: { stepVerify: 1 } });
    await actions.fetchCheckUser('tes')(dispatch);
    expectTest(5, '/login/request');

    checkUser.mockRejectedValueOnce({ message: 'error' });
    await actions.fetchCheckUser('tes')(dispatch);
    expectTest(8, 'loginUser-user-error');
    expectTest(9, { isLoading: false, type: LOADING });

    checkUser.mockRejectedValueOnce({ code: 404 });
    await actions.fetchCheckUser('tes')(dispatch);
    expectTest(11, { message: '404', type: FAILED });
  });

  test('fetchLoginUser', async () => {
    const dispatch = jest.fn();
    const expectTest = expect(dispatch).toHaveBeenNthCalledWith;

    loginUser.mockResolvedValueOnce({ data: { accessToken: 'tes.eyAiZXhwIjogMTIzIH0=' } });
    await actions.fetchLoginUser('tes')(dispatch);
    expectTest(1, { isLoading: true, type: LOADING });

    loginUser.mockResolvedValueOnce({ data: {} });
    await actions.fetchLoginUser('tes')(dispatch);
    expectTest(4, 'loginPassword-password-Akun anda tidak diizinkan untuk mengakses');

    loginUser.mockRejectedValueOnce({ data: '', message: 'error' });
    await actions.fetchLoginUser('tes')(dispatch);
    expectTest(6, 'loginPassword-password-error');
    expectTest(7, { isLoading: false, type: LOADING });

    loginUser.mockRejectedValueOnce({ data: { loginAttempt: 1 }, message: 'error' });
    await actions.fetchLoginUser('tes')(dispatch);
    expectTest(9, 'loginPassword-password-Password salah. 1 kesempatan lagi');
  });

  test('fetchSendOtp', async () => {
    const dispatch = jest.fn();
    const expectTest = expect(dispatch).toHaveBeenNthCalledWith;

    sendOtp.mockResolvedValueOnce({ data: { userId: 'tes' } });
    await actions.fetchSendOtp('tes', 'sms')(dispatch);
    expectTest(1, { message: '', type: FAILED });
    expectTest(2, { isLoading: true, type: LOADING });
    expectTest(3, '/login/verify');
    expectTest(4, { userId: 'tes', type: OTP_SENT });

    sendOtp.mockRejectedValueOnce({ message: 'error' });
    await actions.fetchSendOtp('tes', 'sms')(dispatch);
    expectTest(7, { message: 'error', type: FAILED });
  });

  test('fetchVerifyLogin', async () => {
    const dispatch = jest.fn();
    const expectTest = expect(dispatch).toHaveBeenNthCalledWith;

    verifyLogin.mockResolvedValueOnce({ data: { accessToken: 'tes.eyAiZXhwIjogMTIzIH0=' } });
    await actions.fetchVerifyLogin('1234', 'tes')(dispatch);
    expectTest(1, { message: '', type: FAILED });
    expectTest(2, { isLoading: true, type: LOADING });

    verifyLogin.mockResolvedValueOnce({ data: {} });
    await actions.fetchVerifyLogin('1234', 'tes')(dispatch);
    expectTest(6, { message: 'Akun anda tidak diizinkan untuk mengakses', type: FAILED });

    verifyLogin.mockRejectedValueOnce({ data: '', message: 'error' });
    await actions.fetchVerifyLogin('1234', 'tes')(dispatch);
    expectTest(9, { message: 'error', type: FAILED });

    verifyLogin.mockRejectedValueOnce({ data: { loginAttempt: 1 }, message: 'error' });
    await actions.fetchVerifyLogin('1234', 'tes')(dispatch);
    expectTest(12, { message: 'OTP salah. 1 kesempatan lagi', type: FAILED });
  });

  test('resetMessage', () => {
    const result = actions.resetMessage();
    expect(result.type).toBe(FAILED);
    expect(result.message).toBe('');
  });
});
