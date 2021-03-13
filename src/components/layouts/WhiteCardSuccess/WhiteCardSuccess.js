import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './styles.scoped.css';

export default function WhiteCardSuccess(props) {
  const { children, icon, subtitle, title } = props;

  useEffect(() => {
    const body = document.getElementsByTagName('body')[0];
    body.className = 'white-card';
    return () => {
      body.className = '';
    };
  }, []);

  return (
    <>
      <nav className={styles.nav}>
        <Link to="/">
          <img alt="Indihome Logo" src="/assets/logo_indihome-dark.png" />
        </Link>
      </nav>
      <main className={styles.main}>
        <img alt={icon} src={`/assets/grfx_${icon}.svg`} />
        <div className={styles.title}>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
        {children}
      </main>
    </>
  );
}

WhiteCardSuccess.defaultProps = {
  children: null,
  icon: '',
  subtitle: '',
  title: '',
};

WhiteCardSuccess.propTypes = {
  children: PropTypes.node,
  icon: PropTypes.string,
  subtitle: PropTypes.string,
  title: PropTypes.string,
};
