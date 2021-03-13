import React, { createContext, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import OtpRequest from '../../elements/OtpRequest';
import ChangeMobileForm from '../../forms/ProfileChangeEM';
import RecoveryCodeForm from '../../forms/ProfileRecoveryCode';
import WhiteCardPlain from '../../layouts/WhiteCardPlain';

const Context = createContext({});

export default function ProfileChangeMobile() {
  const { subpage } = useParams();
  const { mobileNumber, resetMessage } = useSelector(s => s.profile);
  const dispatch = useDispatch();
  const history = useHistory();
  const [ mobile, setMobile ] = useState(mobileNumber);
  const [ verifyType, setVerifyType ] = useState('');

  useEffect(() => {
    subpage && history.replace('/profile/change-mobile');
  }, []);

  useEffect(() => {
    dispatch(resetMessage());
  }, [subpage]);

  const contextValue = {
    mobile, setMobile,
    verifyType, setVerifyType,
  };

  return (
    <Context.Provider value={contextValue}>
      {(sp => {
        switch (sp) {
          case 'request': return <Request />;
          case 'verify': return <Verify />;
          default: return <New />;
        }
      })(subpage)}
    </Context.Provider>
  );
}

export function New() {
  const { setMobile } = useContext(Context);
  const { fetchCheckMobile } = useSelector(s => s.profile);
  const dispatch = useDispatch();
  const onSubmit = v => {
    setMobile(v.mobile);
    dispatch(fetchCheckMobile(v.mobile));
  };

  return (
    <WhiteCardPlain back="/profile" help icon="verify" size="medium" title="Change Phone Number">
      <ChangeMobileForm onSubmit={onSubmit} />
    </WhiteCardPlain>
  );
}

export function Request() {
  const { mobile, verifyType, setVerifyType } = useContext(Context);
  const { fetchSendOtpChangeMobile, isLoading, message } = useSelector(s => s.profile);
  const dispatch = useDispatch();
  const subtitle = 'Choose one of available method to receive account activation code';
  const onClick = type => () => {
    const otpType = type === 'SMS' ? 'sms' : 'wa';
    setVerifyType(type);
    dispatch(fetchSendOtpChangeMobile(mobile, otpType));
  };

  return (
    <WhiteCardPlain back="/profile/change-mobile" help icon="verify" size="medium"
      subtitle={subtitle} title="Choose Verification Method">
      <OtpRequest isLoading={isLoading.b} message={message} mobile={mobile}
        onClick={onClick} type={verifyType} />
    </WhiteCardPlain>
  );
}

export function Verify() {
  const { mobile, verifyType } = useContext(Context);
  const { fetchSendOtpChangeMobile, fetchVerifyMobile } = useSelector(s => s.profile);
  const dispatch = useDispatch();
  const subtitle = `Please enter the recovery code sent via ${verifyType} to ${mobile.slice(-4).padStart(mobile.length, '•')}`;
  const otpType = verifyType === 'SMS' ? 'sms' : 'wa';
  const onResend = () => dispatch(fetchSendOtpChangeMobile(mobile, otpType));
  const onSubmit = v => dispatch(fetchVerifyMobile(v.recoveryCode));

  return (
    <WhiteCardPlain back="/profile/change-mobile/request" help icon="verify" size="medium"
      subtitle={subtitle} title="Verify Phone Number">
      <RecoveryCodeForm onResend={onResend} onSubmit={onSubmit} />
    </WhiteCardPlain>
  );
}
