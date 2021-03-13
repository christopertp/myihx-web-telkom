import React, { useEffect } from 'react';
import WhiteCardPlain from '../../layouts/WhiteCardPlain';
import styles from './styles.scoped.css';
import { useDispatch, useSelector } from 'react-redux';

export default function ProfileAboutPoin() {

  const dispatch = useDispatch();
  const { aboutPoint, fetchAboutPoint } = useSelector(s => s.profile);

  useEffect(() => {
    dispatch(fetchAboutPoint());
  }, []);

  return(
    <WhiteCardPlain size="medium" subtitle={aboutPoint.pageDesc} title={aboutPoint.pageTitle}>
      <section className={styles.root}>
        {aboutPoint.content && aboutPoint.content.map((v, i) => (
          <section className={styles.contentAbout} key={i}>
            <strong>{v.header}</strong>
            {v.body.map((b, iB) => (
              <div key={iB}>
                <p>{b.text}</p>
                <section className={styles.howToGet}>
                  {b.descriptions && b.descriptions.map((d, iD) => (
                    <span key={iD}>
                      <strong>{d.header}</strong>
                      <small>{d.detail}</small>
                    </span>
                  ))}
                </section>
              </div>
            ))}
          </section>
        ))}
      </section>
    </WhiteCardPlain>
  );
}
