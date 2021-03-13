import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Button from '../../elements/Button';
import Card from '../../elements/Card';
import WhiteCardPlain from '../../layouts/WhiteCardPlain';
import WhiteCardSuccessPlain from '../../layouts/WhiteCardSuccessPlain';
import CircularProgress from '../../elements/CircularProgress';
import useTimer from '../../../hooks/useTimer';
import OtpInput from '../../elements/OtpInput';
import styles from './styles.scoped.css';

export default function CompleteProfileVerifyLocation() {
  const { page } = useParams();
  return ((p) => {
    switch (p) {
      case 'verify-location':
        return <RequestLocation />;
      case 'verify-location-call':
        return <VerifyCall />;
      case 'verify-location-ip':
        return <VerifyIP />;
      case 'verify-location-ip-check':
        return <VerifyIPCheck />;
      default:
        return null;
    }
  })(page);
}

export function RequestLocation() {
  const configCard = {
    back: '/complete-profile',
    icon: 'verify',
    size: 'medium',
    title: 'Choose Verification Method',
    help: true,
  };
  const cards = [
    {
      name: 'wifi',
      title: 'Internet',
      desc: 'Connect to your IndiHome network to automatically verify your identity.',
    },
    {
      name: 'call',
      title: 'Voice Call to •••• 1234',
      desc: 'Receive your code via your home phone number.',
    },
  ];

  return (
    <WhiteCardPlain {...configCard}>
      <section className={styles['verify-location']}>
        {cards.map((i, idx) => (
          <Card
            key={idx}
            to={`/complete-profile/verify-location-${
              i.name === 'wifi' ? 'ip' : i.name
            }`}
          >
            <img alt="upload" src={`/assets/ic_selection_${i.name}.svg`} />
            <h6>{i.title}</h6>
            <p>{i.desc}</p>
            <img alt="" src="/assets/ic_chevron_red.svg" />
          </Card>
        ))}
      </section>
    </WhiteCardPlain>
  );
}

export function VerifyCall() {
  const history = useHistory();
  const initTime = 60;
  const { setTimer, timer, time } = useTimer(initTime);
  const min = time[1];
  const sec = time[2];
  const cardConf = {
    back: '/complete-profile/verify-location',
    help: true,
    icon: 'verify',
    size: 'medium',
    title: 'Enter Code',
    subtitle: 'Enter the code from the voice call to your IndiHome home number •••• 1234.',
  };

  const onSubmit = () => {
    history.push('/complete-profile/success');
  };

  return (
    <WhiteCardPlain {...cardConf}>
      <OtpInput onSubmit={onSubmit} />
      {timer ? (
        <p className={styles['verify-timer']}>
          Resend Code In {min}:{sec}
        </p>
      ) : (
        <Button
          className={styles['verify-resend']}
          onClick={() => setTimer(60)}
          variant="text"
        >
          Resend Code
        </Button>
      )}
    </WhiteCardPlain>
  );
}

export function VerifyIP() {
  const cardConf = {
    back: '/complete-profile/verify-location',
    size: 'medium',
    icon: 'wifi',
    title: 'Connect to your IndiHome wifi',
    subtitle: `Connect to your home wifi network to continue. We need this process to
    verify your account.`,
  };

  return (
    <WhiteCardSuccessPlain {...cardConf}>
      <p className={styles['desc-ip']}>After you're connected to your IndiHome network, tap the button below.</p>
      <section className={styles['verify-ip']}>
        <Button to="/complete-profile/verify-location-ip-check">
          I'm connected
        </Button>
        <Button to="/help">What's this ?</Button>
      </section>
    </WhiteCardSuccessPlain>
  );
}

export function VerifyIPCheck() {
  const initTime = 30;
  const { timer } = useTimer(initTime);
  const cardConf = {
    back: '/complete-profile/verify-location',
    size: 'medium',
  };
  const connProcess = {
    failed: {
      icon: 'warning',
      text:
        'Can’t connect. Make sure you are connected to your home wifi network to verify',
    },
    process: { icon: 'wifi', text: 'Please wait, checking connection...' },
  };

  return (
    <WhiteCardPlain {...cardConf}>
      <section className={styles['verify-ip-check']}>
        <CircularProgress
          icon={
            timer > 0 ? connProcess['process'].icon : connProcess['failed'].icon
          }
          progress={timer > 0 ? 100 - timer / 0.3 : 0}
        />
        <p>
          {timer > 0 ? connProcess['process'].text : connProcess['failed'].text}
        </p>
      </section>
    </WhiteCardPlain>
  );
}
