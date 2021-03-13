import fetch, { BASIC_AUTH, BEARER_AUTH, getUrl } from '../utils/fetch';

const BASE_URL = getUrl([
  'prod-url',
  'staging-url',
  'http://myihx-notification-dev.vsan-apps.playcourt.id/notifications',
]);

export const sendOtp = async (mobileNumber, type) => (
  fetch(`${BASE_URL}/v1/login/send-otp`, 'post', { mobileNumber, type }, { headers: BASIC_AUTH })
);

export const sendOtpRegister = async (data) => (
  fetch(`${BASE_URL}/v1/registration/send-otp`, 'post', data, { headers: BASIC_AUTH })
);

export const sendOtpChangeMobile = async (mobileNumber, type) => (
  fetch(`${BASE_URL}/v1/mobile-number/send-otp`, 'post', { mobileNumber, type }, { headers: BEARER_AUTH })
);
