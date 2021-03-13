import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Button from '../../components/elements/Button';
import IconButton from '../../components/elements/IconButton';
import InputPin from '../../components/elements/InputPin';
import Modal from '../../components/elements/Modal';
import Spinner from '../../components/elements/Spinner';
import FormTmoneyActivate from '../../components/forms/TmoneyActivate';
import WhiteCardPlain from '../../components/layouts/WhiteCardPlain';
import { AppContext } from '../../contexts';
import { thousand } from '../../utils/format';
import {
  clearHistory, fetchChangePin, fetchHistory, fetchLink,
  fetchReset, fetchSignup, pinFailedAction, clearFailedDialog
} from './actions';
import styles from './styles.scoped.css';

const Context = createContext({});

export default function Tmoney() {
  const [reset, setReset] = useState(false);
  const { page } = useParams();

  const contextValue = {
    reset, setReset
  };

  return (
    <Context.Provider value={contextValue}>
      {(p => {
        switch (p) {
          case 'activate': return <Activate />;
          case 'change-pin': return <ChangePin />;
          case 'link': return <Link />;
          default: return <Home />;
        }
      })(page)}
      <Overlay />
      <ErrorModal />
      <Reset />
    </Context.Provider>
  );
}

export function Activate() {
  const dispatch = useDispatch();
  const subtitle = 'Create a new password to activate wallet';
  const title = 'Activate Wallet';

  const onSubmit = (v) => {
    dispatch(fetchSignup(v.password));
  };

  return (
    <WhiteCardPlain icon="wallet" size="medium" subtitle={subtitle} title={title}>
      <FormTmoneyActivate onSubmit={onSubmit} />
    </WhiteCardPlain>
  );
}

export function ChangePin() {
  const [attempt, setAttempt] = useState(3);
  const [newPin, setNewPin] = useState('');
  const [pin, setPin] = useState('');
  const [step, setStep] = useState(0);

  const { setReset } = useContext(Context);
  const dispatch = useDispatch();
  const { isLoading, pinMessage } = useSelector(s => s.tmoney);

  const onConfirm = confirmPin => {
    if (newPin !== confirmPin) {
      setStep(1);
      dispatch(pinFailedAction('New PIN and confirmation PIN do not match'));
      return;
    }
    dispatch(fetchChangePin(pin, newPin, confirmPin));
  };

  const onEnterNewPin = value => {
    setNewPin(value);
    setStep(2);
    dispatch(pinFailedAction(''));
  };

  const onEnterPin = value => {
    setPin(value);
    setStep(1);
    dispatch(pinFailedAction(''));
  };

  const details = [
    {
      icon: 'verify',
      title: 'Enter Wallet PIN',
      subtitle: 'Enter your previous Wallet PIN to change your PIN',
      onSubmit: onEnterPin,
    },
    {
      icon: 'verify',
      title: 'Create a new PIN',
      subtitle: 'Create a new PIN for your Wallet',
      onSubmit: onEnterNewPin,
    },
    {
      icon: 'password',
      title: 'Confirm your new PIN',
      subtitle: 'Confirm your new PIN',
      onSubmit: onConfirm,
    },
  ];

  useEffect(() => {
    if (pinMessage === 'Wrong PIN') {
      setStep(0);
      setAttempt(attempt - 1);
    }
  }, [pinMessage]);

  const { icon, title, subtitle, onSubmit } = details[step];
  const errorMessage = pinMessage === 'Wrong PIN' ?
    `Wrong PIN! You have ${attempt} attempt(s) left` : pinMessage;

  return (
    <WhiteCardPlain back="/tmoney" icon={icon} size="medium" subtitle={subtitle} title={title}>
      <div className={styles.change}>
        <InputPin disabled={isLoading.s} error={errorMessage} onSubmit={onSubmit} />
        <Button disabled={isLoading.s} onClick={() => setReset(true)} variant="text">
          {isLoading.s ? <Spinner color="#ee3124" /> : 'I Forgot My PIN'}
        </Button>
      </div>
    </WhiteCardPlain>
  );
}

export function ErrorModal() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { failedDialog } = useSelector(s => s.tmoney);
  const back = () => {
    dispatch(clearFailedDialog());
    history.push(failedDialog.to, failedDialog.notif);
  };
  return (
    <Modal className={styles.warning} onClose={back} open={!!failedDialog}>
      <img alt="warning" src="/assets/grfx_warning.svg" />
      <h1>{failedDialog.title}</h1>
      <p>{failedDialog.message}</p>
      <Button onClick={back}>OK</Button>
    </Modal>
  );
}

export function History() {
  const { histories } = useSelector(s => s.tmoney);
  return histories.map((v, i) => (
    <div className={styles.list} key={i}>
      <small>{moment(v.timestamp).format('DD MMMM YYYY hh:mm')}</small>
      <p>{v.transactionName}</p>
      <h3 className={v.amount < 0 ? styles.negative : styles.positive}>
        Rp{thousand(Math.abs(v.amount))}
      </h3>
    </div>
  ));
}

export function Home() {
  const [page, setPage] = useState(1);
  const { setReset } = useContext(Context);
  const dispatch = useDispatch();
  const history = useHistory();
  const prevY = useRef(0);
  const { balance, histories, historiesCompleted, isLoading } = useSelector(s => s.tmoney);

  const loadHistories = useCallback(page => {
    if (!historiesCompleted && !isLoading.d) {
      dispatch(fetchHistory(page));
      setPage(page + 1);
    }
  }, [historiesCompleted, isLoading.d, page]);

  useEffect(() => {
    loadHistories(page);
    return () => {
      dispatch(clearHistory());
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      const { y } = entry.boundingClientRect;
      if (prevY.current > y) {
        loadHistories(page);
      }
      prevY.current = y;
    }, { threshold: 0.2 });
    const target = document.getElementsByTagName('footer')[0];
    observer.observe(target);
    return () => {
      observer.unobserve(target);
    };
  }, [loadHistories]);

  return (
    <WhiteCardPlain back="/profile" size="medium">
      <div className={styles.home}>
        <h3>Saldo</h3>
        {isLoading.d && !balance ? <span className="loading" /> : <h2>Rp{thousand(balance)}</h2>}
        <section className={styles.buttons}>
          <IconButton name="saldo_reset" onClick={() => setReset(true)} />
          <span>Reset PIN</span>
          <IconButton name="saldo_change" onClick={() => history.push('/tmoney/change-pin')} />
          <span>Change PIN</span>
          <IconButton name="saldo_trf" onClick={() => history.push('/linkaja')} />
          <span>Transfer to LinkAja</span>
        </section>
        <h3>Balance History</h3>
        {histories.length ? <History /> : <NoHistory />}
        {isLoading.d ?
          <div className={styles.loading}>
            <span className="loading" />
            <span className="loading" />
            <span className="loading" />
          </div> : null
        }
      </div>
    </WhiteCardPlain>
  );
}

export function Link() {
  const { setReset } = useContext(Context);
  const dispatch = useDispatch();
  const { isLoading, pinMessage } = useSelector(s => s.tmoney);

  const subtitle = 'This will link your T-Money Account to Indihome wallet. Enter your T-Money PIN to authorize this transaction.';

  const onSubmit = (pin) => {
    dispatch(fetchLink(pin));
  };

  return (
    <WhiteCardPlain back="/profile" icon="verify" size="medium" subtitle={subtitle} title="Enter Wallet PIN">
      <div className={styles.change}>
        <InputPin disabled={isLoading.s} error={pinMessage} onSubmit={onSubmit} />
        <Button disabled={isLoading.s} onClick={() => setReset(true)} variant="text">
          {isLoading.s ? <Spinner color="#ee3124" /> : 'I Forgot My PIN'}
        </Button>
      </div>
    </WhiteCardPlain>
  );
}

export function NoHistory() {
  const { isLoading } = useSelector(s => s.tmoney);
  if (isLoading.d) {
    return null;
  }
  return (
    <>
      <img alt="blank_default" src="/assets/grfx_blank_default.svg" />
      <p>Your balance history will show here when you<br />have a Saldo Transaction</p>
    </>
  );
}

export function Overlay() {
  const { setOverlay } = useContext(AppContext);
  const { isLoading } = useSelector(s => s.tmoney);

  useEffect(() => {
    setOverlay(isLoading.o);
  }, [isLoading.o]);

  return null;
}

export function Reset() {
  const { reset, setReset } = useContext(Context);
  const dispatch = useDispatch();
  const { isLoading, resetFinished } = useSelector(s => s.tmoney);

  const onReset = () => {
    dispatch(fetchReset());
  };

  useEffect(() => {
    resetFinished && setReset(false);
  }, [resetFinished]);

  return (
    <Modal className={styles.dialog} onClose={() => setReset(false)} open={reset}>
      <h1>Reset PIN?</h1>
      <p>
        Are you sure you want to reset your PIN?
        Your new PIN will be sent to your email and mobile number
      </p>
      <div>
        <Button disabled={isLoading.s} onClick={() => setReset(false)} variant="bordered">No</Button>
        <Button disabled={isLoading.s} onClick={() => onReset()}>
          {isLoading.s ? <Spinner /> : 'Yes'}
        </Button>
      </div>
    </Modal>
  );
}
