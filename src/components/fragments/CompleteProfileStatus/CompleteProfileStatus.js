import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Button from '../../elements/Button';
import WhiteCardSuccessPlain from '../../layouts/WhiteCardSuccessPlain';
import styles from './styles.scoped.css';

export default function CompleteProfileStatus() {
  const { page } = useParams();
  const history = useHistory();
  const close = '/profile';
  const handleSubmit = () => {
    history.push('/profile');
  };
  const configCard = {
    success: {
      icon: 'check',
      title: 'Your email is successfully verified',
      subtitle: 'Thank you for verifying your e-mail',
      close,
    },
    progress: {
      icon: 'waiting',
      title: 'Verification in Progress',
      subtitle:
        'Please wait while we’re verifying your ID. This process may take up to 15 minutes.',
      close,
    },
    failed: {
      icon: 'sad',
      title: 'Verification Failed',
      subtitle: `Our agent will call you to verify your ID. You will receive a phone call from our
        agent within 1x24 hours.`,
      close,
    },
  };

  return (
    <WhiteCardSuccessPlain {...configCard[page]}>
      {page === 'progress' ? (
        <>
          <p className={styles['subtitle-status']}>
            We’ll notify you once it’s done! If you don’t receive any notification, please check the
            app again in 5 minutes
          </p>
          <Button className={styles['btn-status']} onClick={handleSubmit}>
            Done
          </Button>
        </>
      ) : (
        <Button className={styles['btn-status']} onClick={handleSubmit}>
          OK
        </Button>
      )}
    </WhiteCardSuccessPlain>
  );
}
