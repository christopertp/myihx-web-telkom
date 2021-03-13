import fetch, { BEARER_AUTH, getUrl } from '../utils/fetch';

const BASE_URL = getUrl([
  'prod-url',
  'staging-url',
  'http://myihx-payment-dev.vsan-apps.playcourt.id/payment',
]);

export const notifCard = async () => (
  fetch(`${BASE_URL}/v1/notif-card`, 'get', { headers: BEARER_AUTH })
);

export const linkAjaTransfer = async (amount, pin, linkAjaNumber, transactionId, refNo) => (
  fetch(`${BASE_URL}/v1/tmoney/transfer-linkaja`, 'post', { amount, pin, linkAjaNumber, transactionId, refNo }, { headers: BEARER_AUTH })
);

export const linkAjaTransferInquiry = async (linkAjaNumber, amount) => (
  fetch(`${BASE_URL}/v1/tmoney/transfer-linkaja-inquiry`, 'post', { linkAjaNumber, amount }, { headers: BEARER_AUTH })
);

export const paymentBankTransfer = async (payload, amount, codeBank, transactionId, type) => (
  fetch(`${BASE_URL}/v1/${payload}`, 'post', { amount, codeBank, transactionId, type }, { headers: BEARER_AUTH })
);

export const paymentGetStatus = async (transactionId) => (
  fetch(`${BASE_URL}/v1/status/${transactionId}`, 'get', { headers: BEARER_AUTH })
);

export const paymentLinkAjaDebitCC = async (payload, amount, transactionId, type) => (
  fetch(`${BASE_URL}/v1/${payload}`, 'post', { amount, transactionId, type }, { headers: BEARER_AUTH })
);

export const paymentMethod = async (method, transactionId) => (
  fetch(`${BASE_URL}/v1/method/${method}/${transactionId}`, 'get', { headers: BEARER_AUTH })
);

export const tmoneyChangePin = async (oldPin, newPin) => (
  fetch(`${BASE_URL}/v1/tmoney/change-pin`, 'post', { oldPin, newPin }, { headers: BEARER_AUTH })
);

export const tmoneyHistory = async (page) => (
  fetch(`${BASE_URL}/v1/tmoney/home?page=${page}&size=10`, 'get', { headers: BEARER_AUTH })
);

export const tmoneyResetPin = async () => (
  fetch(`${BASE_URL}/v1/tmoney/reset-pin`, 'post', {}, { headers: BEARER_AUTH })
);

export const tmoneyLink = async (pin) => (
  fetch(`${BASE_URL}/v1/tmoney/link`, 'post', { pin }, { headers: BEARER_AUTH })
);

export const tmoneySignup = async (password) => (
  fetch(`${BASE_URL}/v1/tmoney/signup`, 'post', { password }, { headers: BEARER_AUTH })
);

export const tmoneyStatus = async () => (
  fetch(`${BASE_URL}/v1/tmoney/status`, 'get', { headers: BEARER_AUTH })
);
