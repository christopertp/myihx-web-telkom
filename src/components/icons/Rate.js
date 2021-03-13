import React from 'react';
import PropTypes from 'prop-types';
import { autoPx } from '../../utils/unit';

export default function Rate(props) {
  const { fill, onClick, size, } = props;
  const s = autoPx(size);
  return (
    <svg height={s} onClick={onClick} viewBox="0 0 40 40" width={s} xmlns="http://www.w3.org/2000/svg">
      <path d={`M20 32.451L8.244 38.18 10.06 25.23 0.979 15.82 13.857
        13.545 20 2 26.143 13.545 39.021 15.82 29.94 25.23 31.756 38.18z`} fill={fill} />
    </svg>
  );
}

Rate.defaultProps = {
  fill: '#e5e6e6',
  onClick: null,
  size: 24,
};

Rate.propTypes = {
  fill: PropTypes.string,
  onClick: PropTypes.func,
  size: PropTypes.number,
};
