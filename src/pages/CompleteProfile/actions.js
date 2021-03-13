import { push } from 'react-router-redux';
import { FAILED, LOADING, DATA_FETCHED } from './constants';
import { verifyEmail, verifyId, statusSVM } from '../../services/user';

export const fetchSubmit = (type, param, to = '') => {
  const apis = {
    verifyEmail,
    verifyId,
  };

  return async (dispatch) => {
    dispatch(loadingAction(true));
    try {
      await apis[type](param);
      to && dispatch(push(to));
    } catch (error) {
      dispatch(failedAction(error.message));
    }
  };
};

export function fetchStatusSvm() {
  return async (dispatch) => {
    dispatch(loadingAction(true));
    try {
      const { data } = await statusSVM();
      dispatch(dataFetchedAction(data));
    } catch (error) {
      dispatch(failedAction(error.message));
    }
  };
}

function failedAction(message) {
  return { type: FAILED, message };
}

function loadingAction(isLoading) {
  return { type: LOADING, isLoading };
}
function dataFetchedAction(data) {
  return { type: DATA_FETCHED, data };
}
