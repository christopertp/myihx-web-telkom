import React, { createContext, useContext, useEffect, useState } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import Button from '../../components/elements/Button';
import Heading from '../../components/elements/Heading';
import InputPin from '../../components/elements/InputPin';
import Modal from '../../components/elements/Modal';
import Spinner from '../../components/elements/Spinner';
import LinkAjaTransferForm from '../../components/forms/LinkAjaTransfer';
import WhiteCardPlain from '../../components/layouts/WhiteCardPlain';
import { thousand } from '../../utils/format';
import { failedAction, fetchTransferInquiry, fetchTransfer } from './actions';
import styles from './styles.scoped.css';

const Context = createContext();

export default function LinkAja() {
  const [modal, setModal] = useState(false);
  const history = useHistory();
  const { page } = useParams();
  const { balance } = useSelector(s => s.tmoney);

  const values = {
    modal, setModal,
  };

  useEffect(() => {
    balance === '' && history.push('/tmoney');
  }, []);

  return (
    <Context.Provider value={values}>
      {(p => {
        switch (p) {
          case 'transfer-confirm': return <TransferConfirm />;
          case 'transfer-pin': return <TransferPin />;
          case 'transfer-success': return <TransferSuccess />;
          default: return <TransferFromTmoney />;
        }
      })(page)}
    </Context.Provider>
  );
}

export function TransactionFailed() {
  const { modal } = useContext(Context);
  const history = useHistory();

  return (
    <Modal className={styles.warning} onClose={() => history.push('/tmoney')} open={modal}>
      <img alt="warning" src="/assets/grfx_warning.svg" />
      <h1>Transaction Failed</h1>
      <p>Your PIN has been automatically reset. Your new PIN has been sent to your phone number</p>
      <Button onClick={() => history.push('/tmoney')}>OK</Button>
    </Modal>
  );
}

export function TransferConfirm() {
  const { inquiry } = useSelector(s => s.linkaja);
  const { amount, balance, destName, linkAjaNumber } = inquiry;

  const title = 'Confirm';
  const subtitle = 'Confirm your transaction and continue';

  return (
    <WhiteCardPlain back="/linkaja" size="medium" subtitle={subtitle} title={title}>
      <div className={styles.confirm}>
        {destName ?
          <>
            <small>Account name LinkAja</small>
            <p>{destName}</p>
          </> : null
        }
        <small>LinkAja Number</small>
        <p>{linkAjaNumber}</p>
        <h3>Amount Converted</h3>
        <h1>Rp{thousand(amount)}</h1>
        <small>Balance after conversion: Rp{thousand(balance-amount)}</small>
        <div>
          <Button to="/tmoney" variant="bordered">Cancel</Button>
          <Button to="/linkaja/transfer-pin">Confirm</Button>
        </div>
      </div>
    </WhiteCardPlain>
  );
}

export function TransferFromTmoney() {
  const dispatch = useDispatch();
  const { message } = useSelector(s => s.linkaja);

  const title = 'Transfer to LinkAja';
  const subtitle = 'Convert your wallet balance to LinkAja!';

  const clearMessage = () => {
    dispatch(failedAction(''));
  };

  const onSubmit = (values) => {
    const { linkAjaNumber, amount } = values;
    dispatch(fetchTransferInquiry(linkAjaNumber, amount));
  };

  return (
    <WhiteCardPlain back="/tmoney" icon="linkaja" size="medium" subtitle={subtitle} title={title}>
      <LinkAjaTransferForm message={message} onChange={clearMessage} onSubmit={onSubmit} />
    </WhiteCardPlain>
  );
}

export function TransferPin() {
  const [attempt, setAttempt] = useState(3);
  const { setModal } = useContext(Context);
  const dispatch = useDispatch();
  const history = useHistory();
  const { inquiry, isLoading, message } = useSelector(s => s.linkaja);

  const title = 'Enter Wallet PIN';
  const subtitle = 'Enter your previous Wallet PIN to change your PIN';

  const onSubmit = pin => {
    const { amount, linkAjaNumber, transactionId, refNo } = inquiry;
    dispatch(fetchTransfer(amount, pin, linkAjaNumber, transactionId, refNo));
  };

  useEffect(() => {
    if (message === 'Wrong PIN') {
      setAttempt(attempt - 1);
    } else if (message === 'Reset Pin') {
      setModal(true);
    }
  }, [message]);

  const errorMessage = message === 'Wrong PIN' ?
    `Wrong PIN! You have ${attempt} attempt(s) left` : message;

  return (
    <WhiteCardPlain back="/tmoney" icon="verify" size="medium" subtitle={subtitle} title={title}>
      <div className={styles.pin}>
        <InputPin disabled={isLoading} error={errorMessage} onSubmit={onSubmit} />
        <Button disabled={isLoading} onClick={() => history.push('/tmoney', { reset: true })} variant="text">
          {isLoading ? <Spinner color="#ee3124" /> : 'I Forgot My PIN'}
        </Button>
      </div>
      <TransactionFailed />
    </WhiteCardPlain>
  );
}

export function TransferSuccess() {
  const { inquiry } = useSelector(s => s.linkaja);
  const { amount, balance, destName, linkAjaNumber, transactionId } = inquiry;

  return (
    <WhiteCardPlain back="/tmoney" icon="success" size="medium" title="Transaction Success!">
      <div className={styles.receipt}>
        <small>{moment().format('dddd, DD MMMM YYYY')}<br/>Transaction ID {transactionId}</small>
        <Heading>Transaction Detail</Heading>
        <small>Transaction Type</small>
        <p>Transfer to LinkAja</p>
        {destName ?
          <>
            <small>Account name LinkAja</small>
            <p>{destName}</p>
          </> : null
        }
        <small>LinkAja Number</small>
        <p>{linkAjaNumber}</p>
        <Heading>Total Transfer</Heading>
        <h2>Rp{thousand(amount)}</h2>
        <small>Saldo after transfer Rp{thousand(balance-amount)}</small>
        <Button to="/tmoney">Done</Button>
      </div>
    </WhiteCardPlain>
  );
}
