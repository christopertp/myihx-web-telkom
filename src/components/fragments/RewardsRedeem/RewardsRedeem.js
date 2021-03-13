import React, { useContext, useRef, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppContext } from '../../../contexts';
import Button from '../../elements/Button';
import Heading from '../../elements/Heading';
import WhiteCardPlain from '../../layouts/WhiteCardPlain';
import { thousand } from '../../../utils/format';
import styles from './styles.scoped.css';
import moment from 'moment';

export default function RewardsRedeem() {
  const history = useHistory();
  const { page, id } = useParams();

  useEffect(() => {
    page && history.replace(`/rewards/detail/${id}`);
  }, []);

  return (
    <>
      {(p => {
        switch (p) {
          case 'confirm-order': return <ConfirmOrder />;
          case 'detail': return <Redeem />;
          default: return <Redeem />;
        }
      })(page)}
      <Notif />
    </>
  );
}

export function Redeem() {
  const dispatch = useDispatch();
  const accountNumberRef = useRef(null);
  const { dataDetail, dataRedeem, fetchRewardDetail,
    isLoading, setMessageAction, fetchStatusPoint } = useSelector(s => s.rewards);
  const { page, id } = useParams();

  const getButton = () => {
    // if
  };

  useEffect(() => {
    id && dispatch(fetchRewardDetail(id));
    dispatch(fetchStatusPoint());
  }, [id]);

  const links = [
    { page: 'detail', to: '/rewards/redeem', text: 'Detail Voucher' },
    { page: 'terms-condition', to: '/rewards/terms-condition', text: 'Terms & Conditions' },
  ];

  const className = c => {
    if (!page && !c) return styles.active;
    return page === c ? styles.active : '';
  };

  const copyToClipboard = e => {
    accountNumberRef.current.select();
    document.execCommand('copy');
    e.target.focus();
    dispatch(setMessageAction('Copied!'));
  };

  return (
    <WhiteCardPlain back="/rewards/browse" size="medium">
      <section className={styles.headerRedeem}>
        <h1>VOUCHER</h1>
        {isLoading.d ? <span className="loading" /> : <img src={dataDetail.picture} />}
      </section>
      <nav className={styles.list}>
        {
          links && links.map((i, idx) => (
            <Link className={className(i.page)} key={idx} to={i.to}>{i.text}</Link>
          ))
        }
      </nav>
      <section className={styles.ContentRedeem}>
        {isLoading.d ? <span className="loading" /> : <h2>{dataDetail.title}</h2>}
        {isLoading.d ?
          <span className="loading" />
          :
          <small>{dataRedeem ? `Valid until ${moment(dataDetail.expired).format('DD MMMM YYYY')}`
            : `${thousand(dataDetail.price)} points`}</small>}
        {(dataRedeem) && <section className={styles.voucherCode}>
          <Heading>kode voucher</Heading>
          <input readOnly ref={accountNumberRef} type="text" value={`${dataRedeem}`} />
          <img onClick={copyToClipboard} src="/assets/ic_copy.svg" />
        </section>}
        {isLoading.d ? <span className="loading" /> :
          // eslint-disable-next-line react/no-danger
          <div dangerouslySetInnerHTML={{ __html: `${dataDetail.description}` }} />}
        {(!dataRedeem) && getButton()
          // <Button className={styles.ButtonRedeem} disabled={isLoading.d}
          //   onClick={() =>
          //   {(dataDetail.is_voucher === '0') &&
          //       dispatch(setMessageAction('Please scan from your application---#ee4c24'));}}
          //   to={(dataDetail.is_voucher === '1') && `/rewards/confirm-order/${id}`}>
          //   {dataDetail.is_voucher === '1' ? `Redeem with ${thousand(dataDetail.price)} poin`
          //     :`Scan QR to redeem poin`}</Button>
        }
      </section>
    </WhiteCardPlain>
  );
}

export function ConfirmOrder() {
  const dispatch = useDispatch();
  const { dataDetail, fetchRedeemRewards } = useSelector(s => s.rewards);
  const { id } = useParams();

  return (
    <WhiteCardPlain back={`/rewards/detail/${id}`} size="medium">
      <section className={styles.headerConfirm}>
        <h1>Confirm Order</h1>
        <strong>Confirm your selection and order</strong>
        <Heading>Product</Heading>
        <img src={dataDetail.picture} />
      </section>
      <section className={styles.contentConfirm}>
        <Heading>Redeem from</Heading>
        <strong>{dataDetail.indihomeNum}</strong>
        <p>{thousand(dataDetail.price)} Poin</p>
      </section>
      <section className={styles.actionConfirm}>
        <Button to={`/rewards/browse`} variant="bordered">CANCEL</Button>
        <Button onClick={() => {
          dispatch(fetchRedeemRewards(dataDetail.id, dataDetail.reedem_key));
        }}>CONFIRM</Button>
      </section>
    </WhiteCardPlain>
  );
}

export function Notif() {
  const { message } = useSelector(s => s.rewards);
  const { setNotif } = useContext(AppContext);

  useEffect(() => {
    setNotif(message);
  }, [message]);

  return null;
}
