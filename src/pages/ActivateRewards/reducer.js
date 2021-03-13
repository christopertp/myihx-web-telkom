import { FAILED, FETCHED, LOADING, RESET, STATUS, USER, COUNTER } from './constants';

const initialState = {
  isLoading: true,
  message: '',
  status: '',
  mobileNumber: '',
  deadlineOTP: 0,
  terms: '',
  category: [],
  countOTP: 2,
  isActivated: '',
};

export default function reducer(state = initialState, action = {}) {
  const { type, message, data, isLoading } = action;

  switch (type) {
    case FETCHED:
      return {
        ...state,
        status: data.status,
        isLoading: false,
        deadlineOTP: data.deadlineOTP,
      };

    case STATUS: {
      let listCategory = [];
      if (data?.category.length > 0) {
        listCategory = data?.category.map(e => {
          return {
            ...e,
            terms: data.terms,
            isActivated: data?.status,
          };
        });
      }
      return {
        ...state,
        isLoading: false,
        terms: data.terms,
        isActivated: data?.status,
        category: listCategory,
      };
    }

    case FAILED:
      return {
        ...state,
        isLoading: false,
        message,
      };

    case LOADING:
      return {
        ...state,
        isLoading,
      };

    case USER:
      return {
        ...state,
        mobileNumber: data?.mobileNumber,
      };

    case COUNTER:
      if (data.verifyAttempt < 0) {
        return {
          ...state,
          message: 'Too Many wrong attempts, please try again in 1 hour',
          countOTP: -1,
        };
      } else {
        return {
          ...state,
          message: `Wrong code! You have ${data.verifyAttempt} attempt(s) left`,
          countOTP: data.verifyAttempt,
        };
      }

    case RESET:
      return initialState;

    default:
      return state;
  }
}
