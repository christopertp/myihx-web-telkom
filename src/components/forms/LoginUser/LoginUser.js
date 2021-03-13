import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Field } from 'redux-form';
import Button from '../../elements/Button';
import Spinner from '../../elements/Spinner';
import TextField from '../../fields/Text';
import styles from './styles.scoped.css';

export default function LoginUser(props) {
  const { handleSubmit, invalid } = props;
  const { isLoading } = useSelector(s => s.login);
  const inputProps = {
    autoFocus: true,
    label: 'NOMOR PONSEL ATAU EMAIL',
    placeholder: 'Masukkan Nomor Ponsel atau Email',
  };

  return (
    <form className={styles.root} onSubmit={handleSubmit}>
      <Field component={TextField} inputProps={inputProps} name="user" />
      <Button disabled={invalid || isLoading} type="submit">
        {isLoading ? <Spinner /> : 'Masuk'}
      </Button>
    </form>
  );
}

LoginUser.defaultProps = {
  handleSubmit: () => {},
  invalid: false,
};

LoginUser.propTypes = {
  handleSubmit: PropTypes.func,
  invalid: PropTypes.bool,
};
