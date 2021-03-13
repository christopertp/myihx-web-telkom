import moment from 'moment';
import { getTicketComments, getTicketStatus, postTicketComment } from '../../services/assurance';
import { COMMENT_POSTED, COMMENTS_FETCHED, FAILED, FETCHED, LOADING } from './constants';

export function fetchComments(id) {
  return async dispatch => {
    dispatch(loadingAction(true, 'comments'));
    try {
      const { data } = await getTicketComments(id);
      dispatch(commentsFetchedAction(data));
    } catch (err) {
      dispatch(commentsFetchedAction([]));
    }
  };
}

export function fetchData(id) {
  return async dispatch => {
    dispatch(loadingAction(true, 'detail'));
    try {
      const { data } = await getTicketStatus(id);
      dispatch(fetchedAction(data));
    } catch (err) {
      dispatch(failedAction('404', 'detail'));
    }
  };
}

export function fetchPostComment(id, comment, cb) {
  return async dispatch => {
    dispatch(loadingAction(true, 'post'));
    try {
      await postTicketComment(id, comment);
      dispatch(commentPostedAction({
        date: moment().format('D/MM/YYYY'),
        message: comment,
      }));
      cb();
    } catch (err) {
      dispatch(failedAction(err.message, 'post'));
    }
  };
}

function commentsFetchedAction(comments) {
  return { type: COMMENTS_FETCHED, comments };
}

function commentPostedAction(comment) {
  return { type: COMMENT_POSTED, comment };
}

function failedAction(message, key) {
  return { type: FAILED, message, key };
}

function fetchedAction(data) {
  return { type: FETCHED, data };
}

function loadingAction(isLoading, key) {
  return { type: LOADING, isLoading, key };
}
