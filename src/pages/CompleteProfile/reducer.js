import { LOADING, FAILED, DATA_FETCHED } from './constants';

const initialState = {
  isLoading: false,
  message: '',
  data: {},
};

export default function reducer(state = initialState, action = {}) {
  const { type, isLoading, message, data } = action;

  switch (type) {
    case FAILED:
      return {
        ...state,
        isLoading: false,
        message,
      };
    case LOADING:
      return {
        ...state,
        isLoading,
      };
    case DATA_FETCHED:
      return {
        ...state,
        message: '',
        isLoading: false,
        data: { ...data },
      };
    default:
      return state;
  }
}
