import React from 'react';
import { useSelector } from 'react-redux';
import Button from '../../elements/Button';
import useSlider from '../../../hooks/useSlider';
import { remToPx } from '../../../utils/unit';
import styles from './styles.scoped.css';

export default function HomeSubscribe() {
  const { isLoading, subscriptions } = useSelector(s => s.home);
  const slider = useSlider(3000, remToPx(1));
  return (
    <section className={styles.root}>
      {(
        isLoading.h || !subscriptions || <>
          <h4>Subscribe &amp; Watch</h4>
          <div className={styles.logos}>
            {subscriptions.vodImages.map((i, idx) => <img alt="vod" key={idx} src={i} />)}
          </div>
          <h2>{subscriptions.title}</h2>
          <p>{subscriptions.description}</p>
          <Button>Subscribe</Button>
          <ul {...slider}>
            {subscriptions.images.map((i, idx) => <img alt="" key={idx} src={i} />)}
          </ul>
        </>
      )}
    </section>
  );
}
