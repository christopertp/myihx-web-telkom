import { npsGet, npsPost, npsUpdateTime } from '../services/nps';

export const NPS_FETCHED = 'Nps/nps-fetched';
export const NPS_LOADING = 'Nps/nps-loading';
export const NPS_RESULT = 'Nps/nps-result';

const initialState = {
  fetchNps,
  fetchNpsSubmit,
  isLoading: false,
  message: '',
  resultAction,
  updateFeedbackTimer,
  questionnaires: {},
};

export default function reducer(state = initialState, action = {}) {
  const { type,  isLoading, message, questionnaires } = action;

  switch (type) {
    case NPS_FETCHED:
      return {
        ...state,
        questionnaires: parseNpsQuestionnaires(questionnaires),
      };
    case NPS_LOADING:
      return {
        ...state,
        isLoading,
      };
    case NPS_RESULT:
      return {
        ...state,
        isLoading: false,
        message,
      };
    default:
      return state;
  }
}

export function fetchNps() {
  return async dispatch => {
    try {
      const { data } = await npsGet();
      dispatch(npsFetchedAction(data));
    } catch (err) {
      dispatch(resultAction(err.message));
    }
  };
}

export function fetchNpsSubmit(feedback, rating) {
  return async dispatch => {
    dispatch(loadingNps(true));
    try {
      await npsPost(feedback);
      rating && dispatch(resultAction(rating > 7 ? 'THANKS' : 'OK'));
      dispatch(fetchNps());
    } catch (err) {
      dispatch(resultAction(err.message));
    }
  };
}

export function updateFeedbackTimer(code, duration) {
  return async dispatch => {
    try {
      await npsUpdateTime(code, duration);
      dispatch(fetchNps());
    } catch (err) {
      dispatch(resultAction(err.message));
    }
  };
}

export function loadingNps(isLoading) {
  return { type: NPS_LOADING, isLoading };
}

export function npsFetchedAction(questionnaires) {
  return { type: NPS_FETCHED, questionnaires };
}

export function resultAction(message) {
  return { type: NPS_RESULT, message };
}

export function parseNpsQuestionnaires (val) {
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
