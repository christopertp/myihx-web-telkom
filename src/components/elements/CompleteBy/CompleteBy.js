import React from 'react';
import PropTypes from 'prop-types';
import useTimer from '../../../hooks/useTimer';
import styles from './styles.scoped.css';

export default function CompleteBy(props) {
  const { className, initTime } = props;
  const customClass = [styles.root, className].filter(Boolean).join(' ');
  const { time } = useTimer(Math.floor(initTime));
  const [hour, min, sec] = time;
  return (
    <div className={customClass}>
      <img alt="time" src="/assets/ic_selection_time.svg" />
      <span>Complete by</span>
      <span>{hour}:{min}:{sec}</span>
      <span>to avoid order cancellation</span>
    </div>
  );
}

CompleteBy.defaultProps = { className: '' };

CompleteBy.propTypes = {
  className: PropTypes.string,
  initTime: PropTypes.number.isRequired,
};
