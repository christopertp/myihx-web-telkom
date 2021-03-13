import { fetchConfirm } from './actions';
import { FAILED, FETCHED, LOADING } from './constants';

const initialState = {
  fetchConfirm,
  invalid: '',
  isLoading: true,
  message: '',
  form: {
    dateOfBirth: '',
    idNumber: '',
    motherName: '',
    type: '',
  },
  photos: {
    id: '',
    selfie: '',
    sign: '',
  },
  timeInSeconds: (24 * 60 * 60) - 1,
};

export default function reducer(state = initialState, action = {}) {
  const { type, data, isLoading, message } = action;

  switch (type) {
    case FAILED:
      return {
        ...state,
        isLoading: false,
        message,
      };
    case FETCHED:
      return {
        ...state,
        form: data ? {
          dateOfBirth: data.dateOfBirth,
          idNumber: data.idNumber,
          motherName: data.motherName,
          type: data.type,
        } : '',
        photos: data ? {
          id: data.identity,
          selfie: data.selfiWithId,
          sign: data.signature,
        } : '',
        isLoading: false,
        invalid: (data && data.validation) ? data.validation.invalidReason : '',
        message: '',
        timeInSeconds: data
          ? (initialState.timeInSeconds - data.timeInSeconds)
          : state.timeInSeconds,
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
