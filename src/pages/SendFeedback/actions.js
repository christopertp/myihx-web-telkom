import { feedbackCategory, feedbackSend } from '../../services/nps';
import { push } from 'react-router-redux';
import { DATA_FETCHED, LOADING, FAILED } from './constants';

export function fetchData() {
  return async dispatch => {
    dispatch(loadingAction(true, 'topic'));
    try {
      const { data } = await feedbackCategory();
      dispatch(dataFetchedAction(data));
    } catch (err) {
      dispatch(dataFetchedAction([]));
    }
  };
}

export function fetchSendFeedback(data) {
  return async dispatch => {
    dispatch(loadingAction(true, 'submit'));
    try {
      await feedbackSend(data);
      dispatch(push({ pathname: '/profile', state: { notif: 'Feedback has been send successfully.' } }));
      dispatch(failedAction('', 'submit'));
    } catch (err) {
      dispatch(failedAction('Failed to send data. Please contact developer.', 'submit'));
    }
  };
}

function loadingAction(isLoading, key) {
  return { type: LOADING, isLoading, key };
}

function dataFetchedAction(topic) {
  return { type: DATA_FETCHED, topic };
}

function failedAction(message, key) {
  return { type: FAILED, message, key };
}
