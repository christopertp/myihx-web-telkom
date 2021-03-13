import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './styles.scoped.css';

export default function PackageFinderLink(props) {
  const { className } = props;
  const customClass = [styles.root, className].filter(Boolean).join(' ');
  return (
    <section className={customClass}>
      <Link to="#">
        <img alt="grfx find" src="/assets/grfx_find.png" />
        <span>Perlu bantuan memilih paket internet? Coba package finder kami</span>
        <img alt="chevron white" src="/assets/ic_chevron_white.svg" />
      </Link>
    </section>
  );
}

PackageFinderLink.defaultProps = {
  className: '',
};

PackageFinderLink.propTypes = {
  className: PropTypes.string,
};
