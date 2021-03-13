import React from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader/root';
import { Router } from 'react-router';
import { Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import ErrorBoundary from './components/elements/ErrorBoundary';
import MainBase from './components/layouts/MainBase';
import pages from './pages';
import { checkExpireTime, clearStorages, getToken } from './utils/storage';
import ContextProvider from './contexts';

if (!('scrollBehavior' in document.documentElement.style)) {
  import('scroll-behavior-polyfill');
}

const afterLoginRoutes = [
  { c: pages.About, key: 'About', path: '/about', },
  { c: pages.ActivateRewards, key: 'ActivateRewards', path: ['/activate-rewards', '/activate-rewards/:page'], },
  { c: pages.Bill, key: 'Bill', path: '/bill', },
  { c: pages.CompleteProfile, key: 'CompleteProfile', path:  ['/complete-profile', '/complete-profile/:page'], },
  { c: pages.DraftContract, key: 'DraftContract', path: '/draft-contract', },
  { c: pages.History, key: 'History', path: ['/history', '/history/:page'], },
  { c: pages.Inbox, key: 'Inbox', path: ['/inbox', '/inbox/:page'], },
  { c: pages.Issues, key: 'Issues', path: ['/issues', '/issues/:id'], },
  { c: pages.LinkAja, key: 'LinkAja', path: ['/linkaja', '/linkaja/:page'], },
  { c: pages.ManageSubscriptions, key: 'ManageSubscriptions', path: ['/manage-subscriptions', '/manage-subscriptions/:page'], },
  { c: pages.ManageUsers, key: 'ManageUsers', path: ['/manage-users', '/manage-users/:id','/manage-users/:id/:action'], },
  { c: pages.NotificationSettings, key: 'NotificationSettings', path: ['/notification-settings'], },
  { c: pages.Installation, key: 'Installation', path: ['/installation', '/installation/:page'], },
  { c: pages.Order, key: 'Order', path: ['/order/:page', '/order/:page/:subpage'], },
  { c: pages.Payment, key: 'Payment', path: ['/payment-:code/:method', '/payment-:code/:method/:detail', '/payment-:code/:method/:detail/:bank'], },
  { c: pages.PersonalData, key: 'PersonalData', path: ['/personal-data', '/personal-data/:page', '/personal-data/:page/:subpage'], },
  { c: pages.Profile, key: 'Profile', path: ['/profile', '/profile/:page', '/profile/:page/:subpage'], },
  { c: pages.Promo, key: 'Promo', path: ['/promo/:name'], },
  { c: pages.Receipt, key: 'Receipt', path: '/receipt/:period', },
  { c: pages.Rewards, key: 'Rewards', path: ['/rewards/:page', '/rewards/:page/:id'], },
  { c: pages.ScheduleAppointment, key: 'ScheduleAppointment', path: ['/schedule-:type', '/schedule-:type/:page'], },
  { c: pages.SendFeedback, key: 'SendFeedback', path: '/send-feedback', },
  { c: pages.Tmoney, key: 'Tmoney', path: ['/tmoney', '/tmoney/:page'], },
];

const BeforeLoginRoutes = <Route component={pages.Register} exact key="Register" path={['/register', '/register/:page']} />;

export const MainPages = () => (
  <MainBase>
    <Switch>
      {afterLoginRoutes.map(i => (
        <Route component={getToken() ? i.c : pages.PleaseLogin} exact key={i.key} path={i.path} />
      ))}
      <Route component={pages.CheckCoverage} exact path={['/check-coverage', '/check-coverage/:page']} />
      <Route component={pages.DummyNps} exact path="/dummy-nps" />
      <Route component={pages.Help} exact path={['/help', '/help/:page']} />
      <Route component={pages.PackageCategory} exact path={['/shop/internet/package/category','/shop/internet/package/category/:category']} />
      <Route component={pages.PackageDetail} exact path="/shop/internet/package/:productId" />
      <Route component={pages.SearchProduct} exact path="/search" />
      <Route component={pages.ShopInternet} exact path={['/shop/internet', '/shop/internet/:page']} />
      <Route component={pages.ShopMore} exact path={['/shop/more', '/shop/more/:page']} />
      <Route component={pages.Home} exact path={['/', '/shop']} />
      <Route component={pages.Error404} />
    </Switch>
  </MainBase>
);

const App = ({ history, store }) => {
  if (getToken() && checkExpireTime()) {
    clearStorages();
    location.reload();
    return null;
  }
  return (
    <Provider store={store}>
      <Router history={history}>
        <ErrorBoundary>
          <ContextProvider>
            <Switch>
              {!getToken() ? BeforeLoginRoutes : null}
              <Route component={pages.ForgotPassword} exact key="ForgotPassword" path={['/forgot-password', '/forgot-password/:page']} />
              <Route component={pages.Login} exact key="Login" path={['/login', '/login/:page']} />
              <Route component={MainPages} />
            </Switch>
          </ContextProvider>
        </ErrorBoundary>
      </Router>
    </Provider>
  );
};

export default hot(App);

App.propTypes = {
  history: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
};
