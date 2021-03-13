import React from 'react';
import { useSelector } from 'react-redux';
import useSlider from '../../../hooks/useSlider';
import { remToPx } from '../../../utils/unit';
import styles from './styles.scoped.css';

export default function HomeRecommended() {
  const { isLoading, latestNews } = useSelector(s => s.home);
  const margin = (window.innerWidth < 768) ? remToPx(0.75) : remToPx(1);
  const slider = useSlider(3000, margin);
  return (
    <section className={styles.root}>
      <h4>Recommended for you</h4>
      <ul {...slider}>
        {
          isLoading.h
            ? [...Array.from({ length: 1 }).keys()].map(i => <li className="loading" key={i} />)
            : latestNews.map((i, idx) => <img alt="recommended" key={idx} src={i.image} />)
        }
      </ul>
    </section>
  );
}
