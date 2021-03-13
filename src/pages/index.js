import React, { lazy, Suspense } from 'react';
import LazyFallback from '../components/elements/LazyFallback';

const Suspensed = (Element) => function suspense(props) {
  return (
    <Suspense fallback={<LazyFallback />}>
      <Element {...props} />
    </Suspense>
  );
};

export default {
  About: Suspensed(lazy(() => import('./About'))),
  ActivateRewards: Suspensed(lazy(() => import('./ActivateRewards'))),
  Bill: Suspensed(lazy(() => import('./Bill'))),
  CheckCoverage: Suspensed(lazy(() => import('./CheckCoverage'))),
  CompleteProfile: Suspensed(lazy(() => import('./CompleteProfile'))),
  DraftContract: Suspensed(lazy(() => import('./DraftContract'))),
  DummyNps: Suspensed(lazy(() => import('./DummyNps'))),
  Error404: Suspensed(lazy(() => import('./Error404'))),
  ForgotPassword: Suspensed(lazy(() => import('./ForgotPassword'))),
  Help: Suspensed(lazy(() => import('./Help'))),
  History: Suspensed(lazy(() => import('./History'))),
  Home: Suspensed(lazy(() => import('./Home'))),
  Inbox: Suspensed(lazy(() => import('./Inbox'))),
  Installation: Suspensed(lazy(() => import('./Installation'))),
  Issues: Suspensed(lazy(() => import('./Issues'))),
  LinkAja: Suspensed(lazy(() => import('./LinkAja'))),
  Login: Suspensed(lazy(() => import('./Login'))),
  ManageSubscriptions: Suspensed(lazy(() => import('./ManageSubscriptions'))),
  ManageUsers: Suspensed(lazy(() => import('./ManageUsers'))),
  NotificationSettings: Suspensed(lazy(() => import('./NotificationSettings'))),
  Order: Suspensed(lazy(() => import('./Order'))),
  PackageCategory: Suspensed(lazy(() => import('./PackageCategory'))),
  PackageDetail: Suspensed(lazy(() => import('./PackageDetail'))),
  Payment: Suspensed(lazy(() => import('./Payment'))),
  PersonalData: Suspensed(lazy(() => import('./PersonalData'))),
  PleaseLogin: Suspensed(lazy(() => import('./PleaseLogin'))),
  Profile: Suspensed(lazy(() => import('./Profile'))),
  Promo: Suspensed(lazy(() => import('./Promo'))),
  Receipt: Suspensed(lazy(() => import('./Receipt'))),
  Register: Suspensed(lazy(() => import('./Register'))),
  SearchProduct: Suspensed(lazy(() => import('./SearchProduct'))),
  ScheduleAppointment: Suspensed(lazy(() => import('./ScheduleAppointment'))),
  SendFeedback: Suspensed(lazy(() => import('./SendFeedback'))),
  Rewards: Suspensed(lazy(() => import('./Rewards'))),
  ShopInternet: Suspensed(lazy(() => import('./ShopInternet'))),
  ShopMore: Suspensed(lazy(() => import('./ShopMore'))),
  Tmoney: Suspensed(lazy(() => import('./Tmoney'))),
};
