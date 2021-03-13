import React, { createContext, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Button from '../../components/elements/Button';
import IconButton from '../../components/elements/IconButton';
import Modal from '../../components/elements/Modal';
import ModalLogin from '../../components/elements/ModalLogin';
import AddressForm from '../../components/forms/CheckCoverageAddress';
import WhiteCardPlain from '../../components/layouts/WhiteCardPlain';
import WhiteCardSuccessPlain from '../../components/layouts/WhiteCardSuccessPlain';
import useGMap from '../../hooks/useGMap';
import { getToken } from '../../utils/storage';
import { fetchAvailability, resetMessage, fetchSubscribe } from './actions';
import styles from './styles.scoped.css';

const Context = createContext({});
const DEFAULT_COORD = { lat: -6.1801091, lng: 106.8263765 };

export default function CheckCoverage() {
  const dispatch = useDispatch();
  const [modalLogin, setModalLogin] = useState(false);
  const [address, setAddress] = useState('');
  const [coord, setCoord] = useState(DEFAULT_COORD);
  const history = useHistory();
  const { page } = useParams();

  useEffect(() => {
    page && history.replace('/check-coverage');
    return () => dispatch(resetMessage());
  }, []);

  const contextValue = {
    address, setAddress,
    coord, setCoord,
    setModalLogin,
  };

  return (
    <Context.Provider value={contextValue}>
      {(p => {
        switch (p) {
          case 'address': return <Address />;
          case 'pt1': return <PT1 />;
          case 'pt3': return <PT3 />;
          default: return <MapSelect />;
        }
      })(page)}
      <ModalPT2 />
      <ModalLogin onClose={() => setModalLogin(false)} open={modalLogin} />
    </Context.Provider>
  );
}

export function MapSelect() {
  const { address, setAddress, coord, setCoord } = useContext(Context);
  const mapProps = { coord, setCoord, setAddress };
  const { refInput, refMap } = useGMap(mapProps);

  const setOverFlow = v => {
    const app = document.getElementById('app');
    app.style.overflowY = v;
  };

  useEffect(() => () => setOverFlow(''), []);

  return (
    <section className={styles.map}>
      <header>
        <IconButton name="back_red" to="/shop/internet" />
        <h1>Place Pin Point</h1>
      </header>
      <div ref={refMap} />
      <section>
        <input onBlur={() => setOverFlow('')} onFocus={() => setOverFlow('hidden')} ref={refInput} />
        {address && <div>{address}</div>}
        <Button to="/check-coverage/address">Confirm</Button>
      </section>
    </section>
  );
}

export function Address() {
  const { address, coord } = useContext(Context);
  const dispatch = useDispatch();
  const subtitle = 'Make sure you have entered the right address and location pin point.';

  const onSubmit = installationAddress => {
    const payload = {
      installationAddress,
      latitude: `${coord.lat}`,
      longitude: `${coord.lng}`,
    };
    dispatch(fetchAvailability(payload));
  };

  return (
    <WhiteCardPlain back="/check-coverage" subtitle={subtitle} title="Enter Installation Address">
      <AddressForm address={address} onSubmit={onSubmit} />
    </WhiteCardPlain>
  );
}

export function PT1() {
  const { setModalLogin } = useContext(Context);
  const dispatch = useDispatch();
  const isLoggedIn = !!getToken();
  const title = 'IndiHome service is available in your area!';
  const subtitle = 'Congratulation! Your location is within IndiHome area coverage. Browse packages and activate it in a few easy steps!';
  const onClick = () => setModalLogin(true);
  const onClickSubscribe = () => dispatch(fetchSubscribe());
  const nextButtonProps = isLoggedIn ? { onClick: onClickSubscribe } : { onClick };
  return (
    <WhiteCardSuccessPlain icon="check" subtitle={subtitle} title={title}>
      <div className={styles['pt-next']}>
        <Button {...nextButtonProps}>Next</Button>
        <Button to="/shop/internet" variant="text">Find the best package for me</Button>
      </div>
    </WhiteCardSuccessPlain>
  );
}

export function PT3() {
  const isLoggedIn = !!getToken();
  const title = 'Sorry, IndiHome is not yet available in your area';
  const subtitle = isLoggedIn ? 'We will contact you when it’s available!' : 'Login or register to stay updated!';
  return (
    <WhiteCardSuccessPlain icon="status_failed" subtitle={subtitle} title={title}>
      {isLoggedIn ?
        (
          <div className={styles['pt-next']}>
            <Button to="/check-coverage">Check Other address</Button>
            <Button to="/" variant="text">Back to Home</Button>
          </div>
        ) :
        (
          <div className={styles['pt-login']}>
            <Button to="/login" variant="bordered">Login</Button>
            <Button to="/register">Register</Button>
            <Button to="/" variant="text">Back to Home</Button>
          </div>
        )
      }
    </WhiteCardSuccessPlain>
  );
}

export function ModalPT2() {
  const { setModalLogin } = useContext(Context);
  const dispatch = useDispatch();
  const { message, resetMessage } = useSelector(s => s.checkCoverage);
  const isLoggedIn = !!getToken();
  const onClick = () => setModalLogin(true);
  const nextButtonProps = isLoggedIn ? { to: '/shop/internet' } : { onClick };
  const onCloseModal = () => {
    dispatch(resetMessage());
  };
  return (
    <Modal className={styles['pt-2']} onClose={onCloseModal} open={message === 'PT2'}>
      <h2>Location is a bit far...</h2>
      <p>
        Your address is far from IndiHome area coverage,
        you may have to wait up to 14 days for installation
      </p>
      <div>
        <Button onClick={onCloseModal} variant="bordered">Cancel</Button>
        <Button {...nextButtonProps}>Continue</Button>
      </div>
    </Modal>
  );
}
