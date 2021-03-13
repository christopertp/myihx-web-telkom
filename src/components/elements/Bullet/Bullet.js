import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scoped.css';

export default function Bullet(props) {
  const { className, color, connect, size, style } = props;
  const customClass = [styles.root, className].filter(Boolean).join(' ');
  const [b, l] = color;
  const height = size;
  const width = size;

  return (
    <div className={customClass} style={style}>
      {connect && <span style={{ background: l }} />}
      <div style={{ background: b, height, width }} />
    </div>
  );
}

Bullet.defaultProps = {
  className: '',
  color: ['#ee3124', '#cccccc'],
  connect: false,
  size: '0.75rem',
  style: undefined,
};

Bullet.propTypes = {
  className: PropTypes.string,
  color: PropTypes.arrayOf(PropTypes.string),
  connect: PropTypes.bool,
  size: PropTypes.string,
  style: PropTypes.object,
};
