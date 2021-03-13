import { push } from 'react-router-redux';
import { tmoneyChangePin, tmoneyHistory, tmoneyLink, tmoneyResetPin, tmoneySignup } from '../../services/payment';
import { CLEAR_DIALOG, FAILED, HISTORY_CLEAR, HISTORY_FETCHED, LOADING, RESET_FINISHED, PIN_FAILED, TRANSACTION_FAILED } from './constants';

const transactionFailedDialog = {
  title: 'Transaction Failed',
  message: 'Please try again later',
};

export function fetchChangePin(pin, newPin) {
  return async dispatch => {
    dispatch(loadingAction('s', true));
    try {
      const { data } = await tmoneyChangePin(pin, newPin);
      if (data.status === 'SUCCESS') {
        dispatch(pinFailedAction(''));
        dispatch(push('/tmoney', { notif: 'PIN successfully changed!' }));
      } else {
        dispatch(pinFailedAction('Wrong PIN'));
        dispatch(push('/tmoney/change-pin'));
      }
    } catch (err) {
      const { data, message } = err;
      if (data.status === 'RESET_PIN') {
        const notif = [
          'Your PIN has been automatically reset.',
          'Your new PIN has been sent to your phone number',
        ].join(' ');
        dispatch(transactionFailedAction('Change PIN Failed', notif, '/tmoney', { notif }));
      } else {
        dispatch(pinFailedAction(message));
      }
    }
  };
}

export function fetchHistory(page) {
  return async dispatch => {
    dispatch(loadingAction('d', true));
    try {
      const { data } = await tmoneyHistory(page);
      const { balance, histories } = data;
      dispatch(historyFetchedAction(balance, histories));
    } catch (err) {
      dispatch(loadingAction('d', false));
      dispatch(failedAction(err.message));
    }
  };
}

export function fetchReset() {
  return async dispatch => {
    dispatch(resetFinishedAction(false));
    dispatch(loadingAction('o', true));
    dispatch(loadingAction('s', true));
    try {
      const { data } = await tmoneyResetPin();
      const { status } = data;
      dispatch(resetFinishedAction(true));
      if (status === 'SUCCESS') {
        const notif = 'New PIN has been successfully sent to your email and phone number!';
        dispatch(push('tmoney', { notif }));
      } else {
        const { title, message } = transactionFailedDialog;
        dispatch(transactionFailedAction(title, message, '/tmoney'));
      }
    } catch (err) {
      const { title, message } = transactionFailedDialog;
      dispatch(resetFinishedAction(true));
      dispatch(transactionFailedAction(title, message, '/tmoney'));
    }
  };
}

export function fetchLink(pin) {
  return async dispatch => {
    dispatch(loadingAction('s', true));
    try {
      const { data } = await tmoneyLink(pin);
      if (data.status === 'SUCCESS') {
        dispatch(push('/tmoney'));
      } else {
        const { title, message } = transactionFailedDialog;
        dispatch(transactionFailedAction(title, message, '/profile'));
      }
    } catch (err) {
      const { data } = err;
      const { title, message } = transactionFailedDialog;
      const blockedMessage = [
        'Your account has been blocked for your safety.',
        'Please contact us to unblock your account.',
        'Call +62 21 3808888 or email customer service@tmoney.co.id.',
      ].join(' ');

      switch (data.status) {
        case 'ACCOUNT_BLOCKED':
          dispatch(transactionFailedAction('Account Blocked', blockedMessage, '/profile'));
          break;
        case 'WRONG_PIN':
          dispatch(pinFailedAction('Wrong PIN'));
          break;
        default:
          dispatch(transactionFailedAction(title, message, '/profile'));
          break;
      }
    }
  };
}

export function fetchSignup(password) {
  return async dispatch => {
    dispatch(loadingAction('s', true));
    try {
      const { data } = await tmoneySignup(password);
      dispatch(loadingAction('s', false));
      dispatch(failedAction(''));
      if (data.status === 'SUCCESS') {
        dispatch(push('/tmoney', { notif: 'Wallet successfully activated!' }));
      } else {
        const { title, message } = transactionFailedDialog;
        dispatch(transactionFailedAction(title, message, '/profile'));
      }
    } catch (err) {
      dispatch(loadingAction('s', false));
      dispatch(failedAction(err.message));
    }
  };
}

export function clearFailedDialog() {
  return { type: CLEAR_DIALOG };
}

export function clearHistory() {
  return { type: HISTORY_CLEAR };
}

export function failedAction(message) {
  return { type: FAILED, message };
}

function historyFetchedAction(balance, histories) {
  return { type: HISTORY_FETCHED, balance, histories };
}

function loadingAction(key, isLoading) {
  return { type: LOADING, key, isLoading };
}

export function pinFailedAction(pinMessage) {
  return { type: PIN_FAILED, pinMessage };
}

function resetFinishedAction(resetFinished) {
  return { type: RESET_FINISHED, resetFinished };
}

export function transactionFailedAction(title, message, to, notif) {
  return { type: TRANSACTION_FAILED, failedDialog: { title, message, to, notif } };
}
