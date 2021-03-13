import { COMMENT_POSTED, COMMENTS_FETCHED, FAILED, FETCHED, LOADING, SET_STEP } from './constants';

const initialState = {
  address: '',
  comments: [],
  schedule: {
    date: '',
    slot: '',
  },
  isLoading: {
    c: true,
    d: true,
    p: false,
  },
  message: '',
  step: 0,
  summary: '',
  technician: {
    name: '',
    tel: '',
  },
};

export default function reducer(state = initialState, action = {}) {
  const { type, comment, comments, data, isLoading, key, message, step } = action;

  switch (type) {
    case COMMENT_POSTED:
      return {
        ...state,
        comments: [comment, ...state.comments],
        isLoading: { ...state.isLoading, p: false },
        message: '',
      };
    case COMMENTS_FETCHED:
      return {
        ...state,
        comments,
        isLoading: { ...state.isLoading, c: false },
        message: '',
      };
    case FAILED:
      return {
        ...state,
        isLoading: { ...state.isLoading, [key.charAt(0)]: false },
        message,
      };
    case FETCHED:
      return {
        ...state,
        ...mapData(data),
        isLoading: { ...state.isLoading, d: false },
        message: '',
      };
    case LOADING:
      return {
        ...state,
        isLoading: { ...state.isLoading, [key.charAt(0)]: isLoading },
      };
    case SET_STEP:
      return {
        ...state,
        step,
      };
    default:
      return state;
  }
}

export function mapData(data) {
  const type = data.type?.toLowerCase();
  const STATUS = {
    fisik: ['SUBMITTED', 'ASSIGNED', 'IN_PROGRESS', 'COMPLETED', 'RESOLVED'],
    logic: ['RECEIVED', 'IN_PROGRESS', 'COMPLETED', 'RESOLVED'],
  };
  const address = data.address;
  const schedule = {
    date: data.schedule?.timeSlot?.date?.split('-').reverse().join('-'),
    slot: data.schedule?.timeSlot?.slot,
  };
  const step = STATUS[type].indexOf(data.progress.status);
  const summary = data.issueSummary?.id;
  const technician = {
    name: step < 1 ? '' : data.technician?.displayName,
    status: (() => {
      if (step > 2) {
        return 'Repair complete';
      } else if (step === 2) {
        return 'Repair in progress';
      }
      return 'On the way';
    })(),
    tel: data.technician?.phone,
  };
  return {
    address,
    schedule,
    step,
    summary,
    technician,
    type,
  };
}
