import React, { useEffect, useState, useContext, createContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '../../components/elements/Button';
import CheckBox from '../../components/fields/Checkbox';
import WhiteCardPlain from '../../components/layouts/WhiteCardPlain';
import WhiteCardSuccessPlain from '../../components/layouts/WhiteCardSuccessPlain';
import OtpInput from '../../components/elements/OtpInput';
import { fetchDataUser, activateReward, verifyOtp, resendOtp, fetchStatusRewards } from './actions';
import styles from './styles.scoped.css';
import useTimer from '../../hooks/useTimer';
import OtpRequest from '../../components/elements/OtpRequest';

const Context = createContext({});
const INACTIVE = 'INACTIVE';

export default function ActivateRewards() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { page } = useParams();
  const storeRewards = useSelector((s) => s.activateRewards);
  const [category, setCategory] = useState([]);
  const [userMobile, setUserMobile] = useState('');
  const [verifyType, setVerifyType] = useState('sms');
  useEffect(() => {
    dispatch(fetchDataUser());
    dispatch(fetchStatusRewards());
  }, []);

  const contextValue = {
    userMobile, setUserMobile,
    verifyType, setVerifyType,
    category, setCategory,
  };

  return (
    <Context.Provider value={contextValue}>
      {(p => {
        // if (INACTIVE !== storeRewards.isActivated) history.replace('/profile');
        switch (p) {
          case 'success': return <SuccessfullCard />;
          case 'request': return <Request />;
          case 'verify': return <Verify />;
          case 'tnc': return <TermsAndConditions />;
          default: return <ActivateRewardsCard />;
        }
      })(page)}
    </Context.Provider>
  );
}

export function ActivateRewardsCard() {
  const storeRewards = useSelector((s) => s.activateRewards);
  const history = useHistory();
  const labelCheckbox =
    (<span className={styles.agreementText}>I agree to the&thinsp;
      <Link className={styles.redTC} to="/activate-rewards/tnc">Terms &amp; Conditions</Link>
    </span>);
  const icon = 'poin';
  const checkBoxProps = {
    label: labelCheckbox,
  };
  const {
    setUserMobile,
    setCategory,
  } = useContext(Context);
  const [checked, setChecked] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState([]);


  useEffect(() => {
    if (
      storeRewards.category.length > 0
      && selectedCategory.length === 0
    ) {
      setSelectedCategory(storeRewards.category);
    }
  }, [storeRewards.isActivated]);

  const onSubmit = () => {
    const categories = selectedCategory
      .filter((el) => el.isActive)
      .map(e => e.name);
    setCategory(categories);
    const { mobileNumber } = storeRewards;
    setUserMobile(mobileNumber);
    history.replace('/activate-rewards/request');
  };

  const input = {
    checked: checked,
    label: 'agreement',
    name: 'agreement',
    value: 'true',
    onChange: () => setChecked(!checked),
  };
  const addItem = (item) => {
    let counter = 0;
    selectedCategory.map(e => {
      if (e.isActive) {
        counter++;
      }
    });
    const itemIndex = selectedCategory.findIndex(e => e.name === item.currentTarget.textContent);
    const editedCategory = selectedCategory;

    if (counter >= 3 && !editedCategory[itemIndex].isActive) {
      return;
    }
    if (itemIndex !== -1) {
      editedCategory[itemIndex].isActive = !editedCategory[itemIndex].isActive;
      item.target.className = editedCategory[itemIndex].isActive ? styles.active : '';
    }
    setSelectedCategory(editedCategory);
  };
  const error = 'Error message yang ingin ditampilkan';
  const meta = { error, touched: false };
  const categories = selectedCategory.map((categoryItem, index) => (
    <div
      key={`${index + categoryItem.name}`}
      onClick={addItem}
    >
      {categoryItem.name}
    </div >
  ));

  return (
    <WhiteCardPlain
      back="/profile"
      icon={icon}
      size="medium"
      subtitle="Choose any rewards &#38; merchant category that you like!"
      title="Activate Rewards">
      <div className={styles.root}>
        <div className={styles.categoryContainer}>
          {
            categories
          }
        </div>
        <div
          className={styles.checkbox}
        >
          <CheckBox
            input={input}
            inputProps={checkBoxProps}
            meta={meta}
          />
        </div>
        <footer className={styles.footerAction}>
          <Button to="/profile" variant="bordered">Cancel</Button>
          <Button disabled={!checked} onClick={onSubmit}>Next</Button>
        </footer>
      </div>
    </WhiteCardPlain>
  );
}

export function TermsAndConditions() {
  const storeRewards = useSelector(s => s.activateRewards);

  return (
    <WhiteCardPlain
      back="/activate-rewards"
      size="medium"
      subtitle={storeRewards?.terms || 'T&C'}
      title="Terms &amp; Conditions" />
  );
}

export function SuccessfullCard() {
  const icon = 'success';

  return (
    <WhiteCardSuccessPlain
      icon={icon}
      size="medium"
      subtitle="Start redeeming your Poin and get amazing rewards!"
      title="Poin Successfully activated!">
      <div className={styles.root}>
        <footer className={styles.footerActionSuccessfull}>
          <Button to="/rewards/browse">Browse Rewards</Button>
          <Button to="/profile" variant="text">Back to Profile</Button>
        </footer>
      </div>
    </WhiteCardSuccessPlain>
  );
}


export function Request() {
  const { setVerifyType, userMobile, verifyType, category } = useContext(Context);
  const dispatch = useDispatch();
  const history = useHistory();
  const storeRewards = useSelector(s => s.activateRewards);
  const { isLoading, message } = storeRewards;
  const onClick = type => () => {
    if (isLoading) return;
    const typeOTP = type === 'SMS' ? 'sms' : 'wa';
    dispatch(activateReward(category, typeOTP));
    setVerifyType(typeOTP);
    history.replace('/activate-rewards/verify');
  };


  useEffect(() => {
    if (userMobile === '') history.replace('/profile');
    dispatch(fetchDataUser());
  }, []);

  return (
    <WhiteCardPlain back="/activate-rewards" icon="verify" size="medium" title="Pilih Metode Verifikasi">
      <OtpRequest isLoading={isLoading} message={message} mobile={userMobile}
        onClick={onClick} type={verifyType} />
    </WhiteCardPlain>
  );
}

export function Verify() {
  const { verifyType } = useContext(Context);
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    isLoading,
    message,
    deadlineOTP,
    mobileNumber,
    countOTP,
  } = useSelector(s => s.activateRewards);
  const initTime = deadlineOTP || 60;
  const { setTimer, timer, time } = useTimer(initTime);
  const min = time[1];
  const sec = time[2];
  const verifyMethod = verifyType === 'sms' ? 'SMS' : 'WhatsApp';
  const subtitle = `Masukkan 4 digit kode verifikasi yang telah kami kirim melalui ${verifyMethod} ke nomor ${mobileNumber.slice(-4).padStart(mobileNumber.length, '•')}`;

  useEffect(() => {
    if (mobileNumber === '') {
      history.replace('/profile');
    }
  }, []);

  const onClick = () => {
    dispatch(resendOtp(verifyType));
    setTimer(initTime);
  };

  const navSuccess = (value) => {
    if (countOTP >= 0) {
      dispatch(verifyOtp(value));
    }
  };

  const showResend = () => {

    if (countOTP >= 0) {
      return timer ?
        <p className={styles['verify-timer']}>Kirim ulang kode dalam {min}:{sec}</p> :
        <Button className={styles['verify-resend']} onClick={onClick} variant="text">Kirim ulang kode</Button>;

    }
    return <div className={styles['padding-resend']}> </div>;
  };

  return (
    <WhiteCardPlain back="/activate-rewards/request" icon="verify" size={'medium'} subtitle={subtitle} title="Masukkan OTP">
      <OtpInput disabled={isLoading}
        error={message} onSubmit={(v) => navSuccess(v)} />
      {
        showResend()
      }
    </WhiteCardPlain>
  );
}


ActivateRewards.propTypes = {
  dataProfile: PropTypes.object,
  mobileNumber: PropTypes.string
};

ActivateRewards.defaultProps = {
  dataProfile: {},
  mobileNumber: ''
};
