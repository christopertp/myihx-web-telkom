import {
  COPIED,
  DETAIL_FETCHED,
  FAILED,
  FETCHED,
  FETCHED_REWARDS,
  // FETCHED_STPOINT,
  LOADING,
  POPULAR_FETCHED,
  RECOMMEND_FILTER,
  REDEEM_FETCHED,
  SEARCH_FETCHED
} from './constants';
import {
  getRewardDetail,
  getSearch,
  getPopularSearch,
  postRedeem,
  rewardsList,
  rewardsListCategory,
  // statusPoint,
} from '../../services/rewards';
import { push } from 'react-router-redux';

export function fetchRewardsList() {
  return async dispatch => {
    dispatch(loadingAction(true, 'b'));
    try {
      const { data } = await rewardsList();
      dispatch(fetchedAction(data));
    } catch (err) {
      dispatch(failedAction(err.message));
    }
  };
}

export function fetchRewardsListCategory(category) {
  return async dispatch => {
    dispatch(loadingAction(true, 'b'));
    try {
      const { data } = await rewardsListCategory(category);
      const { listRewards } = data;
      dispatch(fetchedRewardsCategoryList(listRewards ? listRewards : [], category));
    } catch (err) {
      dispatch(failedAction(err.message));
    }
  };
}

export function fetchRewardDetail(id) {
  return async dispatch => {
    dispatch(loadingAction(true, 'd'));
    try {
      const { data } = await getRewardDetail(id);
      dispatch(fetchedDetailAction(data));
    } catch (err) {
      dispatch(failedAction(err.message));
    }
  };
}

export function fetchRedeemRewards(id, redeemKey) {
  return async dispatch => {
    dispatch(loadingAction(true, 're'));
    try {
      const { data } = await postRedeem(parseInt(id), redeemKey);
      const { trxid } = data;
      dispatch(fetchRedeemAction(trxid));
      dispatch(push(`/rewards/detail/${id}`));
      dispatch(setMessageAction('Point redeeemed succesfully'));
    } catch (err) {
      dispatch(failedAction(`${err.message}---#ee4c24`));
    }
  };
}

export function fetchSearchRewards(value) {
  return async dispatch => {
    dispatch(loadingAction(true, 's'));
    try {
      const { data } = await getSearch(value);
      dispatch(fetchedSearchAction(data));
    } catch (err) {
      dispatch(failedAction(err.message));
      dispatch(fetchedSearchAction(''));
    }
  };
}

export function fetchPopularSearch() {
  return async dispatch => {
    dispatch(loadingAction(true, 'p'));
    try {
      const { data } = await getPopularSearch();
      const { keyword } = data;
      dispatch(fetchedPopularSearchAction(keyword));
    } catch (err) {
      dispatch(failedAction(err.message));
    }
  };
}

export function fetchStatusPoint() {
  return async dispatch => {
    dispatch(loadingAction(true, 'st'));
    try {
      // const { data } = await statusPoint();
      // dispatch(fetchedStatusPoint(data));
    } catch (err) {
      dispatch(failedAction(err.message));
    }
  };
}

export function setMessageAction(message) {
  return { type: COPIED, message };
}

export function recommendAction() {
  return { type: RECOMMEND_FILTER };
}

function loadingAction(isLoading, key) {
  return { type: LOADING, isLoading, key };
}

function fetchedDetailAction(dataDetail) {
  return { type: DETAIL_FETCHED, dataDetail };
}

function fetchRedeemAction(dataRedeem) {
  return { type: REDEEM_FETCHED, dataRedeem };
}

function fetchedSearchAction(dataSearch) {
  return { type: SEARCH_FETCHED, dataSearch };
}

function fetchedPopularSearchAction(dataPopular) {
  return { type: POPULAR_FETCHED, dataPopular };
}

function fetchedAction(data) {
  return { type: FETCHED, data };
}

function fetchedRewardsCategoryList(data_reward, category) {
  return { type: FETCHED_REWARDS, data_reward, category };
}

// function fetchedStatusPoint(stPoint) {
//   return { type: FETCHED_STPOINT, stPoint };
// }

function failedAction(message) {
  return { type: FAILED, message };
}
