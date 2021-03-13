import { fetchBankTransfer, fetchPaymentStatus, setMessageAction } from './actions';
import { BANK_FETCHED, COPIED, FAILED, FETCHED, LOADING, STATUS_FETCHED } from './constants';

const initialState = {
  amount: 0,
  bankInfo: '',
  codeBank: '',
  customer: '',
  deadline: '',
  detailBank: '',
  fetchBankTransfer,
  fetchPaymentStatus,
  loading: { p: true, b: true, s: true },
  message: '',
  methods: '',
  paymentCode: '',
  paymentType: '',
  paymentStatus: '',
  productInfo: '',
  setMessageAction,
  transactionId: '',
  totalDue: 0,
};

export default function reducer(state = initialState, action = {}) {
  const { type, amount, bankInfo, loading, key, message, methods,
    codeBank, paymentCode, detailBank, deadline, transactionId, productInfo,
    customer, paymentType, paymentStatus, totalDue } = action;

  switch (type) {
    case BANK_FETCHED:
      return { ...state, loading: { ...state.loading, b: false }, message:'', codeBank, paymentCode, detailBank, deadline, transactionId };
    case STATUS_FETCHED:
      return { ...state, loading: { ...state.loading, s: false }, message:'', productInfo, customer, deadline, paymentType, paymentStatus, totalDue };
    case COPIED:
      return { ...state, loading: { ...state.loading, b: false }, message };
    case FAILED:
      return { ...state, loading: { ...state.loading, p: false }, message };
    case FETCHED:
      return { ...state, loading: { ...state.loading, p: false }, message: '', amount, transactionId, bankInfo, methods, deadline };
    case LOADING:
      return { ...state, loading: { ...state.loading, [key]: loading } };
    default:
      return state;
  }
}
