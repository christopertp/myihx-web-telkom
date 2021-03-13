import React, { createContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Card from '../../components/elements/Card';
import Movin from '../../components/fragments/ManageSubscriptionsMovin';
import WhiteCardPlain from '../../components/layouts/WhiteCardPlain';
import WifiId from '../../components/fragments/ManageSubscriptionsWifiId';
import { fetchData } from './actions';
import styles from './styles.scoped.css';

const Context = createContext();

export default function ManageSubscriptions() {
  const { page } = useParams();

  return (
    <Context.Provider>
      {((p) => {
        switch (p) {
          case 'movin':
            return <Movin />;
          case 'wifi-id':
            return <WifiId />;
          default:
            return <Menu />;
        }
      })(page)}
    </Context.Provider>
  );
}

export function Menu() {
  const { subscriptions, isLoading, message } = useSelector((s) => s.manageSubscriptions);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData('subscriptions', '122245251851'));
  }, []);

  const setContent = (value) => {
    if (isLoading.d) {
      return (
        <div className={styles.loading}>
          <span className="loading" />
          <span className="loading" />
          <span className="loading" />
          <span className="loading" />
        </div>
      );
    }

    if (message) {
      return (
        <div className={styles['not-found']}>
          <img alt="not-found" src="/assets/grfx_status_failed.svg" />
          <p>Data not found</p>
        </div>
      );
    }
    return value;
  };

  return (
    <WhiteCardPlain back="/profile" title="Manage Subscriptions">
      {setContent(
        subscriptions.map((value, index) => (
          <Card
            className={styles['menu']}
            key={index}
            to={`/manage-subscriptions/${value.type.replace(/_/g, '-').toLowerCase()}`}
            variant="hover">
            <img alt={value.type} src={value.icon} />
            <span>{value.name}</span>
            <small>{value.description}</small>
            <img alt="chevron red" src="/assets/ic_chevron_red.svg" />
          </Card>
        )),
      )}
    </WhiteCardPlain>
  );
}
