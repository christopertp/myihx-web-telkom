import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const AppContext = createContext({});

export default function AppContextProvider({ children }) {
  const { pathname, state = '' } = useLocation();
  const [modal, setModal] = useState(null);
  const [notif, setNotif] = useState('');
  const [overlay, setOverlay] = useState(false);
  const [prevNotif, setPrevNotif] = useState('');
  const value = {
    modal, setModal,
    notif, setNotif,
    overlay, setOverlay,
  };

  const npsMessage = useSelector(v => v.nps).message;

  const closeModal = e => {
    (e.target === e.currentTarget) && setModal(null);
  };

  useEffect(() => {
    const elNotif = document.getElementsByClassName('notif')[0];
    if (notif && !prevNotif) {
      elNotif.classList.add('active');
      setPrevNotif(notif);
      setTimeout(() => {
        setNotif('');
      }, 7500);
      setTimeout(() => {
        elNotif.classList.remove('active');
      }, 7000);
    } else if (!notif && prevNotif) {
      setPrevNotif('');
    }
  }, [notif]);

  useEffect(() => {
    state.notif && setNotif(state.notif);
  }, [state.notif]);

  useEffect(() => {
    const body = document.getElementsByTagName('body')[0];
    modal ? body.classList.add('modal-open') : body.classList.remove('modal-open');
  }, [modal]);

  useEffect(() => {
    document.getElementsByTagName('html')[0].scrollTo(0, 0);
    setModal(null);
  }, [pathname]);

  useEffect(() => {
    npsMessage === 'OK' && setNotif('Thanks for your feedback!');
  }, [npsMessage]);

  return (
    <AppContext.Provider value={value}>
      {children}
      <div className="modal" onClick={closeModal}>{modal}</div>
      {overlay && <div className="overlay" />}
      <div className="notif"
        style={{ backgroundColor: `${notif.split('---').length > 1 ? notif.split('---')[1] : '#0eb37e'}` }}
      >{notif.split('---')[0]}</div>
    </AppContext.Provider>
  );
}

AppContextProvider.defaultProps = {
  children: null,
};

AppContextProvider.propTypes = {
  children: PropTypes.node,
};
