import React from 'react';
import { Field } from 'redux-form';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '../../../components/elements/Button';
import SelectField from '../../fields/Select';
import TextAreaField from '../../fields/TextArea';
import Spinner from '../../elements/Spinner';
import styles from './styles.scoped.css';

export default function SendFeedback(props) {
  const { handleSubmit, invalid } = props;
  const { isLoading, topic, message } = useSelector(s => s.sendFeedback);
  const inputProps = [
    { label: 'TOPIC', placeholder: isLoading.t ? 'Loading...' : 'Choose...' },
    { label: 'MESSAGE/COMMENT', maxLength: '150', placeholder: 'Enter message' }
  ];

  return (
    <form className={styles.root} onSubmit={handleSubmit}>
      <Field component={SelectField} inputProps={inputProps[0]} name="topicId" options={topic} />
      <Field component={TextAreaField} inputProps={inputProps[1]} name="message" />
      {message && <small className={styles.error}>{message}</small>}
      <Button disabled={invalid || isLoading.s} type="submit">
        {isLoading.s ? <Spinner /> : 'Send Feedback'}
      </Button>
    </form>
  );
}

SendFeedback.defaultProps = {
  handleSubmit: () => { },
  invalid: false,
};

SendFeedback.propTypes = {
  handleSubmit: PropTypes.func,
  invalid: PropTypes.bool,
};
