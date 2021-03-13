import { FAILED, FETCHED, LOADING, RESET } from './constants';

const initialState = {
  isLoading: true,
  message: '',
  payId: '',
  payDate: '',
  payTime: '',
  payLocation: '',
  payDetail: [],
  totalAmount: '',
};

export default function reducer(state = initialState, action = {}) {
  const { type, message, data, isLoading } = action;

  switch (type) {
    case FETCHED:
      return {
        ...state,
        isLoading: false,
        payId: data.opbel,
        payDate: data.paymentDate,
        payTime: data.paymentTime,
        payLocation: data.paymentLocation,
        payDetail: data.paymentDetail,
        totalAmount: data.totalAmount,
      };

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

    case RESET:
      return initialState;

    default:
      return state;
  }
}
