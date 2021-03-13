import React, { createContext, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import NewForm from '../../components/forms/ForgotPasswordNew';
import RecoveryCodeForm from '../../components/forms/ForgotPasswordRecoveryCode';
import UserForm from '../../components/forms/ForgotPasswordUser';
import WhiteCard from '../../components/layouts/WhiteCard';
import { isEmail } from '../../utils/validation';
import { fetchForgotPassword, fetchResetPassword, fetchVerify } from './actions';

const Context = createContext({});

export default function ForgotPassword() {
  const [user, setUser] = useState('');
  const { page } = useParams();
  const history = useHistory();

  useEffect(() => {
    page && history.replace('/forgot-password');
  }, []);

  const contextValue = {
    user, setUser,
  };

  return (
    <Context.Provider value={contextValue}>
      {(p => {
        switch (p) {
          case 'recovery-code': return <RecoveryCode />;
          case 'new': return <New />;
          default: return <User />;
        }
      })(page)}
    </Context.Provider>
  );
}

export function User() {
  const { setUser } = useContext(Context);
  const { state = '' } = useLocation();
  const dispatch = useDispatch();
  const onSubmit = v => {
    setUser(v.user);
    dispatch(fetchForgotPassword(v.user));
  };
  return (
    <WhiteCard back={state.back || '/login'} icon="password"
      subtitle="We got you covered! Receive password recovery code in your registered email"
      title="Forgot Password">
      <UserForm onSubmit={onSubmit} />
    </WhiteCard>
  );
}

export function RecoveryCode() {
  const { user } = useContext(Context);
  const dispatch = useDispatch();
  const { userId } = useSelector(s => s.forgotPassword);
  const onSubmit = v => {
    dispatch(fetchVerify(v.code, userId));
  };
  const userLabel = isEmail(user) ?
    `e-mail ${[user.split('@')[0].slice(-3).padStart(user.split('@')[0].length, '•'), user.split('@')[1]].join('@')}` :
    `mobile number ${user.slice(-4).padStart(user.length, '•')}`;
  return (
    <WhiteCard back="/forgot-password" icon="verify"
      subtitle={`Enter the recovery code we sent to your ${userLabel}`}
      title="Enter Recovery Code">
      <RecoveryCodeForm onSubmit={onSubmit} />
    </WhiteCard>
  );
}

export function New() {
  const dispatch = useDispatch();
  const { userId } = useSelector(s => s.forgotPassword);
  const onSubmit = v => {
    dispatch(fetchResetPassword(v.password, userId));
  };
  return (
    <WhiteCard back="/forgot-password/recovery-code" icon="password"
      subtitle="Create a new password to protect your account" title="New Password">
      <NewForm onSubmit={onSubmit} />
    </WhiteCard>
  );
}
