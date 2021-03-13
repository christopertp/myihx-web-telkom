import React, { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useHistory } from 'react-router-dom';
import ActivityCards from '../../components/elements/ActivityCards';
import Button from '../../components/elements/Button';
import IconButton from '../../components/elements/IconButton';
import Modal from '../../components/elements/Modal';
import ModalLogin from '../../components/elements/ModalLogin';
import ReportIssuesForm from '../../components/forms/HelpReportIssues';
import WhiteCardSuccessPlain from '../../components/layouts/WhiteCardSuccessPlain';
import Arrow from '../../components/icons/Arrow';
import { AppContext } from '../../contexts';
import { getToken } from '../../utils/storage';
import { fetchCreateTicket, fetchReportIssues, fetchResetModem, fetchStatusCard, fetchedAction } from './actions';
import styles from './styles.scoped.css';

const Context = createContext({});
const MODAL_REPORT_ISSUES = 'report-issues';

export default function Help() {
  const dispatch = useDispatch();
  const { page } = useParams();
  const [modal, setModal] = useState('');
  const closeModal = () => setModal('');
  const contextValue = {
    modal, setModal,
    closeModal
  };

  useEffect(() => {
    dispatch(fetchReportIssues('categories'));
    dispatch(fetchStatusCard());
  }, []);

  return(
    <Context.Provider value={contextValue}>
      {(page === 'reset-modem' && getToken()) ? <ResetModem /> : <MainHelp />}
      <Overlay />
    </Context.Provider>
  );
}

export function MainHelp() {
  const { modal, setModal, closeModal } = useContext(Context);
  const history = useHistory();
  const { activity } = useSelector(s => s.help).data;
  const cards = {
    description: activity.text,
    issueId: activity.issueId,
    status: `ASSURANCE_${activity.status}`,
    title: activity.title,
  };
  const isGuest = !getToken();

  const openReportIssues = () => {
    setModal(isGuest ? 'login' : MODAL_REPORT_ISSUES);
  };

  const openResetModem = () => {
    isGuest ? setModal('login') : history.push('/help/reset-modem');
  };

  return (
    <>
      <header className={styles.header}>
        <Link to="/">
          <Arrow fill="#000001" size={14} />
          Home
        </Link>
        <h1>Help</h1>
        <p>Having problems? Report your issue and our team will be there to help you</p>
        <Button onClick={openReportIssues}>Report Issues</Button>
        <Button onClick={openResetModem}>Reset Modem</Button>
      </header>
      <ActivityCards cards={cards} fullWidth heading="Your Active Ticket" />
      <Link className={styles['btn-report-issues']} onClick={openReportIssues} to="#">
        <img alt="" src="/assets/grfx_help.svg" />
        <span>Having problems? Report your issue and our team will be there to help you!</span>
        <small>Report Issues</small>
      </Link>
      <Link className={styles['btn-reset-modem']}
        onClick={openResetModem}
        to="#">
        <img alt="" src="/assets/grfx_acs.svg" />
        <span>Problem with your connection? Try resetting your modem</span>
        <small>Reset Modem</small>
      </Link>
      <ModalLogin onClose={closeModal} open={modal === 'login'} />
      <ModalReportIssues onClose={closeModal} open={modal === MODAL_REPORT_ISSUES} />
    </>
  );
}

export function ResetModem() {
  const dispatch = useDispatch();
  const { modal, setModal, closeModal } = useContext(Context);
  const { isLoading, data } = useSelector(s => s.help);
  const title = 'Reset Modem';
  const isOkay = data.reset === 'success';
  const isFailed = !['success', '417'].includes(data.reset);

  useEffect(() => {
    return () => dispatch(fetchedAction('', 'reset'));
  }, []);

  useEffect(() => {
    (!isFailed) && setModal('reset-result');
  }, [data.reset]);

  return (
    <>
      <WhiteCardSuccessPlain icon="acs" title={title}>
        <div className={styles['reset-modem']}>
          <p>If you're having issues with your connection, a modem reset may help.</p>
          <p>You will be disconnected from all IndiHome services for a few minutes.</p>
        </div>
        {isFailed && <small className={styles.error}>{data.reset}</small>}
        <Button disabled={isLoading.r} onClick={() => dispatch(fetchResetModem())}>
          { !isLoading.r ? 'reset modem' : 'Resetting... please wait'}
        </Button>
      </WhiteCardSuccessPlain>
      <Modal className={styles['modal-reset-result']} onClose={closeModal} open={modal === 'reset-result'}>
        <img src={`/assets/grfx_${isOkay ? 'check' : 'warning'}.svg`} />
        <h1>Reset Complete</h1>
        <p>Our System {isOkay ?
          'didn\'t find any problem in your connection' :
          'discovered a problem in your connection. Tap the button below to submit report.'
        }</p>
        <Button onClick={() => setModal(isOkay ? '' : MODAL_REPORT_ISSUES)}>
          {isOkay ? 'Great, Thanks' : 'Submit Report'}
        </Button>
      </Modal>
      <ModalReportIssues onClose={closeModal} open={modal === MODAL_REPORT_ISSUES} />
    </>
  );
}

export function ModalReportIssues(props) {
  const { onClose, open } = props;
  const dispatch = useDispatch();
  const onSubmit = v => {
    dispatch(fetchCreateTicket(v));
  };
  return (
    <Modal className={styles['modal-report-issues']} onClose={onClose} open={open}>
      <IconButton name="close_red" onClick={onClose} />
      <h1>Report Issues</h1>
      <p>
        We're sorry to hear that you're having difficulties.
        Report your issue here and our team will get in contact with you to fix it.
      </p>
      <ReportIssuesForm onSubmit={onSubmit} />
    </Modal>
  );
}

ModalReportIssues.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export function Overlay() {
  const { setOverlay } = useContext(AppContext);
  const { isLoading } = useSelector(s => s.help);

  useEffect(() => {
    setOverlay(isLoading.s);
  }, [isLoading.s]);

  return null;
}
