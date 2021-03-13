import { CATEGORY_DETAIL_FETCHED, DATA_FETCHED, FAILED, LOADING, RESET } from './constants';

const initialState = {
  benefitCategory: {
    imageCategory: {},
    specialBenefit: [],
  },
  benefitInfo: [],
  categoryList: [],
  isLoading: {
    l: true,
    d: true,
  },
  message: '',
  product: [],
  termsCategory: [],
};

export default function reducer(state = initialState, action = {}) {
  const { categoryDetail, categoryList, isLoading, key, message, type } = action;

  switch (type) {
    case CATEGORY_DETAIL_FETCHED:
      return {
        ...state,
        benefitCategory: categoryDetail.benefitCategory,
        benefitInfo: categoryDetail.benefitInfo,
        product: categoryDetail.product,
        termsCategory: categoryDetail.termsCategory,
        isLoading: { ...state.isLoading, d: false },
      };
    case DATA_FETCHED:
      return {
        ...state,
        categoryList,
        isLoading: { ...state.isLoading, l: false },
      };
    case FAILED:
      return {
        ...state,
        isLoading: false,
        message,
      };
    case LOADING:
      return {
        ...state,
        isLoading: { ...state.isLoading, [key]: isLoading } ,
      };
    case RESET:
      return initialState;

    default:
      return state;
  }
}
