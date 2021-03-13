import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Field } from 'redux-form';
import Button from '../../elements/Button';
import Spinner from '../../elements/Spinner';
import PasswordField from '../../fields/Password';
import TextField from '../../fields/Text';
import styles from './styles.scoped.css';

export default function RegisterUser(props) {
  const { handleSubmit, initialize, invalid } = props;
  const { isLoading, userData } = useSelector(s => s.register);

  useEffect(() => {
    initialize(userData);
  }, []);

  const renderField = (name, label, placeholder, type) => {
    const Component = name === 'password' ? PasswordField : TextField;
    const inputProps = {
      label,
      placeholder,
      type,
    };

    return <Field component={Component} inputProps={inputProps} name={name} />;
  };

  return (
    <form className={styles.root} onSubmit={handleSubmit}>
      {renderField('fullName', 'NAMA LENGKAP', 'Masukkan nama lengkap')}
      {renderField('mobileNumber', 'NOMOR PONSEL', 'E.g 081xxxxx or 62xxxxx', 'tel')}
      {renderField('email', 'EMAIL', 'Masukkan alamat email', 'email')}
      {renderField('password', 'KATA SANDI', 'Buat kata sandi baru', 'password')}
      <section className={styles['ref-box']}>
        {renderField('referralCode', 'Punya kode referral? Masukkan kode referral dan dapatkan hadiah spesial untuk Anda dan teman, serta agen kami!', 'Masukkan kode referral')}
      </section>
      <Button disabled={invalid || isLoading} type="submit">
        {isLoading ? <Spinner /> : 'Daftar Sekarang'}
      </Button>
    </form>
  );
}

RegisterUser.defaultProps = {
  handleSubmit: () => { },
  initialize: () => { },
  invalid: false,
};

RegisterUser.propTypes = {
  handleSubmit: PropTypes.func,
  initialize: PropTypes.func,
  invalid: PropTypes.bool,
};
