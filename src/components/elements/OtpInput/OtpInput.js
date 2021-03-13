import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scoped.css';

export default function OtpInput(props) {
  const { className, disabled, error, onSubmit } = props;
  const customClass = [
    styles.root,
    error && styles.error,
    className,
  ].filter(Boolean).join(' ');
  const rootRef = useRef(null);
  const [values, setValues] = useState(['', '', '', '']);

  const onChange = i => ({ target }) => {
    if (target.value.match(/[^0-9]/)) {
      return;
    }
    const { childNodes } = rootRef.current;
    const newValues = [...values];

    newValues[i] = target.value;
    setValues(newValues);

    if (i < 3) {
      [...childNodes].slice(i - 3).forEach(c => c.value = '');
      childNodes[i + 1].focus();
    } else {
      onSubmit(newValues.join(''));
    }
  };

  const onFocus = i => ({ target }) => {
    if (target.value) {
      target.value = '';
      setValues([...values.slice(0, i), target.value, ...Array(3 - i).fill('')]);
    }
  };

  const onKeyUp = i => ({ key }) => {
    if (key === 'Backspace' && i > 0) {
      rootRef.current.childNodes[i - 1].focus();
    }
  };

  return (
    <div className={customClass} ref={rootRef}>
      {[...Array.from({ length: 4 }).keys()].map(i => (
        <input disabled={disabled} key={i} maxLength={1} onChange={onChange(i)}
          onFocus={onFocus(i)} onKeyUp={onKeyUp(i)} type="tel" value={values[i]} />
      ))}
      {error && <small>{error}</small>}
    </div>
  );
}

OtpInput.defaultProps = {
  className: '',
  disabled: false,
  error: '',
  onSubmit: () => {},
};

OtpInput.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  onSubmit: PropTypes.func,
};
