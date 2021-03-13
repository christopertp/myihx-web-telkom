import React, { createContext, useContext, useEffect, useState } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../Button';
import AppointmentDate from '../AppointmentDate';
import Modal from '../Modal';
import Spinner from '../Spinner';
import Timer from '../Timer';
import { AppContext } from '../../../contexts';
import useTimer from '../../../hooks/useTimer';
import styles from './styles.scoped.css';

const Context = createContext({});

export default function ModalReschedule(props) {
  const { onClose, open } = props;
  const [payload, setPayload] = useState(0);
  const [step, setStep] = useState(0);

  useEffect(() => {
    (!open) && setStep(0);
  }, [open]);

  if (!open) {
    return null;
  }

  const contextValue = {
    onClose,
    payload, setPayload,
    step, setStep,
  };

  return (
    <Modal className={styles.root} onClose={onClose} open>
      <Context.Provider value={contextValue}>
        {step ? <Confirm /> : <Reschedule />}
      </Context.Provider>
    </Modal>
  );
}

ModalReschedule.defaultProps = {
  onClose: () => { },
  open: false,
};

ModalReschedule.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};

export function Reschedule() {
  const initTime = (10 * 60) - 1;
  const { onClose, payload, setPayload, setStep } = useContext(Context);
  const dispatch = useDispatch();
  const { date, fetchRescheduleDate, isLoading } = useSelector(s => s.rescheduleInstallation);
  const { time } = useTimer(initTime);

  useEffect(() => {
    dispatch(fetchRescheduleDate());
  }, []);

  return (
    <>
      <Timer className={styles.timer} time={time} />
      <h1>Reschedule Installation</h1>
      <p>
        Select a new time and date.
        You only have 2 chance to reschedule your installation.
      </p>
      <AppointmentDate
        className={styles.date}
        date={date}
        isLoading={isLoading}
        setPayload={setPayload}
      />
      <footer>
        <Button onClick={onClose} variant="bordered">Cancel</Button>
        <Button disabled={!payload} onClick={() => setStep(1)}>Reschedule</Button>
      </footer>
    </>
  );
}

export function Confirm() {
  const { setOverlay } = useContext(AppContext);
  const { onClose, payload } = useContext(Context);
  const dispatch = useDispatch();
  const { fetchReschedule, isLoading, message } = useSelector(s => s.rescheduleInstallation);
  const { bookingId, timeSlot } = payload;
  const { date, slot } = timeSlot;

  const onSubmit = () => {
    dispatch(fetchReschedule({ bookingId, timeSlot }));
  };

  useEffect(() => {
    setOverlay(isLoading);
  }, [isLoading]);

  return (
    <>
      <h1 className={styles['confirm-title']}>Confirm Reschedule</h1>
      <p>Please confirm that you want to reschedule installation to</p>
      <div className={styles['confirm-date']}>
        <h3>{moment(date).format('dddd, D MMMM YYYY')}</h3>
        <p>Estimated arrival time {slot}</p>
      </div>
      <p>You only have 2 chances to reschedule your installation</p>
      {message && <small className={styles.error}>{message}</small>}
      <footer>
        <Button onClick={onClose} variant="bordered">Cancel</Button>
        <Button disabled={isLoading} onClick={onSubmit}>
          {isLoading ? <Spinner /> : 'Confirm'}
        </Button>
      </footer>
    </>
  );
}
