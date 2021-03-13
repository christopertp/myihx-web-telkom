import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../elements/Button';
import { thousand } from '../../../utils/format';
import styles from './styles.scoped.css';

export default function Package(props) {
  const { data, className } = props;
  const customClass = [styles.root, className].filter(Boolean).join(' ');
  const {
    discount,
    discountPrice,
    packageName,
    price,
    productBestDeals,
    productDescription,
    productId,
    productInfo,
  } = data;

  return (
    <div className={customClass}>
      <header>
        <figure>
          <h1>{productInfo[0].value}</h1>
          <p>{productInfo[0].unit}</p>
        </figure>
        <h3>{packageName}</h3>
        <p>{productDescription}</p>
      </header>
      <footer>
        <h4>{dealLabel(productBestDeals, discount)}</h4>
        <h3 className={specialStyle(productBestDeals, discount)}>
          Rp{thousand(discountPrice ? discountPrice : price)}<small> / month</small>
        </h3>
        <strike>{discount ? `Rp${thousand(price)}` : ''}</strike>
        <Button to={`/shop/internet/package/${productId}`}>Details</Button>
      </footer>
    </div>
  );
}

export function dealLabel(isBestDeal, discount) {
  if (isBestDeal && discount) {
    return 'Special Deal!';
  }
  if (isBestDeal) {
    return 'Best Deal!';
  }
  return '';
}

export function specialStyle(isBestDeal, discount) {
  return (isBestDeal && discount) ? styles['special-deal'] : '';
}

Package.defaultProps = {
  className: '',
  data: {
    productInfo: [],
  },
};

Package.propTypes = {
  className: PropTypes.string,
  data: PropTypes.shape({
    discount: PropTypes.number,
    price: PropTypes.number,
    discountPrice: PropTypes.number,
    productBestDeals: PropTypes.bool,
    productDescription: PropTypes.string,
    productId: PropTypes.string,
    productInfo: PropTypes.array,
    packageName: PropTypes.string,
  }),
};
