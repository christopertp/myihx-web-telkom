import { push } from 'react-router-redux';
import { forgotPassword, forgotPasswordVerify, resetPassword } from '../../services/user';
import { updateSyncErrors } from '../../utils/redux-form-actions';
import { LOADING, REQUEST_CODE } from './constants';

export function fetchForgotPassword(user) {
  return async dispatch => {
    dispatch(loadingAction(true));
    try {
      const { data } = await forgotPassword(user);
      dispatch(push('/forgot-password/recovery-code'));
      dispatch(requestCodeAction(data.userId));
    } catch (err) {
      dispatch(updateSyncErrors('forgotPasswordUser', 'user', err.code === 404 ? 'User belum terdaftar' : err.message));
      dispatch(loadingAction(false));
    }
  };
}

export function fetchResetPassword(password, userId) {
  return async dispatch => {
    dispatch(loadingAction(true));
    try {
      await resetPassword(password, userId);
      dispatch(push({ pathname: '/login', state: { notif:'Password has been reset successfully. You can now login.' } }));
    } catch (err) {
      dispatch(updateSyncErrors('forgotPasswordNew', 'password', err.message));
      dispatch(loadingAction(false));
    }
  };
}

export function fetchVerify(code, userId) {
  return async dispatch => {
    dispatch(loadingAction(true));
    try {
      await forgotPasswordVerify(code, userId);
      dispatch(push('/forgot-password/new'));
      dispatch(loadingAction(false));
    } catch (err) {
      const { code, data, message } = err;
      const errMessage = data.loginAttempt
        ? `Kode salah. ${data.loginAttempt} kesempatan lagi`
        : message;
      dispatch(updateSyncErrors('forgotPasswordRecoveryCode', 'code', code === 1010 ? errMessage : message));
      dispatch(loadingAction(false));
    }
  };
}

function loadingAction(isLoading) {
  return { type: LOADING, isLoading };
}

function requestCodeAction(userId) {
  return { type: REQUEST_CODE, userId };
}
