import React, { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { AppContext } from '../../../contexts';
import Bullet from '../../elements/Bullet/Bullet';
import Button from '../../elements/Button';
import Card from '../../elements/Card';
import Heading from '../../elements/Heading';
import IconButton from '../../elements/IconButton';
import useTimer from '../../../hooks/useTimer';
import WhiteCardPlain from '../../layouts/WhiteCardPlain';
import { thousand } from '../../../utils/format';
import styles from './styles.scoped.css';

export default function PaymentBankTransfer() {
  const history = useHistory();
  const { bank, code, detail, method } = useParams();

  useEffect(() => {
    detail && history.replace(`/payment-${code}/${method}`);
  }, []);

  return (
    <>
      {(b => {
        if (b) {
          return <BankDetail />;
        } else {
          return <ListBank />;
        }
      })(bank)}
      <Notif />
    </>
  );
}

export function ListBank() {
  const dispatch = useDispatch();
  const { method } = useParams();
  const { amount, transactionId, bankInfo, fetchBankTransfer } = useSelector(s => s.payment);

  const subtitle = 'Pilih Bank yang dituju';

  if (!bankInfo) {
    return null;
  }

  return (
    <WhiteCardPlain subtitle={subtitle} title="Pilih Bank">
      <section className={styles.root}>
        {
          bankInfo.map((v, i) => (
            <section key={i}
              onClick={() => {
                dispatch(fetchBankTransfer(method, amount, v.codeBank, transactionId, v));
              }}>
              <strong>{v.name}</strong>
              <img alt="chevron red" src="/assets/ic_chevron_red.svg" />
            </section>
          ))
        }
      </section>
    </WhiteCardPlain>
  );
}

export function BankDetail() {
  const dispatch = useDispatch();
  const accountNumberRef = useRef(null);
  const { amount, paymentCode, detailBank, loading,
    transactionId, setMessageAction } = useSelector(s => s.payment);

  const copyToClipboard = e => {
    accountNumberRef.current.select();
    document.execCommand('copy');
    e.target.focus();
    dispatch(setMessageAction('Copied!'));
  };

  return (
    <section className={styles.cardroot}>
      <IconButton className={styles.back} name="close_red" to="/" />
      <header className={styles.logo}>
        {loading.b ? <span className="loading" /> : <img alt="logo bank" src={detailBank.icon} />}
      </header>
      <section className={styles.account}>
        <Heading>Account Number</Heading>
        {loading.b ? <span className="loading" /> : <input readOnly ref={accountNumberRef} type="text" value={paymentCode} />}
        <Button onClick={copyToClipboard}>COPY</Button>
      </section>
      <section className={styles.amount}>
        <Heading>Transfer Amount</Heading>
        {loading.b ? <span className="loading" /> : <strong>Rp {thousand(amount)}</strong>}
        <Heading>Payment Code</Heading>
        {loading.b ? <span className="loading" /> : <strong>{transactionId}</strong>}
      </section>
      <Timer />
      <section className={styles.accordion}>
        <Heading>Lihat cara pembayaran</Heading>
        {loading.b ? <span className="loading" /> : <HowToPay />}
      </section>
      <Button to="/">TUTUP</Button>
    </section>
  );
}

export function HowToPay() {
  const { detailBank } = useSelector(s => s.payment);
  const [idxOpen, setIdxOpen] = useState(-1);

  const height = (item, idx) => {
    let row = 0;
    let rowHeight = 5;
    if (item.howToPay) {
      row = item.howToPay.length;
      rowHeight = ((row * 16) / 3.8 + 2);
    }
    return idx === idxOpen ? `${rowHeight}rem` : '3.5rem';
  };

  const onClickOpen = idx => () => {
    setIdxOpen(idx === idxOpen ? -1 : idx);
  };

  return (
    detailBank && detailBank.details.map((i, idx) => (
      <Card className={styles['channel-card']} key={idx} style={{ height: height(i, idx) }}>
        <header className={styles.headerCard} onClick={onClickOpen(idx)}>
          <h6>{i.name}</h6>
          <IconButton className={idx === idxOpen ? styles.open : ''} name="chevron_red_down" onClick={onClickOpen(idx)} />
        </header>
        <ul>
          {i.howToPay && i.howToPay.map((v, vdx) =>
            (<li key={vdx}>
              <Bullet connect={vdx < i.howToPay.length - 1} />
              <h5>{v.header}</h5>
              <p style={{ paddingBottom: `${!v.description ? '2.1rem' : '0.7rem'}` }}>{v.description}</p>
            </li>)
          )}
        </ul>
      </Card>
    ))
  );
}

export function Notif() {
  const { message } = useSelector(s => s.payment);
  const { setNotif } = useContext(AppContext);

  useEffect(() => {
    setNotif(message);
  }, [message]);

  return null;
}

export function Timer() {
  const { deadline } = useSelector(s => s.payment);
  const currentTime = new Date();
  const expireTime = new Date(deadline);
  const timeInSeconds = (expireTime - currentTime) / (1000 * 60) * 60;

  const { time } = useTimer(Math.floor(timeInSeconds));
  const [hour, min, sec] = time;
  return (
    <div className={styles.timer}>
      <img alt="time" src="/assets/ic_selection_time.svg" />
      <span>Complete payment by</span>
      <span>{hour}:{min}:{sec}</span>
    </div>
  );
}
