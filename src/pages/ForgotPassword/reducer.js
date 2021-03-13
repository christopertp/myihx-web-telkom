import { LOADING, REQUEST_CODE } from './constants';

const initialState = {
  isLoading: false,
  userId: '',
};

export default function reducer(state = initialState, action = {}) {
  const { type, isLoading, userId } = action;

  switch (type) {
    case LOADING:
      return {
        ...state,
        isLoading,
      };
    case REQUEST_CODE:
      return {
        ...state,
        isLoading: false,
        userId,
      };
    default:
      return state;
  }
}
