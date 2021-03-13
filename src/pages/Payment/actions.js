import { paymentMethod, paymentBankTransfer, paymentLinkAjaDebitCC, paymentGetStatus } from '../../services/payment';
import { COPIED, FAILED, FETCHED, LOADING, BANK_FETCHED, STATUS_FETCHED } from './constants';
import { push } from 'react-router-redux';

export function fetchMethods(method, transactionIdMethod) {
  return async dispatch => {
    dispatch(loadingAction(true, 'p'));
    try {
      const { data } = await paymentMethod(method, transactionIdMethod);
      const { methods, amount, bankInfo, transactionId, deadline } = data;
      dispatch(fetchedAction(amount, transactionId, bankInfo, methods, deadline));
    } catch (err) {
      dispatch(failedAction(err.message));
    }
  };
}

export function fetchBankTransfer(method, amount, codeBank, code, detailBank) {
  const splitCode = code.split('-');
  return async dispatch => {
    dispatch(loadingAction(true, 'b'));
    try {
      const { data } = await paymentBankTransfer(method, amount, codeBank, code, 'BANK_TRANSFER');
      const { paymentCode, deadline, transactionId } = data;
      dispatch(fetchedBankAction(codeBank, paymentCode, detailBank, deadline, transactionId));
      dispatch(push(`bank-transfer/${codeBank}`));
    } catch (err) {
      dispatch(push(`/payment-${code}/failed?invoice=${splitCode[1]}`));
    }
  };
}

export function fetchLinkAjaDebitCC(payload, method) {
  const { amount, transactionId, type } = method;
  const splitTransactionId = transactionId.split('-');
  return async dispatch => {
    try {
      const { data } = await paymentLinkAjaDebitCC(payload, amount, transactionId, type);
      window.location.href = `${data.redirectUrl}`;
    } catch (err) {
      dispatch(push(`/payment-${transactionId}/failed?invoice=${splitTransactionId[1]}`));
    }
  };
}

export function fetchPaymentStatus(transactionId) {
  return async dispatch => {
    dispatch(loadingAction(true, 's'));
    try {
      const { data } = await paymentGetStatus(transactionId);
      const { productInfo, customer, deadline, paymentType, paymentStatus, totalDue } = data;
      dispatch(fetchedStatusAction(productInfo, customer, deadline,
        paymentType, paymentStatus, totalDue));
    } catch (err) {
      dispatch(failedAction(err.message));
    }
  };
}

export function setMessageAction(message) {
  return { type: COPIED, message };
}

function failedAction(message) {
  return { type: FAILED, message };
}

function fetchedAction(amount, transactionId, bankInfo, methods, deadline) {
  return { type: FETCHED, amount, transactionId, bankInfo, methods, deadline };
}

function loadingAction(loading, key) {
  return { type: LOADING, loading, key };
}

function fetchedBankAction(codeBank, paymentCode, detailBank, deadline, transactionId) {
  return { type: BANK_FETCHED, codeBank, paymentCode, detailBank, deadline, transactionId };
}

function fetchedStatusAction(productInfo, customer, deadline, paymentType,
  paymentStatus, totalDue) {
  return { type: STATUS_FETCHED, productInfo, customer, deadline,
    paymentType, paymentStatus, totalDue };
}
