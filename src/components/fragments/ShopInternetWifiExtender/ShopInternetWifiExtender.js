import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './styles.scoped.css';
import Bullet from '../../elements/Bullet/Bullet';
import Button from '../../elements/Button';
import ModalLogin from '../../elements/ModalLogin';
import Spinner from '../../elements/Spinner';
import StickyPrice from '../../elements/StickyPrice';
import { getUserData } from '../../../utils/storage';

export default function ShopInternetWifiExtender() {
  const [modalLogin, setModalLogin] = useState(false);
  const isLoggedIn = !!getUserData();
  const history = useHistory();

  const featuresData = [
    { title: 'Unlimited high speed internet', subtitle: 'Unlimited high speed internet' },
    { title: 'Automatic seamless connection', subtitle: 'Connect autimatically when your device is in range of a hotspot' },
    { title: 'Connect up to 5 devices', subtitle: 'Use the same username for up to 5 devices' }
  ];

  const activateData = [
    { title: 'Datang ke Plasa Telkom terdekat', subtitle: 'Lorem ipsum dolor sit amet 1' },
    { title: 'Daftar dengan nomor IndiHome Anda', subtitle: 'Lorem ipsum dolor sit amet 2' },
    { title: 'Teknisi kami akan datang untuk memasang wifi extender Anda', subtitle: 'Lorem ipsum dolor sit amet 3' }
  ];

  const isLoading = {
    data: false,
    submit: false
  };

  const onClickSubscribe = () => {
    isLoggedIn ? history.push('/order/wifi-extender') : setModalLogin(true);
  };

  const onClickDetail = () => {};

  return (
    <>
      <section className={styles.banner}>
        <h2>Complete coverage with wifi extender</h2>
        <p>Use wifi extender for a stronger internet connection in your house/office</p>
        <img alt="wifi extender" src="/assets/bnr_internet_wifiextender.png" />
      </section>
      <section className={styles.about}>
        <h5>About this product</h5>
        <p>
          Mau internetan dengan jaringan wifi yang lebih luas di rumah Anda? IndiHome kini
          menyediakan perangkat Wifi Extender untuk memperkuat pemancaran sinyal wifi di setiap area
          sudut rumah Anda tanpa harus menyediakan kabel tambahan.
        </p>
        <p>Dengan Wifi Extender dari
          IndiHome, internetan di setiap sudut rumah jadi semakin leluasa.
          Hanya <b>Rp35.000/bulan</b>.
        </p>
      </section>
      <section className={styles.grid}>
        <section className={styles.features}>
          <h5>Features</h5>
          <ul>
            {featuresData.map((i, idx) =>
              (<li key={idx}>
                <img alt="hybrid box" src="/assets/grfx_line_hybridbox_1.png" />
                <h5>
                  {i.title}
                </h5>
                <p>{i.subtitle}</p>
              </li>)
            )}
          </ul>
        </section>
        <section className={styles.activate}>
          <h5>How to activate</h5>
          <ul>
            {activateData.map((i, idx) =>
              (<li key={idx}>
                <Bullet connect={idx < activateData.length - 1} />
                <h5>{i.title}</h5>
                <p>{i.subtitle}</p>
              </li>)
            )}
          </ul>
          <Button onClick={onClickSubscribe}>
            {isLoading.submit ? <Spinner /> : 'Activate'}
          </Button>
        </section>
      </section>
      <StickyPrice
        isLoading={isLoading}
        onClickDetail={onClickDetail}
        onClickSubscribe={onClickSubscribe}
        price={35000}
      />
      <ModalLogin onClose={() => setModalLogin(false)} open={modalLogin} />
    </>
  );
}
