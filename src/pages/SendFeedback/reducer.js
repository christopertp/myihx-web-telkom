import { fetchData, fetchSendFeedback } from './actions';
import { DATA_FETCHED, FAILED, LOADING } from './constants';

const initialState = {
  fetchData,
  fetchSendFeedback,
  topic: [],
  isLoading: {
    t: true,
    s: false,
  },
  message: '',
};

export default function reducer(state = initialState, action = {}) {
  const { type, topic, isLoading, message, key } = action;
  switch (type) {
    case DATA_FETCHED:
      return {
        ...state,
        topic: topic.map(i => ({ value: i.topicId, text: i.topicName })),
        isLoading: { ...state.isLoading, t: false },
      };
    case FAILED:
      return {
        ...state,
        isLoading: { ...state.isLoading, [key.charAt(0)]: false },
        message,
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
