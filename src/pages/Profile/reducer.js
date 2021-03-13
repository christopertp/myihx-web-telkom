import { fetchAboutPoint, fetchChangeEmail, fetchCheckMobile, fetchData, fetchSendOtpChangeMobile, fetchVerifyEmail, fetchVerifyMobile, resetMessage } from './actions';
import { ABOUTPOINT_FETCHED, CARD_FETCHED, DATA_FETCHED, FAILED, LOADING, TMONEY_FETCHED, REWARD_FETCHED } from './constants';

const initialState = {
  aboutPoint: '',
  address: '',
  card: '',
  dateOfBirth: '',
  email: '',
  fetchAboutPoint,
  fetchChangeEmail,
  fetchCheckMobile,
  fetchData,
  fetchSendOtpChangeMobile,
  fetchVerifyEmail,
  fetchVerifyMobile,
  fullName: '',
  gender: '',
  isLoading: { a: true, p: true, b: false, t: true, c: true },
  message: '',
  mobileNumber: '',
  profilePicture: '',
  resetMessage,
  tmoney: '',
  status: '',
  poin_total: '',
};

export default function reducer(state = initialState, action = {}) {
  const { type, aboutPoint, card, data, isLoading, key, message, tmoney } = action;

  switch (type) {
    case ABOUTPOINT_FETCHED: {
      return {
        ...state,
        aboutPoint,
        isLoading: { ...state.isLoading, a: false },
      };
    }
    case CARD_FETCHED:
      return {
        ...state,
        card,
        isLoading: { ...state.isLoading, c: false },
      };
    case REWARD_FETCHED:
      return {
        ...state,
        status: data.status,
        poin_total: data.poin_total,
        isLoading: { ...state.isLoading, c: false },
      };
    case DATA_FETCHED:
      return {
        ...state,
        address: data.address,
        dateOfBirth: data.dateOfBirth,
        email: data.email,
        fullName: data.fullName,
        gender: data.gender,
        isLoading: { ...state.isLoading, p: false },
        mobileNumber: data.mobileNumber,
        profilePicture: data.profilePicture,
      };
    case FAILED:
      return {
        ...state,
        isLoading: { ...state.isLoading, b: false },
        message,
      };
    case LOADING:
      return {
        ...state,
        isLoading: { ...state.isLoading, [key]: isLoading },
      };
    case TMONEY_FETCHED: {
      return {
        ...state,
        isLoading: { ...state.isLoading, t: false },
        tmoney,
      };
    }
    default:
      return state;
  }
}
