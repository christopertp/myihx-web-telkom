import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Bullet from '../../elements/Bullet';
import Button from '../../elements/Button';
import Card from '../../elements/Card';
import Heading from '../../elements/Heading';
import IconButton from '../../elements/IconButton';
import Modal from '../../elements/Modal';
import ModalConfirmation from '../../elements/ModalConfirmation';
import FormChangeDeviceName from '../../forms/ManageSubscriptionsDeviceName';
import FormChangeChangePasswordWifiId from '../../forms/ManageSubscriptionsPasswordWifiId';
import WhiteCardPlain from '../../layouts/WhiteCardPlain';
import { AppContext } from '../../../contexts';
import styles from './styles.scoped.css';

export default function ManageSubscriptionsWifiId() {
  const { fetchData } = useSelector((s) => s.manageSubscriptions);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchData('wifiId', '122510249142'));
  }, []);
  return (
    <WhiteCardPlain back="/manage-subscriptions" title="Manage your wifi.id">
      <div className={styles['root']}>
        <LoginInformation />
        <Devices />
        <HowToWifiId />
        <Button className={styles['btn-submit']} onClick={() => {}} type="submit">
          Add A New Device
        </Button>
        <Overlay />
      </div>
    </WhiteCardPlain>
  );
}

export function LoginInformation() {
  const [showPassword, setShowPassword] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const { wifiId, isLoading, message, fetchSubmit } = useSelector((s) => s.manageSubscriptions);
  const dispatch = useDispatch();
  const onSubmit = (value) => {
    dispatch(
      fetchSubmit(
        'updateAccountWifiId',
        {
          indihomeNumber: 122510249142,
          data: { password: value.passwordWifiId },
        },
        'wifiId',
      ),
    );
    setChangePassword(false);
  };

  const setContent = (value) => {
    if (isLoading.d) {
      return <span className="loading" />;
    } else if (!isLoading.d && message && !wifiId) {
      return '';
    }
    return value;
  };

  return (
    <section className={styles['login-information']}>
      <Heading>Your login information</Heading>
      <Card className={styles['card-login-information']} variant="hover">
        <div className={styles['field-username']}>
          <small>Username</small>
          {setContent(<p>{wifiId.username}</p>)}
        </div>
        <div className={styles['field-password']}>
          <small>Password</small>
          {setContent(
            <input
              name="password"
              readOnly
              type={showPassword ? 'text' : 'password'}
              value={wifiId.password}
            />,
          )}
          <button onClick={() => setShowPassword(!showPassword)}>
            {!showPassword ? 'Show Password' : 'Hide Password'}
          </button>
          <IconButton name="edit" onClick={() => setChangePassword(true)} />
        </div>
      </Card>
      <Modal onClose={() => setChangePassword(false)} open={changePassword || isLoading.s}>
        <FormChangeChangePasswordWifiId
          handleCancel={() => setChangePassword(false)}
          message={message}
          onSubmit={onSubmit}
        />
      </Modal>
    </section>
  );
}

export function Devices() {
  const [confirmRemoveDevice, setConfirmRemoveDevice] = useState(false);
  const [changeDeviceName, setChangeDeviceName] = useState('');
  const { wifiId, isLoading, fetchSubmit, message } = useSelector((s) => s.manageSubscriptions);
  const dispatch = useDispatch();
  const subtitle = `Are you sure you want to remove this device?
    If you want to add this device again later, you will be billed again.
    You can still login with this device until 1st of November 2019`;
  const setContent = (value) => {
    if (isLoading.d) {
      return Array(3)
        .fill(3)
        .map((val, idx) => <span className="loading" key={idx} />);
    } else if (!isLoading.d && wifiId.deviceList.length === 0) {
      return (
        <Card className={styles['card-empty-device']}>
          <img alt="chevron red" src="/assets/ic_selection_device_computer_grey.svg" />
          <span>You don't have any device</span>
          <p>Add device to use wifi.id</p>
        </Card>
      );
    }
    return value;
  };
  const onSubmit = (value) => {
    dispatch(
      fetchSubmit(
        'updateDeviceWifiId',
        {
          indihomeNumber: 122510249142,
          data: {
            crmid: changeDeviceName,
            deviceName: value.deviceName,
          },
        },
        'wifiId',
      ),
    );
    setChangeDeviceName('');
  };
  return (
    <section className={styles['devices']}>
      <Heading>Your device(s)</Heading>
      {setContent(
        wifiId.deviceList.map((value, index) => (
          <Card className={styles['card-device']} key={index}>
            <img alt="chevron red" src="/assets/ic_selection_device_computer_r.svg" />
            <span>{value.deviceName}</span>
            <p>Added {value.startDate}</p>
            <div className={styles['more']}>
              <IconButton name="more" />
              <div className={styles['more-menu']}>
                <ul>
                  <li
                    onClick={() => {
                      setChangeDeviceName(value.crmId);
                    }}>
                    Edit device name
                  </li>
                  <li
                    onClick={() => {
                      setConfirmRemoveDevice(true);
                    }}>
                    Remove device
                  </li>
                </ul>
              </div>
              <Modal
                onClose={() => setChangeDeviceName('')}
                open={Boolean(changeDeviceName || isLoading.s)}>
                <FormChangeDeviceName
                  handleCancel={() => setChangeDeviceName('')}
                  message={message}
                  onSubmit={onSubmit}
                />
              </Modal>
              <ModalConfirmation
                onAccept={() => {}}
                onClose={() => setConfirmRemoveDevice(false)}
                onRefuse={() => setConfirmRemoveDevice(false)}
                open={confirmRemoveDevice}
                subtitle={subtitle}
                title="Are you sure you want to remove this device?"
              />
            </div>
          </Card>
        )),
      )}
    </section>
  );
}

export function HowToWifiId() {
  const [lng] = useState('id');
  const { wifiId, isLoading } = useSelector((s) => s.manageSubscriptions);
  const setContent = (value) => {
    if (isLoading.d) {
      return Array(3)
        .fill(3)
        .map((val, idx) => (
          <div className={styles.loading} key={idx}>
            <span className="loading" />
            <span className="loading" />
            <span className="loading" />
            <span className="loading" />
          </div>
        ));
    } else if (!isLoading.d && wifiId.guide.length === 0) {
      return [];
    }
    return value;
  };
  return (
    <section className={styles['how-to-wifiId']}>
      {setContent(
        wifiId.guide.map((value, index) => (
          <section className={styles['steps']} key={index}>
            <Heading>{value[lng]?.header}</Heading>
            <ul>
              <li>
                <Bullet />
                <strong>{value[lng]?.description}</strong>
                {value[lng]?.steps.map((val, indx) => (
                  <p key={indx}>{val}</p>
                ))}
              </li>
            </ul>
          </section>
        )),
      )}
    </section>
  );
}

export function Overlay() {
  const { setOverlay } = useContext(AppContext);
  const { isLoading } = useSelector((s) => s.manageSubscriptions);

  useEffect(() => {
    setOverlay(isLoading.s);
  }, [isLoading.s]);

  return null;
}
