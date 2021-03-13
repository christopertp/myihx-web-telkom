import fetch, { BASIC_AUTH, BEARER_AUTH, getUrl } from '../utils/fetch';

const BASE_URL = getUrl([
  'prod-url',
  'staging-url',
  'http://myihx-product-dev.vsan-apps.playcourt.id/products',
]);

export const availability = async data => (
  fetch(`${BASE_URL}/v1/availability`, 'post', data, { headers: BEARER_AUTH })
);

export const coverageAddress = async () => (
  fetch(`${BASE_URL}/v1/coverage-address`, 'get', { headers: BEARER_AUTH })
);

export const guestAvailability = async data => (
  fetch(`${BASE_URL}/v1/guest-availability`, 'post', data, { headers: BASIC_AUTH })
);

export const hboGo = async () => (
  fetch('https://virtserver.swaggerhub.com/telkomdev-ofa/myIndihome_X_PCCW/1.0.0/product-subscription/hbo-go', 'get', { headers: BASIC_AUTH })
);

export const home = async () => (
  fetch(`${BASE_URL}/v1/home`, 'get', { headers: BASIC_AUTH })
);

export const mostPopular = async (type, search = '') => (
  fetch(`${BASE_URL}/v1/most-popular?type=${type}&search=${search}`, 'get', { headers: BASIC_AUTH })
);

export const mostPopularDetail = async (productId) => (
  fetch(`${BASE_URL}/v1/most-popular/detail/${productId}`, 'get', { headers: BASIC_AUTH })
);

export const packageCategory = async () => (
  fetch(`${BASE_URL}/v1/internet/category`, 'get', { headers: BASIC_AUTH })
);

export const packageDetail = async (packageName) => (
  fetch(`${BASE_URL}/v1/internet/category/detail/${packageName}`, 'get', { headers: BASIC_AUTH })
);
