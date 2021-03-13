import { sendOtpChangeMobile } from '../../../services/notification';
import { tmoneyStatus } from '../../../services/payment';
import {
  getAboutPoint,
  // statusPoint
} from '../../../services/rewards';
import { changeEmail, changePassword, checkMobile, profile, updateUserProfile, verifyEmail, verifyMobile } from '../../../services/user';
import { clearStorages } from '../../../utils/storage';
import * as actions from '../actions';
import { DATA_FETCHED, FAILED, LOADING, TMONEY_FETCHED } from '../constants';

jest.mock('../../../services/notification', () => ({
  sendOtpChangeMobile: jest.fn(),
}));

jest.mock('../../../services/payment', () => ({
  tmoneyStatus: jest.fn(),
}));

jest.mock('../../../services/user', () => ({
  changeEmail: jest.fn(),
  changePassword: jest.fn(),
  checkMobile: jest.fn(),
  profile: jest.fn(),
  updateUserProfile: jest.fn(),
  verifyEmail: jest.fn(),
  verifyMobile: jest.fn(),
}));

jest.mock('../../../services/rewards', () => ({
  getAboutPoint: jest.fn(),
  // statusPoint: jest.fn(),
}));

jest.mock('../../../utils/storage');

jest.mock('../../../utils/redux-form-actions', () => ({
  updateSyncErrors: (fo, fi, me) => [fo, fi, me].join('-'),
}));

describe('src/pages/Profile/actions', () => {
  test('fetchData', async () => {
    const dispatch = jest.fn();
    const expectTest = expect(dispatch).toHaveBeenNthCalledWith;

    profile.mockResolvedValueOnce({ data: 'test' });
    await actions.fetchData()(dispatch);
    expectTest(1, { type: LOADING, isLoading: true, key: 'p' });
    expectTest(2, { type: DATA_FETCHED, data: 'test' });

    profile.mockRejectedValueOnce();
    await actions.fetchData()(dispatch);
    expectTest(4, { type: LOADING, isLoading: false, key: 'p' });
  });

  test('fetchChange', async () => {
    const dispatch = jest.fn();
    const expectTest = expect(dispatch).toHaveBeenNthCalledWith;

    changeEmail.mockResolvedValueOnce();
    await actions.fetchChangeEmail('test@telkom.co.id')(dispatch);
    expectTest(1, { type: FAILED, message: '' });
    expectTest(2, { type: LOADING, isLoading: true, key: 'b' });
    expectTest(3, '/profile/change-email/verify');
    expectTest(4, { type: LOADING, isLoading: false, key: 'b' });

    changeEmail.mockRejectedValueOnce({ message: 'error' });
    await actions.fetchChangeEmail('test@telkom.co.id')(dispatch);
    expectTest(7, 'profileChangeEM-email-error');
    expectTest(8, { type: LOADING, isLoading: false, key: 'b' });
  });

  test('fetchSendOtpChangeMobile', async () => {
    const dispatch = jest.fn();
    const expectTest = expect(dispatch).toHaveBeenNthCalledWith;

    sendOtpChangeMobile.mockResolvedValueOnce();
    await actions.fetchSendOtpChangeMobile()(dispatch);
    expectTest(1, { type: FAILED, message: '' });
    expectTest(2, { type: LOADING, isLoading: true, key: 'b' });
    expectTest(3, '/profile/change-mobile/verify');
    expectTest(4, { type: LOADING, isLoading: false, key: 'b' });

    sendOtpChangeMobile.mockRejectedValueOnce({ message: 'error' });
    await actions.fetchSendOtpChangeMobile()(dispatch);
    expectTest(7, { type: FAILED, message: 'error' });
  });

  test('fetchCheckMobile', async () => {
    const dispatch = jest.fn();
    const expectTest = expect(dispatch).toHaveBeenNthCalledWith;

    checkMobile.mockResolvedValueOnce();
    await actions.fetchCheckMobile()(dispatch);
    expectTest(1, { type: FAILED, message: '' });
    expectTest(2, { type: LOADING, isLoading: true, key: 'b' });
    expectTest(3, '/profile/change-mobile/request');
    expectTest(4, { type: LOADING, isLoading: false, key: 'b' });

    checkMobile.mockRejectedValueOnce({ message: 'error' });
    await actions.fetchCheckMobile()(dispatch);
    expectTest(7, 'profileChangeEM-mobile-error');
    expectTest(8, { type: LOADING, isLoading: false, key: 'b' });
  });

  test('fetchChangePassword', async () => {
    const dispatch = jest.fn();
    const expectTest = expect(dispatch).toHaveBeenNthCalledWith;

    changePassword.mockResolvedValueOnce();
    await actions.fetchChangePassword()(dispatch);
    expectTest(1, { type: FAILED, message: '' });
    expectTest(2, { type: LOADING, isLoading: true, key: 'b' });
    expect(clearStorages).toHaveBeenCalled();

    changePassword.mockRejectedValueOnce({ message: 'error' });
    await actions.fetchChangePassword()(dispatch);
    expectTest(6, 'profileChangePassword-currentPassword-error');
    expectTest(7, { type: LOADING, isLoading: false, key: 'b' });
  });

  test('fetchTmoney', async () => {
    const dispatch = jest.fn();
    const expectTest = expect(dispatch).toHaveBeenNthCalledWith;

    const tmoney = { status: 'REGISTERED', balance: 22255 };
    tmoneyStatus.mockResolvedValueOnce({ data: tmoney });
    await actions.fetchTmoney()(dispatch);
    expectTest(1, { type: LOADING, isLoading: true, key: 't' });
    expectTest(2, { type: TMONEY_FETCHED, tmoney });

    tmoneyStatus.mockRejectedValueOnce();
    await actions.fetchTmoney()(dispatch);
    expectTest(3, { type: LOADING, isLoading: true, key: 't' });
    expectTest(4, { type: TMONEY_FETCHED, tmoney: { status: 'ERROR' } });
  });

  test('fetchAboutPoint', async () => {
    const dispatch = jest.fn();
    const expectTest = expect(dispatch).toHaveBeenNthCalledWith;

    const aboutPoint = {
      content: [{
        body: [{
          descriptions: [{
            detail: 'Bill payment amount for Dual Play customers',
            header: '10 poin / Rp 10.000',
          }],
          text: 'Poin myIndiHome is a loyalty program aimed for IndiHome Triple Play and Dual Play Package customers.'
        }],
        header: 'What is Poin myIndiHome?',
      }],
      pageDesc: 'Learn more about points and rewards from myIndiHome!',
      pageTitle: 'What is Poin myIndiHome?',
    };
    getAboutPoint.mockResolvedValueOnce({ data: aboutPoint });
    await actions.fetchAboutPoint()(dispatch);
    expectTest(1, { type: LOADING, isLoading: true, key: 'a' });
    // expectTest(2, { type: ABOUTPOINT_FETCHED, aboutPoint });

    getAboutPoint.mockRejectedValueOnce();
    await actions.fetchAboutPoint()(dispatch);
    // expectTest(3, { type: ABOUTPOINT_FETCHED, aboutPoint: { status: 'ERROR' } });
    // expectTest(4, { type: ABOUTPOINT_FETCHED, aboutPoint: { data: '' } });
  });

  test('fetchUpdateProfile', async () => {
    const dispatch = jest.fn();
    const expectTest = expect(dispatch).toHaveBeenNthCalledWith;

    updateUserProfile.mockResolvedValueOnce();
    await actions.fetchUpdateProfile()(dispatch);
    expectTest(1, { type: FAILED, message: '' });
    expectTest(2, { type: LOADING, isLoading: true, key: 'b' });
    expectTest(3, { type: FAILED, message: '' });
    expectTest(4, { type: LOADING, isLoading: true, key: 'p' });
    expectTest(5, { pathname: '/profile', state: { notif: 'Profile has been changed successfully.' } });

    updateUserProfile.mockRejectedValueOnce({ message: 'error' });
    await actions.fetchUpdateProfile()(dispatch);
    expectTest(8, { type: FAILED, message: 'error' });
  });

  test('fetchVerifyEmail', async () => {
    const dispatch = jest.fn();
    const expectTest = expect(dispatch).toHaveBeenNthCalledWith;

    verifyEmail.mockResolvedValueOnce();
    await actions.fetchVerifyEmail()(dispatch);
    expectTest(1, { type: FAILED, message: '' });
    expectTest(2, { type: LOADING, isLoading: true, key: 'b' });
    expectTest(3, { pathname: '/profile', state: { notif: 'Email has been changed successfully.' } });

    verifyEmail.mockRejectedValueOnce();
    await actions.fetchVerifyEmail()(dispatch);
    expectTest(6, 'recoveryCode-recoveryCode-kode otp yang Anda masukkan salah');
    expectTest(7, { type: LOADING, isLoading: false, key: 'b' });
  });

  test('fetchVerifyMobile', async () => {
    const dispatch = jest.fn();
    const expectTest = expect(dispatch).toHaveBeenNthCalledWith;

    verifyMobile.mockResolvedValueOnce();
    await actions.fetchVerifyMobile()(dispatch);
    expectTest(1, { type: FAILED, message: '' });
    expectTest(2, { type: LOADING, isLoading: true, key: 'b' });
    expectTest(3, { pathname: '/profile', state: { notif: 'Phone number has been changed successfully.' } });

    verifyMobile.mockRejectedValueOnce();
    await actions.fetchVerifyMobile()(dispatch);
    expectTest(6, 'recoveryCode-recoveryCode-kode otp yang Anda masukkan salah');
    expectTest(7, { type: LOADING, isLoading: false, key: 'b' });
  });

  test('resetMessage', () => {
    const result = actions.resetMessage();
    expect(result.type).toBe(FAILED);
    expect(result.message).toBe('');
  });
});
