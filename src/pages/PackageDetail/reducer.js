import { FAILED, FETCHED, LOADING, RESET } from './constants';

const initialState = {
  isLoading: {
    data: true,
    submit: false,
  },
  code: '',
  data: {
    channels: [],
    channelsByCat: {},
    hooq: [],
    iflix: [],
    productInfo: [],
  },
};

export default function reducer(state = initialState, action = {}) {
  const { type, code, data, isLoading, key } = action;

  switch (type) {
    case FETCHED:
      return {
        ...state,
        isLoading: { ...state.isLoading, data: false },
        data: data ? {
          ...data,
          channelsByCat: mapChannels(data.channels),
        } : '',
      };
    case FAILED:
      return {
        ...state,
        code,
        isLoading: { ...state.isLoading, data: false },
      };
    case LOADING:
      return {
        ...state,
        isLoading: {
          ...state.isLoading, [key]: isLoading,
        },
      };
    case RESET:
      return initialState;
    default:
      return state;
  }
}

export function mapChannels(data) {
  return data.reduce((acc, i) => {
    const cat = acc[i.category];
    if (!cat) {
      acc[i.category] = [i];
    } else {
      acc[i.category].push(i);
    }
    return acc;
  }, {});
}
