import React from 'react';
import PropTypes from 'prop-types';
import { autoPx } from '../../utils/unit';

export default function MenuProfile(props) {
  const { fill } = props;
  const s20 = autoPx(20);
  return (
    <svg height={s20} viewBox="0 0 20 20" width={s20} xmlns="http://www.w3.org/2000/svg">
      <g fill="none" fillRule="evenodd" transform="translate(1 1)">
        <circle cx="9" cy="9" r="9" stroke={fill} strokeWidth="2" />
        <circle cx="12.5" cy="7.5" fill={fill} fillRule="nonzero" r="1.5" />
        <circle cx="5.5" cy="7.5" fill={fill} fillRule="nonzero" r="1.5" />
        <path d="M6 12c.819.887 1.882 1.33 3.19 1.33s2.372-.443 3.19-1.33"
          fillRule="nonzero" stroke={fill} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </g>
    </svg>
  );
}

MenuProfile.defaultProps = {
  fill: '#b2b4b5',
};

MenuProfile.propTypes = {
  fill: PropTypes.string,
};
