import fetch, { BEARER_AUTH, getUrl } from '../utils/fetch';

const BASE_URL = getUrl([
  'prod-url',
  'staging-url',
  'http://myihx-addon-dev.vsan-apps.playcourt.id/addon/v1/manage-subscription',
]);

export const getSubscriptions = async (indihomeNumber) =>
  fetch(`${BASE_URL}/${indihomeNumber}`, 'get', { headers: BEARER_AUTH });

export const getSubscriptionMovin = async (indihomeNumber) =>
  fetch(`${BASE_URL}/movin/${indihomeNumber}`, 'get', { headers: BEARER_AUTH });

export const getSubscriptionWifiId = async (indihomeNumber) =>
  fetch(`${BASE_URL}/wifi-id/${indihomeNumber}`, 'get', { headers: BEARER_AUTH });

export const deleteNumberMovin = async (deviceId) =>
  fetch(`${BASE_URL}/movin/${deviceId}`, 'delete', { headers: BEARER_AUTH });

export const updateDeviceWifiId = async (deviceId, data) =>
  fetch(`${BASE_URL}/wifi-id-device/${deviceId}`, 'put', data, { headers: BEARER_AUTH });

export const updateAccountWifiid = async (deviceId, data) =>
  fetch(`${BASE_URL}/wifi-id-account/${deviceId}`, 'put', data, { headers: BEARER_AUTH });
