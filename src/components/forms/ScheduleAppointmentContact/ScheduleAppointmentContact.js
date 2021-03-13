import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import Button from '../../elements/Button';
import TextField from '../../fields/Text';
import styles from './styles.scoped.css';

export default function ScheduleAppointmentContact(props) {
  const { data, handleSubmit, initialize, invalid, onClose } = props;
  const nameProps = {
    label: 'FULL NAME',
    placeholder: 'Contact\'s full name',
  };
  const mobileProps = {
    label: 'MOBILE NUMBER',
    placeholder: 'Contact\'s full name',
  };

  useEffect(() => {
    data && initialize(data);
  }, []);

  return (
    <form className={styles.root} onSubmit={handleSubmit}>
      <Field component={TextField} inputProps={nameProps} name="fullName" />
      <Field component={TextField} inputProps={mobileProps} name="mobileNumber" />
      <div>
        <Button onClick={onClose} variant="bordered">Cancel</Button>
        <Button disabled={invalid} type="submit">Save</Button>
      </div>
    </form>
  );
}

ScheduleAppointmentContact.defaultProps = {
  data: null,
  handleSubmit: () => {},
  initialize: () => {},
  invalid: false,
  onClose: () => {},
};

ScheduleAppointmentContact.propTypes = {
  data: PropTypes.object,
  handleSubmit: PropTypes.func,
  initialize: PropTypes.func,
  invalid: PropTypes.bool,
  onClose: PropTypes.func,
};
