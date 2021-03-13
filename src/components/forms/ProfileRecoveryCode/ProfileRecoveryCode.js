import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Field } from 'redux-form';
import Button from '../../elements/Button';
import Spinner from '../../elements/Spinner';
import PasswordField from '../../fields/Password';
import useTimer from '../../../hooks/useTimer';
import styles from './styles.scoped.css';

export default function ProfileRecoveryCode(props) {
  const initTime = 59;
  const { onResend, handleSubmit, invalid } = props;
  const { isLoading } = useSelector(s => s.profile);
  const { setTimer, timer, time } = useTimer(initTime);
  const min = time[1];
  const sec = time[2];
  const inputProps = {
    label: 'Recovery Code',
    placeholder: 'Enter Recovery Code',
  };

  const handleResend = () => {
    onResend();
    setTimer(initTime);
  };

  return (
    <form className={styles.root} onSubmit={handleSubmit}>
      <Field component={PasswordField} inputProps={inputProps} name="recoveryCode" />
      {timer ?
        <p className={styles['verify-timer']}>Kirim ulang kode dalam {min}:{sec}</p> :
        <Button className={styles['verify-resend']} onClick={handleResend} variant="text">Kirim ulang kode</Button>
      }
      <Button disabled={invalid || isLoading.b} type="submit">
        {isLoading.b ? <Spinner /> : 'Next'}
      </Button>
    </form>
  );
}

ProfileRecoveryCode.defaultProps = {
  handleSubmit: () => {},
  invalid: false,
  onResend: () => {},
};

ProfileRecoveryCode.propTypes = {
  handleSubmit: PropTypes.func,
  invalid: PropTypes.bool,
  onResend: PropTypes.func,
};
