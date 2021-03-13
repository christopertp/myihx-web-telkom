import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.scoped.css';

export default function HomeShopMenu() {
  const menu = [
    {
      link: '/shop/internet',
      img: 'ic_shop_internet_white.png',
      alt: 'Internet'
    },
    {
      link: '#',
      img: 'ic_shop_tv_white.png',
      alt: 'TV'
    },
    {
      link: '#',
      img: 'ic_shop_call_white.png',
      alt: 'Call'
    },
    {
      link: '/shop/more',
      img: 'ic_shop_more_white.png',
      alt: 'Other'
    },
  ];

  return (
    <section className={styles.menu}>
      <ul>
        {menu.map((i, idx) =>
          (<li key={idx}>
            <Link
              to={i.link}
            >
              <img
                alt={i.alt}
                src={`/assets/${i.img}`}
              />
              <h5>{i.alt}</h5>
            </Link>
          </li>)
        )}
      </ul>
    </section>
  );
}

