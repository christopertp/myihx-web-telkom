import { FAILED, FETCHED, LOADING } from './constants';

const initialState = {
  isLoading: {
    p: true,
    s: false,
  },
  message: '',
  url: '',
};

export default function reducer(state = initialState, action = {}) {
  const { type, isLoading, key, message, url } = action;

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
        isLoading: { ...state.isLoading, p: false },
        message: '',
        url,
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
