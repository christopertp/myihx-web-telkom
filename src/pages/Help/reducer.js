import { fetchReportIssues } from './actions';
import { FAILED, FETCHED, LOADING } from './constants';

const initialState = {
  fetchReportIssues,
  isLoading: {
    c: true,
    i: false,
    r: false,
    s: false,
  },
  data: {
    activity: '',
    categories: [],
    issues: [],
    reset: '',
  },
};

export default function reducer(state = initialState, action = {}) {
  const { type, data, isLoading, key, message } = action;

  switch (type) {
    case FAILED:
      return {
        ...state,
        isLoading: { ...state.isLoading, [key.charAt(0)]: false },
        message,
      };
    case FETCHED:
      return {
        ...state,
        isLoading: { ...state.isLoading, [key.charAt(0)]: false },
        message: '',
        data: { ...state.data, [key]: data },
      };
    case LOADING:
      return {
        ...state,
        isLoading: { ...state.isLoading, [key.charAt(0)]: isLoading },
      };
    default:
      return state;
  }
}
