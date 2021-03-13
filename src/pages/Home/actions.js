import { billingInfo } from '../../services/billing';
import { notifCard } from '../../services/payment';
import { home } from '../../services/product';
import { profile, statusCard } from '../../services/user';
import { BILL_FETCHED, CARD_FETCHED, DATA_FETCHED, LOADING, PROFILE_FETCHED, NOTIF_FETCHED } from './constants';

export function fetchBill() {
  return async dispatch => {
    dispatch(loadingAction(true, 'b'));
    try {
      const { data } = await billingInfo();
      dispatch(billingFetchedAction(data));
    } catch {
      dispatch(billingFetchedAction(''));
    }
  };
}

export function fetchHome() {
  return async dispatch => {
    dispatch(loadingAction(true, 'h'));
    try {
      const { data } = await home();
      const { latestNews, latestOffers, subscriptions } = data;
      dispatch(dataFetchedAction(latestNews, latestOffers, subscriptions));
    } catch (err) {
      dispatch(loadingAction(false, 'h'));
    }
  };
}

export function fetchProfile() {
  return async dispatch => {
    dispatch(loadingAction(true, 'p'));
    try {
      const { data } = await profile();
      const { fullName, profilePicture } = data;
      dispatch(profileFetchedAction(fullName, profilePicture));
    } catch (err) {
      dispatch(loadingAction(false, 'p'));
    }
  };
}

export function fetchNotifCard() {
  return async dispatch => {
    dispatch(loadingAction(true, 'n'));
    try {
      const { data } = await notifCard();
      dispatch(notifFetchedAction(data));
    } catch (err) {
      dispatch(loadingAction(false, 'n'));
    }
  };
}

export function fetchStatusCard() {
  return async dispatch => {
    dispatch(loadingAction(true, 'c'));
    try {
      const { data } = await statusCard();
      dispatch(cardFetchedAction(data));
    } catch (err) {
      dispatch(loadingAction(false, 'c'));
    }
  };
}

function loadingAction(isLoading, key) {
  return { type: LOADING, isLoading, key };
}

function billingFetchedAction(bill) {
  return { type: BILL_FETCHED, bill };
}

function cardFetchedAction(card) {
  return { type: CARD_FETCHED, card };
}

function dataFetchedAction(latestNews, latestOffers, subscriptions) {
  return { type: DATA_FETCHED, latestNews, latestOffers, subscriptions };
}

function notifFetchedAction(notif) {
  return { type: NOTIF_FETCHED, notif };
}

function profileFetchedAction(fullName, profilePicture) {
  return { type: PROFILE_FETCHED, fullName, profilePicture };
}
