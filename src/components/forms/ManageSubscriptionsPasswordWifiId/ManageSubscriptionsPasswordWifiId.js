import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { useSelector } from 'react-redux';
import Button from '../../elements/Button';
import PasswordField from '../../fields/Password';
import Spinner from '../../elements/Spinner';
import styles from './styles.scoped.css';

export default function ManageSubscriptionsPasswordWifiId(props) {
  const { handleSubmit, invalid, handleCancel, message } = props;
  const { isLoading } = useSelector((s) => s.manageSubscriptions);
  const inputProps = {
    autoFocus: true,
    label: 'NEW PASSWORD',
    placeholder: 'Masukkan Password Yang Baru',
    maxLength: 12,
  };

  return (
    <form className={styles.root} onSubmit={handleSubmit}>
      <h3>Change wifi.id password</h3>
      <Field component={PasswordField} inputProps={inputProps} name="passwordWifiId" />
      {message && <small className={styles.error}>{message}</small>}
      <footer>
        <Button onClick={handleCancel} type="submit" variant="bordered">
          Cancel
        </Button>
        <Button disabled={invalid} type="submit">
          {isLoading.s ? <Spinner /> : 'Save'}
        </Button>
      </footer>
    </form>
  );
}

ManageSubscriptionsPasswordWifiId.defaultProps = {
  handleCancel: () => {},
  handleSubmit: () => {},
  invalid: false,
  message: '',
};

ManageSubscriptionsPasswordWifiId.propTypes = {
  handleCancel: PropTypes.func,
  handleSubmit: PropTypes.func,
  invalid: PropTypes.bool,
  message: PropTypes.string,
};
