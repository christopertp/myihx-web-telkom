import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Field } from 'redux-form';
import Button from '../../elements/Button';
import Spinner from '../../elements/Spinner';
import PasswordField from '../../fields/Password';
import styles from './styles.scoped.css';

export default function LoginPassword(props) {
  const { handleSubmit, invalid } = props;
  const { isLoading } = useSelector(s => s.login);
  const inputProps = {
    autoFocus: true,
    label: 'KATA SANDI',
    placeholder: 'Masukkan kata sandi Anda',
  };

  return (
    <form className={styles.root} onSubmit={handleSubmit}>
      <Field component={PasswordField} inputProps={inputProps} name="password" />
      <Link to="/forgot-password">Lupa kata sandi</Link>
      <Button disabled={invalid || isLoading} type="submit">
        {isLoading ? <Spinner /> : 'Lanjut'}
      </Button>
    </form>
  );
}

LoginPassword.defaultProps = {
  handleSubmit: () => {},
  invalid: false,
};

LoginPassword.propTypes = {
  handleSubmit: PropTypes.func,
  invalid: PropTypes.bool,
};
