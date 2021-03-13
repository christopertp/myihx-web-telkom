import { LOADING, FAILED, OTP_SENT } from './constants';

const initialState = {
  isLoading: false,
  message: '',
  userId: '',
};

export default function reducer(state = initialState, action = {}) {
  const { type, isLoading, message, userId } = action;

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
    case OTP_SENT:
      return {
        ...state,
        isLoading: false,
        message: '',
        userId,
      };
    default:
      return state;
  }
}
