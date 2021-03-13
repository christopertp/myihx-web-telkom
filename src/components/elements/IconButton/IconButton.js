import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './styles.scoped.css';

export default function IconButton(props) {
  const { className, name, onClick, title, to, type } = props;
  const customClass = [styles.root, className].filter(Boolean).join(' ');
  const icon = <img alt={name} src={`/assets/ic_${name}.svg`} />;

  return to ?
    (<Link className={customClass} title={title} to={to}>{icon}</Link>):
    (<button className={customClass} onClick={onClick} type={type}>{icon}</button>);
}

IconButton.defaultProps = {
  className: '',
  name: '',
  onClick: () => {},
  title: '',
  to: '',
  type: 'button',
};

IconButton.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  onClick: PropTypes.func,
  title: PropTypes.string,
  to: PropTypes.string,
  type: PropTypes.string,
};
