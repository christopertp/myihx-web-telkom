import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Heading from '../Heading';
import { thousand } from '../../../utils/format';
import styles from './styles.scoped.css';

export default function InstallationPackageInfo(props) {
  const { address, isLoading, product } = props;
  const to = (isLoading || !product) ? '#' : `/shop/internet/package/${product.id}`;

  const setContent = (value, name) => {
    if (!isLoading && !product && name) {
      return 'No product found';
    }
    if (!isLoading && !product) {
      return '';
    }
    return isLoading ? <span className="loading" /> : value;
  };

  return (
    <>
      <section className={styles.package}>
        <Heading>Package</Heading>
        <Link to={to}>
          <header>
            {setContent(
              <figure>
                <h1>{product.mbps}</h1>
                <p>MBPS</p>
              </figure>
            )}
            {setContent(<h3>{product.name}</h3>, 'name')}
            {setContent(<p>{product.description}</p>)}
          </header>
          <footer>
            {setContent(<h3>Rp{thousand(product.price)}<small> /month</small></h3>)}
            {setContent(<p>Billing starts the month after installation</p>)}
          </footer>
        </Link>
      </section>
      <section className={styles.address}>
        <Heading>Installation Address</Heading>
        {setContent(<p>{address}</p>)}
      </section>
    </>
  );
}

InstallationPackageInfo.defaultProps = {
  address: '',
  isLoading: false,
  product: '',
};

InstallationPackageInfo.propTypes = {
  address: PropTypes.string,
  isLoading: PropTypes.bool,
  product: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      description: PropTypes.string,
      id: PropTypes.string,
      name: PropTypes.string,
      price: PropTypes.number,
      mbps: PropTypes.number,
    }),
  ]),
};
