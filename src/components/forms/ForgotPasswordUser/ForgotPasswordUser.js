import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Field } from 'redux-form';
import Button from '../../elements/Button';
import Spinner from '../../elements/Spinner';
import TextField from '../../fields/Text';
import styles from './styles.scoped.css';

export default function ForgotPasswordUser(props) {
  const { handleSubmit, invalid } = props;
  const { isLoading } = useSelector(s => s.forgotPassword);
  const inputProps = {
    label: 'MOBILE NUMBER OR EMAIL',
    placeholder: 'Enter your mobile number or email',
  };

  return (
    <form className={styles.root} onSubmit={handleSubmit}>
      <Field component={TextField} inputProps={inputProps} name="user" />
      <Button disabled={invalid || isLoading} type="submit">
        {isLoading ? <Spinner /> : 'Send Recovery Code'}
      </Button>
    </form>
  );
}

ForgotPasswordUser.defaultProps = {
  handleSubmit: () => {},
  invalid: false,
};

ForgotPasswordUser.propTypes = {
  handleSubmit: PropTypes.func,
  invalid: PropTypes.bool,
};
