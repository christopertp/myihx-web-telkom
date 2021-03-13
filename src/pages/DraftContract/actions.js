import { push } from 'react-router-redux';
import { draftContract, draftContractAccept } from '../../services/user';
import { FAILED, FETCHED, LOADING } from './constants';

export function fetchDraftContract() {
  return async dispatch => {
    dispatch(loadingAction(true, 'pdf'));
    try {
      const { data } = await draftContract();
      dispatch(fetchedAction(data.draftContract));
    } catch (err) {
      dispatch(failedAction('Gagal memuat PDF', 'pdf'));
    }
  };
}

export function fetchAccept() {
  return async dispatch => {
    dispatch(loadingAction(true, 'submit'));
    try {
      await draftContractAccept();
      dispatch(failedAction('', 'submit'));
      dispatch(push({ pathname: '/', state: { notif: 'Draft contract is accepted.' } }));
    } catch (err) {
      dispatch(failedAction(err.message, 'submit'));
    }
  };
}

function failedAction(message, key) {
  return { type: FAILED, key,  message };
}

function fetchedAction(url) {
  return { type: FETCHED, url };
}

function loadingAction(isLoading, key) {
  return { type: LOADING, isLoading, key };
}
