import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Field } from 'redux-form';
import Button from '../../elements/Button';
import Spinner from '../../elements/Spinner';
import TextField from '../../fields/Text';
import styles from './styles.scoped.css';

export default function LinkAjaTransfer(props) {
  const { handleSubmit, invalid, message } = props;
  const { isLoading } = useSelector(s => s.linkaja);
  const { balance } = useSelector(s => s.tmoney);
  const formData = useSelector(s => s.form.linkAjaTransfer.values);

  const renderField = (name, label, placeholder, type) => {
    const inputProps = { label, placeholder, type };
    return <Field component={TextField} inputProps={inputProps} name={name} />;
  };

  const msg = formData.amount > balance && formData.amount >= 1000 ?
    'You don’t have enough balance in your account.' : '';

  return (
    <form className={styles.root} onSubmit={handleSubmit}>
      {renderField('linkAjaNumber', 'LinkAja Number', 'E.g 081xxxxx', 'tel')}
      {renderField('amount', 'Amount', '', 'number')}
      {message || msg ? <small>{message || msg}</small> : null}
      <Button disabled={invalid || isLoading || msg} type="submit">{isLoading ? <Spinner /> : 'Next'}</Button>
    </form>
  );
}

LinkAjaTransfer.defaultProps = {
  handleSubmit: () => {},
  invalid: false,
  message: '',
};

LinkAjaTransfer.propTypes = {
  handleSubmit: PropTypes.func,
  invalid: PropTypes.bool,
  message: PropTypes.string,
};
