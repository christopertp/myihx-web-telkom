import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import IconButton from '../IconButton';
import Modal from '../Modal';
import styles from './styles.scoped.css';

export default function ModalLogin(props) {
  const { onClose, open } = props;
  return (
    <Modal className={styles.root} onClose={onClose} open={open}>
      <header>
        <img alt="login" src="/assets/grfx_login.svg" />
        <IconButton name="close_red" onClick={onClose} />
      </header>
      <h1>Login or Register to Continue</h1>
      <p>
        Login or create account to continue the purchase process.
        This will only take a few minutes
      </p>
      <footer>
        <Button to="/login" variant="bordered">Login</Button>
        <Button to="/register">Register</Button>
      </footer>
    </Modal>
  );
}

ModalLogin.defaultProps = {
  onClose: () => {},
  open: false,
};

ModalLogin.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
