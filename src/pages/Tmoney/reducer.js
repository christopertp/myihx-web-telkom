import { CLEAR_DIALOG, FAILED, HISTORY_CLEAR, HISTORY_FETCHED, LOADING,
  PIN_FAILED, RESET_FINISHED, TRANSACTION_FAILED } from './constants';

const initialState = {
  balance: '',
  failedDialog: '',
  histories: [],
  historiesCompleted: false,
  isLoading: { d: false, o: false, s: false },
  message: '',
  pinMessage: '',
  resetFinished: false,
};

export default function reducer(state = initialState, action = {}) {
  const { type, balance, failedDialog, histories,
    isLoading, key, message, pinMessage, resetFinished } = action;

  switch (type) {
    case CLEAR_DIALOG:
      return {
        ...state,
        failedDialog: '',
      };
    case FAILED:
      return {
        ...state,
        message,
      };
    case HISTORY_CLEAR:
      return {
        ...state,
        histories: [],
        historiesCompleted: false,
      };
    case HISTORY_FETCHED:
      return {
        ...state,
        balance,
        histories: [ ...state.histories, ...histories ],
        historiesCompleted: histories.length < 10,
        isLoading: { ...state.isLoading, d: false },
      };
    case LOADING:
      return {
        ...state,
        isLoading: { ...state.isLoading, [key]: isLoading },
      };
    case PIN_FAILED:
      return {
        ...state,
        isLoading: { ...state.isLoading, s: false },
        pinMessage,
      };
    case RESET_FINISHED:
      return {
        ...state,
        isLoading: { ...state.isLoading, o: false, s: false },
        resetFinished,
      };
    case TRANSACTION_FAILED:
      return {
        ...state,
        failedDialog,
        isLoading: { ...state.isLoading, s: false },
      };
    default:
      return state;
  }
}
