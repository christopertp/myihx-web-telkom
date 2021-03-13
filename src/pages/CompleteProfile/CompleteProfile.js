import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSubmit, fetchStatusSvm } from './actions';
import Button from '../../components/elements/Button';
import Card from '../../components/elements/Card';
import Heading from '../../components/elements/Heading';
import StepProgressBar from '../../components/elements/StepProgressBar';
import WhiteCardPlain from '../../components/layouts/WhiteCardPlain';
import VerifyEmailForm from '../../components/forms/CompleteProfileVerifyEmail';
import VerifyIDForm from '../../components/forms/CompleteProfileVerifyID';
import Status from '../../components/fragments/CompleteProfileStatus';
import VerifyLocation from '../../components/fragments/CompleteProfileVerifyLocation';
import Spinner from '../../components/elements/Spinner';
import { isKTP, isSIM, isPassport } from '../../utils/validation';
import styles from './styles.scoped.css';

export default function CompleteProfile() {
  const { page } = useParams();

  return ((p) => {
    switch (p) {
      case 'verify-id':
      case 'verify-email':
        return <Verify />;
      case 'verify-location':
      case 'verify-location-call':
      case 'verify-location-ip':
      case 'verify-location-ip-check':
        return <VerifyLocation />;
      case 'success':
      case 'progress':
      case 'failed':
        return <Status />;
      default:
        return <Progress />;
    }
  })(page);
}

export function Progress() {
  const dispatch = useDispatch();
  const { data } = useSelector((s) => s.completeProfile);
  const completed = Object.values(data).filter(Boolean).length;
  useEffect(() => {
    dispatch(fetchStatusSvm());
  }, []);

  return (
    <WhiteCardPlain back="/profile" title="Complete Profile">
      <section className={styles.root}>
        <Card className={styles.progress} variant="hover">
          <h3>Your profile is {completed * 20}% complete!</h3>
          <span>Complete your profile secure your account and get 5% off your next bill!</span>
          <StepProgressBar className={styles['step-progress-bar']} complete={completed} steps={5} />
          <Button>Claim Reward</Button>
        </Card>
        <Task />
      </section>
    </WhiteCardPlain>
  );
}

export function Task() {
  const { data, isLoading } = useSelector((s) => s.completeProfile);

  const setImage = (status, name) => {
    if (isLoading) {
      return <Spinner color="#ee3124" size="2.3rem" />;
    } else if (status) {
      return <img alt="done" src="/assets/ic_done.svg" />;
    }
    return <img alt={name} src={`/assets/ic_${name}.svg`} />;
  };

  return (
    <section className={styles.task}>
      <Heading>Task</Heading>
      <Card className={styles.menu} to="/profile/edit" variant="hover">
        {setImage(data.completeProfile, 'profile')}
        <span>Complete profile information</span>
        <img alt="chevron red" src="/assets/ic_chevron_red.svg" />
      </Card>
      <Card className={styles.menu} to="/complete-profile/verify-email" variant="hover">
        {setImage(data.verifiedEmail, 'email')}
        <span>Verify e-mail address</span>
        <img alt="chevron red" src="/assets/ic_chevron_red.svg" />
      </Card>
      <Card className={styles.menu} to="/shop/internet" variant="hover">
        {setImage(data.subscribePackage, 'shop')}
        <span>Subscribe to Indihome package</span>
        <img alt="chevron red" src="/assets/ic_chevron_red.svg" />
      </Card>
      <Card className={styles.menu} to="/complete-profile/verify-id" variant="hover">
        {setImage(data.verifiedId, 'id_drivers')}
        <span>Verify ID</span>
        <img alt="chevron red" src="/assets/ic_chevron_red.svg" />
      </Card>
      <Card className={styles.menu} to="/complete-profile/verify-location" variant="hover">
        {setImage(data.verifiedLocation, 'loc')}
        <span>Verify Location</span>
        <img alt="chevron red" src="/assets/ic_chevron_red.svg" />
      </Card>
    </section>
  );
}

export function Verify() {
  const { message } = useSelector((s) => s.completeProfile);
  const { page } = useParams();
  const backToProfile = '/complete-profile';
  const dispatch = useDispatch();
  const configCard = {
    'verify-email': {
      back: backToProfile,
      icon: 'email',
      size: 'medium',
      subtitle: 'Verification code has been sent to your email ••••doe@gmail.com',
      title: 'Verify Email',
    },
    'verify-id': {
      back: backToProfile,
      icon: 'kyc',
      size: 'medium',
      title: 'Verify ID',
    },
  };

  const onSubmit = (value, type) => {
    if (type === 'email') {
      dispatch(fetchSubmit('verifyEmail', value.verificationCode, '/complete-profile/success'));
    } else {
      dispatch(
        fetchSubmit(
          'verifyId',
          {
            idNum: value.idNumber,
            type: typeIdNumber(value.idNumber),
          },
          '/complete-profile/progress',
        ),
      );
    }
  };

  return (
    <WhiteCardPlain {...configCard[page]}>
      {((t) => {
        switch (t) {
          case 'verify-email':
            return <VerifyEmailForm message={message} onSubmit={(val) => onSubmit(val, 'email')} />;
          case 'verify-id':
            return <VerifyIDForm message={message} onSubmit={(val) => onSubmit(val, 'id')} />;
          default:
            return null;
        }
      })(page)}
    </WhiteCardPlain>
  );
}

export const typeIdNumber = (value) => {
  if (isKTP(value)) {
    return 'ktp';
  } else if (isSIM(value)) {
    return 'sim';
  } else if (isPassport(value)) {
    return 'passport';
  }
  return '';
};
