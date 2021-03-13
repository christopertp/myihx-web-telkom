import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './styles.scoped.css';

export default function Button(props) {
  const { children, className, disabled, onClick, to, type, variant } = props;
  const customClass = [styles[variant], className].filter(Boolean).join(' ');

  return to ?
    (<Link className={customClass} disabled={disabled} to={to}>{children}</Link>):
    (<button className={customClass} disabled={disabled}
      onClick={onClick} type={type}>{children}</button>);
}

Button.defaultProps = {
  children: null,
  className: '',
  disabled: false,
  onClick: null,
  to: '',
  type: 'button',
  variant: 'red',
};

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  to: PropTypes.string,
  type: PropTypes.string,
  variant: PropTypes.oneOf(['bordered', 'red', 'text', 'white']),
};
