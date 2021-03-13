import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { useSelector } from 'react-redux';
import Button from '../../elements/Button';
import Spinner from '../../elements/Spinner';
import TextField from '../../fields/Text';
import styles from './styles.scoped.css';

export default function ManageSubscriptionsDeviceName(props) {
  const { handleSubmit, invalid, handleCancel, message } = props;
  const { isLoading } = useSelector((s) => s.manageSubscriptions);
  const inputProps = {
    autoFocus: true,
    label: 'DEVICE NAME',
    placeholder: 'Masukkan Nama Device',
  };

  return (
    <form className={styles.root} onSubmit={handleSubmit}>
      <h3>Change device name</h3>
      <Field component={TextField} inputProps={inputProps} name="deviceName" />
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

ManageSubscriptionsDeviceName.defaultProps = {
  handleCancel: () => {},
  handleSubmit: () => {},
  invalid: false,
  message: '',
};

ManageSubscriptionsDeviceName.propTypes = {
  handleCancel: PropTypes.func,
  handleSubmit: PropTypes.func,
  invalid: PropTypes.bool,
  message: PropTypes.string,
};
