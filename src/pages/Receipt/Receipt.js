import React, { useEffect } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Button from '../../components/elements/Button';
import IconButton from '../../components/elements/IconButton';
import Spinner from '../../components/elements/Spinner';
import WhiteCardPlain from '../../components/layouts/WhiteCardPlain';
import { thousand } from '../../utils/format';
import { fetchBillingDetail, resetData } from './actions';
import styles from './styles.scoped.css';

export default function Receipt() {
  const dispatch = useDispatch();
  const { period } = useParams();
  const { isLoading, payId } = useSelector(s => s.receipt);

  useEffect(() => {
    dispatch(fetchBillingDetail(period));
    return () => {
      dispatch(resetData());
    };
  }, []);

  if(isLoading) {
    return <div className={styles.load}><Spinner color="#ee3124" size="9rem" /></div>;
  }
  if(!payId) {
    return <Failed />;
  }
  return <ReceiptCard />;
}

export function ReceiptCard() {
  const { payId, payLocation, payDate, totalAmount } = useSelector(s => s.receipt);

  const makeDate = (format = 'dddd, Do MMMM YYYY') => payDate ? moment(payDate).format(format) : '-';

  const total = thousand(totalAmount);

  const icon = (window.innerWidth < 768) ? 'close_white' : 'back_red';

  return (
    <section className={styles.cardroot}>
      <IconButton className={styles.back} name={icon} to="/history/bill" />
      <header className={styles.headerDetail}>
        <img alt="success" className={styles.img} src="/assets/grfx_success.svg"/>
        <h1>Transaction Successful</h1>
        <p>{makeDate()}</p>
        <p>Transaction ID { payId }</p>
      </header>
      <article className={styles.detailContent}>
        <h3>Payment Details</h3>
        <section className={styles.column}>
          <article>
            <h4>Billing Period</h4>
            <p>{makeDate('MMMM YYYY')}</p>
          </article>
          <article>
            <h4>Payment Method</h4>
            <p>{(payLocation) ? payLocation : '-'}</p>
          </article>
        </section>
        <h3>Bill Details</h3>
        <List />
        <h3>Total Paid</h3>
        <p className={styles.grand}>Rp{ total }</p>
        <p className={styles.note}>Includes 10% Tax</p>
      </article>
    </section>
  );
}

export function List() {

  const { payDetail } = useSelector(s => s.receipt);

  return (
    <ul>
      {
        payDetail.map((item, id) => (
          <li key={id}>
            <span>{item.detail}</span>
            <span>
              {
                (() => {
                  const amount = item.namount.toString();
                  const firstNum = amount.split('')[0];
                  return `${firstNum === '-' ? firstNum : ''}Rp${thousand(Math.abs(amount))}`;
                })()
              }
            </span>
          </li>
        ))
      }
    </ul>
  );
}

export function Failed() {
  return (
    <WhiteCardPlain
      icon="status_failed"
      subtitle="Try refreshing the page or comeback later."
      title="Something went wrong."
    >
      <Button className={styles.nodata} to="/history/bill">Back to History</Button>
    </WhiteCardPlain>
  );
}
