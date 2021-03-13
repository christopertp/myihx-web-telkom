import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Field } from 'redux-form';
import Button from '../../elements/Button';
import Spinner from '../../elements/Spinner';
import PasswordField from '../../fields/Password';
import styles from './styles.scoped.css';

export default function ForgotPasswordNew(props) {
  const { handleSubmit, invalid } = props;
  const { isLoading } = useSelector(s => s.forgotPassword);
  const inputProps = {
    label: 'NEW PASSWORD',
    placeholder: 'Enter your new password',
  };

  return (
    <form className={styles.root} onSubmit={handleSubmit}>
      <Field component={PasswordField} inputProps={inputProps} name="password" />
      <small className={styles.info}>Min. 6 characters with a mix of letters and numbers</small>
      <Button disabled={invalid || isLoading} type="submit">
        {isLoading ? <Spinner /> : 'Create new password'}
      </Button>
    </form>
  );
}

ForgotPasswordNew.defaultProps = {
  handleSubmit: () => {},
  invalid: false,
};

ForgotPasswordNew.propTypes = {
  handleSubmit: PropTypes.func,
  invalid: PropTypes.bool,
};
