import { FETCHED, RESET, LOADING, FAILED } from './constants';
import { billingDetail } from '../../services/billing';

export function fetchBillingDetail(period){
  return async dispatch => {
    dispatch(loadingAction(true));
    try {
      const { data }  = await billingDetail(period);
      dispatch(fetchedAction(data));
    } catch (err) {
      dispatch(failedAction(err.message));
    }
  };
}

function loadingAction(isLoading) {
  return { type: LOADING, isLoading };
}

function fetchedAction(data) {
  return { type: FETCHED, data };
}

function failedAction(message) {
  return { type: FAILED, message };
}

export function resetData() {
  return { type: RESET };
}
