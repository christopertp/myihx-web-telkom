import { push } from 'react-router-redux';
import { setDate } from '../pages/ScheduleAppointment/reducer';
import { installationReschedule, installationRescheduleDate } from '../services/order';

export const DATE_FETCHED = 'RescheduleInstallation/date-fetched';
export const FAILED = 'RescheduleInstallation/failed';
export const LOADING = 'RescheduleInstallation/loading';
export const SUBMITTED = 'RescheduleInstallation/submitted';

const initialState = {
  fetchReschedule,
  fetchRescheduleDate,
  isLoading: false,
  date: [],
  message: '',
  newDate: '',
  slot: '',
};

export default function reducer(state = initialState, action = {}) {
  const { type, isLoading, date, message, newDate, slot } = action;

  switch (type) {
    case DATE_FETCHED:
      return {
        ...state,
        date: setDate(date),
        isLoading: false,
        message: '',
      };
    case FAILED:
      return {
        ...state,
        message,
        isLoading: false,
      };
    case LOADING:
      return {
        ...state,
        isLoading,
      };
    case SUBMITTED:
      return {
        ...state,
        isLoading: false,
        message: '',
        newDate,
        slot,
      };
    default:
      return state;
  }
}

export function fetchReschedule(payload) {
  return async dispatch => {
    dispatch(loadingAction(true));
    try {
      await installationReschedule(payload);
      dispatch(submitAction(payload.timeSlot.date, payload.timeSlot.slot));
      dispatch(push('/installation/reschedule-success'));
    } catch (err) {
      dispatch(failedAction(err.message));
    }
  };
}

export function fetchRescheduleDate() {
  return async dispatch => {
    dispatch(loadingAction(true));
    try {
      const { data } = await installationRescheduleDate();
      dispatch(dateFetchedAction(data.availability));
    } catch (err) {
      dispatch(dateFetchedAction([]));
    }
  };
}

function dateFetchedAction(date) {
  return { type: DATE_FETCHED, date };
}

function failedAction(message) {
  return { type: FAILED, message };
}

function loadingAction(isLoading) {
  return { type: LOADING, isLoading };
}

function submitAction(newDate, slot) {
  return { type: SUBMITTED, newDate, slot };
}
