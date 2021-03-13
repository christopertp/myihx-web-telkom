import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';
import Button from '../../elements/Button';
import Spinner from '../../elements/Spinner';
import ImageField from '../../fields/Image';
import RadioField from '../../fields/Radio';
import TextField from '../../fields/Text';
import styles from './styles.scoped.css';

export default function ProfileEdit(props) {
  const { handleSubmit, initialize, invalid } = props;
  const {
    address, dateOfBirth, fullName, gender,
    isLoading, message, profilePicture,
  } = useSelector(s => s.profile);
  const renderField = (name, label, type) => {
    const inputProps = {
      label,
      placeholder: `Enter ${label}`,
      type,
    };
    return <Field component={TextField} inputProps={inputProps} name={name} />;
  };
  const radioDatas = [
    { text: 'Male', value: 'male' },
    { text: 'Female', value: 'female' },
  ];

  useEffect(() => {
    initialize({ address, dateOfBirth: dateOfBirth.split('T')[0], fullName, gender });
  }, []);

  if (!isLoading.p && !fullName) {
    return 'Something went wrong, please try again later.';
  }

  return (
    <form className={styles.root} onSubmit={handleSubmit}>
      <div>
        <Field className={styles.image} component={ImageField} name="profilePicture" src={profilePicture} />
      </div>
      <section className={styles.half}>
        <div>{renderField('fullName', 'fullname')}</div>
        <div>{renderField('address', 'address')}</div>
      </section>
      <section className={styles.half}>
        <div>{renderField('dateOfBirth', 'birthdate', 'date')}</div>
        <div className={styles['choose-gender']}>
          <label>Gender</label>
          <div className={styles['radio-toolbar']}>
            <Field component={RadioField} data={radioDatas[0]} name="gender"/>
            <Field component={RadioField} data={radioDatas[1]} name="gender"/>
          </div>
        </div>
      </section>
      <Button disabled={invalid || isLoading.b} type="submit">
        {isLoading.b ? <Spinner /> : 'save changes'}
      </Button>
      {message && <small className={styles.error}>{message}</small>}
    </form>
  );
}

ProfileEdit.defaultProps = {
  handleSubmit: () => {},
  initialize: () => {},
  invalid: false,
};

ProfileEdit.propTypes = {
  handleSubmit: PropTypes.func,
  initialize: PropTypes.func,
  invalid: PropTypes.bool,
};
