import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scoped.css';

export default function Text(props) {
  const { className, input, inputProps, meta } = props;
  const { dirty, error, touched } = meta;
  const classes = [
    styles.root,
    error &&  (dirty || touched) && styles.error,
    className,
  ].filter(Boolean).join(' ');

  return (
    <>
      <label className={styles.label}>{inputProps.label}</label>
      <input className={classes} {...input} {...inputProps} />
      {error &&  (dirty || touched) && <small className={styles.error}>{error}</small>}
    </>
  );
}

Text.defaultProps = {
  className: '',
  input: {},
  inputProps: {},
  meta: {},
};

Text.propTypes = {
  className: PropTypes.string,
  input: PropTypes.object,
  inputProps: PropTypes.object,
  meta: PropTypes.object,
};
