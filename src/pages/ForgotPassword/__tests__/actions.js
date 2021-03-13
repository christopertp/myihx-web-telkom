import { forgotPassword, forgotPasswordVerify, resetPassword } from '../../../services/user';
import * as actions from '../actions';
import { LOADING, REQUEST_CODE } from '../constants';

jest.mock('../../../services/user', () => ({
  forgotPassword: jest.fn(),
  forgotPasswordVerify: jest.fn(),
  resetPassword: jest.fn(),
}));

jest.mock('../../../utils/redux-form-actions', () => ({
  updateSyncErrors: (fo, fi, me) => [fo, fi, me].join('-'),
}));

describe('src/pages/ForgotPassword/actions', () => {
  test('fetchForgotPassword', async () => {
    const dispatch = jest.fn();
    const expectTest = expect(dispatch).toHaveBeenNthCalledWith;

    forgotPassword.mockResolvedValueOnce({ data: { userId: 'id' } });
    await actions.fetchForgotPassword()(dispatch);
    expectTest(1, { isLoading: true, type: LOADING });
    expectTest(2, '/forgot-password/recovery-code');
    expectTest(3, { userId: 'id', type: REQUEST_CODE });

    forgotPassword.mockRejectedValueOnce({ message: 'error' });
    await actions.fetchForgotPassword()(dispatch);
    expectTest(5, 'forgotPasswordUser-user-error');
    expectTest(6, { isLoading: false, type: LOADING });

    forgotPassword.mockRejectedValueOnce({ code: 404 });
    await actions.fetchForgotPassword()(dispatch);
    expectTest(8, 'forgotPasswordUser-user-User belum terdaftar');
  });

  test('fetchResetPassword', async () => {
    const dispatch = jest.fn();
    const expectTest = expect(dispatch).toHaveBeenNthCalledWith;

    resetPassword.mockResolvedValueOnce({ data: { userId: 'id' } });
    await actions.fetchResetPassword()(dispatch);
    expectTest(1, { isLoading: true, type: LOADING });
    expectTest(2, { pathname: '/login', state: { notif:'Password has been reset successfully. You can now login.' } });

    resetPassword.mockRejectedValueOnce({ message: 'error' });
    await actions.fetchResetPassword()(dispatch);
    expectTest(4, 'forgotPasswordNew-password-error');
    expectTest(5, { isLoading: false, type: LOADING });
  });

  test('fetchVerify', async () => {
    const dispatch = jest.fn();
    const expectTest = expect(dispatch).toHaveBeenNthCalledWith;
    expect.assertions(6);

    forgotPasswordVerify.mockResolvedValueOnce({ data: { accessToken: 'tes.eyAiZXhwIjogMTIzIH0=' } });
    await actions.fetchVerify('123', 'tes')(dispatch);
    expectTest(1, { isLoading: true, type: LOADING });
    expectTest(2, '/forgot-password/new');
    expectTest(3, { isLoading: false, type: LOADING });

    forgotPasswordVerify.mockRejectedValueOnce({ data: '', message: 'error' });
    await actions.fetchVerify('123', 'tes')(dispatch);
    expectTest(5, 'forgotPasswordRecoveryCode-code-error');
    expectTest(6, { isLoading: false, type: LOADING });

    forgotPasswordVerify.mockRejectedValueOnce({ code: 1010, data: { loginAttempt: 1 }, message: 'error' });
    await actions.fetchVerify('123', 'tes')(dispatch);
    expectTest(8, 'forgotPasswordRecoveryCode-code-Kode salah. 1 kesempatan lagi');
  });
});
