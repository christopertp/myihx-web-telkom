import { DATA_FETCHED, LOADING } from './constants';

const initialState = {
  isLoading: true,
  logoImage: '',
  hboShows: [],
  aboutTheServices: '',
  benefits: [],
  popularDrama: [],
  thrillingAction: [],
  howToUse: []
};

export default function reducer(state = initialState, action = {}) {
  const { type, isLoading, logoImage, hboShows, aboutTheServices, benefits,
    popularDrama, thrillingAction, howToUse } = action;

  switch (type) {
    case DATA_FETCHED:
      return {
        ...state,
        isLoading: false,
        logoImage,
        hboShows,
        aboutTheServices,
        benefits,
        popularDrama,
        thrillingAction,
        howToUse
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
