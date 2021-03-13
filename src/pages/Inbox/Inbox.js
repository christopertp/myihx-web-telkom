import React, { createContext } from 'react';
import { Link } from 'react-router-dom';
import Heading from '../../components/elements/Heading';
import InboxMenu from '../../components/elements/HistoryInboxMenu';
import Arrow from '../../components/icons/Arrow';
import styles from './styles.scoped.css';

const Context = createContext({});

export default function Inbox() {
  const links = [
    { page: 'all', to: '/inbox/all', text: 'All' },
    { page: 'personal', to: '/inbox/personal', text: 'Personal' },
    { page: 'promo', to: '/inbox/promo', text: 'Promo' },
  ];

  return (
    <Context.Provider>
      <header className={styles.header}>
        <Link to="/">
          <Arrow fill="#FFFFFF" />
          <Arrow fill="#EE3124" />
          Home
        </Link>
        <h1>Inbox</h1>
      </header>
      <article className={styles.article}>
        <InboxMenu links={links} />
        <section className={styles.all}>
          <Heading>Active Packages</Heading>
          <Link to="/promo/tes">
            <img alt="" src="/assets/av_notif_promo.svg" />
            <small>12 June 2019, 10:00 </small>
            <h3>Most Popular for Family of 4:Unilimited 50Mbps Internert Usee TV</h3>
            <img alt="Dummy Image" src="/assets/banner_1_lines.png" />
          </Link>
          <Link to="/promo/tes">
            <img alt="" src="/assets/av_notif_promo.svg" />
            <small>12 June 2019, 10:00</small>
            <h3>Most Popular for Family of 4:Unilimited 50Mbps Internert Usee TV</h3>
            <img alt="Dummy Image" src="/assets/banner_1_lines.png" />
          </Link>
        </section>
      </article>
    </Context.Provider>
  );
}
