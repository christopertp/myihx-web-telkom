import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Field } from 'redux-form';
import Button from '../../elements/Button';
import SelectField from '../../fields/Select';
import TextAreaField from '../../fields/TextArea';
import styles from './styles.scoped.css';

export default function HelpReportIssues(props) {
  const { handleSubmit, invalid } = props;
  const dispatch = useDispatch();
  const { data, fetchReportIssues, isLoading, message } = useSelector(s => s.help);
  const { type } = useSelector(s => s.form.helpReportIssues.values);
  const { categories, issues } = data;

  const loadingPlaceholder = (key, placeholder) => isLoading[key] ? 'Loading...' : placeholder;

  const inputProps = [
    {
      label: 'CATEGORY',
      placeholder: loadingPlaceholder('c', 'Choose one'),
    },
    {
      disabled: !type,
      label: 'ISSUE',
      placeholder: loadingPlaceholder('i', 'Choose one'),
    },
    {
      label: 'MESSAGE/COMMENT',
      placeholder: 'Enter Message',
    },
  ];

  useEffect(() => {
    type && dispatch(fetchReportIssues('issues', type));
  }, [type]);

  return (
    <form className={styles.root} onSubmit={handleSubmit}>
      <Field component={SelectField} inputProps={inputProps[0]} name="type" options={categories} />
      <Field component={SelectField} inputProps={inputProps[1]} name="issueId" options={issues} />
      <Field component={TextAreaField} inputProps={inputProps[2]} name="message" />
      {message && <small className={styles.error}>{message}</small>}
      <Button disabled={invalid || isLoading.s} type="submit">Report Issue</Button>
    </form>
  );
}

HelpReportIssues.defaultProps = {
  handleSubmit: () => { },
  invalid: false,
};

HelpReportIssues.propTypes = {
  handleSubmit: PropTypes.func,
  invalid: PropTypes.bool,
};
