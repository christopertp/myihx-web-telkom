import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import Button from '../../elements/Button';
import Card from '../../elements/Card';
import CompleteBy from '../../elements/CompleteBy/CompleteBy';
import Modal from '../../elements/Modal';
import Spinner from '../../elements/Spinner';
import WhiteCardPlain from '../../layouts/WhiteCardPlain';
import styles from './styles.scoped.css';

export default function PersonalDataSummary(props) {
  const { fetchDocument, setPhoto } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  const refFile = useRef(null);
  const { isLoading, photos, timeInSeconds } = useSelector(s => s.personalData);
  const [modalId, setModalId] = useState(false);
  const [idName, setIdName] = useState('');
  const { page } = useParams();
  const subtitle = page === 'confirm'
    ? 'Review your uploaded documents'
    : 'Please verify your identity to confirm &amp; secure your account. This will only take a few minutes.';
  const title = page === 'confirm' ? 'Review Documents' : 'Verify Identity';
  const ids = ['e-KTP', 'KTP', 'Passport', 'SIM'];

  const onClickId = name => () => {
    refFile.current.click();
    setIdName(name);
  };

  const onClickCard = name => () => {
    if (name === 'id') {
      setModalId(true);
    } else {
      onClickId(name)();
    }
  };

  const onChangeFile = e => {
    const { files } = e.target;
    setPhoto(files[0]);
    history.push(`/personal-data/${idName.toLowerCase()}`);
  };

  useEffect(() => {
    dispatch(fetchDocument());
  }, []);

  return (
    <>
      <WhiteCardPlain help icon="kyc" subtitle={subtitle} title={title}>
        {isLoading ? '' : <CompleteBy className={styles.timer} initTime={timeInSeconds} />}
        {page === 'confirm' ? <Confirm onClickCard={onClickCard} /> : <Summary onClickCard={onClickCard} />}
      </WhiteCardPlain>
      <Modal className={styles['modal-id']} onClose={() => setModalId(false)} open={modalId}>
        {ids.map((i, idx) => (
          <Card key={idx} onClick={onClickId(i)}>
            <h6>{i}</h6>
            <img alt="" src="/assets/ic_chevron_red.svg" />
          </Card>
        ))}
      </Modal>
      <Modal className={styles['modal-warning']} open={!isLoading && !photos}>
        <img alt="" src="/assets/grfx_warning.svg" />
        <h1>Reserve not found</h1>
        <Button to="/shop/internet">Browse package</Button>
      </Modal>
      <input accept="image/png, image/jpeg, image/jpg" onChange={onChangeFile} ref={refFile} style={{ display: 'none' }} type="file" />
    </>
  );
}

PersonalDataSummary.defaultProps = {
  fetchDocument: () => {},
  setPhoto: () => {},
};

PersonalDataSummary.propTypes = {
  fetchDocument: PropTypes.func,
  setPhoto: PropTypes.func,
};

export function Summary(props) {
  const { onClickCard } = props;
  const { invalid, isLoading, photos } = useSelector(s => s.personalData);
  const style = invalid ? { borderColor: '#ee4c24' } : undefined;
  const cards = [
    { name: 'id', title: 'Identity', desc: 'e-KTP, KTP, Passport or driver\'s license' },
    { name: 'selfie', title: 'Selfie with ID', desc: 'Take a selfie with your document' },
    { name: 'sign', title: 'Signature', desc: 'Digital sign or take signature picture' },
  ];

  return (
    <>
      <section className={styles['summary-required']}>
        <h3>Required Documents</h3>
        {cards.map((i, idx) => (
          <Card disabled={isLoading} key={idx} onClick={onClickCard(i.name)} style={style}>
            <img alt="upload" src={`/assets/ic_selection_kyc_${i.name}.svg`} />
            <div>
              <h6>{i.title}</h6>
              <p>{i.desc}</p>
            </div>
            {((l, i) => {
              if (l) {
                return <Spinner color="#ee3124" />;
              } else if (!i) {
                return <img alt="" src="/assets/ic_chevron_red.svg" />;
              }
              return <img alt="done" src="/assets/ic_done.svg" />;
            })(isLoading, photos[i.name])}
          </Card>
        ))}
      </section>
      {invalid && <small className={styles['error-invalid']}>{invalid}</small>}
      <Button disabled={!photos.id || !photos.selfie || !photos.sign}
        to="/personal-data/confirm">
        Review Documents
      </Button>
    </>
  );
}

Summary.propTypes = { onClickCard: PropTypes.func.isRequired };

export function Confirm(props) {
  const { onClickCard } = props;
  const dispatch = useDispatch();
  const { fetchConfirm, form, isLoading, message, photos } = useSelector(s => s.personalData);
  const labels = {
    'ektp': 'e-KTP',
    'ktp': 'KTP',
    'passport': 'Passport',
    'sim': 'Driver\'s license',
  };

  const onClick = () => {
    dispatch(fetchConfirm());
  };

  return (
    <>
      <h3 className={styles.confirm}>Identity</h3>
      <figure style={{ backgroundImage: `url('${photos.id}')` }}>
        <div />
        <div>
          <Link to={`/personal-data/${form.type}/edit`}>Edit Info</Link>
          <button onClick={onClickCard('id')}>Retake</button>
        </div>
      </figure>
      <div className={styles['confirm-id']}>
        <h6>{labels[form.type]} number</h6>
        <p>{form.idNumber}</p>
        <h6>Mother's Maiden Name</h6>
        <p>{form.motherName}</p>
      </div>
      <h3 className={styles.confirm}>Selfie with ID</h3>
      <figure style={{ backgroundImage: `url('${photos.selfie}')` }}>
        <div />
        <button onClick={onClickCard('selfie')}>Retake</button>
      </figure>
      <h3 className={styles.confirm}>Signature</h3>
      <figure style={{ backgroundImage: `url('${photos.sign}')` }}>
        <div />
        <button onClick={onClickCard('sign')}>Retake</button>
      </figure>
      {message && <small className={styles.error}>{message}</small>}
      <Button className={styles.submit} disabled={isLoading} onClick={onClick}>
        {isLoading ? <Spinner /> : 'Next'}
      </Button>
    </>
  );
}

Confirm.propTypes = { onClickCard: PropTypes.func.isRequired };
