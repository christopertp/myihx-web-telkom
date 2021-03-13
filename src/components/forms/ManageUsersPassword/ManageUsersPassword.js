import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { Link } from 'react-router-dom';
import Button from '../../elements/Button';
import PasswordField from '../../fields/Password';
import styles from './styles.scoped.css';

export default function ManageUsersPassword(props) {
  const { handleSubmit, invalid, message } = props;
  const inputProps = {
    autoFocus: true,
    label: 'Password',
    placeholder: 'Enter you password',
  };

  return (
    <form className={styles.root} onSubmit={handleSubmit}>
      <Field component={PasswordField} inputProps={inputProps} name="password" />
      {message && <small className={styles.error}>{message}</small>}
      <Link to="/forgot-password">Forgot Password</Link>
      <Button disabled={invalid} type="submit">
        Next
      </Button>
    </form>
  );
}

ManageUsersPassword.defaultProps = {
  handleSubmit: () => {},
  invalid: false,
  message: '',
};

ManageUsersPassword.propTypes = {
  handleSubmit: PropTypes.func,
  invalid: PropTypes.bool,
  message: PropTypes.string,
};
