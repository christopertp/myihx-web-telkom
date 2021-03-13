import { push } from 'react-router-redux';
import { sendOtpChangeMobile } from '../../services/notification';
import { tmoneyStatus } from '../../services/payment';
import { getAboutPoint } from '../../services/rewards';
import { changeEmail, changePassword, checkMobile, profile, statusCard, updateUserProfile, verifyEmail, verifyMobile, statusReward } from '../../services/user';
import { updateSyncErrors } from '../../utils/redux-form-actions';
import { clearStorages } from '../../utils/storage';
import { ABOUTPOINT_FETCHED, CARD_FETCHED, DATA_FETCHED, FAILED, LOADING, TMONEY_FETCHED, REWARD_FETCHED } from './constants';

export function fetchData() {
  return async dispatch => {
    dispatch(loadingAction(true, 'p'));
    try {
      const { data } = await profile();
      dispatch(dataFetchedAction(data));
    } catch (err) {
      dispatch(loadingAction(false, 'p'));
    }
  };
}

export function fetchStatusRewards() {
  return async dispatch => {
    dispatch(loadingAction(true, 'c'));
    try {
      const { data } = await statusReward();
      dispatch(rewardFetchedAction(data));
    } catch (err) {
      dispatch(loadingAction(false, 'c'));
    }
  };
}

export function fetchStatusCard() {
  return async dispatch => {
    dispatch(loadingAction(true, 'c'));
    try {
      const { data } = await statusCard();
      dispatch(cardFetchedAction(data));
    } catch (err) {
      dispatch(loadingAction(false, 'c'));
    }
  };
}

export function fetchChangeEmail(email) {
  return async dispatch => {
    dispatch(failedAction(''));
    dispatch(loadingAction(true, 'b'));
    try {
      await changeEmail(email);
      dispatch(push('/profile/change-email/verify'));
      dispatch(loadingAction(false, 'b'));
    } catch (err) {
      dispatch(updateSyncErrors('profileChangeEM', 'email', err.message));
      dispatch(loadingAction(false, 'b'));
    }
  };
}

export function fetchAboutPoint() {
  return async dispatch => {
    dispatch(failedAction(''));
    dispatch(loadingAction(true, 'a'));
    try {
      const { data } = await getAboutPoint();
      dispatch(aboutPointFetchedAction(data));
    } catch (err) {
      dispatch(failedAction(err.message));
      dispatch(aboutPointFetchedAction(''));
    }
  };
}

export function fetchSendOtpChangeMobile(mobileNumber, type) {
  return async dispatch => {
    dispatch(failedAction(''));
    dispatch(loadingAction(true, 'b'));
    try {
      await sendOtpChangeMobile(mobileNumber, type);
      dispatch(push('/profile/change-mobile/verify'));
      dispatch(loadingAction(false, 'b'));
    } catch (err) {
      dispatch(failedAction(err.message));
    }
  };
}

export function fetchCheckMobile(mobile) {
  return async dispatch => {
    dispatch(failedAction(''));
    dispatch(loadingAction(true, 'b'));
    try {
      await checkMobile(mobile);
      dispatch(push('/profile/change-mobile/request'));
      dispatch(loadingAction(false, 'b'));
    } catch (err) {
      dispatch(updateSyncErrors('profileChangeEM', 'mobile', err.message));
      dispatch(loadingAction(false, 'b'));
    }
  };
}

export function fetchChangePassword(currentPassword, newPassword) {
  return async dispatch => {
    dispatch(failedAction(''));
    dispatch(loadingAction(true, 'b'));
    try {
      await changePassword(currentPassword, newPassword);
      clearStorages();
      dispatch(push({ pathname: '/login', state: { notif: 'Password has been changed successfully. You can now login.' } }));
    } catch (err) {
      dispatch(updateSyncErrors('profileChangePassword', 'currentPassword', err.message));
      dispatch(loadingAction(false, 'b'));
    }
  };
}

export function fetchTmoney() {
  return async dispatch => {
    dispatch(loadingAction(true, 't'));
    try {
      const { data } = await tmoneyStatus();
      dispatch(tmoneyFetchedAction(data));
    } catch (err) {
      dispatch(tmoneyFetchedAction({ status: 'ERROR' }));
    }
  };
}

export function fetchUpdateProfile(data) {
  return async dispatch => {
    dispatch(failedAction(''));
    dispatch(loadingAction(true, 'b'));
    try {
      await updateUserProfile(data);
      dispatch(failedAction(''));
      dispatch(loadingAction(true, 'p'));
      dispatch(push({ pathname: '/profile', state: { notif: 'Profile has been changed successfully.' } }));
    } catch (err) {
      dispatch(failedAction(err.message));
    }
  };
}

export function fetchVerifyEmail(otp) {
  return async dispatch => {
    dispatch(failedAction(''));
    dispatch(loadingAction(true, 'b'));
    try {
      await verifyEmail(otp);
      dispatch(push({ pathname: '/profile', state: { notif: 'Email has been changed successfully.' } }));
    } catch (err) {
      dispatch(updateSyncErrors('recoveryCode', 'recoveryCode', 'kode otp yang Anda masukkan salah'));
      dispatch(loadingAction(false, 'b'));
    }
  };
}

export function fetchVerifyMobile(otp) {
  return async dispatch => {
    dispatch(failedAction(''));
    dispatch(loadingAction(true, 'b'));
    try {
      await verifyMobile(otp);
      dispatch(push({ pathname: '/profile', state: { notif: 'Phone number has been changed successfully.' } }));
    } catch (err) {
      dispatch(updateSyncErrors('recoveryCode', 'recoveryCode', 'kode otp yang Anda masukkan salah'));
      dispatch(loadingAction(false, 'b'));
    }
  };
}

export function resetMessage() {
  return failedAction('');
}

function aboutPointFetchedAction(aboutPoint) {
  return { type: ABOUTPOINT_FETCHED, aboutPoint };
}

function cardFetchedAction(card) {
  return { type: CARD_FETCHED, card };
}

function failedAction(message) {
  return { type: FAILED, message };
}

function loadingAction(isLoading, key) {
  return { type: LOADING, isLoading, key };
}

function dataFetchedAction(data) {
  return { type: DATA_FETCHED, data };
}

function tmoneyFetchedAction(tmoney) {
  return { type: TMONEY_FETCHED, tmoney };
}

function rewardFetchedAction(data) {
  return { type: REWARD_FETCHED, data };
}

