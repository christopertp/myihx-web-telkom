import { billingDownload, billingHistory } from '../../services/billing';
import { DATA_FETCHED, FAILED, LOADING, NOTIFIED } from './constants';

export function fetchBillDownload(period) {
  return async dispatch => {
    dispatch(loadingAction(true, 'b'));
    try {
      const { data } = await billingDownload(period);
      dispatch(notifiedAction(`Bill statement has successfully sent to ${data.email}`));
    } catch (err) {
      dispatch(notifiedAction(err.message));
    }
  };
}

export function fetchHistory(page) {
  const apis = {
    bill: billingHistory,
  };
  return async dispatch => {
    dispatch(loadingAction(true, 'p'));
    try {
      const { data } = await apis[page]();
      dispatch(dataFetchedAction(data));
    } catch (err) {
      dispatch(failedAction(err.message));
    }
  };
}

function dataFetchedAction(data) {
  return { type: DATA_FETCHED, data };
}

function failedAction(message) {
  return { type: FAILED, message };
}

function loadingAction(isLoading, key) {
  return { type: LOADING, isLoading, key };
}

export function notifiedAction(notifMessage) {
  return { type: NOTIFIED, notifMessage };
}
