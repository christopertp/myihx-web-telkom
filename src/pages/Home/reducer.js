import { BILL_FETCHED, CARD_FETCHED, DATA_FETCHED, LOADING, NOTIF_FETCHED, PROFILE_FETCHED } from './constants';

const initialState = {
  bill: '',
  card: {},
  fullName: '',
  isLoading: { b: false, c: true, h: true, n: true, p: true },
  latestNews: [],
  latestOffers: [],
  notif: {},
  profilePicture: '',
  subscriptions: '',
};

export default function reducer(state = initialState, action = {}) {
  const { type, bill, card, fullName, isLoading, key,
    latestNews, latestOffers, profilePicture, subscriptions, notif } = action;

  switch (type) {
    case BILL_FETCHED:
      return {
        ...state,
        bill,
        isLoading: { ...state.isLoading, b: false },
      };
    case CARD_FETCHED:
      return {
        ...state,
        card,
        isLoading: { ...state.isLoading, c: false },
      };
    case DATA_FETCHED:
      return {
        ...state,
        isLoading: { ...state.isLoading, h: false },
        latestNews,
        latestOffers,
        subscriptions,
      };
    case LOADING:
      return {
        ...state,
        isLoading: { ...state.isLoading, [key]: isLoading },
      };
    case NOTIF_FETCHED:
      return {
        ...state,
        notif,
        isLoading: { ...state.isLoading, n: false },
      };
    case PROFILE_FETCHED:
      return {
        ...state,
        fullName,
        isLoading: { ...state.isLoading, p: false },
        profilePicture,
      };
    default:
      return state;
  }
}
