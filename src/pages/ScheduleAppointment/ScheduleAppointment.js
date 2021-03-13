import React, { createContext, useContext, useEffect, useState } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import AppointmentDate from '../../components/elements/AppointmentDate';
import Button from '../../components/elements/Button';
import Card from '../../components/elements/Card';
import Heading from '../../components/elements/Heading';
import SectionPackage from '../../components/elements/InstallationPackageInfo';
import Modal from '../../components/elements/Modal';
import Spinner from '../../components/elements/Spinner';
import Timer from '../../components/elements/Timer';
import SectionContact from '../../components/fragments/ScheduleAppointmentContact';
import WhiteCardPlain from '../../components/layouts/WhiteCardPlain';
import WhiteCardSuccessPlain from '../../components/layouts/WhiteCardSuccessPlain';
import useTimer from '../../hooks/useTimer';
import { fetchDate, fetchInstallationInfo, fetchPost } from './actions';
import styles from './styles.scoped.css';

const Context = createContext({});

const TITLE = {
  installation: 'Schedule Installation',
  service: 'Schedule Service',
};

export default function ScheduleAppointment() {
  const history = useHistory();
  const { page, type } = useParams();
  const [modal, setModal] = useState('');
  const [payload, setPayload] = useState({ timeSlot: { date: '' } });

  useEffect(() => {
    if (!type) {
      history.replace('/');
    } else if (page) {
      history.replace(`/schedule-${type}`);
    }
  }, []);

  const contextValue = {
    modal, setModal,
    payload, setPayload,
  };

  return (
    <Context.Provider value={contextValue}>
      {(p => {
        return (p === 'success') ? <Success /> : <Schedule />;
      })(page)}
    </Context.Provider>
  );
}

export function Schedule() {
  const initTime = (10 * 60) - 1;
  const { modal, setModal, payload, setPayload } = useContext(Context);
  const { type } = useParams();
  const { address, date, isLoading, message, product } = useSelector(s => s.scheduleAppointment);
  const { setTimer, timer, time } = useTimer(initTime);
  const dispatch = useDispatch();
  const isInstallation = type === 'installation';
  const subtitle = 'Finish your schedule before the timer runs out to book a technician.';
  const btnDisabled = isLoading.s || !payload.bookingId;

  const payloadReducer = v => setPayload({ ...payload, ...v });

  const onRetry = () => {
    if (modal === 'timeout') {
      setTimer(initTime);
      dispatch(fetchDate(type));
    }
    setModal('');
  };

  const onSubmit = () => {
    dispatch(fetchPost(payload, type));
  };

  useEffect(() => {
    (isInstallation) && dispatch(fetchInstallationInfo());
    dispatch(fetchDate(type));
  }, []);

  useEffect(() => {
    (message === '404') && setModal('404');
  }, [message]);

  useEffect(() => {
    !timer && setModal('timeout');
  }, [timer]);

  return (
    <>
      <WhiteCardPlain back="/" subtitle={subtitle} title={TITLE[type]}>
        <Timer className={styles.timer} time={time} />
        {
          isInstallation
            ? <SectionPackage address={address} isLoading={isLoading.i} product={product} />
            : <IssueInfo />
        }
        <AppointmentDate
          className={styles.date}
          date={date}
          isLoading={isLoading.d}
          mini={!isInstallation}
          setPayload={payloadReducer}
        />
        <SectionContact data={payload.contactSecondary} open={modal === 'contact'} setModal={setModal} setPayload={payloadReducer} />
        {(message && message !== '404') && <small className={styles.error}>{message}</small>}
        <div className={styles.buttons}>
          <Button to="/" variant="bordered">Cancel</Button>
          <Button disabled={btnDisabled} onClick={onSubmit}>
            {isLoading.s ? <Spinner /> : 'Next'}
          </Button>
        </div>
      </WhiteCardPlain>
      <Modals onRetry={onRetry} />
    </>
  );
}

export function IssueInfo() {
  const { address, isLoading, issue } = useSelector(s => s.scheduleAppointment);
  const loading = <span className="loading" />;
  return (
    <>
      <section className={styles.issue}>
        <Heading>Issue Summary</Heading>
        <Card variant="hover">{isLoading.d ? loading : issue}</Card>
      </section>
      <section className={styles.address}>
        <Heading>Address</Heading>
        {isLoading.d ? loading : <p>{address}</p>}
      </section>
    </>
  );
}

export function Modals({ onRetry }) {
  const { modal } = useContext(Context);
  const { type } = useParams();
  return (
    <>
      <Modal className={styles['modal-timeout']} onClose={onRetry} open={modal === 'timeout'}>
        <h3>Session Time Out</h3>
        <p>
          Sorry, your session is expired.
          Retry and try to finish your schedule before the timer expires.
        </p>
        <Button onClick={onRetry}>Retry</Button>
      </Modal>
      <Modal className={styles['modal-404']} onClose={onRetry} open={modal === '404'}>
        <img alt="" src="/assets/grfx_warning.svg" />
        <h3>No {type} to be scheduled</h3>
        <Button to="/">Back to Home</Button>
      </Modal>
    </>
  );
}

Modals.propTypes = {
  onRetry: PropTypes.func.isRequired,
};

export function Success() {
  const { payload } = useContext(Context);
  const { type } = useParams();
  const { issueId } = useSelector(s => s.scheduleAppointment);

  const { date, slot } = payload.timeSlot;
  const title = `All set! Your ${type} is scheduled`;
  const subtitle = type === 'service' ? 'Our technician will visit you on' : 'Your IndiHome will be installed on';
  const cleanDate = type === 'service' ? date.split('-').reverse().join('-') : date;

  return (
    <WhiteCardSuccessPlain icon="success" subtitle={subtitle} title={title}>
      <div className={styles['success-date']}>
        <h3>{moment(cleanDate).format('dddd, D MMMM YYYY')}</h3>
        <p>Estimated arrival time {slot}</p>
      </div>
      {
        type === 'service' ?
          <Button to={`/issues/${issueId}`} variant="white">View Report Progress</Button> :
          <Button to="/">Back to Home</Button>
      }
    </WhiteCardSuccessPlain>
  );
}
