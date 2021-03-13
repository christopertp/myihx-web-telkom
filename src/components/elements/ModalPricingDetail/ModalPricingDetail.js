import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import Modal from '../Modal';
import { thousand } from '../../../utils/format';
import styles from './styles.scoped.css';

export default function ModalPricingDetail(props) {
  const { data, onClickSubscribe, onClose, open } = props;
  const { discountPrice, price, stbPrice } = data;

  return (
    <>
      <Modal className={styles.root} onClose={onClose} open={open}>
        <section>
          <h3>Rp{thousand(discountPrice)} <small>/month</small></h3>
          <p>View pricing details</p>
          <Button onClick={onClickSubscribe}>Subscribe</Button>
        </section>
        <section>
          <p>Biaya Indihome</p>
          <p>Rp{thousand(price)}</p>
          <p>Sewa STB</p>
          <p>Rp{thousand(stbPrice)}</p>
          <p>Limited time app discount</p>
          <p>-Rp{thousand(price - discountPrice)}</p>
        </section>
      </Modal>
    </>
  );
}

ModalPricingDetail.defaultProps = {
  data: {},
  onClickSubscribe: () => {},
  onClose: () => {},
  open: false,
};

ModalPricingDetail.propTypes = {
  data: PropTypes.object,
  onClickSubscribe: PropTypes.func,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
