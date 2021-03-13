import { push } from 'react-router-redux';
import { document, documentConfirm, documentUpdate, documentUpload, documentUploadSelfi, documentUploadSignature } from '../../services/user';
import { FAILED, FETCHED, LOADING } from './constants';

export function fetchConfirm() {
  return async dispatch => {
    dispatch(loadingAction(true));
    try {
      await documentConfirm();
      dispatch(failedAction(''));
      dispatch(push('/personal-data/verify'));
    } catch (err) {
      dispatch(failedAction(err.message));
    }
  };
}

export function fetchDocument() {
  return async dispatch => {
    dispatch(loadingAction(true));
    try {
      const { data } = await document();
      dispatch(fetchedAction(data));
    } catch (err) {
      dispatch(fetchedAction(''));
    }
  };
}

export function fetchUpload(type, payload, subpage) {
  const fn = {
    id: subpage === 'edit' ? documentUpdate : documentUpload,
    selfie: documentUploadSelfi,
    sign: documentUploadSignature,
  };
  return async dispatch => {
    dispatch(loadingAction(true));
    try {
      await fn[type](payload);
      dispatch(failedAction(''));
      dispatch(push('/personal-data'));
    } catch (err) {
      dispatch(failedAction(err.message));
    }
  };
}

function failedAction(message) {
  return { type: FAILED, message };
}

function fetchedAction(data) {
  return { type: FETCHED, data };
}

function loadingAction(isLoading) {
  return { type: LOADING, isLoading };
}
