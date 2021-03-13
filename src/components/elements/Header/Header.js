import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import Button from '../Button';
import IconButton from '../IconButton';
import { getUserData } from '../../../utils/storage';
import styles from './styles.scoped.css';

export default function Header(props) {
  const { onClickLogin } = props;
  const [shadow, setShadow] = useState('');
  const user = getUserData();
  const isLoggedIn = !!user;
  const body = document.getElementsByTagName('body')[0];
  const [profilePicture, setProfilePicture] = useState(user.profilePicture);
  const [dateTime, setDatetime] = useState('123');
  const { pathname } = useLocation();
  const [language, setLanguage] = useState('ID');

  const onScroll = () => {
    const { scrollTop } = document.getElementsByTagName('html')[0];
    setShadow(scrollTop ? styles.shadow : '');
  };

  body.onscroll = onScroll;

  useEffect(() => {
    if (pathname === '/profile') {
      const { profilePicture } = getUserData();
      setProfilePicture(profilePicture);
      setDatetime(Date.now());
    }
    return () => (body.onscroll = () => { });
  }, [pathname]);

  return (
    <header className={[styles.root, shadow].filter(Boolean).join(' ')}>
      <img alt="IndiHome" src="/assets/logo_indihome-dark.png" />
      <nav>
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/help">Bantuan</Link>
        <IconButton name="search_red" title="Search for product" to="/search" />
        {isLoggedIn || <Button onClick={onClickLogin}>Masuk/Daftar</Button>}
        {isLoggedIn && <IconButton className={styles.notif} name="notif" title="Inbox" to="/inbox/all" />}
        {isLoggedIn && <IconButton name="bill" title="History" to="/history/bill" />}
        {isLoggedIn && (
          <Link className={styles.profile} to="/profile">
            <figure style={{ backgroundImage: `url(${profilePicture}?${dateTime})` }} />
          </Link>
        )}
        <Link
          className={language === 'ID' ? styles['lng-active'] : styles.lng}
          onClick={() => setLanguage('ID')}
          to="#">
          ID
        </Link>
        <Link
          className={language === 'EN' ? styles['lng-active'] : styles.lng}
          onClick={() => setLanguage('EN')}
          to="#">
          EN
        </Link>
      </nav>
    </header>
  );
}

Header.defaultProps = {
  onClickLogin: () => { },
};

Header.propTypes = {
  onClickLogin: PropTypes.func,
};
