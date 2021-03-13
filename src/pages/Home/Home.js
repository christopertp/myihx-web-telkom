import React, { createContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import ActivityCards from '../../components/elements/ActivityCards';
import Button from '../../components/elements/Button';
import PackageFinderLink from '../../components/elements/PackageFinderLink';
import Latest from '../../components/fragments/HomeLatest';
import NotificationCards from '../../components/elements/NotificationCards';
import PrimaryActions from '../../components/fragments/HomePrimaryActions';
import Recommended from '../../components/fragments/HomeRecommended';
import ShopMenu from '../../components/fragments/HomeShopMenu';
import Subscribe from '../../components/fragments/HomeSubscribe';
import { getToken } from '../../utils/storage';
import { fetchBill, fetchHome, fetchProfile, fetchStatusCard, fetchNotifCard } from './actions';
import styles from './styles.scoped.css';

const Context = createContext({});

export default function Home() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHome());
  }, []);

  return (
    <Context.Provider value={{}}>
      {(pathname.match('/shop')) ? <Shop /> : <HomePage />}
    </Context.Provider>
  );
}

export function Shop() {
  return (
    <>
      <UpgradeBanner />
      <ShopMenu />
      <Recommended />
      <Latest />
      <Subscribe />
      <PackageFinderLink className={styles.finder} />
    </>
  );
}

export function UpgradeBanner() {
  return (
    <section className={styles['upgrade-banner']}>
      <h2>Have a need for speed?</h2>
      <p>Upgrade your speed for 10% off</p>
      <Button to="#" variant="white">Upgrade Package</Button>
    </section>
  );
}

export function HomePage() {
  const dispatch = useDispatch();
  const { card, isLoading, notif } = useSelector(s => s.home);

  useEffect(() => {
    if (getToken()) {
      dispatch(fetchBill());
      dispatch(fetchProfile());
      dispatch(fetchStatusCard());
      dispatch(fetchNotifCard());
    }
  }, []);

  return (
    <>
      <Welcome />
      <PrimaryActions />
      {!!getToken() && <NotificationCards isLoading={isLoading.n} notif={notif} />}
      {!!getToken() && <ActivityCards cards={card} heading="Upcoming" isLoading={isLoading.c} />}
      <Recommended />
      <Latest />
      <Subscribe />
    </>
  );
}

export function Welcome() {
  const { fullName, profilePicture } = useSelector(s => s.home);

  if (getToken()) {
    return (
      <Link className={styles.user} to="/profile">
        <figure style={{ backgroundImage: `url(${profilePicture})` }} />
        <span>Selamat Datang</span>
        <span>{fullName}</span>
        <span>0 pts</span>
      </Link>
    );
  }

  return (
    <section className={styles.welcome}>
      <small>Welcome to</small>
      <p>myIndiHome X</p>
    </section>
  );
}
