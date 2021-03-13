import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '../../elements/Button';
import Modal from '../../elements/Modal';
import Switch from '../../elements/Switch';
import { clearStorages } from '../../../utils/storage';
import ModalConfirmation from '../../elements/ModalConfirmation';
import styles from './styles.scoped.css';

export default function ProfileUserMenu() {
  const [modal, setModal] = useState(false);
  const [language, setLanguage] = useState('ID');
  const [confirmation, setConfirmation] = useState(false);
  const renderList = (title, to) => {
    return (
      <Link to={to || '#'}>
        <span>{title}</span>
        <img alt="chevron red" src="/assets/ic_chevron_red.svg" />
      </Link>
    );
  };

  const handleAccept = () => {
    const chooseLanguage = language === 'ID' ? 'EN' : 'ID';
    setLanguage(chooseLanguage);
    setConfirmation(!confirmation);
  };
  return (
    <>
      <section className={styles.root}>
        <p>Account</p>
        {renderList('Edit Profile', '/profile/edit')}
        {renderList('Change Password', '/profile/change-password')}
        {renderList('Change Phone Number', '/profile/change-mobile')}
        {renderList('Change Email', '/profile/change-email')}
        {renderList('Manage Users', '/manage-users')}
        {renderList('Manage Indihome Numbers')}
        <p>Membership</p>
        {renderList('About Poin myIndiHome', '/profile/about-point')}
        {renderList('Point History')}
        {renderList('Merchants & Benefits')}
        {renderList('Browse Rewards', '/rewards/browse')}
        {renderList('My Vouchers')}
        <p>Other</p>
        {renderList('Manage T-Money')}
        {renderList('Manage Subscriptions', '/manage-subscriptions')}
        {renderList('Notification Settings', '/notification-settings')}
        <div className={styles['hide-desktop']}>
          <span>Switch Language</span>
          <Switch
            className={styles['switch']}
            inputProps={{
              id: 'language',
              checked: language === 'ID',
              onChange: () => {
                setConfirmation(!confirmation);
              },
            }}
            text={['ID', 'EN']}
          />
        </div>
        {renderList('Send Feedback', '/send-feedback')}
        {renderList('About the Application', '/about')}
        <Button onClick={() => setModal(true)}>logout</Button>
      </section>
      <ModalLogOut onClose={() => setModal(false)} open={modal} />
      <ModalConfirmation
        onAccept={handleAccept}
        onClose={() => setConfirmation(false)}
        onRefuse={() => setConfirmation(false)}
        open={confirmation}
        reverseBtn
        subtitle="This process may take a few seconds."
        title={`Switch language to ${language === 'ID' ? 'Bahasa Indonesia' : 'English'}`}
      />
    </>
  );
}
export function ModalLogOut(props) {
  const { onClose, open } = props;
  const onClick = () => {
    clearStorages();
    location.href = '/';
  };

  return (
    <Modal className={styles.modal} onClose={onClose} open={open}>
      <h3>Are you want to log out from myIndiHome?</h3>
      <p>You will need to login again next time you open myIndiHome app.</p>
      <div>
        <Button onClick={onClick} variant="bordered">
          yes
        </Button>
        <Button onClick={onClose}>no</Button>
      </div>
    </Modal>
  );
}

ModalLogOut.defaultProps = {
  onClose: () => {},
  open: false,
};

ModalLogOut.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
