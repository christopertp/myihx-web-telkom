import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Field } from 'redux-form';
import Button from '../../elements/Button';
import Spinner from '../../elements/Spinner';
import TextField from '../../fields/Text';
import styles from './styles.scoped.css';

export default function ProfileChangeEM(props) {
  const { handleSubmit, invalid } = props;
  const { isLoading } = useSelector(s => s.profile);
  const { page } = useParams();
  const isChangeEmail = page === 'change-email';
  const inputProps = {
    label: isChangeEmail ? 'Email Address' : 'Mobile Number',
    placeholder: isChangeEmail ? 'Enter valid email address' : 'Enter Phone Number',
    type: isChangeEmail ? 'email' : 'tel',
  };
  const fieldName = isChangeEmail ? 'email' : 'mobile';

  return (
    <form className={styles.root} onSubmit={handleSubmit}>
      <Field component={TextField} inputProps={inputProps} name={fieldName} />
      <Button disabled={invalid || isLoading.b} type="submit">
        {isLoading.b ? <Spinner /> : 'Next'}
      </Button>
    </form>
  );
}

ProfileChangeEM.defaultProps = {
  handleSubmit: () => {},
  invalid: false,
};

ProfileChangeEM.propTypes = {
  handleSubmit: PropTypes.func,
  invalid: PropTypes.bool,
};
