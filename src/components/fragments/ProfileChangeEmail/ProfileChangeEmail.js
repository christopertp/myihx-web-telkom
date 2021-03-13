import React, { createContext, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import WhiteCardPlain from '../../layouts/WhiteCardPlain';
import ChangeEmailForm from '../../forms/ProfileChangeEM';
import RecoveryCodeForm from '../../forms/ProfileRecoveryCode';

const Context = createContext({});

export default function ProfileChangeEmail() {
  const { subpage } = useParams();
  const { email, resetMessage } = useSelector(s => s.profile);
  const dispatch = useDispatch();
  const history = useHistory();
  const [ emailUser, setEmailUser ] = useState(email);

  const contextValue = {
    emailUser,
    setEmailUser,
  };

  useEffect(() => {
    subpage && history.replace('/profile/change-email');
  }, []);

  useEffect(() => {
    dispatch(resetMessage());
  }, [subpage]);

  return (
    <Context.Provider value={contextValue}>
      {(subpage === 'verify') ? <Verify /> : <New />}
    </Context.Provider>
  );
}

export function New() {
  const { setEmailUser } = useContext(Context);
  const { fetchChangeEmail } = useSelector (s => s.profile);
  const dispatch = useDispatch();
  const onSubmit = v => {
    setEmailUser(v.email);
    dispatch(fetchChangeEmail(v.email));
  };

  return (
    <WhiteCardPlain back="/profile" help icon="email" size="medium" title="Change Email">
      <ChangeEmailForm onSubmit={onSubmit} />
    </WhiteCardPlain>
  );
}

export function Verify() {
  const { emailUser } = useContext(Context);
  const { fetchChangeEmail, fetchVerifyEmail } = useSelector(s => s.profile );
  const subtitle = 'Please enter verification code sent to your previous email';
  const dispatch = useDispatch();
  const onResend = () => dispatch(fetchChangeEmail(emailUser));
  const onSubmit = v => dispatch(fetchVerifyEmail(v.recoveryCode));

  return (
    <WhiteCardPlain back="/profile/change-email" help icon="email" size="medium"
      subtitle={subtitle} title="Verify Email">
      <RecoveryCodeForm onResend={onResend} onSubmit={onSubmit} />
    </WhiteCardPlain>
  );
}
