import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import NpsPositiveResponse from '../components/elements/NpsPositiveResponse';
import NpsRating from '../components/elements/NpsRating';
import NpsReason from '../components/elements/NpsReason';
import { getToken, getSessionTime, setSessionTime } from '../utils/storage';

export const NpsContext = createContext({});

export const NpsCodes = {
  NPS_EXPLORE_SESSION: 'NPS-EXPLORE-SESSION',
  NPS_EXPLORE_USER: 'NPS-EXPLORE-USER',
  NPS_HELP_LOGIC: 'NPS-HELP-LOGIC',
  NPS_HELP_PHYSIC: 'NPS-HELP-PHYSIC',
  NPS_PAY: 'NPS-PAY',
  NPS_TECH_INSTALL: 'NPS-TECH-INSTALL',
  NPS_BUY_ADDON: 'NPS-BUY-ADDON',
  NPS_BUY_IH: 'NPS-BUY-IH',
  NPS_USE_INSTALL: 'NPS-USE-INSTALL',
};

export default function NpsContextProvider({ children }) {
  const [code, setCode] = useState('');
  const [rating, setRating] = useState(-1);
  const [step, setStep] = useState(-1);

  const dispatch = useDispatch();
  const { fetchNps, fetchNpsSubmit, message,
    questionnaires, resultAction } = useSelector(v => v.nps);
  const showNpsTimeBased = useShowNpsTimeBased();

  const dismissNps = () => {
    setStep(-1);
    setRating(-1);
  };

  const showNps = (code) => {
    if (!getToken() || !questionnaires[code]) {
      return;
    }
    dispatch(resultAction(''));
    setCode(code);
    setStep(0);
  };

  const skipNps = () => {
    const feedback = {
      code,
      deviceType: 'web',
      feedback: [
        {
          statementId: questionnaires[code].rating.statementId,
          type: 'scale',
          value: 0,
        },
      ],
      questionnaireId: questionnaires[code].questionnaireId,
    };

    dispatch(fetchNpsSubmit(feedback));
    setStep(-1);
    setRating(-1);
  };

  const submitNps = (reasons) => {
    const feedback = {
      code,
      deviceType: 'web',
      feedback: [
        {
          statementId: questionnaires[code].rating.statementId,
          type: 'scale',
          value: rating,
        },
        {
          statementId: questionnaires[code][rating > 7 ? 'positive' : 'negative'].statementId,
          type: 'checkbox',
          value: reasons,
        },
      ],
      questionnaireId: questionnaires[code].questionnaireId,
    };

    if (code === NpsCodes.NPS_USE_INSTALL) {
      feedback.bookReserveId = questionnaires[code].bookReserveId;
    }

    dispatch(fetchNpsSubmit(feedback, rating));
  };

  const submitRating = (rating) => {
    setRating(rating);
    setStep(1);
  };

  const value = { code, dismissNps, rating, showNps, skipNps, submitNps, submitRating };

  useEffect(() => {
    getToken() && dispatch(fetchNps());
  }, []);

  useEffect(() => {
    if (message === 'THANKS') {
      setStep(2);
    } else if (message === 'OK') {
      dismissNps();
    }
  }, [message]);

  useEffect(() => {
    showNpsTimeBased && showNps(showNpsTimeBased);
  }, [showNpsTimeBased]);

  return (
    <NpsContext.Provider value={value}>
      {children}
      {(s => {
        switch (s) {
          case 0: return <NpsRating />;
          case 1: return <NpsReason />;
          case 2: return <NpsPositiveResponse />;
          default: return null;
        }
      })(step)}
    </NpsContext.Provider>
  );
}

export function useNpsExplore() {
  const [sessionSeconds, setSessionSeconds] = useState(getSessionTime());
  const [show, setShow] = useState('');

  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { questionnaires, updateFeedbackTimer } = useSelector(v => v.nps);
  const { setStart, setTick, tick } = useStopwatch();

  const { NPS_EXPLORE_SESSION, NPS_EXPLORE_USER } = NpsCodes;

  useEffect(() => {
    const { NPS_EXPLORE_USER } = NpsCodes;
    const path = pathname.substr(1, pathname.length).split('/')[0];

    if (path === 'shop') {
      setStart(true);
      return;
    }

    if (questionnaires[NPS_EXPLORE_USER]) {
      dispatch(updateFeedbackTimer(NPS_EXPLORE_USER, tick));
    }

    if (questionnaires[NPS_EXPLORE_SESSION]) {
      setSessionSeconds(sessionSeconds + tick);
      setSessionTime(sessionSeconds + tick);
    }

    setTick(0);
    setStart(false);
  }, [pathname]);

  useEffect(() => {
    if (questionnaires[NPS_EXPLORE_USER] && questionnaires[NPS_EXPLORE_USER].timeLeft === null) {
      dispatch(updateFeedbackTimer(NPS_EXPLORE_USER, 0));
    }
  }, [questionnaires]);

  useEffect(() => {
    if (questionnaires[NPS_EXPLORE_USER]) {
      const { timeLeft } = questionnaires[NPS_EXPLORE_USER];
      if (timeLeft <= tick) {
        setShow(NPS_EXPLORE_USER);
      }
    }

    if (questionnaires[NPS_EXPLORE_SESSION]) {
      const { scheduleValue } = questionnaires[NPS_EXPLORE_SESSION];
      if (scheduleValue <= sessionSeconds + tick) {
        setShow(NPS_EXPLORE_SESSION);
      }
    }
  }, [tick]);

  return { show };
}

export function useNpsUseInstall() {
  const [show, setShow] = useState('');
  const { questionnaires } = useSelector(v => v.nps);

  const { NPS_USE_INSTALL } = NpsCodes;

  useEffect(() => {
    if (questionnaires[NPS_USE_INSTALL]) {
      setShow(NPS_USE_INSTALL);
    }
  }, [questionnaires]);

  return { show };
}

export function useShowNpsTimeBased() {
  const { show: showExplore } = useNpsExplore();
  const { show: showUseInstall } = useNpsUseInstall();

  if (showUseInstall) {
    return showUseInstall;
  } else if (showExplore) {
    return showExplore;
  }
  return '';
}

export function useStopwatch() {
  const [start, setStart] = useState(false);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const timeout = start ? setTimeout(() => setTick(tick + 1), 1000) : 0;
    return () => clearTimeout(timeout);
  }, [start, tick]);

  return { setStart, setTick, tick };
}

NpsContextProvider.defaultProps = {
  children: null,
};

NpsContextProvider.propTypes = {
  children: PropTypes.node,
};
