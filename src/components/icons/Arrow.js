import React from 'react';
import PropTypes from 'prop-types';
import { autoPx } from '../../utils/unit';

export default function Arrow(props) {
  const { fill, size } = props;
  const s = autoPx(size);
  return (
    <svg height={s} viewBox="0 0 24 24" width={s} xmlns="http://www.w3.org/2000/svg">
      <g fill={fill} fillRule="nonzero" transform="translate(4 5)">
        <path d="M2.414 7.07l5.288 5.218a1 1 0 1 1-1.404 1.424l-6-5.921a1 1 0 0 1-.01-1.414l6-6.08a1 1 0 1 1 1.424 1.405L2.414 7.07z" />
        <rect height="2" rx="1" width="16" x="1" y="6" />
      </g>
    </svg>
  );
}

Arrow.defaultProps = {
  fill: '#b2b4b5',
  size: 24,
};

Arrow.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.number,
};
