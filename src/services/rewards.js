import fetch, { BEARER_AUTH, getUrl } from '../utils/fetch';

const BASE_URL = getUrl([
  'prod-url',
  'staging-url',
  'http://myihx-rewards-api-dev.vsan-apps.playcourt.id/rewards',
]);

const swaggerUrl = 'https://virtserver.swaggerhub.com/telkomdds/myIndihome_X/4.0/rewards';

export const getAboutPoint = async () => (
  fetch(`${BASE_URL}/v1/about-points`, 'get', { headers: BEARER_AUTH })
);

export const getPopularSearch = async () => (
  fetch(`${BASE_URL}/v1/popular-search`, 'get', { headers: BEARER_AUTH })
);

export const getRewardDetail = async (id) => (
  fetch(`${BASE_URL}/v1/detail/${id}`, 'get', { headers: BEARER_AUTH })
);

export const getSearch = async (value) => (
  fetch(`${BASE_URL}/v1/search/${value}`, 'get', { headers: BEARER_AUTH })
);

export const postActivateReward = async (data) => (
  fetch(`${BASE_URL}/v1/activate`, 'post', data, { headers: BEARER_AUTH })
);

export const postRedeem = async (id, redeemKey) => (
  fetch(`${swaggerUrl}/v1/redeem`, 'post', { id, redeemKey }, { headers: BEARER_AUTH })
);

export const postResendOtp = async (data) => (
  fetch(`${BASE_URL}/v1/resend-otp`, 'post', data, { headers: BEARER_AUTH })
);

export const postVerifyOtp = async (data) => (
  fetch(`${BASE_URL}/v1/verify-otp`, 'post', data, { headers: BEARER_AUTH })
);

export const rewardsList = async () => (
  fetch(`${BASE_URL}/v1/list`, 'get', { headers: BEARER_AUTH })
);

export const rewardsListCategory = async (category) => (
  fetch(`${BASE_URL}/v1/list/${category}`, 'get', { headers: BEARER_AUTH })
);

export const statusPoints = async () => (
  fetch(`${BASE_URL}/v1/status`, 'get', { headers: BEARER_AUTH })
);
