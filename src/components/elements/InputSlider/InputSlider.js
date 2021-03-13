import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scoped.css';

export default function InputSlider(props) {
  const { className, inputProps, onChange, showTooltip, value } = props;
  const left = (value - inputProps.min) * 100 / (inputProps.max - inputProps.min);
  const offset = ((value - inputProps.min) * 2.25 / (inputProps.max - inputProps.min)) + 0.375;

  return (
    <div className={className} style={{ position: 'relative' }}>
      <div className={styles.value} style={{ display: showTooltip ? 'block' : 'none', left:`calc(${left}% - ${offset}rem)` }}>
        {value}
      </div>

      <input
        className={styles.range}
        onChange={onChange}
        type="range"
        value={value}
        {...inputProps}
      />
    </div>
  );
}

InputSlider.defaultProps = {
  className: '',
  inputProps: {},
  onChange: null,
  showTooltip: true,
  value: 0
};

InputSlider.propTypes = {
  className: PropTypes.string,
  inputProps: PropTypes.object,
  onChange: PropTypes.func,
  showTooltip: PropTypes.bool,
  value: PropTypes.number,
};
