import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Field } from 'redux-form';
import Button from '../../elements/Button';
import Spinner from '../../elements/Spinner';
import TextField from '../../fields/Text';
import styles from './styles.scoped.css';

export default function PersonalDataReview(props) {
  const { handleSubmit, initialize, invalid, onRetake } = props;
  const { page, subpage } = useParams();
  const { form, isLoading, message } = useSelector(s => s.personalData);
  const labels = {
    'e-ktp': 'e-KTP',
    'ktp': 'KTP',
    'passport': 'passport',
    'sim': 'driver\'s license',
  };

  const idNumberProps = {
    label: `${labels[page].toUpperCase()} NUMBER`,
    maxLength: 16,
    placeholder: `Enter ${labels[page]} number`,
  };

  const nameProps = {
    label: 'NAME',
    placeholder: `Enter name according to ${labels[page]}`,
  };

  const motherNameProps = {
    label: 'MOTHER\'S MAIDEN NAME',
    placeholder: 'Enter mother\'s maiden name',
  };

  const dateOfBirthProps = {
    label: 'DATE OF BIRTH',
    max: new Date().toISOString().split('T')[0],
    placeholder: 'Enter date of birth',
    type: 'date',
  };

  const validate = v => !v ? 'Harus diisi' : '';

  useEffect(() => {
    if (subpage === 'edit') {
      const { dateOfBirth, idNumber, motherName } = form;
      initialize({ dateOfBirth: page === 'ktp' ? dateOfBirth : undefined, idNumber, motherName });
    }
  }, []);

  return (
    <form className={styles.root} onSubmit={handleSubmit}>
      <Field component={TextField} inputProps={idNumberProps} name="idNumber" />
      <Field component={TextField} inputProps={nameProps} name="name" />
      <Field component={TextField} inputProps={motherNameProps} name="motherName" />
      {page === 'ktp' && <Field component={TextField} inputProps={dateOfBirthProps} name="dateOfBirth" validate={validate} />}
      {message && <small className={styles.error}>{message}</small>}
      <div>
        <Button disabled={isLoading} onClick={onRetake} variant="bordered">Reupload</Button>
        <Button disabled={invalid || isLoading} type="submit">
          {isLoading ? <Spinner /> : 'Confirm'}
        </Button>
      </div>
    </form>
  );
}

PersonalDataReview.defaultProps = {
  handleSubmit: () => {},
  initialize: () => {},
  invalid: false,
  onRetake: () => {},
};

PersonalDataReview.propTypes = {
  handleSubmit: PropTypes.func,
  initialize: PropTypes.func,
  invalid: PropTypes.bool,
  onRetake: PropTypes.func,
};
