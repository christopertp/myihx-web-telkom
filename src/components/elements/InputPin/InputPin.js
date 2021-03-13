import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scoped.css';

export default function InputPin(props) {
  const { className, disabled, error, length, onSubmit } = props;
  const customClass = [
    styles.root,
    error && styles.error,
    className,
  ].filter(Boolean).join(' ');
  const rootRef = useRef(null);
  const [values, setValues] = useState(Array(length).fill(''));

  useEffect(() => {
    rootRef.current.childNodes[0].focus();
  }, []);

  const onChange = i => ({ target }) => {
    if (target.value.match(/[^0-9]/)) {
      return;
    }
    const { childNodes } = rootRef.current;
    const newValues = [...values];

    newValues[i] = target.value;
    setValues(newValues);

    if (i < (length - 1)) {
      [...childNodes].slice(i - (length - 1)).forEach(c => c.value = '');
      childNodes[i + 1].focus();
    } else {
      onSubmit(newValues.join(''));
      setValues(Array(length).fill(''));
      rootRef.current.childNodes[0].focus();
    }
  };

  const onFocus = i => ({ target }) => {
    if (target.value) {
      target.value = '';
      setValues([...values.slice(0, i), target.value, ...Array((length - 1) - i).fill('')]);
    }
  };

  const onKeyUp = i => ({ key }) => {
    if (key === 'Backspace' && i > 0) {
      rootRef.current.childNodes[i - 1].focus();
    }
  };

  return (
    <div className={customClass} ref={rootRef}>
      {[...Array.from({ length }).keys()].map(i => {
        const className = values[i] === '' ? styles.empty : '';
        return (
          <input className={className} disabled={disabled} key={i} maxLength={1}
            onChange={onChange(i)} onFocus={onFocus(i)} onKeyUp={onKeyUp(i)} placeholder="•"
            type="password" value={values[i]} />
        );
      })}
      {error && <small>{error}</small>}
    </div>
  );
}

InputPin.defaultProps = {
  className: '',
  disabled: false,
  error: '',
  length: 6,
  onSubmit: () => {},
};

InputPin.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  length: PropTypes.number,
  onSubmit: PropTypes.func,
};
