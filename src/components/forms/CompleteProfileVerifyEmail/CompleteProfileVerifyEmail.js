import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { useSelector } from 'react-redux';
import Button from '../../elements/Button';
import Spinner from '../../elements/Spinner';
import PasswordField from '../../fields/Password';
import useTimer from '../../../hooks/useTimer';
import styles from './styles.scoped.css';

export default function CompleteProfileVerifyEmail(props) {
  const initTime = 180;
  const { handleSubmit, invalid, message } = props;
  const { setTimer, time, timer } = useTimer(initTime);
  const min = time[1];
  const sec = time[2];
  const { isLoading } = useSelector((s) => s.completeProfile);

  const handleResend = () => {
    setTimer(initTime);
  };

  const inputProps = {
    label: 'EMAIL VERIFICATION CODE',
    placeholder: 'Enter the code sent to your email',
    maxLength: 6,
  };
  return (
    <form className={styles.root} onSubmit={handleSubmit}>
      <Field component={PasswordField} inputProps={inputProps} name="verificationCode" />
      {message && <small className={styles.error}>{message}</small>}
      {timer ? (
        <span>
          Resend Code In {min}:{sec}
        </span>
      ) : (
        <Button onClick={handleResend} type="button" variant="text">
          Resend
        </Button>
      )}
      <Button disabled={invalid || isLoading} type="submit">
        {isLoading ? <Spinner /> : 'Next'}
      </Button>
    </form>
  );
}

CompleteProfileVerifyEmail.defaultProps = {
  handleSubmit: () => {},
  invalid: false,
  message: '',
};

CompleteProfileVerifyEmail.propTypes = {
  handleSubmit: PropTypes.func,
  invalid: PropTypes.bool,
  message: PropTypes.string,
};
