import { FAILED, LOADING, REGISTERED, VERIFIED } from './constants';

const initialState = {
  accessToken: '',
  isLoading: false,
  message: '',
  profilePicture: '',
  userData: '',
  userId: '',
};

export default function reducer(state = initialState, action = {}) {
  const { accessToken, isLoading, message, profilePicture, type, userData, userId } = action;

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
    case REGISTERED:
      return {
        ...state,
        isLoading: false,
        message: '',
        userData,
        userId,
      };
    case VERIFIED:
      return {
        ...state,
        accessToken,
        profilePicture,
      };

    default:
      return state;
  }
}
