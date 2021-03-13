import React, { createContext, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Button from '../../components/elements/Button';
import Modal from '../../components/elements/Modal';
import OtpInput from '../../components/elements/OtpInput';
import OtpRequest from '../../components/elements/OtpRequest';
import LoginUserForm from '../../components/forms/LoginUser';
import LoginPasswordForm from '../../components/forms/LoginPassword';
import WhiteCard from '../../components/layouts/WhiteCard';
import useTimer from '../../hooks/useTimer';
import { fetchCheckUser, fetchLoginUser, fetchSendOtp, resetMessage, fetchVerifyLogin } from './actions';
import styles from './styles.scoped.css';

const Context = createContext({});

export default function Login() {
  const [user, setUser] = useState('');
  const [userId, setUserId] = useState('');
  const [verifyType, setVerifyType] = useState('sms');
  const { page } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    page && history.replace('/login');
  }, []);

  useEffect(() => {
    dispatch(resetMessage());
  }, [page]);

  const contextValue = {
    user, setUser,
    userId, setUserId,
    verifyType, setVerifyType,
  };

  return (
    <Context.Provider value={contextValue}>
      {(p => {
        switch (p) {
          case 'password': return <Password />;
          case 'request': return <Request />;
          case 'verify': return <Verify />;
          default: return <User />;
        }
      })(page)}
    </Context.Provider>
  );
}

export function User() {
  const { setUser } = useContext(Context);
  const dispatch = useDispatch();
  const { message } = useSelector(s => s.login);
  const onSubmit = v => {
    dispatch(fetchCheckUser(v.user));
    setUser(v.user);
  };
  return (
    <WhiteCard back="/" icon="login" title="Masuk ke MyIndihome">
      <LoginUserForm onSubmit={onSubmit} />
      <Modal className={styles['modal-user']} onClose={() => dispatch(resetMessage())} open={message === '404'}>
        <h4>Account not yet registered</h4>
        <p>Looks like this account is not yet registered! Do you want to register instead?</p>
        <div>
          <Button onClick={() => dispatch(resetMessage())} variant="bordered">Try Again</Button>
          <Button to="/register">Register</Button>
        </div>
      </Modal>
    </WhiteCard>
  );
}

export function Password() {
  const { user } = useContext(Context);
  const dispatch = useDispatch();
  const onSubmit = v => {
    dispatch(fetchLoginUser(user, v.password));
  };
  return (
    <WhiteCard back="/login" icon="password" title="Masukkan Kata Sandi Anda">
      <LoginPasswordForm onSubmit={onSubmit} />
    </WhiteCard>
  );
}

export function Request() {
  const { setVerifyType, user, verifyType } = useContext(Context);
  const dispatch = useDispatch();
  const { isLoading, message } = useSelector(s => s.login);
  const onClick = type => () => {
    dispatch(fetchSendOtp(user, type === 'SMS' ? 'sms' : 'wa'));
    setVerifyType(type);
  };
  return (
    <WhiteCard back="/login" icon="verify" title="Pilih Metode Verifikasi">
      <OtpRequest isLoading={isLoading} message={message} mobile={user}
        onClick={onClick} type={verifyType} />
    </WhiteCard>
  );
}

export function Verify() {
  const initTime = 179;
  const { user, verifyType } = useContext(Context);
  const dispatch = useDispatch();
  const { isLoading, message, userId } = useSelector(s => s.login);
  const { setTimer, timer, time } = useTimer(initTime);
  const min = time[1];
  const sec = time[2];
  const subtitle = `Masukkan 4 digit kode verifikasi yang telah kami kirim ke nomor ${verifyType} ${user.slice(-4).padStart(user.length, '•')}`;

  const onClick = () => {
    dispatch(fetchSendOtp(user, verifyType));
    setTimer(initTime);
  };

  return (
    <WhiteCard back="/login/request" icon="verify" subtitle={subtitle} title="Masuk Menggunakan Nomor Ponsel">
      <OtpInput disabled={isLoading}
        error={message} onSubmit={v => dispatch(fetchVerifyLogin(v, userId))} />
      {timer ?
        <p className={styles['verify-timer']}>Kirim ulang kode dalam {min}:{sec}</p> :
        <Button className={styles['verify-resend']} onClick={onClick} variant="text">Kirim ulang kode</Button>
      }
    </WhiteCard>
  );
}
