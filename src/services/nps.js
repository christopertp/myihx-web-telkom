import fetch, { BEARER_AUTH, getUrl } from '../utils/fetch';

const BASE_URL = getUrl([
  'prod-url',
  'staging-url',
  'http://myihx-nps-dev.vsan-apps.playcourt.id/nps',
]);

export const feedbackCategory = async () => (
  fetch(`${BASE_URL}/v1/user-feedback/category`, 'get', { headers: BEARER_AUTH })
);

export const feedbackSend = async (data) => (
  fetch(`${BASE_URL}/v1/user-feedback`, 'post', data, { headers: BEARER_AUTH })
);

export const npsGet = async () => (
  fetch(`${BASE_URL}/v1/questionnaires?deviceType=web&active=1`, 'get', { headers: BEARER_AUTH })
);

export const npsPost = async (feedback) => (
  fetch(`${BASE_URL}/v1/feedback`, 'post', feedback, { headers: BEARER_AUTH })
);

export const npsUpdateTime = async (code, duration) => (
  fetch(`${BASE_URL}/v1/feedback-timers`, 'post',  { code, deviceType: 'web', duration }, { headers: BEARER_AUTH })
);
