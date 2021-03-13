import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scoped.css';

export default function Password(props) {
  const { className, input, inputProps, meta } = props;
  const [focus, setFocus] = useState(false);
  const [show, setShow] = useState(false);
  const { dirty, error, touched } = meta;
  const classes = [
    styles.root,
    error &&  (dirty || touched) && styles.error,
    focus && styles.focus,
    className,
  ].filter(Boolean).join(' ');

  const events = {
    onBlur: e => {
      setFocus(false);
      input.onBlur(e);
    },
    onFocus: e => {
      setFocus(true);
      input.onFocus(e);
    },
  };

  return (
    <>
      <label className={styles.label}>{inputProps.label}</label>
      <div className={classes}>
        <input {...input} {...inputProps} {...events} type={show ? 'text' : 'password'} />
        <button onClick={() => setShow(!show)} type="button">
          <img alt="" src={`/assets/icon_pw_${show ? 'show' : 'hide'}.svg`} />
        </button>
      </div>
      {error &&  (dirty || touched) && <small className={styles.error}>{error}</small>}
    </>
  );
}

Password.defaultProps = {
  className: '',
  input: {},
  inputProps: {},
  meta: {},
};

Password.propTypes = {
  className: PropTypes.string,
  input: PropTypes.object,
  inputProps: PropTypes.object,
  meta: PropTypes.object,
};
