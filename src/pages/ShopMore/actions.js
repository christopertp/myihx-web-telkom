import { hboGo } from '../../services/product';
import { DATA_FETCHED, LOADING } from './constants';

export function fetchHboGo() {
  return async dispatch => {
    dispatch(loadingAction(true));
    try {
      const { data } = await hboGo();
      const { logoImage, hboShows, aboutTheServices, benefits,
        popularDrama, thrillingAction, howToUse } = data;
      dispatch(dataFetchedAction(logoImage, hboShows, aboutTheServices,
        benefits, popularDrama, thrillingAction, howToUse));
    } catch (err) {
      dispatch(loadingAction(false));
    }
  };
}

function dataFetchedAction(logoImage, hboShows, aboutTheServices, benefits,
  popularDrama, thrillingAction, howToUse) {
  return { type: DATA_FETCHED, logoImage, hboShows, aboutTheServices, benefits,
    popularDrama, thrillingAction, howToUse };
}

function loadingAction(isLoading) {
  return { type: LOADING, isLoading };
}
