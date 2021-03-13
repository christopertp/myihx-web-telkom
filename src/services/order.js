import fetch, { BEARER_AUTH, getUrl } from '../utils/fetch';

const BASE_URL = getUrl([
  'prod-url',
  'staging-url',
  'http://myihx-order-dev.vsan-apps.playcourt.id/orders',
]);

export const getContinueDeposit = async (transactionId) => (
  fetch(`${BASE_URL}/v1/confirmation/continue-deposit/${transactionId}`, 'get', { headers: BEARER_AUTH })
);

export const getSchedule = async () => (
  fetch(`${BASE_URL}/v1/installation/availability`, 'get', { headers: BEARER_AUTH })
);

export const getSubscriptions = async () => (
  fetch(`${BASE_URL}/v1/subscriptions`, 'get', { headers: BEARER_AUTH })
);

export const installationReschedule = async data => (
  fetch(`${BASE_URL}/v1/installation/reschedule`, 'post', data, { headers: BEARER_AUTH })
);

export const installationDetail = async () => (
  fetch(`${BASE_URL}/v1/installation`, 'get', { headers: BEARER_AUTH })
);

export const installationRescheduleDate = async () => (
  fetch(`${BASE_URL}/v1/installation/reschedule/availability`, 'get', { headers: BEARER_AUTH })
);

export const postCancelOrder = async (transactionId, paymentType) => (
  fetch(`${BASE_URL}/v1/confirmation/cancel`, 'post', { transactionId, paymentType }, { headers: BEARER_AUTH })
);

export const postConfirmationSave = async (transactionId, paymentType) => (
  fetch(`${BASE_URL}/v1/confirmation/save`, 'post', { transactionId, paymentType }, { headers: BEARER_AUTH })
);

export const postSchedule = async data => (
  fetch(`${BASE_URL}/v1/installation`, 'post', data, { headers: BEARER_AUTH })
);

export const subscriptions = async productId => (
  fetch(`${BASE_URL}/v1/subscriptions`, 'post', { productId }, { headers: BEARER_AUTH })
);

export const subscriptionsGet = async () => (
  fetch(`${BASE_URL}/v1/subscriptions`, 'get', { headers: BEARER_AUTH })
);
