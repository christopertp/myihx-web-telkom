import React, { createContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Spinner from '../../components/elements/Spinner';
import ChangePasswordForm from '../../components/forms/ProfileChangePassword';
import EditForm from '../../components/forms/ProfileEdit';
import ProfileAboutPoin from '../../components/fragments/ProfileAboutPoin';
import ChangeMobile from '../../components/fragments/ProfileChangeMobile';
import ChangeEmail from '../../components/fragments/ProfileChangeEmail';
import UserMenu from '../../components/fragments/ProfileUserMenu';
import UserNav from '../../components/fragments/ProfileUserNav';
import WhiteCardPlain from '../../components/layouts/WhiteCardPlain';
import {
  fetchStatusCard,
  fetchChangePassword,
  fetchData,
  fetchTmoney,
  fetchUpdateProfile,
  resetMessage,
  fetchStatusRewards,
} from './actions';
import styles from './styles.scoped.css';

const Context = createContext({});

export default function Profile() {
  const { page } = useParams();

  return (
    <Context.Provider>
      {((p) => {
        switch (p) {
          case 'about-point': return <ProfileAboutPoin />;
          case 'change-password': return <ChangePassword />;
          case 'change-mobile': return <ChangeMobile />;
          case 'change-email': return <ChangeEmail />;
          case 'edit': return <Edit />;
          default: return <User />;
        }
      })(page)}
    </Context.Provider>
  );
}

export function ChangePassword() {
  const dispatch = useDispatch();
  const onSubmit = (v) => {
    dispatch(fetchChangePassword(v.currentPassword, v.newPassword));
  };

  useEffect(() => {
    dispatch(resetMessage());
  }, []);

  return (
    <WhiteCardPlain
      back="/profile"
      size="medium"
      subtitle="Enter your current password to change password"
      title="Change Password">
      <ChangePasswordForm onSubmit={onSubmit} />
    </WhiteCardPlain>
  );
}

export function Edit() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((s) => s.profile);
  const onSubmit = (v) => {
    const payload = new FormData();
    payload.append('address', v.address);
    payload.append('dateOfBirth', v.dateOfBirth);
    payload.append('fullName', v.fullName);
    payload.append('gender', v.gender);
    v.profilePicture && payload.append('image', v.profilePicture, 'profilePicture.jpg');
    dispatch(fetchUpdateProfile(payload));
  };

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  return (
    <WhiteCardPlain title="Edit Profile">
      {!isLoading.p ? <EditForm onSubmit={onSubmit} /> : <Spinner color="#ee3124" size="1.5rem" />}
    </WhiteCardPlain>
  );
}

export function User() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
    dispatch(fetchTmoney());
    dispatch(fetchStatusCard());
    dispatch(fetchStatusRewards());
  }, []);

  return (
    <article className={styles.user}>
      <UserNav />
      <UserMenu />
    </article>
  );
}
