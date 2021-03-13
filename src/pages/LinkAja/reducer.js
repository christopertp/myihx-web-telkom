import { FAILED, INQUIRY_FETCHED, LOADING } from './constants';

const initialState = {
  inquiry: '',
  isLoading: false,
  message: '',
};

export default function reducer(state = initialState, action = {}) {
  const { type, isLoading, message, inquiry } = action;

  switch (type) {
    case FAILED:
      return {
        ...state,
        isLoading: false,
        message,
      };
    case INQUIRY_FETCHED:
      return {
        ...state,
        inquiry,
        isLoading: false,
      };
    case LOADING:
      return {
        ...state,
        isLoading,
      };
    default:
      return state;
  }
}
