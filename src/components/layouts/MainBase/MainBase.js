import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import Header from '../../elements/Header';
import Footer from '../../elements/Footer';
import ModalLogin from '../../elements/ModalLogin';
import Toolbar from '../../elements/Toolbar';
import styles from './styles.scoped.css';

export default function MainBase(props) {
  const { children } = props;
  const [modal, setModal] = useState(false);
  const [white, setWhite] = useState('');
  const { pathname } = useLocation();

  useEffect(() => {
    const app = document.getElementById('app');
    app.classList.add('home');
    return () => {
      app.className = '';
    };
  }, []);

  useEffect(() => {
    const isWhite = pathname !== '/' && (pathname.split('/')[1] !== 'shop' || pathname.split('/')[3] === 'package');
    setWhite(isWhite ? styles.white : '');
  }, [pathname]);

  return (
    <>
      <Header onClickLogin={() => setModal(true)} />
      <main className={[styles.main, white].filter(Boolean).join(' ')}>{children}</main>
      <Footer />
      <Toolbar onClickLogin={() => setModal(true)} />
      <ModalLogin onClose={() => setModal(false)} open={modal} />
    </>
  );
}

MainBase.defaultProps = {
  children: null,
};

MainBase.propTypes = {
  children: PropTypes.node,
};
