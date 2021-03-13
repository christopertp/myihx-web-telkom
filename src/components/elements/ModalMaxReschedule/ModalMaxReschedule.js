import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import Modal from '../Modal';
import styles from './styles.scoped.css';

export default function ModalMaxReschedule(props) {
  const { onClose, open } = props;

  return (
    <Modal className={styles.root} onClose={onClose} open={open}>
      <img alt="Maximum attempt" src="/assets/grfx_status_failed.svg" />
      <h2>Sorry, you can’t reschedule anymore</h2>
      <p>
        You have exceeded reschedule installation limit.
        Please contact our customer service for further information.
      </p>
      <Button onClick={onClose}>Close</Button>
      <a href="tel:147">Contact Us</a>
    </Modal>
  );
}

ModalMaxReschedule.defaultProps = {
  onClose: () => { },
  open: false,
};

ModalMaxReschedule.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
