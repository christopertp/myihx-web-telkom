import { fetchBillDownload } from './actions';
import { DATA_FETCHED, FAILED, LOADING, NOTIFIED } from './constants';

const initialState = {
  data: [],
  fetchBillDownload,
  isLoading: { p: true, b: false },
  message: '',
  notifMessage: '',
};

export default function reducer(state = initialState, action = {}) {
  const { type, data, isLoading, key, message, notifMessage } = action;

  switch (type) {
    case DATA_FETCHED:
      return {
        ...state,
        data,
        isLoading: { ...state.isLoading, p: false },
      };
    case FAILED:
      return {
        ...state,
        isLoading: { ...state.isLoading, b: false, p: false },
        message,
      };
    case LOADING:
      return {
        ...state,
        isLoading: { ...state.isLoading, [key]: isLoading },
      };
    case NOTIFIED:
      return {
        ...state,
        isLoading: { ...state.isLoading, b: false },
        notifMessage,
      };

    default:
      return state;
  }
}
