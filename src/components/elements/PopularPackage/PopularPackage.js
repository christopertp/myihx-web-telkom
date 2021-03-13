import React, {  createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import Button from '../../elements/Button';
import { thousand } from '../../../utils/format';
import styles from './styles.scoped.css';

const Context = createContext({});

export default function PopularPackage(props) {
  const { data, className } = props;
  const customClass = [styles.root, className].filter(Boolean).join(' ');

  const contextValue = { data, };

  return (
    <Context.Provider value={contextValue}>
      <div className={customClass} >
        <Headers/>
        <Articles/>
      </div>
    </Context.Provider>
  );
}

export function Headers() {
  const { data } = useContext(Context);

  return (
    <header>
      {data.productInfo.map((item, i) => (
        <li key={i}>
          <h1>{item.value}</h1>
          <p>{item.unit}</p>
        </li>
      ))}
    </header>
  );
}

export function Articles() {
  const { data } = useContext(Context);
  const {
    discount,
    discountPrice,
    packageName,
    price,
    productBestDeals,
    productDescription,
    productId,
    specialBonus,
  } = data;

  return (
    <article>
      <h3>{packageName}</h3>
      <h3>{dealLabel(productBestDeals, discount)}</h3>
      <h3 className={specialStyle(productBestDeals, discount)}>
        Rp{thousand(discountPrice ? discountPrice : price)}<small> / month</small>
      </h3>
      <strike>{discount ? `Rp${thousand(price)}` : ''}</strike>
      <p>{productDescription}</p>
      <p>Bonus Subscriptions</p>
      <p>{specialBonus.benefit}</p>
      <img alt="logo add ons" src={specialBonus.image} />
      <Button to={`/shop/internet/package/${productId}`}>Details</Button>
    </article>
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

PopularPackage.defaultProps = {
  className: '',
  data: {},
};

PopularPackage.propTypes = {
  className: PropTypes.string,
  data: PropTypes.shape({
    discount: PropTypes.number,
    price: PropTypes.number,
    discountPrice: PropTypes.number,
    productBestDeals: PropTypes.bool,
    productDescription: PropTypes.string,
    productId: PropTypes.string,
    packageName: PropTypes.string,
    specialBonus: PropTypes.object,
  }),
};
