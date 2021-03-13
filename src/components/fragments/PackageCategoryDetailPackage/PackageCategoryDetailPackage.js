import React from 'react';
import { useSelector } from 'react-redux';
import Heading from '../../elements/Heading';
import Package from '../../elements/Package';
import PopularPackage from '../../elements/PopularPackage';
import styles from './styles.scoped.css';

export default function PackageCategoryDetailPackage() {

  return window.innerWidth < 768 ? <MobileList /> : <DesktopList />;

}

export function MobileList() {

  const { product } = useSelector(s => s.packageCategory);

  return (
    <section className={styles.mobilelist}>
      <Heading>Packages</Heading>
      <ul className={styles['list-mob']}>
        {
          product.map((item, i) => (
            <Package data={item} key={i} />
          ))
        }
      </ul>
    </section>
  );
}

export function DesktopList() {

  const { product } = useSelector(s => s.packageCategory);

  return (
    <section className={styles.desktoplist}>
      <Heading>Packages</Heading>
      <ul className={styles.list}>
        {
          product.map((item, i) => (
            <PopularPackage data={item} key={i} />
          ))
        }
      </ul>
    </section>
  );
}
