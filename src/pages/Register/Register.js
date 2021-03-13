import React, { createContext, useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Button from '../../components/elements/Button';
import Card from '../../components/elements/Card';
import Modal from '../../components/elements/Modal';
import OtpInput from '../../components/elements/OtpInput';
import OtpRequest from '../../components/elements/OtpRequest';
import RegisterUserForm from '../../components/forms/RegisterUser';
import WhiteCard from '../../components/layouts/WhiteCard';
import WhiteCardSuccess from '../../components/layouts/WhiteCardSuccess';
import useTimer from '../../hooks/useTimer';
import { fetchIndihomeNumber, fetchRegisterUser, fetchSendOtpRegister, fetchVerifyRegister, resetMessage, setVerifiedAccount } from './actions';
import styles from './styles.scoped.css';

const Context = createContext({});

export default function Register() {
  const { page } = useParams();
  const [mobileNumber, setMobileNumber] = useState('');
  const [verifyType, setVerifyType] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    page && history.replace('/register');
  }, []);

  useEffect(() => {
    dispatch(resetMessage());
  }, [page]);

  const contextValue = {
    mobileNumber, setMobileNumber,
    verifyType, setVerifyType,
  };

  return (
    <Context.Provider value={contextValue}>
      {(p => {
        switch (p) {
          case 'request': return <Request />;
          case 'verify': return <Verify />;
          case 'indihome-number': return <IndihomeNumber />;
          case 'success': return <Success />;
          default: return <User />;
        }
      })(page)}
    </Context.Provider>
  );
}

export function User() {
  const { setMobileNumber } = useContext(Context);
  const dispatch = useDispatch();
  const { message } = useSelector(s => s.register);
  const subtitle = 'Looks like this e-mail/mobile number is already registered! Do you want to login instead?';
  const onSubmit = v => {
    dispatch(fetchRegisterUser(v));
    setMobileNumber(v.mobileNumber);
  };

  return (
    <WhiteCard back="/" icon="register" title="Pendaftaran Baru">
      <RegisterUserForm onSubmit={onSubmit} />
      <Modal className={styles['modal-user']} onClose={() => dispatch(resetMessage())} open={message === '1003'}>
        <h4>E-mail/Mobile Number is already registered</h4>
        <p>{subtitle}</p>
        <div>
          <Button onClick={() => dispatch(resetMessage())} variant="bordered">Try Again</Button>
          <Button to="/login">Login</Button>
          <Button to="/" variant="bordered">Get Help</Button>
        </div>
      </Modal>
    </WhiteCard>
  );
}

export function Request() {
  const { mobileNumber, setVerifyType, verifyType } = useContext(Context);
  const dispatch = useDispatch();
  const { isLoading, message, userId } = useSelector(s => s.register);
  const onClick = type => () => {
    const otpData = {
      userId,
      mobileNumber,
      type: type === 'SMS' ? 'sms' : 'wa',
    };
    dispatch(fetchSendOtpRegister(otpData));
    setVerifyType(type);
  };
  return (
    <WhiteCard back="/register" icon="verify" title="Pilih Metode Verifikasi">
      <OtpRequest isLoading={isLoading} message={message} mobile={mobileNumber}
        onClick={onClick} type={verifyType} />
    </WhiteCard>
  );
}

export function Verify() {
  const initTime = 179;
  const { mobileNumber, verifyType } = useContext(Context);
  const dispatch = useDispatch();
  const { isLoading, message, userId } = useSelector(s => s.register);
  const { setTimer, timer, time } = useTimer(initTime);
  const min = time[1];
  const sec = time[2];
  const subtitle = `Masukkan 4 digit kode verifikasi yang telah kami kirim ke nomor ${verifyType} ${mobileNumber.slice(-4).padStart(mobileNumber.length, '•')}`;
  const otpData = {
    userId,
    mobileNumber,
    type: verifyType,
  };

  const onClick = () => {
    dispatch(fetchSendOtpRegister(otpData));
    setTimer(initTime);
  };

  return (
    <WhiteCard back="/register/request" icon="verify" subtitle={subtitle} title="Masuk Menggunakan Nomor Ponsel">
      <OtpInput disabled={isLoading}
        error={message} onSubmit={v => dispatch(fetchVerifyRegister(v, userId))} />
      {timer ?
        <p className={styles['verify-timer']}>Kirim ulang kode dalam {min}:{sec}</p> :
        <Button className={styles['verify-resend']} onClick={onClick} variant="text">Kirim ulang kode</Button>
      }
    </WhiteCard>
  );
}

export function IndihomeNumber() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { accessToken, isLoading, message, profilePicture, userId } = useSelector(s => s.register);
  const [choose, setChoose] = useState('');
  const [error, setError] = useState('');
  const [number, setNumber] = useState('');
  const styleChoose = ['choose-button', choose].filter(Boolean).join('-');
  const showInput = ['form-choose-group', choose].filter(Boolean).join('-');
  const fieldError = [styles[showInput], !!(error || message) && styles.error].filter(Boolean).join(' ');
  const title = 'Apakah Anda sudah berlangganan layanan IndiHome?';

  const onChange = ({ target: { value } }) => {
    message && dispatch(resetMessage());
    if (value / 1) {
      setError('');
      setNumber(value);
    } else {
      setError('Masukkan hanya angka dan maksimal 12 karakter');
    }
  };

  const onClick = v => () => {
    v === 'yes' ? dispatch(fetchIndihomeNumber(userId, number, accessToken, profilePicture)) : history.push('/register/success');
  };

  return (
    <WhiteCard back="/register/verify" icon="wifi" title={title}>
      <Card className={styles[styleChoose]} disabled={isLoading} onClick={() => setChoose('yes')}>
        <div className={styles['choose-group']}>
          <span>Ya</span>
          {choose === 'yes' && <img alt="check" src="/assets/ic_check_red.svg" />}
        </div>
        <div className={fieldError}>
          <label>Nomor Indihome</label>
          <input maxLength="12" onChange={onChange} placeholder="Masukkan nomor Indihome Anda di sini" type="text" />
          {(error || message) && <small>{error || message}</small>}
        </div>
      </Card>
      <Card className={styles[styleChoose]} disabled={isLoading} onClick={() => setChoose('no')}>
        <div className={styles['choose-group']}>
          <span>Tidak</span>
          {choose === 'no' && <img alt="check" src="/assets/ic_check_red.svg" />}
        </div>
      </Card>
      <Button className={styles.button} disabled={!choose || !!error || isLoading}
        onClick={onClick(choose)}>
        Lanjut
      </Button>
    </WhiteCard>
  );
}

export function Success() {
  const dispatch = useDispatch();
  const subtitle = 'Kini Anda dapat menikmati berbagai layanan kebutuhan IndiHome, penawaran, serta informasi menarik dari IndiHome!';
  const { accessToken, profilePicture } = useSelector(s => s.register);
  const onClick = () => {
    dispatch(setVerifiedAccount(accessToken, profilePicture));
  };

  return (
    <WhiteCardSuccess icon="success" subtitle={subtitle} title="Hore! Pendaftaran Anda berhasil!">
      <Button className={styles['button-success']} onClick={onClick}>Yuk, Mulai Menjelajahi</Button>
    </WhiteCardSuccess>
  );
}
