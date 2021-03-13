import { ADDRESS_FETCHED, DATA_FETCHED, LOADING } from './constants';

const initialState = {
  address: '',
  isLoading: {
    a: true,
    p: true,
  },
  packages: [],
};

export default function reducer(state = initialState, action = {}) {
  const { type, address, isLoading, key, packages } = action;

  switch (type) {
    case ADDRESS_FETCHED:
      return {
        ...state,
        address,
        isLoading: { ...state.isLoading, a: false },
      };
    case DATA_FETCHED:
      return {
        ...state,
        isLoading: { ...state.isLoading, p: false },
        packages,
      };
    case LOADING:
      return {
        ...state,
        isLoading: { ...state.isLoading, [key.charAt(0)]: isLoading },
      };

    default:
      return state;
  }
}
