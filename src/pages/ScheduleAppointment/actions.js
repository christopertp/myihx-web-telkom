import { push } from 'react-router-redux';
import * as assurance from '../../services/assurance';
import * as order from '../../services/order';
import { ASSURANCE_FETCHED, DATE_FETCHED, FAILED, INFO_FETCHED, ISSUE_ID_FETCHED, LOADING } from './constants';

export function fetchPost(payload, type) {
  return async dispatch => {
    dispatch(loadingAction(true, 'submit'));
    try {
      if (type === 'service') {
        const mapPayload = { ... payload, schedule: payload.timeSlot };
        delete mapPayload.timeSlot;
        const { data } = await assurance.postSchedule(mapPayload);
        dispatch(issueIdFetched(data.issueId));
      } else {
        await order.postSchedule(payload);
        dispatch(failedAction('', 'submit'));
      }
      dispatch(push(`/schedule-${type}/success`));
    } catch (err) {
      dispatch(failedAction(err.message, 'submit'));
    }
  };
}

export function fetchDate(type) {
  return async dispatch => {
    dispatch(loadingAction(true, 'date'));
    try {
      if (type === 'service') {
        const { data } = await assurance.getSchedule();
        const { address, issueSummary, schedule } = data;
        dispatch(assuranceFetchedAction(address.description, schedule, issueSummary.id));
      } else {
        const { data } = await order.getSchedule();
        dispatch(dateFetchedAction(data.availability));
      }
    } catch (err) {
      dispatch(failedAction(err.code === 404 ? '404' : 'error', 'date'));
    }
  };
}

export function fetchInstallationInfo() {
  return async dispatch => {
    dispatch(loadingAction(true, 'info'));
    try {
      const { data } = await order.getSubscriptions();
      const { product, installationAddress } = data;
      const address = installationAddress.description;
      const dataProduct = {
        description: product.flag,
        id: product.productId,
        mbps: product.internetPackage.speed,
        name: product.packageName,
        price: product.price,
      };
      dispatch(infoFetchedAction(address , dataProduct));
    } catch (err) {
      dispatch(infoFetchedAction('', ''));
    }
  };
}

function assuranceFetchedAction(address, date, issue) {
  return { type: ASSURANCE_FETCHED, address, date, issue };
}

function dateFetchedAction(date) {
  return { type: DATE_FETCHED, date };
}

function failedAction(message, key) {
  return { type: FAILED, message, key };
}

function infoFetchedAction(address, product) {
  return { type: INFO_FETCHED, address, product };
}

function issueIdFetched(issueId) {
  return { type: ISSUE_ID_FETCHED, issueId };
}

function loadingAction(isLoading, key) {
  return { type: LOADING, isLoading, key };
}
