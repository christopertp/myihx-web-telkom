import { FAILED, FETCHED, LOADING } from './constants';

const initialState = {
  billingPeriod :  '',
  details : '',
  dueDate: '',
  isLoading: true,
  message: '',
  status: '',
  totalAmount: 0,
};

export default function reducer(state = initialState, action = {}) {
  const { type, billingPeriod, details, dueDate, isLoading, message, status, totalAmount } = action;

  switch (type) {
    case FAILED:
      return { ...state, isLoading: false, message };
    case FETCHED:
      return { ...state, isLoading: false, message: '', billingPeriod, details, dueDate, status, totalAmount };
    case LOADING:
      return { ...state, isLoading };
    default:
      return state;
  }
}
