import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Field } from 'redux-form';
import Button from '../../elements/Button';
import TextAreaField from '../../fields/TextArea';
import styles from './styles.scoped.css';

export default function IssuesComment(props) {
  const { handleSubmit, invalid } = props;
  const { message } = useSelector(s => s.issues);
  const inputProps = {
    label: 'MESSAGE/COMMENT',
    placeholder: 'Enter Message',
  };

  return (
    <form className={styles.root} onSubmit={handleSubmit}>
      <Field component={TextAreaField} inputProps={inputProps} name="message" />
      {message && <small className={styles.error}>{message}</small>}
      <Button disabled={invalid} type="submit">Add Comment</Button>
    </form>
  );
}

IssuesComment.defaultProps = {
  handleSubmit: () => { },
  invalid: false,
};

IssuesComment.propTypes = {
  handleSubmit: PropTypes.func,
  invalid: PropTypes.bool,
};
