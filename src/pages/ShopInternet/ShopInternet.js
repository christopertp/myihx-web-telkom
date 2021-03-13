import React, { createContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Button from '../../components/elements/Button';
import Card from '../../components/elements/Card';
import Menu from '../../components/elements/ShopCategoryMenu';
import Webp from '../../components/elements/Webp';
import PackageFinderLink from '../../components/elements/PackageFinderLink';
import PopularPackage from '../../components/fragments/ShopInternetPopularPackage';
import WifiExtender from '../../components/fragments/ShopInternetWifiExtender';
import { getGuestAddress, getToken } from '../../utils/storage';
import { fetchAddress, fetchMostPopular } from './actions';
import styles from './styles.scoped.css';

const Context = createContext({});

export default function ShopInternet() {
  const { page } = useParams();
  const links = [
    { page: '', to: '/shop/internet', text: 'Paket' },
    { page: 'speed-on-demand', to: '#', text: 'Speed on Demand' },
    { page: 'upgrade-speed', to: '#', text: 'Upgrade Speed' },
    { page: 'wifi-extender', to: '/shop/internet/wifi-extender', text: 'Wifi Extender' },
    { page: 'cloud', to: '#', text: 'Cloud' },
    { page: 'indihome-study', to: '#', text: 'Indihome Study' }
  ];

  return (
    <Context.Provider>
      <Menu
        links={links}
        subtitle="Nikmati aneka paket internet dengan layanan tambahan yang lengkap mulai dari Rp.150.000 per bulan*!"
        title="Internet"
      />
      {
        (p => {
          return p === 'wifi-extender' ? <WifiExtender /> : <Package />;
        })(page)
      }
    </Context.Provider>
  );
}

export function Package() {
  const dispatch = useDispatch();

  useEffect(() => {
    Boolean(getToken()) && dispatch(fetchAddress());
    dispatch(fetchMostPopular('package'));
  }, []);

  const featuresData = [
    { title: 'Unlimited Internet Quota', subtitle: 'Enjoy unlimited internet for all your internet needs!' },
    { title: 'TV On Demand', subtitle: 'Watch TV shows on demand. Missed a show? No Problem!' },
    { title: 'Free Quota & Bonuses', subtitle: 'Get free quota for call & lots of extra bonuses' },
  ];

  return (
    <>
      <CheckAvailability />
      <section className={styles.features}>
        <h2>Paket Internet yang sesuai kebutuhan Anda</h2>
        <p>
          Nikmati kemudahan memilih aneka paket internet yang dapat disesuaikan
          untuk apa pun kebutuhan Anda. Atur semua mulai dari anggaran, sampai
          jenis paket internet. Untuk bekerja,keluarga, atau bermain game. Semua
          hanya dalam satu klik!
        </p>
        <ul>
          {featuresData.map((i, idx) =>
            (<li key={idx}>
              <h5>
                {i.title}
                <img alt="chevron white" src="/assets/ic_chevron_white.svg" />
              </h5>
              <p>{i.subtitle}</p>
            </li>)
          )}
        </ul>
      </section>
      <PopularPackage />
      <PackageFinderLink className={styles['finder-link']} />
    </>
  );
}

export function CheckAvailability() {
  const guest = !getToken();
  const address = guest ? getGuestAddress() : useSelector(s => s.shopInternet).address;
  const { isLoading } = useSelector(s => s.shopInternet);

  if (!address && (!isLoading.a || (isLoading.a && guest))) {
    return (
      <section className={styles['check-availability']}>
        <p>Cek Ketersediaan Indihome Di Daerah Anda</p>
        <h2>Siap melayani Anda, dari Sabang sampai Merauke</h2>
        <Button to="/check-coverage">Cek ketersediaan</Button>
        <Webp alt="cek ketersediaan" name="img_indonesia-map" />
      </section>
    );
  }

  const { addressDescription, city, district, street, postalCode, province } = address;
  return (
    <section className={styles.address}>
      {
        (isLoading.a && !guest) ?
          <span className="loading" /> :
          (<Card to="/check-coverage">
            <img alt="address" src="/assets/ic_location_red.svg" />
            <h3>{street}</h3>
            {addressDescription && <p className={styles['address-description']}>{addressDescription}</p>}
            <p>{district}, {city}, {province} {postalCode}</p>
            <p>Change Location</p>
            <img alt="" src="/assets/ic_chevron_red.svg" />
          </Card>)
      }
    </section>
  );
}
