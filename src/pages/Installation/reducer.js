import { DETAIL_FETCHED, FAILED, LOADING, NPS_FETCHED, NPS_RESULT } from './constants';

const initialState = {
  address: '',
  isLoading: {
    d: true,
    n: false,
    s: false,
  },
  message: '',
  npsMessage: '',
  product: '',
  questionnaires: {},
  rescheduleAttempt: 0,
  schedule: '',
  technician: '',
};

export default function reducer(state = initialState, action = {}) {
  const { type, isLoading, address, message, npsMessage, key, product,
    rescheduleAttempt, schedule, technician, questionnaires } = action;

  switch (type) {
    case DETAIL_FETCHED:
      return {
        ...state,
        address,
        isLoading: { ...state.isLoading, d: false },
        product,
        rescheduleAttempt,
        schedule,
        technician,
      };
    case FAILED:
      return {
        ...state,
        message,
        isLoading: { ...state.isLoading, [key.charAt(0)]: false },
      };
    case LOADING:
      return {
        ...state,
        isLoading: { ...state.isLoading, [key.charAt(0)]: isLoading },
      };
    case NPS_FETCHED:
      return {
        ...state,
        isLoading: { ...state.isLoading, n: false },
        questionnaires: parseNpsQuestionnaires(questionnaires),
      };
    case NPS_RESULT:
      return {
        ...state,
        isLoading: { ...state.isLoading, s: false },
        npsMessage,
      };
    default:
      return state;
  }
}

function parseNpsQuestionnaires (val) {
  return val.reduce((questionnaires, quest) => {
    if (quest === null) {
      return questionnaires;
    }

    const { bookReserveId, isRepeat, scheduleType,
      scheduleValue, statements, timeLeft, questionnaireId } = quest;
    const questionnaire = statements.reduce((a, v) => {
      const { statementId, question } = v;
      const { values } = v.answers[0];

      return { ...a, [v.answers[0].label]: { question, values, statementId } };
    }, {});

    return {
      ...questionnaires,
      [quest.code]: {
        bookReserveId,
        isRepeat,
        scheduleType,
        scheduleValue,
        timeLeft,
        questionnaireId,
        ...questionnaire,
      },
    };
  }, {});
}
