import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useSlider from '../../../hooks/useSlider';
import { remToPx } from '../../../utils/unit';
import styles from './styles.scoped.css';

export default function HomeLatest() {
  const { isLoading, latestOffers } = useSelector(s => s.home);
  const slider = useSlider(3000, remToPx(1));
  return (
    <section className={styles.root}>
      <h4>Penawaran terbaru</h4>
      <ul {...slider}>
        {
          isLoading.h
            ? [...Array.from({ length: 2 }).keys()].map(i => (
              <li className={styles.loading} key={i}>
                <span className="loading" />
                <span className="loading" />
                <span className="loading" />
              </li>
            ))
            : latestOffers.map((i, idx) => (
              <li key={idx}>
                <img alt="" src={i.image} />
                <p>{i.title}</p>
                <Link to={`/shop/internet/package/${i.productId}`}>View Details</Link>
              </li>
            ))
        }
      </ul>
    </section>
  );
}
