import React from 'react';
import WhiteCardPlain from '../../components/layouts/WhiteCardPlain';
import styles from './styles.scoped.css';

export default function About() {
  return (
    <WhiteCardPlain back="/profile" size="medium">
      <div className={styles.root}>
        <section className={styles.logo}>
          <img alt="my indihome" src="/assets/my_indi_home.svg" />
          <p>v.1.2.3.4</p>
        </section>
        <p>Aplikasi yang digunakan untuk berlangganan IndiHome,
        aktivasi OTT Video Streaming, registrasi berbagai fitur tambahan,
        melaporkan gangguan layanan IndiHome, cek tagihan,
          cek poin myIndiHome, info pemakaian, serta layanan menarik lainnya.</p>
        <section className={styles.social}>
          <a href="//web.facebook.com/IndiHome/" target="_blank" >
            <img alt="indihome facebook" src="/assets/ic_social_fb.svg" />
          </a>
          <a href="//twitter.com/indihome" target="_blank" >
            <img alt="indihome twitter" src="/assets/ic_social_twitter.svg" />
          </a>
          <a href="//www.instagram.com/indihome/" target="_blank" >
            <img alt="indihome instagram" src="/assets/ic_social_insta.jpg" />
          </a>
          <a href="//www.indihome.co.id/" target="_blank" >
            <img alt="indihome website" src="/assets/ic_social_web.svg" />
          </a>
        </section>
      </div>
    </WhiteCardPlain>
  );
}
