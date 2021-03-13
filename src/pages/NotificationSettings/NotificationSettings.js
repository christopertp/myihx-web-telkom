import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../../components/elements/Button';
import ModalConfirmation from '../../components/elements/ModalConfirmation';
import Switch from '../../components/elements/Switch';
import WhiteCardPlain from '../../components/layouts/WhiteCardPlain';
import styles from './styles.scoped.css';

export default function NotificationSettings() {
  const [notification, setNotification] = useState({
    'New Purchase': true,
    'Bill Reminder': true,
    'Account Changes': true,
    Promotions: true,
  });
  const [confirmation, setConfirmation] = useState('');
  const history = useHistory();

  const handleAccept = () => {
    setConfirmation('');
    setNotification({ ...notification, [confirmation]: !notification[confirmation] });
  };
  const handleRefuse = () => {
    setConfirmation('');
  };
  const onChangeSwitch = (name) => () => {
    setConfirmation(name);
  };
  const handleSubmit = () => {
    history.push('/profile');
  };
  return (
    <WhiteCardPlain
      back="/profile"
      subtitle="Set what kind of notifications you want to receive"
      title="Notification Settings">
      <ul className={styles['root']}>
        <li>
          <span>New Purchase</span>
          <Switch
            inputProps={{
              id: '1',
              onChange: onChangeSwitch('New Purchase'),
              checked: notification['New Purchase'],
            }}
          />
        </li>
        <li>
          <span>Bill Reminder</span>
          <Switch
            inputProps={{
              id: '2',
              onChange: onChangeSwitch('Bill Reminder'),
              checked: notification['Bill Reminder'],
            }}
          />
        </li>
        <li>
          <span>Account Changes</span>
          <Switch
            inputProps={{
              id: '3',
              onChange: onChangeSwitch('Account Changes'),
              checked: notification['Account Changes'],
            }}
          />
        </li>
        <li>
          <span>Promotions</span>
          <Switch
            inputProps={{
              id: '4',
              onChange: onChangeSwitch('Promotions'),
              checked: notification['Promotions'],
            }}
          />
        </li>
        <li>
          <Button onClick={handleSubmit} type="submit">
            Save
          </Button>
        </li>
      </ul>

      <ModalConfirmation
        onAccept={handleAccept}
        onClose={handleRefuse}
        onRefuse={handleRefuse}
        open={Boolean(confirmation)}
        reverseBtn
        subtitle="By changing the notification settings, you may miss some notification in your app or email."
        title={`Are you sure you want to change notification ${confirmation}`}
      />
    </WhiteCardPlain>
  );
}
