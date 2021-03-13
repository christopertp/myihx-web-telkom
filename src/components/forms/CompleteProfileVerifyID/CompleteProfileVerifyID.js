import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { useSelector } from 'react-redux';
import Button from '../../elements/Button';
import Spinner from '../../elements/Spinner';
import TextField from '../../fields/Text';
import styles from './styles.scoped.css';

export default function CompleteProfileVerifyID(props) {
  const { handleSubmit, invalid, message } = props;
  const { isLoading } = useSelector((s) => s.completeProfile);

  const inputProps = {
    label: 'ID NUMBERS',
    placeholder: 'Enter your ID number',
  };
  return (
    <form className={styles.root} onSubmit={handleSubmit}>
      <Field component={TextField} inputProps={inputProps} name="idNumber" />
      {message && <small className={styles.error}>{message}</small>}
      <Button disabled={invalid} type="submit">
        {isLoading ? <Spinner /> : 'Next'}
      </Button>
    </form>
  );
}

CompleteProfileVerifyID.defaultProps = {
  handleSubmit: () => {},
  invalid: false,
  message: '',
};

CompleteProfileVerifyID.propTypes = {
  handleSubmit: PropTypes.func,
  invalid: PropTypes.bool,
  message: PropTypes.string,
};
