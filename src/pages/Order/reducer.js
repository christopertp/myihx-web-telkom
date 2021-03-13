import { failedAction, fetchConfirmationSave, fetchOrder } from './actions';
import { LOADING, FAILED, ORDER_FETCHED } from './constants';

const initialState = {
  failedAction,
  fetchConfirmationSave,
  fetchOrder,
  isLoading: { o: true, s: false },
  message: '',
  order: '',
};

export default function reducer(state = initialState, action = {}) {
  const { type, isLoading, key, message, order } = action;

  switch (type) {
    case LOADING:
      return {
        ...state,
        isLoading: { ...state.isLoading, [key]: isLoading },
      };
    case FAILED:
      return {
        ...state,
        isLoading: { o: false, s: false },
        message,
      };
    case ORDER_FETCHED:
      return {
        ...state,
        isLoading: { ...state.isLoading, o: false },
        order,
      };
    default:
      return state;
  }
}
