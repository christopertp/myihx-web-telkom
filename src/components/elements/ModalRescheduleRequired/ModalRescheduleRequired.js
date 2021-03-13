import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import Modal from '../Modal';
import ModalReschedule from '../ModalReschedule';
import styles from './styles.scoped.css';

export default function ModalRescheduleRequired() {
  const [open, setModal] = useState('');

  return (
    <>
      <button onClick={() => setModal('open')}>click me</button>
      <Modal className={styles.root} onClose={() => setModal('')} open={open === 'open'} >
        <img alt="" src="/assets/grfx_wifi.svg" />
        <h1>Are you available for the new schedule?</h1>
        <p>Our technician can come on</p>
        <nav className={styles.panel}>
          <h4>Tuesday, 23 July 2020</h4>
          <p>Estimated arrival time 07:00</p>
          <span />
          <p>Previously, you are scheduled for Tuesday, 23 July 2019 at 13:00</p>
        </nav>
        <footer className={styles.action}>
          <Button
            onClick={() => setModal('openReschedule')}
            variant="bordered"
          >No</Button>
          <Button onClick={() => setModal('openConfirmation')} >Yes</Button>
        </footer>
      </Modal>
      <Confirmation
        onClose={() => setModal('')}
        open={open === 'openConfirmation'}
      />
      <ModalReschedule onClose={() => setModal('')} open={open === 'openReschedule'} />
    </>
  );
}

export function Confirmation(props) {
  return (
    <Modal className={styles.confirmation} {...props} >
      <h2>Confirm Reschedule</h2>
      <p>Please confirm that you want to reschedule installation to</p>
      <nav className={styles.panel}>
        <h4>Tuesday, 23 July 2020</h4>
        <p>Estimated arrival time 07:00</p>
      </nav>
      <footer className={styles.action}>
        <Button
          onClick={props.onClose}
          variant="bordered"
        >Cancel</Button>
        <Button>Yes</Button>
      </footer>
    </Modal>
  );
}

Confirmation.defaultProps = {
  onClose: () => {},
  open: false,
};

Confirmation.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
