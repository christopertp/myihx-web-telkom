import React, { createContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Tabs from '../../components/elements/Tabs';
import Button from '../../components/elements/Button';
import Arrow from '../../components/icons/Arrow';
import styles from './styles.scoped.css';

const Context = createContext({});

export default function Promo() {
  return (
    <Context.Provider>
      <PromoDetail />
    </Context.Provider>
  );
}

export function PromoDetail() {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <section className={styles.root}>
      <header>
        <Link to="/inbox">
          <Arrow fill="#EE3124" />
        </Link>
        <h1>Promo</h1>
        <h1>Wujudkan Semarak Kebahagiaan</h1>
        <p>30% off Minipack IndiKids dan IndiSport</p>
        <img alt="Dummy Image" src="/assets/banner_1_lines.png" />
      </header>
      <Tabs
        activeTab={activeTab}
        className={styles.tabs}
        setActiveTab={setActiveTab}
        value={['Promo Detail', 'Terms & Condition']}
      />
      {activeTab === 0 ? (
        <>
          <div className={styles['content-tabs']}>
            <h1>Most Popular for Family of 4:Unlimited 50Mbps Internet & USee TV</h1>
            <small>21 June 2020, 10:00</small>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industry's standard dummy text ever since the 1500s, when an unknown
              printer took a galley of type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into electronic typesetting,
              remaining essentially unchanged. It was popularised in the 1960s with the release of
              Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industry's standard dummy text ever since the 1500s, when an unknown
              ntaining Lorem Ipsum passages, and more recently with desktop publishing software like
              Aldus PageMaker including versions of Lorem Ipsum.
            </p>
          </div>
          <div className={styles['promo-offer']}>
            <h1>MiniPack IndiKids</h1>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industry's standard dummy text ever since the 1500s, when an unknown
              ntaining Lorem Ipsum passages, and more recently with desktop publishing software like
              Aldus PageMaker including versions of Lorem Ipsum.
            </p>
            <img alt="Dummy Image" src="/assets/banner_1_lines.png" />
            <Button>Get Offer</Button>
          </div>
        </>
      ) : (
        <div className={styles['content-tabs']}>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type specimen book. It has
            survived not only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s with the release of
            Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </p>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            Aldus PageMaker including versions of Lorem Ipsum.
          </p>
          <Button>Get Offer</Button>
        </div>
      )}
    </section>
  );
}
