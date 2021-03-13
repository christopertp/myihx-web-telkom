import React from 'react';
import PropTypes from 'prop-types';
import { autoPx } from '../../utils/unit';

export default function MenuShop(props) {
  const { fill } = props;
  const s20 = autoPx(20);
  return (
    <svg height={s20} viewBox="0 0 20 20" width={s20} xmlns="http://www.w3.org/2000/svg">
      <g fill={fill} fillRule="evenodd">
        <path d={`M4.714 12.55l-.425-1.7h7.977l-.392 1.7h-7.16zm8.336-5.1l-.391
          1.7H3.864l-.425-1.7h9.611zM15.1 1.5a.85.85 0 0 0-.828.658l-.829
          3.592H2.35a.85.85 0 0 0-.825 1.057l1.7 6.8a.85.85 0 0 0
          .825.643h8.5a.85.85 0 0 0 .829-.659L15.776 3.2H18.5V1.5h-3.4zM4.9
          15.1a1.7 1.7 0 1 0 .001 3.401A1.7 1.7 0 0 0 4.9 15.1M11.7 15.1a1.7
          1.7 0 1 0 .001 3.401A1.7 1.7 0 0 0 11.7 15.1`} />
      </g>
    </svg>
  );
}

MenuShop.defaultProps = {
  fill: '#B2B4B5',
};

MenuShop.propTypes = {
  fill: PropTypes.string,
};
