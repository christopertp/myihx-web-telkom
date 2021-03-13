import { push } from 'react-router-redux';
import { subscriptions } from '../../services/order';
import { mostPopularDetail } from '../../services/product';
import { FAILED, FETCHED, LOADING, RESET } from './constants';

export function fetchMostPopularDetail(productId) {
  return async dispatch => {
    dispatch(loadingAction(true, 'data'));
    try {
      const { data } = await mostPopularDetail(productId);
      dispatch(fetchedAction(data));
    } catch (err) {
      dispatch(fetchedAction(''));
    }
  };
}

export function fetchSubscribe(productId) {
  return async dispatch => {
    dispatch(loadingAction(true, 'submit'));
    try {
      const { data } = await subscriptions(productId);

      if (!data.installationStatus) {
        dispatch(push('/check-coverage'));
      } else {
        dispatch(push('/personal-data'));
      }
    } catch (err) {
      dispatch(failedAction(err.code));
      dispatch(loadingAction(false, 'submit'));
    }
  };
}

export function resetData() {
  return { type: RESET };
}

function fetchedAction(data) {
  return { type: FETCHED, data };

}

function failedAction(code) {
  return { type: FAILED, code };
}

function loadingAction(isLoading, key) {
  return { type: LOADING, isLoading, key };
}
