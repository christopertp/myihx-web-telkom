import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import Button from '../../components/elements/Button';
import Card from '../../components/elements/Card';
import PaymentBankTransfer from '../../components/fragments/PaymentBankTransfer';
import PaymentSuccess from '../../components/fragments/PaymentSuccess';
import PaymentFailed from '../../components/fragments/PaymentFailed';
import WhiteCardPlain from '../../components/layouts/WhiteCardPlain';
import useTimer from '../../hooks/useTimer';
import { thousand } from '../../utils/format';
import { fetchMethods, fetchLinkAjaDebitCC } from './actions';
import styles from './styles.scoped.css';

export default function Payment() {
  const { method, detail } = useParams();

  if (detail === 'bank-transfer') {
    return <PaymentBankTransfer />;
  }

  return (m => {
    switch (m) {
      case 'deposit' : return <Method />;
      case 'failed': return <PaymentFailed />;
      case 'postpaid' : return <Method />;
      case 'prepaid' : return <Method />;
      case 'success': return <PaymentSuccess />;
      default: return <NotExist />;
    }
  })(method);
}

export function Method() {
  const dispatch = useDispatch();
  const { method, code } = useParams();
  const { amount, transactionId, loading, message } = useSelector(s => s.payment);

  useEffect(() => {
    if (method) {
      dispatch(fetchMethods(method, code));
    }
  }, [method]);

  if (message) {
    return <NotExist />;
  }

  return (
    <WhiteCardPlain size="medium" title="Payment">
      <div className={styles.header}>
        {loading.p ? <span className="loading" /> : (method === 'deposit') && <Timer />}
        <h3>Payment Due</h3>
        {loading.p ? <span className="loading" /> : <h2>Rp{thousand(amount)}</h2>}
        <p>Includes PPn 10%</p>
        <h3>Payment Code</h3>
        {loading.p ? <span className="loading" /> : <h2>{transactionId}</h2>}
      </div>
      {
        loading.p ?
          <div className={styles.loading}>
            <span className="loading" />
            <span className="loading" />
            <span className="loading" />
          </div> :
          <List />
      }
    </WhiteCardPlain>
  );
}

export function List() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { method } = useParams();
  const { amount, transactionId, methods } = useSelector(s => s.payment);

  return methods.map(v => {
    const status = {
      BANK_TRANSFER: { onClick: () => { history.push(`${method}/bank-transfer`); } },
      DEBIT_CC: { onClick: () => { dispatch(fetchLinkAjaDebitCC(method, { amount, transactionId, type: 'DEBIT_CC', })); } },
      LINK_AJA: { onClick: () => { dispatch(fetchLinkAjaDebitCC(method, { amount, transactionId, type: 'LINK_AJA', })); } },
      TMONEY: { onClick: () => {} },
    };

    return (
      <Card className={styles.list} key={v.methodId} onClick={status[v.type].onClick}>
        <img alt={v.label} src={v.icon} />
        <strong>{v.label}</strong>
        <small>{v.info}</small>
        <img alt="chevron_red" src="/assets/ic_chevron_red.svg" />
      </Card>
    );
  });
}

export function NotExist() {
  return (
    <WhiteCardPlain icon="warning" size="medium" title="Payment does not exist">
      <Button to="/">Back to home</Button>
    </WhiteCardPlain>
  );
}

export function Timer() {
  const { deadline } = useSelector(s => s.payment);
  const currentTime = new Date();
  const expireTime = new Date(deadline);
  const timeInSeconds = (expireTime - currentTime) / (1000 * 60) * 60;

  const { time } = useTimer(Math.floor(timeInSeconds));
  const [hour, min] = time;
  return (
    <div className={styles.timer}>
      <img alt="time" src="/assets/ic_timer.svg" />
      <span>{hour}:{min}</span>
    </div>
  );
}
