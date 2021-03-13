import React from 'react';
import PropTypes from 'prop-types';
import { autoPx } from '../../utils/unit';

export default function MenuHistory(props) {
  const { fill } = props;
  const s20 = autoPx(20);
  return (
    <svg height={s20} viewBox="0 0 20 20" width={s20} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
      <defs>
        <path d="M6 14V9H0V0h20v20H0v-6h6z" id="a" />
      </defs>
      <g fill="none" fillRule="evenodd">
        <mask fill="#fff" id="b">
          <use xlinkHref="#a"/>
        </mask>
        <path d="M10 18.009a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm0-2a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" fill={fill} mask="url(#b)" transform="rotate(1 10 10.009)" />
        <path d="M3.003 8.055l2.719-1.268.845 1.813-4.532 2.113L-.078 6.18l1.813-.845zM11 9.283h3v2H9V5.6h2z" fill={fill} />
      </g>
    </svg>
  );
}

MenuHistory.defaultProps = {
  fill: '#B2B4B5',
};

MenuHistory.propTypes = {
  fill: PropTypes.string,
};
