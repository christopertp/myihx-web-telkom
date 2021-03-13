import { push } from 'react-router-redux';
import { sendOtpRegister } from '../../services/notification';
import { checkIndihomeNumber, registerUser, verifyRegister } from '../../services/user';
import { updateSyncErrors } from '../../utils/redux-form-actions';
import { setExpireTime, setToken, setUserData } from '../../utils/storage';
import { FAILED, LOADING, REGISTERED, VERIFIED } from './constants';

export function fetchIndihomeNumber(userId, indihomeNumber, accessToken, profilePicture) {
  return async dispatch => {
    dispatch(failedAction(''));
    dispatch(loadingAction(true));
    try {
      await checkIndihomeNumber(userId, indihomeNumber);
      setLoginSession(accessToken, profilePicture, dispatch);
    } catch(err) {
      dispatch(failedAction(err.message));
    }
  };
}

export function fetchRegisterUser(registrationData) {
  return async dispatch => {
    dispatch(failedAction(''));
    dispatch(loadingAction(true));
    try {
      const { data } = await registerUser(registrationData);
      const { email, fullName, mobileNumber, referralCode } = registrationData;
      dispatch(registerAction({ email, fullName, mobileNumber, referralCode }, data.userId));
      dispatch(push('/register/request'));
    } catch(err) {
      switch(err.code) {
        case 1001:
          dispatch(updateSyncErrors('registerUser', 'referralCode', err.message));
          break;
        case 1002:
          dispatch(updateSyncErrors('registerUser', 'email', err.message));
          break;
        case 1003:
          dispatch(failedAction('1003'));
          break;
        default: dispatch(failedAction(err.message));
      }
      dispatch(loadingAction(false));
    }
  };
}

export function fetchSendOtpRegister(otpData) {
  return async dispatch => {
    dispatch(failedAction(''));
    dispatch(loadingAction(true));
    try {
      await sendOtpRegister(otpData);
      dispatch(push('/register/verify'));
    } catch (err) {
      dispatch(failedAction(err.message));
    }
  };
}

export function fetchVerifyRegister(otp, userId) {
  return async dispatch => {
    dispatch(failedAction(''));
    dispatch(loadingAction(true));
    try {
      const { data: { accessToken, profilePicture } } = await verifyRegister(otp, userId);
      dispatch(verifyAction(accessToken, profilePicture));
      dispatch(push('/register/indihome-number'));
    } catch (err) {
      dispatch(failedAction(err.message));
    }
  };
}

export function setVerifiedAccount(accessToken, profilePicture) {
  return dispatch => setLoginSession(accessToken, profilePicture, dispatch);
}

function setLoginSession(accessToken, profilePicture, dispatch) {
  dispatch(failedAction(''));
  const userData = JSON.parse(atob(accessToken.split('.')[1]));
  setToken(accessToken);
  setExpireTime(userData.exp);
  setUserData({ ...userData, profilePicture });
  location.href = '/';
}

export function resetMessage() {
  return failedAction('');
}

function failedAction(message) {
  return { type: FAILED, message };
}

function loadingAction(isLoading) {
  return { type: LOADING, isLoading };
}

function registerAction(userData, userId) {
  return { type: REGISTERED, userData, userId };
}

function verifyAction(accessToken, profilePicture) {
  return { type: VERIFIED, accessToken, profilePicture };
}
