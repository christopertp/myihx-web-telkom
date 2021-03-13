import { packageCategory, packageDetail } from '../../services/product';
import { CATEGORY_DETAIL_FETCHED, DATA_FETCHED, FAILED, LOADING, RESET } from './constants';

export function fetchPackageCategory() {
  return async dispatch => {
    dispatch(loadingAction(true, 'l'));
    try {
      const { data } = await packageCategory();
      dispatch(allCategoryFetchedAction(data));
    } catch (e) {
      dispatch(allCategoryFetchedAction([]));
    }
  };
}

export function fetchpackageDetail(packageName) {
  return async dispatch => {
    dispatch(loadingAction(true, 'd'));
    try {
      const { data } = await packageDetail(packageName);
      dispatch(categoryDetailFetchedAction(data));
    } catch (e) {
      dispatch(failedAction(e.message));
    }
  };
}

function loadingAction(isLoading, key) {
  return { type: LOADING, isLoading, key };
}
function allCategoryFetchedAction(categoryList) {
  return { type: DATA_FETCHED, categoryList };
}
function categoryDetailFetchedAction(categoryDetail) {
  return { type: CATEGORY_DETAIL_FETCHED, categoryDetail };
}
function failedAction(message) {
  return { type: FAILED, message };
}
export function resetData() {
  return { type: RESET };
}
