import { push } from 'react-router-redux';
import { linkAjaTransferInquiry, linkAjaTransfer } from '../../services/payment';
import { FAILED, INQUIRY_FETCHED, LOADING } from './constants';

export function fetchTransfer(amount, pin, linkAjaNumber, transactionId, refNo) {
  return async dispatch => {
    dispatch(failedAction(''));
    dispatch(loadingAction(true));
    try {
      const { data, message } = await linkAjaTransfer(
        amount,
        pin,
        linkAjaNumber,
        transactionId,
        refNo,
      );
      if (data.status === 'SUCCESS') {
        dispatch(push('/linkaja/transfer-success'));
      } else {
        dispatch(failedAction(message));
      }
    } catch (err) {
      const { data } = err;
      if (data.status === 'WRONG_PIN') {
        dispatch(failedAction('Wrong PIN'));
      } else {
        dispatch(failedAction(err.message));
      }
    }
  };
}

export function fetchTransferInquiry(linkAjaNumber, amount) {
  return async dispatch => {
    dispatch(loadingAction(true));
    try {
      const { data, message } = await linkAjaTransferInquiry(linkAjaNumber, amount);
      if (data.status === 'ALLOWED') {
        dispatch(inquiryAction(data));
        dispatch(push('/linkaja/transfer-confirm'));
      } else {
        dispatch(failedAction(message));
      }
    } catch (err) {
      dispatch(failedAction(err.message));
    }
  };
}

export function failedAction(message) {
  return { type: FAILED, message };
}

function inquiryAction(inquiry) {
  return { type: INQUIRY_FETCHED, inquiry };
}

function loadingAction(isLoading) {
  return { type: LOADING, isLoading };
}
