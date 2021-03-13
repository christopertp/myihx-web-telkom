import { fetchAddress, resetMessage } from './actions';
import { DATA_FETCHED, FAILED, LOADING } from './constants';

const initialState = {
  fetchAddress,
  isLoading: {
    p: true,
    c: false,
    d: false,
    s: false,
    submit: false,
  },
  message: '',
  provinces: [],
  cities: [],
  districts: [],
  resetMessage,
  streets: [],
};

export default function reducer(state = initialState, action = {}) {
  const { type, data, isLoading, key, message } = action;

  switch (type) {
    case DATA_FETCHED:
      return {
        ...state,
        isLoading: { ...state.isLoading, [key.charAt(0)]: false },
        [key]: data,
      };
    case FAILED:
      return {
        ...state,
        isLoading: { ...state.isLoading, submit: false },
        message,
      };
    case LOADING:
      return {
        ...state,
        isLoading: { ...state.isLoading, [key]: isLoading },
      };
    default:
      return state;
  }
}
