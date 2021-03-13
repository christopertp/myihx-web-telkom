import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Button from '../../elements/Button';
import { Link } from 'react-router-dom';
import { thousand } from '../../../utils/format';
import styles from './styles.scoped.css';

export default function ShopInternetPopularPackage() {
  return (
    <section className={styles.root}>
      <h2>Produk paling populer</h2>
      {window.innerWidth < 768 ? <MobileList /> : <DesktopList />}
      <p>Belum menemukan yang Anda cari?</p>
      <Link to="/shop/internet/package/category">Lihat semua paket <img alt="chevron red" src="/assets/ic_chevron_red.svg" /></Link>
    </section>
  );
}

export function MobileList() {
  const { isLoading, packages } = useSelector(s => s.shopInternet);

  if (isLoading.p) {
    return (
      <ul className={styles['list-mob']}>
        {[...Array.from({ length: 3 }).keys()].map(i => <li className="loading" key={i} />)}
      </ul>
    );
  }

  return (
    <ul className={styles['list-mob']}>
      {packages.map((i, idx) =>
        (<li key={idx}>
          <header>
            <figure>
              <h1>{i.productInfo[0].value}</h1>
              <p>{i.productInfo[0].unit}</p>
            </figure>
            <h3>{i.productName}</h3>
            <p>{i.productDescription}</p>
          </header>
          <footer>
            <h4>{dealLabel(i.productBestDeals, i.discount)}</h4>
            <h3 className={specialStyle(i.productBestDeals, i.discount)}>
              Rp{thousand(i.priceDiscount ? i.priceDiscount : i.price)}<small> / month</small>
            </h3>
            <strike>{i.discount ? `Rp${thousand(i.price)}` : ''}</strike>
            <Button to={`/shop/internet/package/${i.productId}`}>Details</Button>
          </footer>
        </li>)
      )}
    </ul>
  );
}

export function DesktopList() {
  const { isLoading, packages } = useSelector(s => s.shopInternet);

  if (isLoading.p) {
    return (
      <ul className={styles.list}>
        {[...Array.from({ length: 3 }).keys()].map(i => <li className="loading" key={i} />)}
      </ul>
    );
  }

  return (
    <ul className={styles.list}>
      {packages.map((i, idx) =>
        (<li key={idx}>
          <Headers data={i.productInfo} />
          <Articles data={i} specialBonus={i.specialBonus} />
        </li>)
      )}
    </ul>
  );
}

export function Headers(props) {
  const { data } = props;
  return (
    <header>
      {data.map((i, idx) =>
        (<li key={idx}>
          <h1>{i.value}</h1>
          <p>{i.unit}</p>
        </li>)
      )}
    </header>
  );
}

Headers.defaultProps = {
  data: [],
};

Headers.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    unit: PropTypes.string,
    value: PropTypes.node,
  })),
};

export function Articles(props) {
  const { data, specialBonus } = props;
  const { discount, price, priceDiscount,
    productBestDeals, productDescription, productId, productName } = data;

  return (
    <article>
      <h3>{productName}</h3>
      <h3>{dealLabel(productBestDeals, discount)}</h3>
      <h3 className={specialStyle(productBestDeals, discount)}>
        Rp{thousand(priceDiscount ? priceDiscount : price)}<small> / month</small>
      </h3>
      <strike>{discount ? `Rp${thousand(price)}` : ''}</strike>
      <p>{productDescription}</p>
      <p>Bonus Subscriptions</p>
      <p>{specialBonus.title}</p>
      <img alt="logo add ons" src={specialBonus.image} />
      <Button to={`/shop/internet/package/${productId}`}>Details</Button>
    </article>
  );
}

Articles.defaultProps = {
  data: {},
  specialBonus: {},
};

Articles.propTypes = {
  data: PropTypes.shape({
    discount: PropTypes.number,
    price: PropTypes.number,
    priceDiscount: PropTypes.number,
    productBestDeals: PropTypes.bool,
    productDescription: PropTypes.string,
    productId: PropTypes.string,
    productName: PropTypes.string,
  }),
  specialBonus: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
  })
};

export function dealLabel(isBestDeal, discount) {
  if (isBestDeal && discount) {
    return 'Special Deal!';
  } else if (isBestDeal) {
    return 'Best Deal!';
  }
  return '';
}

export function specialStyle(isBestDeal, discount) {
  return (isBestDeal && discount) ? styles['special-deal'] : '';
}
