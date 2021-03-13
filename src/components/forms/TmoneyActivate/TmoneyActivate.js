import React from 'react';
import ProptTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Field } from 'redux-form';
import Button from '../../elements/Button';
import Spinner from '../../elements/Spinner';
import PasswordField from '../../fields/Password';
import styles from './styles.scoped.css';

export default function TmoneyActivate(props) {
  const { handleSubmit, invalid } = props;
  const { isLoading } = useSelector(s => s.tmoney);
  const inputProps = {
    autoFocus: true,
    label: 'NEW PASSWORD',
    placeholder: 'Create a new password',
  };

  return (
    <form className={styles.root} onSubmit={handleSubmit}>
      <Field component={PasswordField} inputProps={inputProps} name="password" />
      <Button disabled={invalid || isLoading.s} type="submit">{isLoading.s ? <Spinner /> : 'Next'}</Button>
    </form>
  );
}

TmoneyActivate.defaultProps = {
  handleSubmit: () => {},
  invalid: false,
};

TmoneyActivate.propTypes = {
  handleSubmit: ProptTypes.func,
  invalid: ProptTypes.bool,
};
