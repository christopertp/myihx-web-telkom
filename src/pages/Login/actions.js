import { push } from 'react-router-redux';
import { sendOtp } from '../../services/notification';
import { checkUser, loginUser, verifyLogin } from '../../services/user';
import { updateSyncErrors } from '../../utils/redux-form-actions';
import { setExpireTime, setToken, setUserData } from '../../utils/storage';
import { FAILED, LOADING, OTP_SENT } from './constants';

export function fetchCheckUser(user) {
  return async dispatch => {
    dispatch(loadingAction(true));
    try {
      const { data } = await checkUser(user);
      const { stepVerify } = data;
      dispatch(push(stepVerify ? '/login/request' : '/login/password'));
      dispatch(loadingAction(false));
    } catch (err) {
      if (err.code === 404) {
        dispatch(failedAction('404'));
      } else {
        dispatch(updateSyncErrors('loginUser', 'user', err.message));
      }
      dispatch(loadingAction(false));
    }
  };
}

export function fetchLoginUser(email, password) {
  return async dispatch => {
    dispatch(loadingAction(true));
    try {
      const { data } = await loginUser(email, password);
      const { accessToken, profilePicture } = data;
      accessToken ?
        setLoginSession(accessToken, profilePicture, dispatch) :
        dispatch(updateSyncErrors('loginPassword', 'password', 'Akun anda tidak diizinkan untuk mengakses'));
    } catch (err) {
      const { data, message } = err;
      const errMessage = data.loginAttempt
        ? `Password salah. ${data.loginAttempt} kesempatan lagi`
        : message;
      dispatch(updateSyncErrors('loginPassword', 'password', errMessage));
      dispatch(loadingAction(false));
    }
  };
}

export function fetchSendOtp(mobileNumber, type) {
  return async dispatch => {
    dispatch(failedAction(''));
    dispatch(loadingAction(true));
    try {
      const { data } = await sendOtp(mobileNumber, type);
      dispatch(push('/login/verify'));
      dispatch(sendOtpAction(data.userId));
    } catch (err) {
      dispatch(failedAction(err.message));
    }
  };
}

export function fetchVerifyLogin(otp, userId) {
  return async dispatch => {
    dispatch(failedAction(''));
    dispatch(loadingAction(true));
    try {
      const { data } = await verifyLogin(otp, userId);
      const { accessToken, profilePicture } = data;
      accessToken ?
        setLoginSession(accessToken, profilePicture, dispatch) :
        dispatch(failedAction('Akun anda tidak diizinkan untuk mengakses'));
    } catch (err) {
      const { data, message } = err;
      const errMessage = data.loginAttempt
        ? `OTP salah. ${data.loginAttempt} kesempatan lagi`
        : message;
      dispatch(failedAction(errMessage));
    }
  };
}

export function resetMessage() {
  return failedAction('');
}

function setLoginSession(accessToken, profilePicture, dispatch) {
  dispatch(failedAction(''));
  const userData = JSON.parse(atob(accessToken.split('.')[1]));
  setToken(accessToken);
  setExpireTime(userData.exp);
  setUserData({ ...userData, profilePicture });
  location.href = '/';
}

function failedAction(message) {
  return { type: FAILED, message };
}

function loadingAction(isLoading) {
  return { type: LOADING, isLoading };
}

function sendOtpAction(userId) {
  return { type: OTP_SENT, userId };
}
