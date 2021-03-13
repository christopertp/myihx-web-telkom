import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.scoped.css';

export default function Footer() {
  return (
    <footer className={styles.root}>
      <section>
        <div className={styles.left}>
          <h5>Quick links</h5>
          <Link to="">Latest News</Link>
          <Link to="">How to Check My Bills</Link>
          <Link to="">Complaint Ticketing</Link>
          <Link to="">How to Use App</Link>
          <Link to="">Partnership</Link>
        </div>
        <div className={styles.middle}>
          <h5>Connect with us</h5>
          <div>
            <a href="/"><img alt="appstore" src="/assets/button_appstore.png" /></a>
            <a href="/"><img alt="playstore" src="/assets/button_playstore.png" /></a>
          </div>
          <div>
            <a href="https://www.facebook.com/indihome/" />
            <a href="https://www.instagram.com/indihome/" />
            <a href="https://twitter.com/indihome/" />
            <a href="tel:147" />
          </div>
        </div>
        <div className={styles.right}>
          <h5>Powered by</h5>
          <img alt="telkom" src="/assets/logo_telkom-light.png" />
        </div>
      </section>
      <section>
        <p>&copy;2019 PT Telekomunikasi Indonesia (Persero) Tbk.</p>
        <Link to="">Privacy Policy</Link>
        <Link to="">Terms &amp; Conditions</Link>
      </section>
    </footer>
  );
}
