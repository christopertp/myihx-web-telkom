import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '../../elements/Button';
import IconButton from '../../elements/IconButton';
import { thousand } from '../../../utils/format';
import styles from './styles.scoped.css';

export default function HomePrimaryActions() {
  const { bill, isLoading } = useSelector(s => s.home);

  const renderActions = () => (
    !bill || bill.status === 'NO_BILL' ?
      <Browse /> :
      <>
        <Bill />
        <Usage />
      </>
  );

  return (
    <div className={styles.root}>
      {isLoading.b ? <span className="loading" /> : renderActions()}
    </div>
  );
}

export function Bill() {
  const { bill } = useSelector(s => s.home);
  const { billDate, status, totalAmount } = bill;

  const labels = {
    NO_DATA: { text: 'Belum Ada' },
    PAID: { className: styles.paid, text: 'Sudah Dibayar' },
    UNPAID: { className: styles.unpaid, text: 'Belum Dibayar' },
  };

  const label = labels[status] || '';

  return (
    <BillContainer className={styles.card}>
      <div className={styles.bill}>
        <p>Tagihan bulan ini</p>
        <span className={label.className}>
          {label.text}
        </span>
        <h2>Rp{thousand(totalAmount)}</h2>
        <IconButton name="chevron_red" />
      </div>
      <div className={styles.footer}>
        <p>Tagihan berikutnya</p>
        <h3>{moment(billDate).locale('id').format('D MMMM YYYY')}</h3>
      </div>
    </BillContainer>
  );
}

export function BillContainer({ children, ...rest }) {
  const { billingPeriod, status } = useSelector(s => s.home).bill;

  switch (status) {
    case 'NO_DATA': return <div {...rest}>{children}</div>;
    case 'PAID': return <Link to={`/receipt/${moment(billingPeriod).format('YYYYMM')}`} {...rest}>{children}</Link>;
    case 'UNPAID': return <Link to="/bill" {...rest}>{children}</Link>;
    default: return <div {...rest}>{children}</div>;
  }
}

BillContainer.defaultProps = { children: null };
BillContainer.propTypes = { children: PropTypes.node };

export function Browse() {
  return (
    <div className={styles.browse}>
      <h2>Unlimited connectivity with IndiHome. Get yours now</h2>
      <p>
        Get unlimited internet from as low as
        <span>&nbsp;Rp320.000/mo</span>
      </p>
      <img alt="package" src="/assets/ic_selection_wifi.svg" />
      <Button to="/shop/internet">Browse Package</Button>
    </div>
  );
}

export function Usage() {
  return (
    <Link className={styles.card} style={{ height: '100%' }} to="#" />
  );
}
