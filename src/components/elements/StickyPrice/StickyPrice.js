import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './styles.scoped.css';
import { thousand } from '../../../utils/format';
import { remToPx } from '../../../utils/unit';
import Button from '../../elements/Button';
import Spinner from '../../elements/Spinner';

export default function StickyPrice(props) {
  const { appearOn, className, isLoading, onClickDetail, onClickSubscribe, price } = props;
  const customClass = [styles.root, className].filter(Boolean).join(' ');
  const [appear, setAppear] = useState('');

  useEffect(() => {
    const onScroll = () => {
      const { scrollTop } = document.getElementsByTagName('html')[0];
      setAppear(scrollTop > remToPx(appearOn) ? styles.appear : '');
    };
    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  });

  return (
    <section className={[customClass, appear].filter(Boolean).join(' ')}>
      <h3>Rp{thousand(price)} <small>/month</small></h3>
      <Link onClick={onClickDetail} to="#">
        View pricing details
        <img alt="chevron red" src="/assets/ic_chevron_red.svg" />
      </Link>
      <Button disabled={isLoading.submit} onClick={onClickSubscribe}>
        {isLoading.submit ? <Spinner /> : 'Subscribe'}
      </Button>
    </section>
  );
}

StickyPrice.defaultProps = {
  appearOn: 17.25,
  className: '',
  isLoading: { data: true, submit: false },
  onClickDetail: null,
  onClickSubscribe: null,
  price: null
};

StickyPrice.propTypes = {
  appearOn: PropTypes.number,
  className: PropTypes.string,
  isLoading: PropTypes.object,
  onClickDetail: PropTypes.func,
  onClickSubscribe: PropTypes.func,
  price: PropTypes.number
};
