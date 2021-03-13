import React, { createContext, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useHistory, useParams } from 'react-router-dom';
import Button from '../../elements/Button';
import Heading from '../../elements/Heading';
import Modal from '../../elements/Modal';
import Spinner from '../../elements/Spinner';
import CompleteBy from '../../elements/CompleteBy';
import WhiteCardPlain from '../../layouts/WhiteCardPlain';
import { thousand } from '../../../utils/format';
import styles from './styles.scoped.css';
import { fetchCancelOrder } from '../../../pages/Order/actions';

const Context = createContext({});

export default function OrderPackage() {
  const [modal, setModal] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const history = useHistory();
  const location = useLocation();
  const { subpage } = useParams();

  const contextValue = {
    modal, setModal,
    transactionId, setTransactionId,
  };

  useEffect(() => {
    const transactionId = (new URLSearchParams(location.search)).get('transactionId');
    setTransactionId(transactionId);
    if (!transactionId) {
      history.push('/');
    }
  }, []);

  return (
    <Context.Provider value={contextValue}>
      {subpage === 'toc' ? <Toc /> : <Main />}
    </Context.Provider>
  );
}

export function CancelOrder() {
  const { modal, setModal, transactionId } = useContext(Context);
  const dispatch = useDispatch();
  const cancelOrder = () => dispatch(fetchCancelOrder(transactionId));

  return (
    <Modal className={styles.dialog} onClose={() => setModal('')} open={modal === 'cancel'}>
      <h1>Are you sure you want to cancel your order?</h1>
      <p>Once cancelled, all information you have provided will be lost.</p>
      <div>
        <Button onClick={cancelOrder} variant="bordered">Yes</Button>
        <Button onClick={() => setModal('')}>No</Button>
      </div>
    </Modal>
  );
}

export function Detail() {
  const { modal, setModal } = useContext(Context);
  const { order } = useSelector(s => s.order);

  if (!order) {
    return null;
  }

  return (
    <Modal className={styles.detail} onClose={() => setModal(false)} open={modal === 'detail'}>
      {order.productInfo.productDetails.map((v, i) => (
        <React.Fragment key={i}>
          <h3>{v.title}</h3>
          <p>Rp{thousand(v.amount)}</p>
        </React.Fragment>
      ))}
      <hr/>
      <h2>Total Due</h2>
      <h1>Rp{thousand(order.totalDue)}</h1>
    </Modal>
  );
}

export function ErrorModal() {
  const dispatch = useDispatch();
  const { failedAction, message } = useSelector(s => s.order);

  const back = () => {
    dispatch(failedAction(''));
  };

  return (
    <Modal className={styles.warning} onClose={back} open={!!message}>
      <img alt="warning" src="/assets/grfx_warning.svg" />
      <h1>Transaction Failed</h1>
      <p>{message}</p>
      <Button onClick={back}>OK</Button>
    </Modal>
  );
}

export function Main() {
  const [toc, setToc] = useState(false);
  const { setModal, transactionId } = useContext(Context);
  const dispatch = useDispatch();
  const { fetchConfirmationSave, fetchOrder, isLoading, order } = useSelector(s => s.order);

  const initTime = ((new Date(order.deadLine).getTime()) - (new Date()).getTime()) / 1000;

  useEffect(() => {
    transactionId && dispatch(fetchOrder(transactionId));
  }, [transactionId]);

  return (
    <WhiteCardPlain back="/" size="medium" subtitle="Confirm your package selection and pay" title="Confirm Order">
      <div className={styles.root}>
        <Heading>Package</Heading>
        {
          isLoading.o ?
            <span className={styles.loading}>
              <span className="loading" />
              <span className="loading" />
            </span> :
            <>
              <div className={styles.card}>
                <div className={styles.package}>
                  <aside>
                    <h3>{order.productInfo.value}</h3>
                    <span>{order.productInfo.unit}</span>
                  </aside>
                  <h5>{order.productInfo.name}</h5>
                  <span>{order.productInfo.description}</span>
                </div>
                <h3>
                  Rp{thousand(order.productInfo.productDetails[0].amount)}
                  <small>/month</small>
                </h3>
                <span>Billing starts the month after installation</span>
              </div>
              <CompleteBy initTime={initTime} />
            </>
        }
        <Heading>Your Information</Heading>
        <h4>Name</h4>
        {isLoading.o ? <span className="loading" /> : <p>{order.customer.name}</p>}
        <h4>KTP Number</h4>
        {isLoading.o ? <span className="loading" /> : <p>{order.customer.identityNumber}</p>}
        <h4>Installation Address</h4>
        {isLoading.o ? <span className="loading" /> : <p>{order.customer.installationAddress}</p>}
        <Heading>Total Due</Heading>
        {
          isLoading.o ?
            <span className="loading" style={{ height: '2rem' }} /> :
            <h2>Rp{thousand(order.totalDue)}</h2>
        }
        <Button disabled={isLoading.o} onClick={() => setModal('detail')} variant="text">See Details</Button>
        <p>
          Deposit is due after installation. Your deposit  will be
          refunded if installation is cancelled by IndiHome. No refund
          will be issued if cancellation is initiated by customer.
        </p>
        <label>
          <input checked={toc} disabled={isLoading.s} onChange={() => setToc(!toc)} type="checkbox" />
          <span>
            I agree to myIndiHome <Link to="/order/package/toc">Terms & Conditions</Link>
          </span>
        </label>
        <div className={styles.footer}>
          <Button
            disabled={isLoading.s || isLoading.o}
            onClick={() => setModal('cancel')}
            variant="bordered"
          >
            Cancel
          </Button>
          <Button
            disabled={isLoading.s || isLoading.o || !toc}
            onClick={() => dispatch(fetchConfirmationSave(transactionId))}
          >
            {isLoading.s ? <Spinner /> : 'Next'}
          </Button>
        </div>
      </div>
      <CancelOrder />
      <Detail />
      <ErrorModal />
    </WhiteCardPlain>
  );
}

export function Toc() {
  const history = useHistory();
  const { order } = useSelector(s => s.order);

  if (!order) {
    history.push('/');
    return null;
  }

  return (
    <WhiteCardPlain>
      <div className={styles.toc}>
        <h1>Terms & Conditions</h1>
        {order.toc.split('\r\n').map((v, i) => <p key={i}>{v}</p>)}
      </div>
    </WhiteCardPlain>
  );
}
