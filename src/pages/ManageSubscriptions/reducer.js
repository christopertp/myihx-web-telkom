import { fetchData, fetchSubmit } from './actions';
import { LOADING, FAILED, DATA_FETCHED } from './constants';

const initialState = {
  fetchData,
  fetchSubmit,
  isLoading: {
    d: false,
    s: false,
  },
  message: '',
  subscriptions: [],
  movin: [],
  wifiId: {
    username: '',
    password: '',
    deviceList: [],
    guide: [],
  },
};

export default function reducer(state = initialState, action = {}) {
  const { type, isLoading, message, data, key } = action;

  switch (type) {
    case FAILED:
      return {
        ...state,
        isLoading: { ...state.isLoading, [key]: false },
        message,
      };
    case LOADING:
      return {
        ...state,
        isLoading: { ...state.isLoading, [key]: isLoading },
      };
    case DATA_FETCHED:
      return {
        ...state,
        isLoading: { ...state.isLoading, [key]: false, s: false },
        message: '',
        ...data,
      };
    default:
      return state;
  }
}
