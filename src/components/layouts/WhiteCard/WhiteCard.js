import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import IconButton from '../../elements/IconButton';
import styles from './styles.scoped.css';

export default function WhiteCard(props) {
  const { back, children, icon, subtitle, title } = props;

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
          <img alt="IndiHome Logo" src="/assets/logo_indihome-dark.png" />
        </Link>
      </nav>
      <main className={styles.main}>
        <header>
          <IconButton name="back_red" to={back} />
          <IconButton name="help_red" to="/help" />
        </header>
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

WhiteCard.defaultProps = {
  back: '',
  children: null,
  icon: '',
  subtitle: '',
  title: '',
};

WhiteCard.propTypes = {
  back: PropTypes.string,
  children: PropTypes.node,
  icon: PropTypes.string,
  subtitle: PropTypes.string,
  title: PropTypes.string,
};
