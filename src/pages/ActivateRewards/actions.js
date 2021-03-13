import { RESET, LOADING, FAILED, FETCHED, STATUS, USER, COUNTER } from './constants';
import { push } from 'react-router-redux';
import { profile } from '../../services/user';
import { postActivateReward, postVerifyOtp, postResendOtp, statusPoints } from '../../services/rewards';

export function activateReward(category, type) {
  return async dispatch => {
    dispatch(loadingAction(true));
    try {
      const request = {
        'category': category,
        'type': type,
      };
      const { data } = await postActivateReward(request);
      dispatch(timeOTPFetchedAction(data));
    } catch (err) {
      dispatch(failedAction(err.message));
    }
  };
}

export function verifyOtp(payload) {
  return async dispatch => {
    dispatch(loadingAction(true));
    try {
      const request = {
        'otp': payload,
      };
      const { data } = await postVerifyOtp(request);
      if (data.status === 'success') {
        dispatch(push('/activate-rewards/success'));
      } else {
        dispatch(push('/activate-rewards'));
      }
    } catch (err) {
      const { message, data } = err;
      dispatch(failedAction(err.message));
      if (err?.message === 'Otp not match') {
        dispatch(counterAction(data, message));
      }
    }
  };
}

export function fetchStatusRewards() {
  return async dispatch => {
    dispatch(loadingAction(true));
    try {
      const { data } = await statusPoints();
      dispatch(statusAction(data));
    } catch (err) {
      dispatch(failedAction(err.message));
    }
  };
}

export function resendOtp(type) {
  return async dispatch => {
    dispatch(loadingAction(true));
    try {
      const request = {
        'type': type
      };
      const { data } = await postResendOtp(request);
      dispatch(timeOTPFetchedAction(data));
    } catch (err) {
      dispatch(failedAction(err.message));
    }
  };
}

export function fetchDataUser() {
  return async dispatch => {
    dispatch(loadingAction(true));
    try {
      const { data } = await profile();
      dispatch(loadingAction(false));
      dispatch(userAction(data));
    } catch (err) {
      dispatch(failedAction(err.message));
    }
  };
}

function timeOTPFetchedAction(data) {
  const nowDate = new Date().toISOString();
  const diffDate = Date.parse(data.deadlineOTP) - Date.parse(nowDate);
  const timeLeft = parseInt(diffDate / 1000);
  data = {
    ...data,
    deadlineOTP: timeLeft,
    isLoading: false,
  };
  return { type: FETCHED, data };
}

function loadingAction(isLoading) {
  return { type: LOADING, isLoading };
}

function failedAction(message) {
  return { type: FAILED, message };
}

function statusAction(data) {
  return { type: STATUS, data };
}

function userAction(data) {
  return { type: USER, data };
}

function counterAction(data, message) {
  return { type: COUNTER, data, message };
}

export function resetData() {
  return { type: RESET };
}
