import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scoped.css';

export default function StepProgressBar(props) {
  const { className, steps, complete } = props;
  const customClass = [styles.root, className].filter(Boolean).join(' ');

  return (
    <ul className={customClass}>
      {Array(steps)
        .fill(steps)
        .map((val, idx) => (
          <Fragment key={idx}>
            <li className={idx >= steps - complete ? styles.complete : ''} key={idx} />
            <span />
          </Fragment>
        ))}
    </ul>
  );
}

StepProgressBar.defaultProps = {
  className: '',
  complete: 3,
  steps: 3,
};

StepProgressBar.propTypes = {
  className: PropTypes.string,
  complete: PropTypes.number,
  steps: PropTypes.number,
};
