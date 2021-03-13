import React, { createContext, useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';
import Button from '../../components/elements/Button';
import HistoryMenu from '../../components/elements/HistoryInboxMenu';
import IconButton from '../../components/elements/IconButton';
import ModalBillDownload from '../../components/elements/ModalBillDownload';
import Arrow from '../../components/icons/Arrow';
import { AppContext } from '../../contexts';
import { thousand } from '../../utils/format';
import { fetchHistory, notifiedAction } from './actions';
import styles from './styles.scoped.css';

const Context = createContext({});

export default function History() {
  const { data, isLoading, message } = useSelector(s => s.history);
  const { page } = useParams();
  const dispatch = useDispatch();
  const links = [
    { page: 'bill', to: '/history/bill', text: 'Bill' },
    { page: '', to: '', text: 'Purchase' },
    { page: '', to: '', text: 'Activity' },
  ];
  const isFail = message || (!isLoading.p && !data.length);
  const currentPage = () => {
    if (isFail) {
      return 'blank';
    } else if (!isLoading.p && data.length) {
      return page;
    }
    return 'loading';
  };

  useEffect(() => {
    dispatch(fetchHistory(page));
  }, [page]);

  return (
    <Context.Provider>
      <header className={styles.header}>
        <Link to="/">
          <Arrow fill="#FFFFFF" />
          <Arrow fill="#EE3124" />
          Home
        </Link>
        <h1>History</h1>
      </header>
      <article className={styles.article}>
        <HistoryMenu links={links} />
        <section className={styles[currentPage()]}>
          {isFail ? <BlankState /> : <Bill />}
        </section>
      </article>
    </Context.Provider>
  );
}

export function Bill() {
  const [ modalBill, setModalBill ] = useState(false);
  const { data, isLoading, notifMessage } = useSelector(s => s.history);

  return (
    <>
      {
        isLoading.p
          ? <>
            <span className="loading" />
            {
              [...Array.from({ length: 3 }).keys()].map(i => (
                <div key={i}>
                  <span className="loading" />
                  <span className="loading" />
                </div>
              ))
            }
          </>
          : <>
            <header>
              <h3>Your Payments</h3>
              <IconButton name="email" onClick={() => setModalBill(true)} />
            </header>
            {
              data.map((i, idx) => (
                <Link key={idx} to={`/receipt/${i.period}`}>
                  <small>{(i.paymentDate) ? moment(i.paymentDate).format('DD MMMM YYYY') : ''}</small>
                  <p>Rp{thousand(i.totalAmount)}</p>
                  <p>{moment(i.period).month(i.period.slice(-2)-1).year(i.period.slice(0,4)).format('MMMM YYYY')}</p>
                </Link>
              ))
            }
          </>
      }
      <ModalBillDownload onClose={() => setModalBill(false)} open={modalBill} />
      <Notif message={notifMessage} />
      <Overlay isSending={isLoading.b} />
    </>
  );
}

export function BlankState() {
  const { page } = useParams();
  const description = {
    bill: <>You don't have any bill history.<br/>Subscribe to start using IndiHome</>,
  };
  const icon = {
    bill: 'blank_history',
  };
  const btnText = {
    bill: 'Browse Package',
  };
  const btnTo = {
    bill: '/shop/internet',
  };

  return (
    <>
      <img alt="blank history" src={`/assets/grfx_${icon[page]}.svg`} />
      <p>{description[page]}</p>
      <Button to={btnTo[page]}>{btnText[page]}</Button>
    </>
  );
}

export function Notif(props) {
  const { setNotif } = useContext(AppContext);
  const { message } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    if (message) {
      setNotif(message);
      dispatch(notifiedAction(''));
    }
  }, [message]);

  return null;
}

export function Overlay(props) {
  const { setOverlay } = useContext(AppContext);
  const { isSending } = props;

  useEffect(() => {
    setOverlay(isSending);
  }, [isSending]);

  return null;
}
