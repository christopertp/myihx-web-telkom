import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/elements/Button';
import WhiteCardPlain from '../../components/layouts/WhiteCardPlain';
import { thousand } from '../../utils/format';
import { getToken } from '../../utils/storage';
import { fetchBill } from './actions';
import styles from './styles.scoped.css';

export default function Bill() {
  const { billingPeriod, dueDate, message,
    isLoading, status, totalAmount } = useSelector(s => s.bill);
  const subtitle = 'Make sure your billing detail is correct';
  const loading = <span className="loading" />;
  const dispatch = useDispatch();

  useEffect(() => {
    if (getToken()) {
      dispatch(fetchBill());
    }
  }, []);

  if (message) {
    return <Failed />;
  }

  const paidLabel = (
    <div style={{ backgroundColor: `${status === 'PAID' ? '#0eb37e' : '#ee3124'}` }}>
      {status === 'PAID' ? 'Sudah' : 'Belum'} Dibayar
    </div>
  );

  return (
    <WhiteCardPlain back="/" subtitle={subtitle} title="Your Bill">
      <section className={styles.period}>
        <small>Billing Period</small>
        <small>Due Date</small>
        {isLoading ? loading : <strong>{billingPeriod}</strong>}
        {isLoading ? loading : <strong>{dueDate}</strong>}
      </section>
      <section className={styles.total}>
        <h4>Total</h4>
        {isLoading ? loading : <strong>Rp{thousand(totalAmount)}</strong>}
        {isLoading ? loading : paidLabel}
        <small>includes 10% tax</small>
      </section>
      <section className={styles.detail}>
        <h4>Bill Detail</h4>
        {isLoading ?
          <div className={styles.loading}>
            {loading}
          </div> :
          <Detail />
        }
      </section>
      <section className={styles.action}>
        <Button to="/payment/postpaid">PAY</Button>
        <small>Have questions about this bill?</small>
        <Link to="/help">GET HELP</Link>
      </section>
    </WhiteCardPlain>
  );
}

export function Detail() {
  const { details } = useSelector(s => s.bill);

  return details.map((v, i) => (
    <div key={i}>
      <strong>{v.billName}</strong>
      <p>Rp{thousand(v.amount)}</p>
      <small>{v.billingInfo}</small>
    </div>
  ));
}

export function Failed() {
  return (
    <WhiteCardPlain icon="warning" size="medium" title="Bill not found">
      <Button to="/">Back to home</Button>
    </WhiteCardPlain>
  );
}
