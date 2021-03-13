import { billingInfo } from '../../services/billing';
import { FAILED, FETCHED, LOADING } from './constants';

export function fetchBill() {
  return async dispatch => {
    dispatch(loadingAction(true));
    try {
      const { data } = await billingInfo();
      const { billingPeriod, details, dueDate, status, totalAmount } = data;
      dispatch(fetchedAction(billingPeriod, details, dueDate, status, totalAmount));
    } catch(err) {
      dispatch(failedAction(err.message));
    }
  };
}

function failedAction(message) {
  return { type: FAILED, message };
}

function fetchedAction(billingPeriod, details, dueDate, status, totalAmount) {
  return { type: FETCHED, billingPeriod, details, dueDate, status, totalAmount };
}

function loadingAction(isLoading) {
  return { type: LOADING, isLoading };
}
