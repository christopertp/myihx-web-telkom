import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import useSlider from '../../../hooks/useSlider';
import { remToPx } from '../../../utils/unit';
import { getUserData } from '../../../utils/storage';
import ModalLogin from '../../../components/elements/ModalLogin';
import StickyPrice from '../../elements/StickyPrice';
import styles from './styles.scoped.css';

export default function ShopMoreHboGo() {
  const { logoImage, aboutTheServices, benefits } = useSelector(s => s.shopMore);
  const isLoggedIn = !!getUserData();
  const [modalLogin, setModalLogin] = useState(false);
  const onClickSubscribe = () => {
    isLoggedIn ? history.push('/order/hbo-go') : setModalLogin(true);
  };
  const onClickDetail = () => {};

  return (
    <>
      <section className={styles.root}>
        <img src={logoImage} />
        <OriginalSeries />
        <section className={styles.about}>
          <h4>About This Service</h4>
          <p>{ aboutTheServices }</p>
          <a href="#">Learn More</a>
        </section>
        <section className={styles.benefit}>
          <h4>Benefits</h4>
          <ul>
            {benefits.map((i, idx) =>
              (<li key={idx}>
                <img alt="hybrid box" src={i.image} />
                <h5>
                  {i.title}
                </h5>
                <p>{i.description}</p>
              </li>)
            )}
          </ul>
        </section>
        <section className={styles.drama}>
          <h4>Popular</h4>
          <h1>Drama</h1>
          <DramaSeries />
        </section>
        <section className={styles.action}>
          <h4>Thrilling</h4>
          <h1>Action</h1>
          <ActionSeries />
        </section>
        <section className={styles.howToUse}>
          <h4>How to use it</h4>
          <HowToUse />
        </section>
        <ModalLogin onClose={() => setModalLogin(false)} open={modalLogin} />
      </section>
      <StickyPrice
        onClickDetail={onClickDetail}
        onClickSubscribe={onClickSubscribe}
        price={60000}
      />
    </>
  );
}

export function OriginalSeries() {
  const { isLoading, hboShows } = useSelector(s => s.shopMore);
  const margin = (window.innerWidth < 768) ? remToPx(0.75) : remToPx(1);
  const slider = useSlider(3000, margin);

  return (
    <section className={styles.slider}>
      <h4>Original Series</h4>
      <ul {...slider}>
        {
          isLoading
            ? [...Array.from({ length: 2 }).keys()].map(i => <li className="loading" key={i} />)
            : hboShows.map((i, idx) => <img alt="" key={idx} src={i.image} />)
        }
      </ul>
    </section>
  );
}

export function DramaSeries() {
  const { isLoading, popularDrama } = useSelector(s => s.shopMore);
  const margin = (window.innerWidth < 768) ? remToPx(0.75) : remToPx(1);
  const slider = useSlider(3000, margin);

  return (
    <section className={styles.slider}>
      <ul {...slider}>
        {
          isLoading
            ? [...Array.from({ length: 2 }).keys()].map(i => <li className="loading" key={i} />)
            : popularDrama.map((i, idx) => <img alt="" key={idx} src={i.image} />)
        }
      </ul>
    </section>
  );
}

export function ActionSeries() {
  const { isLoading, thrillingAction } = useSelector(s => s.shopMore);
  const margin = (window.innerWidth < 768) ? remToPx(0.75) : remToPx(1);
  const slider = useSlider(3000, margin);

  return (
    <section className={styles.slider}>
      <ul {...slider}>
        {
          isLoading
            ? [...Array.from({ length: 2 }).keys()].map(i => <li className="loading" key={i} />)
            : thrillingAction.map((i, idx) => <img alt="" key={idx} src={i.image} />)
        }
      </ul>
    </section>
  );
}

export function HowToUse() {
  const { howToUse } = useSelector(s => s.shopMore);
  return (
    <ul>
      {howToUse.map((i, idx) =>
        (<li key={idx}>
          <div>
            <div />
          </div>
          <h5>
            {i.title}
          </h5>
          <p>{i.description}</p>
        </li>)
      )}
    </ul>
  );
}
