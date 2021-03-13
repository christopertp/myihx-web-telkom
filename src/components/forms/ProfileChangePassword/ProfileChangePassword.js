import React from 'react';
import { useSelector } from 'react-redux';
import { Field } from 'redux-form';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '../../elements/Button';
import Spinner from '../../elements/Spinner';
import PasswordField from '../../fields/Password';
import styles from './styles.scoped.css';

export default function ProfileChangePassword(props) {
  const { handleSubmit, invalid } = props;
  const { isLoading } = useSelector(s => s.profile);
  const renderField = (name, label) => {
    const inputProps = {
      label,
      placeholder: 'Enter Your Password',
    };
    return <Field component={PasswordField} inputProps={inputProps} name={name} />;
  };

  return (
    <form className={styles.root} onSubmit={handleSubmit}>
      {renderField('currentPassword', 'current password')}
      <Link to={{ pathname: '/forgot-password', state: { back: '/profile/change-password' } }}>Forgot Password</Link>
      {renderField('newPassword', 'new password')}
      <Button disabled={invalid || isLoading.b} type="submit">
        {isLoading.b ? <Spinner /> : 'save changes'}
      </Button>
    </form>
  );
}

ProfileChangePassword.defaultProps = {
  handleSubmit: () => {},
  invalid: false,
};

ProfileChangePassword.propTypes = {
  handleSubmit: PropTypes.func,
  invalid: PropTypes.bool,
};
