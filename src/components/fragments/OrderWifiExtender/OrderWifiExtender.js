import React, { createContext, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import Button from '../../../components/elements/Button';
import OtpInput from '../../../components/elements/OtpInput';
import WhiteCardPlain from '../../../components/layouts/WhiteCardPlain';
import WhiteCardSuccessPlain from '../../../components/layouts/WhiteCardSuccessPlain';
import { thousand } from '../../../utils/format';
import styles from './styles.scoped.css';
import useTimer from '../../../hooks/useTimer';

const Context = createContext({});

export default function OrderWifiExtender() {
  const { subpage } = useParams();
  const history = useHistory();

  useEffect(() => {
    subpage && history.replace('/order/wifi-extender');
  }, []);

  return (
    <Context.Provider>
      {(sp => {
        switch (sp) {
          case 'otp': return <Otp />;
          case 'success': return <Success />;
          default: return <Confirm />;
        }
      })(subpage)}
    </Context.Provider>
  );
}

export function Confirm() {
  const history = useHistory();
  const [checked, setChecked] = useState(false);
  const onConfirm = () => {
    history.push('/order/wifi-extender/otp');
  };

  return (
    <WhiteCardPlain back="/shop/internet/wifi-extender" subtitle="Confirm your package selection and order" title="Confirm order">
      <section className={styles.package}>
        <h3>Product</h3>
        <Link to="#">
          <header>
            <figure>
              <img src="/assets/ic_shop_internet_white.png" />
            </figure>
            <h1>Wifi Extender</h1>
            <p>Complete coverage with wifi extender</p>
          </header>
          <footer>
            <h3>Rp{thousand(35000)}<small> /month</small></h3>
            <p>This pricing will replace your internet package fee</p>
          </footer>
        </Link>
        <h3>Total</h3>
        <h1>Rp{thousand(35000)}</h1>
        <p>Amount will be charged to your next bill.<br />Includes 15% tax.</p>
        <label>
          <input checked={checked} onChange={() => setChecked(!checked)} type="checkbox" />
          I agree to the <span>Terms &amp; Conditions</span> and <span>Privacy Policy</span>
        </label>
        <div>
          <Button to="/shop/internet/wifi-extender" variant="bordered">Cancel</Button>
          <Button disabled={!checked} onClick={onConfirm}>Confirm</Button>
        </div>
      </section>
    </WhiteCardPlain>
  );
}

export function Otp() {
  const mobileNumber = '';
  const subtitle = `Please enter 4-digit OTP code sent via SMS to ${mobileNumber.slice(-4).padStart(mobileNumber.length, '•')}`;
  const initTime = 59;
  const { setTimer, timer, time } = useTimer(initTime);
  const min = time[1];
  const sec = time[2];
  const history = useHistory();

  const onResendCode = () => {
    setTimer(initTime);
  };

  const onSubmit = () => {
    history.push('/order/wifi-extender/success');
  };

  return (
    <WhiteCardPlain back="/order/wifi-extender" icon="verify" subtitle={subtitle} title="Mobile Verification">
      <OtpInput onSubmit={onSubmit} />
      {timer ?
        <p className={styles['verify-timer']}>Resend Code In {min}:{sec}</p> :
        <Button className={styles['verify-resend']} onClick={onResendCode} variant="text">Resend Code</Button>
      }
    </WhiteCardPlain>
  );
}

export function Success() {
  return (
    <WhiteCardSuccessPlain
      icon="success"
      subtitle="Our technician will contact you as soon as possible."
      title="Your Wifi Extender has been successfully requested"
    >
      <Button className={styles['button-success']} to="/">Back to Home</Button>
    </WhiteCardSuccessPlain>
  );
}
