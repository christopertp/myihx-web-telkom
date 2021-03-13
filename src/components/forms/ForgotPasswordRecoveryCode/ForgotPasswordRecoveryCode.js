import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Field } from 'redux-form';
import Button from '../../elements/Button';
import Spinner from '../../elements/Spinner';
import PasswordField from '../../fields/Password';
import styles from './styles.scoped.css';

export default function ForgotPasswordRecoveryCode(props) {
  const { handleSubmit, invalid } = props;
  const { isLoading } = useSelector(s => s.forgotPassword);
  const inputProps = {
    label: 'RECOVERY CODE',
    placeholder: 'Enter recovery code',
  };

  return (
    <form className={styles.root} onSubmit={handleSubmit}>
      <Field component={PasswordField} inputProps={inputProps} name="code" />
      <Button disabled={invalid || isLoading} type="submit">
        {isLoading ? <Spinner /> : 'Next'}
      </Button>
    </form>
  );
}

ForgotPasswordRecoveryCode.defaultProps = {
  handleSubmit: () => {},
  invalid: false,
};

ForgotPasswordRecoveryCode.propTypes = {
  handleSubmit: PropTypes.func,
  invalid: PropTypes.bool,
};
