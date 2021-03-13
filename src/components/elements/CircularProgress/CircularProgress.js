import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scoped.css';

export default function CircularProgress(props) {
  const {
    circleOneStroke,
    circleTwoStroke,
    icon,
    progress,
    size,
    strokeWidth,
  } = props;

  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = ((progress - 100) / 100) * circumference;

  return (
    <section className={styles.root}>
      <img alt="chevron red" src={`/assets/ic_selection_${icon}.svg`} />
      <svg
        className={styles.svg}
        height={size}
        strokeLinecap="round"
        width={size}
      >
        <circle
          className={styles['svg-circle-bg']}
          cx={center}
          cy={center}
          r={radius}
          stroke={circleOneStroke}
          strokeWidth={strokeWidth}
        />
        <circle
          className={styles['svg-circle']}
          cx={center}
          cy={center}
          r={radius}
          stroke={circleTwoStroke}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeWidth={strokeWidth}
        />
      </svg>
    </section>
  );
}

CircularProgress.defaultProps = {
  circleOneStroke: '#f2f2f2',
  circleTwoStroke: '#ee3124',
  icon: 'wifi',
  progress: 0,
  size: 130,
  strokeWidth: 7,
};

CircularProgress.propTypes = {
  circleOneStroke: PropTypes.string,
  circleTwoStroke: PropTypes.string,
  icon: PropTypes.string,
  progress: PropTypes.number,
  size: PropTypes.number,
  strokeWidth: PropTypes.number,
};
