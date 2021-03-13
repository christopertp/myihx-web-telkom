import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../elements/Button';
import CompleteBy from '../../elements/CompleteBy';
import IconButton from '../../elements/IconButton';
import styles from './styles.scoped.css';

export default function PaymentFailed() {
  const dispatch = useDispatch();
  const query = new URLSearchParams(useLocation().search);
  const invoice = `MYIRX-${query.get('invoice')}`;
  const { deadline, paymentType, fetchPaymentStatus } = useSelector(s => s.payment);

  const currentTime = new Date();
  const expireTime = new Date(deadline);
  const timeInSeconds = (expireTime - currentTime) / (1000 * 60) * 60;

  useEffect(() => {
    invoice && dispatch(fetchPaymentStatus(invoice));
  }, [invoice]);

  const PaymentFail = 'Payment Failed';
  const PaymentFailDesc = 'Sorry, it seems like your payment has failed. Please try again!';
  const PaymentTimeOut = 'Transaction Cancelled';
  const PaymentTimeOutDesc = 'Sorry order has been cancelled due to timeout.';

  return (
    <section className={styles.cardroot}>
      <IconButton className={styles.back} name="close_red" to="/" />
      <header className={styles.headerDetail}>
        <img alt="failed" className={styles.img} src="/assets/grfx_status_failed.svg"/>
        <h1>{timeInSeconds < 0 ? PaymentTimeOut : PaymentFail}</h1>
        <p>{timeInSeconds < 0 ? PaymentTimeOutDesc : PaymentFailDesc}</p>
      </header>
      {
        timeInSeconds < 0 ?
          null
          :
          <>
            {(timeInSeconds && paymentType === 'DEPOSIT') && <CompleteBy initTime={timeInSeconds} />}
            <article className={styles.nextSchedule}>
              <Button to={`/payment/${paymentType.toLowerCase()}/${invoice}`}>TRY AGAIN</Button>
            </article>
          </>
      }
    </section>
  );
}
