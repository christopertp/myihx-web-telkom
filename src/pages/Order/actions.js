import { push } from 'react-router-redux';
import { getContinueDeposit, postCancelOrder, postConfirmationSave } from '../../services/order';
import { FAILED, LOADING, ORDER_FETCHED } from './constants';

export function fetchCancelOrder(transactionId) {
  return async dispatch => {
    dispatch(loadingAction('s', true));
    try {
      await postCancelOrder(transactionId, 'DEPOSIT');
      dispatch(loadingAction('s', false));
      dispatch(push('/', { notif: 'Order has been cancelled' }));
    } catch (err) {
      dispatch(failedAction(err.message));
    }
  };
}

export function fetchConfirmationSave(transactionId) {
  return async dispatch => {
    dispatch(loadingAction('s', true));
    try {
      const { data } = await postConfirmationSave(transactionId, 'DEPOSIT');
      if (data.status === 'SUCCESS') {
        dispatch(push(`/payment-${transactionId}/deposit`));
      } else {
        dispatch(failedAction('Please try again later'));
      }
    } catch (err) {
      dispatch(failedAction('Please try again later'));
    }
  };
}

export function fetchOrder(transactionId) {
  return async dispatch => {
    dispatch(loadingAction('o', true));
    try {
      const { data } = await getContinueDeposit(transactionId);
      dispatch(orderAction(data));
    } catch (err) {
      dispatch(failedAction(err.message));
    }
  };
}

export function failedAction(message) {
  return { type: FAILED, message };
}

export function loadingAction(key, isLoading) {
  return { type: LOADING, key, isLoading };
}

export function orderAction(order) {
  return { type: ORDER_FETCHED, order };
}
