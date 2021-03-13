import React from 'react';
import PropTypes from 'prop-types';
import { autoPx } from '../../utils/unit';

export default function Call(props) {
  const { fill, size } = props;
  const s = autoPx(size);
  return (
    <svg height={s} viewBox="0 0 24 24" width={s} xmlns="http://www.w3.org/2000/svg">
      <g fill="none" fillRule="evenodd">
        <path d="M0 0h24v24H0z" />
        <g transform="translate(2 2)">
          <path
            d={`M15.711 13.054l-1.74-1.37a.849.849 0 0
              0-1.17.115c-.314.356-.514.599-.585.656-.528.528-1.626-.243-2.796-1.413S7.494
              8.788 8.022 8.261c.057-.058.3-.272.656-.585.342-.3.4-.814.114-1.17l-1.37-1.74a.867.867
              0 0 0-.998-.257c-.47.2-1.313.898-1.54 1.127-1.256 1.27.313 4.151 3.052 6.904 2.74
              2.754 5.635 4.323 6.89 3.053.229-.228.928-1.07 1.128-1.54a.836.836 0 0 0-.243-.999z`}
            fill={fill} />
        </g>
      </g>
    </svg>
  );
}

Call.defaultProps = {
  fill: '#b2b4b5',
  size: 24,
};

Call.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.number,
};
