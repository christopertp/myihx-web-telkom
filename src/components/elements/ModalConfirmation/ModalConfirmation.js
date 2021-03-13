import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import Modal from '../Modal';
import styles from './styles.scoped.css';

export default function ModalConfirmation(props) {
  const { onClose, open, onAccept, onRefuse, title, subtitle, reverseBtn } = props;
  return (
    <Modal className={styles.root} onClose={onClose} open={open}>
      <h1>{title}</h1>
      <p>{subtitle}</p>
      {reverseBtn ? (
        <footer>
          <Button onClick={onRefuse} variant="bordered">
            No
          </Button>
          <Button onClick={onAccept}>Yes</Button>
        </footer>
      ) : (
        <footer>
          <Button onClick={onAccept} variant="bordered">
            Yes
          </Button>
          <Button onClick={onRefuse}>No</Button>
        </footer>
      )}
    </Modal>
  );
}

ModalConfirmation.defaultProps = {
  onAccept: () => {},
  onClose: () => {},
  onRefuse: () => {},
  open: false,
  reverseBtn: false,
  subtitle: '',
  title: '',
};

ModalConfirmation.propTypes = {
  onAccept: PropTypes.func,
  onClose: PropTypes.func,
  onRefuse: PropTypes.func,
  open: PropTypes.bool,
  reverseBtn: PropTypes.bool,
  subtitle: PropTypes.string,
  title: PropTypes.string,
};
