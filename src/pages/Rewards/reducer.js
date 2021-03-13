import { COPIED, DETAIL_FETCHED, FETCHED_REWARDS, FETCHED_STPOINT, FAILED, FETCHED, LOADING, POPULAR_FETCHED, RECOMMEND_FILTER, REDEEM_FETCHED, SEARCH_FETCHED } from './constants';
import { fetchRewardDetail, fetchPopularSearch, fetchSearchRewards, fetchRedeemRewards, setMessageAction, recommendAction, fetchStatusPoint } from './actions';

const initialState = {
  dataDetail: '',
  dataPopular: '',
  dataSearch: '',
  dataRedeem: '',
  fetchPopularSearch,
  fetchRedeemRewards,
  fetchRewardDetail,
  fetchSearchRewards,
  fetchStatusPoint,
  isLoading: { b: true, d: true, f: true, p:true, r:true, re:true, s: true, st:true },
  message: '',
  rewards: '',
  rewardCategory: '',
  filteredRewards: '',
  recommendAction,
  selectedCategory: '',
  setMessageAction,
  statusPoin: '',
};

export default function reducer(state = initialState, action = {}) {
  const { type, message, category, data, dataDetail, dataPopular,
    dataSearch, dataRedeem, data_reward, stPoint, isLoading, key } = action;

  switch (type) {
    case COPIED:
      return {
        ...state,
        isLoading: { ...state.isLoading, d: false },
        message,
      };

    case DETAIL_FETCHED:
      return {
        ...state,
        isLoading: { ...state.isLoading, d: false },
        message: '',
        dataDetail,
      };

    case POPULAR_FETCHED:
      return {
        ...state,
        isLoading: { ...state.isLoading, p: false },
        message: '',
        dataPopular,
      };

    case REDEEM_FETCHED:
      return {
        ...state,
        isLoading: { ...state.isLoading, re: false },
        message: '',
        dataRedeem,
      };

    case SEARCH_FETCHED:
      return {
        ...state,
        isLoading: { ...state.isLoading, s: false },
        message: '',
        dataSearch,
      };

    case FETCHED: {
      const rewards = data.listRewards.map((i) => {
        return {
          'id': i.id,
          'image': i.picture,
          'is_recommended': i.is_recommended,
        };
      });

      return {
        ...state,
        isLoading: { ...state.isLoading, b: false },
        rewards,
        rewardCategory: data.category,
        selectedCategory: '',
      };
    }

    case FETCHED_REWARDS: {
      const filteredRwd = data_reward.map((i) => {
        return { 'id': i.id, 'image': i.picture, };
      });

      return {
        ...state,
        isLoading: { ...state.isLoading, b: false },
        filteredRewards: filteredRwd,
        selectedCategory: category,
      };
    }

    case RECOMMEND_FILTER: {
      const filteredRewards = state.rewards.filter((i) => {
        return i.is_recommended === '1';
      });

      return {
        ...state,
        filteredRewards,
        selectedCategory: 'RECOMMENDED',
      };
    }

    case FETCHED_STPOINT:
      return {
        ...state,
        isLoading: { ...state.isLoading, st: false },
        statusPoin: stPoint,
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

    default:
      return state;
  }
}
