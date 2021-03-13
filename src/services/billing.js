import fetch, { BEARER_AUTH, getUrl } from '../utils/fetch';

const BASE_URL = getUrl([
  'prod-url',
  'staging-url',
  'http://myihx-billing-dev.vsan-apps.playcourt.id/billing',
]);

export const billingDetail = async (period) => (
  fetch(`${BASE_URL}/v1/bill-detail/${period}`, 'get', { headers: BEARER_AUTH })
);

export const billingDownload = async (period) => (
  fetch(`${BASE_URL}/v1/email`, 'post', { period }, { headers: BEARER_AUTH })
);

export const billingHistory = async () => (
  fetch(`${BASE_URL}/v1/history`, 'get', { headers: BEARER_AUTH })
);

export const billingInfo = async () => (
  fetch(`${BASE_URL}/v1/info`, 'get', { headers: BEARER_AUTH })
);
