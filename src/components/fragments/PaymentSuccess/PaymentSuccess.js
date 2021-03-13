import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../elements/Button';
import Heading from '../../elements/Heading';
import IconButton from '../../elements/IconButton';
import { thousand } from '../../../utils/format';
import styles from './styles.scoped.css';

export default function PaymentSuccess() {
  const dispatch = useDispatch();
  const query = new URLSearchParams(useLocation().search);
  const invoice = `MYIRX-${query.get('invoice')}`;
  const { productInfo, customer,
    fetchPaymentStatus, totalDue } = useSelector(s => s.payment);

  useEffect(() => {
    invoice && dispatch(fetchPaymentStatus(invoice));
  }, [invoice]);

  return (
    <section className={styles.cardroot}>
      <IconButton className={styles.back} name="close_red" to="/" />
      <header className={styles.headerDetail}>
        <img alt="success" className={styles.img} src="/assets/grfx_success.svg"/>
        <h1>Payment Success</h1>
        <p>Friday, 5th June 2020</p>
        <p>Order ID {invoice}</p>
      </header>
      <article>
        <Heading>Package</Heading>
        <section className={styles.detailPackage}>
          <article>
            <span>
              <h4>{productInfo.value}</h4>
              <p>{productInfo.unit}</p>
            </span>
            <h4>{productInfo.name}</h4>
            <small>{productInfo.description}</small>
          </article>
          <article>
            <h4>Rp{thousand(totalDue)}<small>/month</small></h4>
            <small>Billing starts the month after installation</small>
          </article>
        </section>
        <Heading>Your Information</Heading>
        <section className={styles.information}>
          <article>
            <h4>Name</h4>
            <p>{customer.name}</p>
          </article>
          <article>
            <h4>KTP Number</h4>
            <p>{customer.identityNumber}</p>
          </article>
          <article>
            <h4>Installation Address</h4>
            <p>{customer.installationAddress}</p>
          </article>
        </section>
      </article>
      <article className={styles.nextSchedule}>
        <h4>Next, schedule your internet installation below</h4>
        <Button to="/installation">SCHEDULE INSTALLATION</Button>
      </article>
    </section>
  );
}
