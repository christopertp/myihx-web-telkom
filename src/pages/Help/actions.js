import { push } from 'react-router-redux';
import { getCategories, getIssues, getIssueStatus, createTicket, resetModem } from '../../services/assurance';
import { FAILED, FETCHED, LOADING } from './constants';

export function fetchCreateTicket(payload) {
  const key = 'submit';
  return async dispatch => {
    dispatch(loadingAction(true, key));
    try {
      const { data } = await createTicket(payload);
      const { issueId, ticketType } = data;
      dispatch(failedAction('', key));
      dispatch(push(ticketType.toLowerCase() === 'logic' ? `/issues/${issueId}` : '/schedule-service'));
    } catch (err) {
      dispatch(failedAction(err.message, key));
    }
  };
}

export function fetchReportIssues(key, id) {
  const apis = {
    categories: getCategories,
    issues: getIssues,
  };
  return async dispatch => {
    dispatch(loadingAction(true, key));
    try {
      const { data } = await apis[key](id);
      dispatch(fetchedAction(mapData(data, key), key));
    } catch (err) {
      dispatch(fetchedAction([], key));
    }
  };
}

export function fetchResetModem() {
  const key = 'reset';
  return async dispatch => {
    dispatch(loadingAction(true, key));
    try {
      await resetModem();
      dispatch(fetchedAction('success', key));
    } catch(err) {
      const { code, message } = err;
      dispatch(fetchedAction(code === 417 ? '417' : message, key));
    }
  };
}

export function fetchStatusCard() {
  const key = 'activity';
  return async dispatch => {
    dispatch(loadingAction(true, key));
    try {
      const { data } = await getIssueStatus();
      dispatch(fetchedAction(data, key));
    } catch (err) {
      dispatch(fetchedAction('', key));
    }
  };
}

export function mapData(data, key) {
  return data.map(i => {
    return (key === 'categories') ? { text: i.name, value: i.categoryId } : { text: i.issues, value: i.symptomId };
  });
}

function failedAction(message, key) {
  return { type: FAILED, message, key };
}

export function fetchedAction(data, key) {
  return { type: FETCHED, data, key };
}

function loadingAction(isLoading, key) {
  return { type: LOADING, isLoading, key };
}
