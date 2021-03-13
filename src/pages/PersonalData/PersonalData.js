import React, { createContext, useEffect, useState, useContext, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Button from '../../components/elements/Button';
import Spinner from '../../components/elements/Spinner';
import Summary from '../../components/fragments/PersonalDataSummary';
import ReviewForm from '../../components/forms/PersonalDataReview';
import WhiteCardPlain from '../../components/layouts/WhiteCardPlain';
import WhiteCardSuccessPlain from '../../components/layouts/WhiteCardSuccessPlain';
import { fetchDocument, fetchUpload } from './actions';
import styles from './styles.scoped.css';

const Context = createContext({});

export default function PersonalData() {
  const history = useHistory();
  const { page } = useParams();
  const [photo, setPhoto] = useState('');

  useEffect(() => {
    (page && page !== 'verify') && history.replace('/personal-data');
  }, []);

  const contextValue = {
    photo, setPhoto,
  };

  return (
    <Context.Provider value={contextValue}>
      {(p => {
        if (['e-ktp', 'ktp', 'passport', 'sim'].includes(p)) {
          return <ReviewId />;
        }
        if (['selfie', 'sign'].includes(p)) {
          return <ReviewSelfieSign />;
        }
        if (p === 'verify') {
          return <Verify />;
        }
        return <Summary fetchDocument={fetchDocument} setPhoto={setPhoto} />;
      })(page)}
    </Context.Provider>
  );
}

export function ReviewId() {
  const { photo, setPhoto } = useContext(Context);
  const dispatch = useDispatch();
  const { page, subpage } = useParams();
  const { onChangeFile, onRetake, preview, refFile } = usePhoto(photo, setPhoto);
  const { photos } = useSelector(s => s.personalData);
  const subtitle = 'Please make sure your picture is clear and show complete information.';

  const onSubmit = v => {
    const payload = new FormData();
    Object.keys(v).forEach(i => {
      payload.append(i, v[i]);
    });
    payload.append('type', page.replace('-',''));
    payload.append('image', photo);
    dispatch(fetchUpload('id', payload, subpage));
  };

  useEffect(() => () => setPhoto(null), []);

  return (
    <WhiteCardPlain back="/personal-data" subtitle={subtitle} title="Review Photo">
      <img alt="" className={styles['review-image']} src={preview ? preview : photos.id} />
      <ReviewForm onRetake={onRetake} onSubmit={onSubmit} />
      <input accept="image/png, image/jpeg, image/jpg" onChange={onChangeFile} ref={refFile} style={{ display: 'none' }} type="file" />
    </WhiteCardPlain>
  );
}

export function ReviewSelfieSign() {
  const { photo, setPhoto } = useContext(Context);
  const dispatch = useDispatch();
  const { page } = useParams();
  const { onChangeFile, onRetake, preview, refFile } = usePhoto(photo, setPhoto);
  const { isLoading, message } = useSelector(s => s.personalData);
  const title = page === 'selfie' ? 'Review Photo' : 'Review Signature Image';
  const subtitle = page === 'selfie' ?
    'Please make sure your picture is clear and show complete information.' :
    'Please make sure your signature picture is clear.';

  const onSubmit = () => {
    const payload = new FormData();
    payload.append('image', photo);
    dispatch(fetchUpload(page, payload));
  };

  return (
    <WhiteCardPlain back="/personal-data" subtitle={subtitle} title={title}>
      <img alt="" className={styles['review-image']} src={preview} />
      {message && <small className={styles.error}>{message}</small>}
      <div className={styles.reupload}>
        <Button disabled={isLoading} onClick={onRetake} variant="bordered">Reupload</Button>
        <Button disabled={isLoading} onClick={onSubmit}>
          {isLoading ? <Spinner /> : 'Confirm'}
        </Button>
      </div>
      <input accept="image/png, image/jpeg, image/jpg" onChange={onChangeFile} ref={refFile} style={{ display: 'none' }} type="file" />
    </WhiteCardPlain>
  );
}

export function Verify() {
  const title = 'Verification in Progress';
  const subtitle = 'Please wait while we’re verifying your ID. You will receive a phone call from our agent within 1x24 hours.';
  return (
    <WhiteCardSuccessPlain icon="waiting" subtitle={subtitle} title={title}>
      <Button className={styles['verify-button']} to="/">Back to Home</Button>
    </WhiteCardSuccessPlain>
  );
}

export function usePhoto(photo, setPhoto) {
  const refFile = useRef(null);
  const [preview, setPreview] = useState('');

  useEffect(() => {
    const reader = new FileReader();
    reader.onload = e => {
      setPreview(e.target.result);
    };
    photo && reader.readAsDataURL(photo);
  }, [photo]);

  const onRetake = () => {
    refFile.current.click();
  };

  const onChangeFile = e => {
    const { files } = e.target;
    setPhoto(files[0]);
  };

  return { onChangeFile, onRetake, preview, refFile };
}
