import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../elements/Card';
import ModalConfirmation from '../../elements/ModalConfirmation';
import WhiteCardPlain from '../../layouts/WhiteCardPlain';
import IconButton from '../../elements/IconButton';
import { AppContext } from '../../../contexts';
import styles from './styles.scoped.css';

export default function ManageSubscriptionsMovin() {
  const [confirmation, setConfirmation] = useState(false);
  const dispatch = useDispatch();
  const { movin, isLoading, fetchSubmit, fetchData, message } = useSelector(
    (s) => s.manageSubscriptions,
  );

  useEffect(() => {
    dispatch(fetchData('movin', '122245251851'));
  }, []);
  const handleAccept = () => {
    dispatch(
      fetchSubmit(
        'removeNumberMovin',
        { indihomeNumber: '122245251851', deviceId: confirmation },
        'movin',
      ),
    );
    setConfirmation('');
  };

  const setContent = (value) => {
    if (isLoading.d) {
      return (
        <>
          <span className="loading" />
          <span className="loading" />
        </>
      );
    } else if (message) {
      return message;
    }
    return value;
  };
  return (
    <WhiteCardPlain back="/manage-subscriptions" title="Manage your Movin'">
      <h3 className={styles['heading']}>Your Device(s)</h3>
      <section className={styles['list']}>
        {setContent(
          movin.map((value) => (
            <Card className={styles['card']} key={value.id}>
              <img alt="action email" src="/assets/ic_selection_device_phone_g.svg" />
              <span>{value.phoneNumber}</span>
              <p>Added {value.startDate}</p>
              <IconButton name="delete" onClick={() => setConfirmation(value.id)} />
            </Card>
          )),
        )}
      </section>
      <ModalConfirmation
        onAccept={handleAccept}
        onClose={() => setConfirmation('')}
        onRefuse={() => setConfirmation('')}
        open={Boolean(confirmation || isLoading.s)}
        subtitle={`Are you sure you want to remove this device?
        If you want to add this device again later, you will be billed again.
        You can still login with this device until 1st of November 2019`}
        title="Are you sure you want to remove this device?"
      />
      <Overlay />
    </WhiteCardPlain>
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
