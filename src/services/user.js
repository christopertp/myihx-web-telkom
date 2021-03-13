import fetch, { BASIC_AUTH, BEARER_AUTH, getUrl } from '../utils/fetch';

const BASE_URL = getUrl([
  'prod-url',
  'staging-url',
  'http://myihx-user-dev.vsan-apps.playcourt.id/users',
]);

const BASE_URL_MOCK = 'https://virtserver.swaggerhub.com/telkomdds/myIndihome_X/4.0/users/v1';

export const addressCities = async (provinceId, search = '') => (
  fetch(`${BASE_URL}/v1/address/cities?provinceId=${provinceId}&search=${search}`, 'get', { headers: BASIC_AUTH })
);

export const addressDistricts = async (cityId, search = '') => (
  fetch(`${BASE_URL}/v1/address/districts?cityId=${cityId}&search=${search}`, 'get', { headers: BASIC_AUTH })
);

export const addressProvinces = async (search = '') => (
  fetch(`${BASE_URL}/v1/address/provinces?search=${search}`, 'get', { headers: BASIC_AUTH })
);

export const addressStreets = async (cityId, districtId, search = '') => (
  fetch(`${BASE_URL}/v1/address/streets?cityId=${cityId}&districtId=${districtId}&search=${search}`, 'get', { headers: BASIC_AUTH })
);

export const changeEmail = async (email) => (
  fetch(`${BASE_URL}/v1/change-email`, 'post', { email }, { headers: BEARER_AUTH })
);

export const changePassword = async (currentPassword, newPassword) => (
  fetch(`${BASE_URL}/v1/password`, 'put', { currentPassword, newPassword }, { headers: BEARER_AUTH })
);

export const checkIndihomeNumber = async (userId, indihomeAccount) => (
  fetch(`${BASE_URL}/v1/verify-indihome-account`, 'post', { userId, indihomeAccount }, { headers: BASIC_AUTH })
);

export const checkMobile = async (mobile) => (
  fetch(`${BASE_URL}/v1/check-mobile-number/${mobile}`, 'get', { headers: BEARER_AUTH })
);

export const checkUser = async user => (
  fetch(`${BASE_URL}/v1/check-user/${user}`, 'get', { headers: BASIC_AUTH })
);

export const draftContract = async () => (
  fetch(`${BASE_URL}/v1/document/draft-contract`, 'get', { headers: BEARER_AUTH })
);

export const draftContractAccept = async () => (
  fetch(`${BASE_URL}/v1/document/draft-contract`, 'put', {}, { headers: BEARER_AUTH })
);

export const document = async () => (
  fetch(`${BASE_URL}/v1/document`, 'get', { headers: BEARER_AUTH })
);

export const documentConfirm = async () => (
  fetch(`${BASE_URL}/v1/document/confirm`, 'get', { headers: BEARER_AUTH })
);

export const documentUpdate = async data => (
  fetch(`${BASE_URL}/v1/document/upload`, 'put', data, { headers: BEARER_AUTH })
);

export const documentUpload = async data => (
  fetch(`${BASE_URL}/v1/document/upload`, 'post', data, { headers: BEARER_AUTH })
);

export const documentUploadSelfi = async data => (
  fetch(`${BASE_URL}/v1/document/upload-selfi`, 'post', data, { headers: BEARER_AUTH })
);

export const documentUploadSignature = async data => (
  fetch(`${BASE_URL}/v1/document/upload-signature`, 'post', data, { headers: BEARER_AUTH })
);

export const forgotPassword = async user => (
  fetch(`${BASE_URL}/v1/forgot-password/${user}`, 'get', { headers: BASIC_AUTH })
);

export const forgotPasswordVerify = async (recoveryCode, userId) => (
  fetch(`${BASE_URL}/v1/forgot-password/verify`, 'post', { recoveryCode, userId }, { headers: BASIC_AUTH })
);

export const loginUser = async (email, password) => (
  fetch(`${BASE_URL}/v1/login-user`, 'post', { email, password }, { headers: BASIC_AUTH })
);

export const profile = async () => (
  fetch(`${BASE_URL}/v1/profile`, 'get', { headers: BEARER_AUTH })
);

export const registerUser = async data => (
  fetch(`${BASE_URL}/v1/register`, 'post', data, { headers: BASIC_AUTH })
);

export const resetPassword = async (password, userId) => (
  fetch(`${BASE_URL}/v1/reset-password`, 'post', { password, userId }, { headers: BASIC_AUTH })
);

export const statusCard = async () => (
  fetch(`${BASE_URL}/v1/status-card`, 'get', { headers: BEARER_AUTH })
);

export const statusReward = async () => {
  let REWARD_BASE_URL = 'http://myihx-rewards-api-dev.vsan-apps.playcourt.id/rewards';
  return fetch(`${REWARD_BASE_URL}/v1/status`, 'get', { headers: BEARER_AUTH });
};

export const updateUserProfile = async data => (
  fetch(`${BASE_URL}/v1/profile`, 'put', data, { headers: BEARER_AUTH })
);

export const verifyEmail = async (otp) => (
  fetch(`${BASE_URL}/v1/verify-email`, 'post', { otp }, { headers: BEARER_AUTH })
);

export const verifyLogin = async (otp, userId) => (
  fetch(`${BASE_URL}/v1/verify-login`, 'post', { otp, userId }, { headers: BASIC_AUTH })
);

export const verifyMobile = async (otp) => (
  fetch(`${BASE_URL}/v1/mobile-number/verify`, 'post', { otp }, { headers: BEARER_AUTH })
);

export const verifyRegister = async (otp, userId) => (
  fetch(`${BASE_URL}/v1/verify-register`, 'post', { otp, userId }, { headers: BASIC_AUTH })
);

export const verifyId = async (data) =>
  fetch(`${BASE_URL_MOCK}/svm/verify-id`, 'post', data, { headers: BEARER_AUTH });

export const statusSVM = async () =>
  fetch(`${BASE_URL_MOCK}/svm/status-svm`, 'get', { headers: BEARER_AUTH });
