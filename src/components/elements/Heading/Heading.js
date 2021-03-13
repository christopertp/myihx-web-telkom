import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scoped.css';

export default function Heading(props) {
  const { children, className } = props;
  const customClass = [styles.root, className].filter(Boolean).join(' ');

  return <h3 className={customClass}>{children}</h3>;
}

Heading.defaultProps = {
  children: null,
  className: '',
};

Heading.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
