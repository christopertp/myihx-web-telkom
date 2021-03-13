import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Button from '../../components/elements/Button';
import Card from '../../components/elements/Card';
import IconButton from '../../components/elements/IconButton';
import Modal from '../../components/elements/Modal';
import ModalLogin from '../../components/elements/ModalLogin';
import ModalPricingDetail from '../../components/elements/ModalPricingDetail';
import StickyPrice from '../../components/elements/StickyPrice';
import PackageDetailMenu from '../../components/fragments/PackageDetailMenu';
import useSlider from '../../hooks/useSlider';
import { getUserData } from '../../utils/storage';
import { remToPx } from '../../utils/unit';
import { fetchMostPopularDetail, fetchSubscribe, resetData } from './actions';
import styles from './styles.scoped.css';

export default function PackageDetail() {
  const dispatch = useDispatch();
  const [modalLogin, setModalLogin] = useState(false);
  const [modalChannel, setModalChannel] = useState(false);
  const [modalDetail, setModalDetail] = useState(false);
  const [modalErrorSubscribe, setModalErrorSubscribe] = useState(false);
  const { productId } = useParams();
  const { isLoading, code, data } = useSelector(s => s.packageDetail);
  const { discountPrice } = data;
  const isLoggedIn = !!getUserData();

  useEffect(() => {
    dispatch(fetchMostPopularDetail(productId));
    return () => {
      dispatch(resetData());
    };
  }, []);

  useEffect(() => {
    if (code === 409) {
      setModalErrorSubscribe(true);
    }
  }, [code]);

  const onClickErrorSubscribe = () => {
    setModalErrorSubscribe(false);
  };

  const onClickSubscribe = () => {
    isLoggedIn ? dispatch(fetchSubscribe(productId)) : setModalLogin(true);
  };

  const onClickDetail = () => setModalDetail(true);

  if(!isLoading.data && !data) {
    return <h1>Data tidak ditemukan</h1>;
  }

  return (
    <>
      <PackageDetailMenu onClickDetail={onClickDetail} onClickSubscribe={onClickSubscribe} />
      <section className={styles['package-detail']} id="package-detail">
        <div>
          <p>Your Channel</p>
          {isLoading.data || <Button onClick={() => setModalChannel(true)} variant="text">View All</Button>}
        </div>
        <SliderSection name="channels" />
        <p>Watch Free On Iflix</p>
        <SliderSection name="iflix" />
        <p>Watch Free On Hooq</p>
        <SliderSection name="hooq" />
      </section>
      <StickyPrice
        appearOn={17.125}
        isLoading={isLoading}
        onClickDetail={onClickDetail}
        onClickSubscribe={onClickSubscribe}
        price={discountPrice}
      />
      <ModalChannels onClose={() => setModalChannel(false)} open={modalChannel} />
      <ModalLogin onClose={() => setModalLogin(false)} open={modalLogin} />
      <ModalPricingDetail data={data} onClickSubscribe={onClickSubscribe}
        onClose={() => setModalDetail(false)} open={modalDetail} />
      <Modal className={styles['modal-409']} open={modalErrorSubscribe}>
        <img alt="" src="/assets/grfx_warning.svg" />
        <h3>You are already subscribed!</h3>
        <Button onClick={onClickErrorSubscribe}>Close</Button>
      </Modal>
    </>
  );
}

export function SliderSection(props) {
  const { name } = props;
  const margin = (window.innerWidth < 768) ? remToPx(0.75) : remToPx(1);
  const { isLoading, data } = useSelector(s => s.packageDetail);
  const slider = useSlider(3000, margin);
  return (
    <ul {...slider} className={styles[name]}>
      {
        isLoading.data
          ? [...Array.from({ length: 2 }).keys()].map(i => <li className="loading" key={i} />)
          : data[name].map((i, idx) => <img alt={i.name} key={idx} src={i.image} />)
      }
    </ul>
  );
}

SliderSection.defaultProps = {
  name: '',
};

SliderSection.propTypes = {
  name: PropTypes.string,
};

export function ModalChannels(props) {
  const { onClose, open } = props;
  const [idxOpen, setIdxOpen] = useState(-1);
  const { data } = useSelector(s => s.packageDetail);
  const { channelsByCat } = data;

  const height = (item, idx) => {
    const row = Math.ceil(channelsByCat[item].length / 3);
    const rowHeight = (row * 4.25) + ((row - 1) * 0.5);
    return idx === idxOpen ? `${6.5 + rowHeight}rem` : '3.5rem';
  };

  const onClickOpen = idx => () => {
    setIdxOpen(idx === idxOpen ? -1 : idx);
  };

  return (
    <Modal onClose={onClose} open={open}>
      <h3 className={styles['channel-title']}>Channel List</h3>
      {Object.keys(channelsByCat).map((i, idx) => (
        <Card className={styles['channel-card']} key={idx} style={{ height: height(i, idx) }}>
          <header onClick={onClickOpen(idx)}>
            <h6>{i}</h6>
            <p>{channelsByCat[i].length} channels</p>
            <IconButton className={idx === idxOpen ? styles.open : ''} name="chevron_red_down" onClick={onClickOpen(idx)} />
          </header>
          <ul>{channelsByCat[i].map((j, idx) => <img alt={j.name} key={idx} src={j.image} />)}</ul>
        </Card>
      ))}
    </Modal>
  );
}

ModalChannels.defaultProps = {
  onClose: () => { },
  open: false,
};

ModalChannels.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
