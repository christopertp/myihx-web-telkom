import React, { createContext, useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '../../elements/Button';
import Modal from '../../elements/Modal';
import { thousand } from '../../../utils/format';
import ActivityCards from '../../elements/ActivityCards';
import styles from './styles.scoped.css';

const Context = createContext({});

export function Rewards() {
  const ACTIVE = 'ACTIVE';
  const { status, poin_total } = useSelector(s => s.profile);
  return (
    ACTIVE === status
      ? (
        <Link className={styles.points} to="/profile">
          <small>IndiHome Points</small>
          <strong>{thousand(poin_total)}</strong>
          <img alt="chevron red" src="/assets/ic_chevron_red.svg" />
        </Link>
      )
      : (
        <Link className={styles.activate} to="activate-rewards">
          <img alt="wallet" src="/assets/ic_selection_rewards.svg" />
          <strong>Activate Rewards</strong>
          <img alt="chevron red" src="/assets/ic_chevron_red.svg" />
        </Link>
      )
  );
}

export default function ProfileUserNav() {
  const { isLoading, fullName, profilePicture, card } = useSelector(s => s.profile);

  return (
    <>
      <section className={styles.identity} >
        <figure style={{ backgroundImage: `url(${profilePicture}` }} />
        <p>{fullName}</p>
      </section>
      <section className={styles.balance}>
        {isLoading.t ? <span className="loading" /> : <TmoneyBalance />}
        <Rewards />
      </section>
      {card && <ActivityCards cards={card} fullWidth heading="Upcoming" isLoading={isLoading.c} />}
    </>
  );
}

export function TmoneyBalance() {
  const [blocked, setBlocked] = useState(false);

  const { balance, status } = useSelector(s => s.profile).tmoney;
  const configs = {
    BLOCKED: { className: styles.blocked, label: 'Account Blocked', to: '#', onClick: () => setBlocked(true) },
    ERROR: { className: styles.blocked, label: 'Temporarily Unavailable', to: '#' },
    REGISTERED: { className: styles.active, label: '', to: '/tmoney' },
    UNLINK: { className: '', label: 'Activate Wallet', to: '/tmoney/link' },
    UNREGISTERED: { className: '', label: 'Activate Wallet', to: '/tmoney/activate' },
  };

  const contextValues = {
    blocked, setBlocked,
  };

  const { className, label, to, onClick } = configs[status];

  return (
    <Context.Provider value={contextValues}>
      <Link className={className} onClick={onClick} to={to}>
        <img alt="wallet" src="/assets/ic_selection_wallet.svg" />
        {
          status === 'REGISTERED' ?
            <>
              <small>Saldo</small>
              <strong>Rp{thousand(balance)}</strong>
            </> :
            <span>{label}</span>
        }
        <img alt="chevron red" src="/assets/ic_chevron_red.svg" />
      </Link>
      <TmoneyBlocked />
    </Context.Provider>
  );
}

export function TmoneyBlocked() {
  const { blocked, setBlocked } = useContext(Context);
  return (
    <Modal className={styles.dialog} onClose={() => setBlocked(false)} open={blocked}>
      <img src="/assets/grfx_warning.svg" />
      <h1>Account Blocked</h1>
      <p>
        Your account has been blocked for your safety.<br />
        Please contact us to unblock your account.<br />
        Call <strong>+62 21 3808888</strong> or<br />
        email customer <strong>service@tmoney.co.id</strong>.
      </p>
      <div>
        <Button onClick={() => setBlocked(false)} variant="bordered">Close</Button>
        <Button onClick={() => { window.location.href = 'mailto:service@tmoney.co.id'; }}>Mail</Button>
      </div>
    </Modal>
  );
}
