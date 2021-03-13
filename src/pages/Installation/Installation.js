import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Bullet from '../../components/elements/Bullet';
import Button from '../../components/elements/Button';
import Heading from '../../components/elements/Heading';
import SectionPackage from '../../components/elements/InstallationPackageInfo';
import Modal from '../../components/elements/Modal';
import ModalMaxReschedule from '../../components/elements/ModalMaxReschedule';
import ModalReschedule from '../../components/elements/ModalReschedule';
import ModalTechRating from '../../components/elements/ModalTechRating';
import InstallationSchedule from '../../components/fragments/InstallationSchedule';
import InstallationStatus from '../../components/fragments/InstallationStatus';
import InstallationTechnician from '../../components/fragments/InstallationTechnician';
import WhiteCardPlain from '../../components/layouts/WhiteCardPlain';
import WhiteCardSuccessPlain from '../../components/layouts/WhiteCardSuccessPlain';
import { NpsCodes, NpsContext } from '../../contexts';
import { fetchInstallationDetail, fetchNps, fetchNpsSubmit } from './actions';
import { GOOD_TO_KNOW } from './constants';
import styles from './styles.scoped.css';

const Context = createContext({});

export default function Installation() {
  const history = useHistory();
  const { page } = useParams();

  useEffect(() => {
    (page && page !== 'reschedule-success') && history.replace('/installation');
  }, []);

  const contextValue = {};

  return (
    <Context.Provider value={contextValue}>
      {(page === 'reschedule-success') ? <RescheduleSuccess /> : <Detail />}
    </Context.Provider>
  );
}

export function Detail() {
  const { NPS_TECH_INSTALL } = NpsCodes;
  const { showNps } = useContext(NpsContext);
  const dispatch = useDispatch();
  const { isLoading, message, npsMessage, questionnaires, rescheduleAttempt,
    technician } = useSelector(s => s.installation);
  const [modal, setModal] = useState('');
  const code = 'NPS-TECH-RATING';
  const maxReschedule = rescheduleAttempt >= 2 ? 'max-reschedule' : 'reschedule';

  useEffect(() => {
    dispatch(fetchInstallationDetail());
    dispatch(fetchNps());
  }, []);

  useEffect(() => {
    if (message === '404') {
      setModal('404');
    } else if (['OK', 'THANKS'].includes(npsMessage)) {
      setModal('');
      showNps(NPS_TECH_INSTALL);
    }
  }, [message,npsMessage]);

  const onSubmit = (feedback, rating) => {
    dispatch(fetchNpsSubmit(feedback, rating));
  };

  return (
    <>
      <WhiteCardPlain title="Appointment Detail">
        <InstallationSchedule onClick={() => setModal(maxReschedule)} />
        <Package />
        {technician ? (
          <section>
            <InstallationTechnician />
            <InstallationStatus />
          </section>
        ) : ''}
        <GoodToKnow />
        <footer className={styles.footer}>
          <h5>Need Help?</h5>
          <a href="tel:147">Contact Us</a>
        </footer>
      </WhiteCardPlain>
      <ModalReschedule onClose={() => setModal('')} open={modal === 'reschedule'} />
      <ModalMaxReschedule onClose={() => setModal('')} open={modal === 'max-reschedule'} />
      <Modal className={styles['modal-404']} open={modal === '404'}>
        <img alt="" src="/assets/grfx_warning.svg" />
        <h3>No installation found</h3>
        <Button to="/">Back to Home</Button>
      </Modal>
      <ModalTechRating
        code={code}
        isLoading={isLoading}
        message={npsMessage}
        onClose={() => setModal('')}
        onSubmit={onSubmit}
        open={modal === 'rating'}
        questionnaires={questionnaires[code]}
        technicianInfo={{ technician }}
      />
    </>
  );
}

export function Package() {
  const { address, isLoading, product, technician } = useSelector(s => s.installation);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const getHeight = c => (
    [...c].reduce((a, i) => {
      const style = window.getComputedStyle(i);
      const marginTop = style.getPropertyValue('margin-top').split('px')[0];
      const marginBottom = style.getPropertyValue('margin-bottom').split('px')[0];
      return a + i.offsetHeight + (marginBottom / 1) + (marginTop / 1);
    }, 0)
  );

  const height = (ref.current && ref.current.children) ? getHeight(ref.current.children) / 1 : 0;

  const onClickOpen = () => {
    setOpen(!open);
  };

  if (!technician) {
    return (
      <section className={styles.package}>
        <SectionPackage address={address} isLoading={isLoading.d} product={product} />
      </section>
    );
  } else {
    return (
      <section className={styles.package}>
        <article className={styles['package-article']} ref={ref} style={{ height: open ? height : 0 }}>
          <SectionPackage address={address} isLoading={isLoading.d} product={product} />
        </article>
        <Button onClick={onClickOpen} variant="text">
          {open ? 'Hide' : 'View'} Installation Detail
        </Button>
      </section>
    );
  }
}

export function RescheduleSuccess() {
  const { newDate, slot } = useSelector(s => s.rescheduleInstallation);
  const title = 'Reschedule Success!';
  const subtitle = 'Your new installation schedule is';
  return (
    <WhiteCardSuccessPlain icon="success" subtitle={subtitle} title={title}>
      <div className={styles['success-date']}>
        <h3>{moment(newDate).format('dddd, D MMMM YYYY')}</h3>
        <p>Estimated arrival time {slot}</p>
      </div>
      <Button to="/">Back to Home</Button>
    </WhiteCardSuccessPlain>
  );
}

export function GoodToKnow() {
  return (
    <section className={styles['good-to-know']}>
      <Heading>Good to know</Heading>
      <ul>
        {GOOD_TO_KNOW.map((item, idx) => (
          <li key={idx}>
            <Bullet color={['#ee3124', '']} size="0.5rem" />
            <p>{item}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
