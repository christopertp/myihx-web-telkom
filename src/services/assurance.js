import fetch, { BEARER_AUTH, getUrl } from '../utils/fetch';

const BASE_URL = getUrl([
  'prod-url',
  'staging-url',
  'http://myihx-assurance-dev.vsan-apps.playcourt.id/assurance',
]);

export const createTicket = async data => (
  fetch(`${BASE_URL}/v1/ticket`, 'post', data, { headers: BEARER_AUTH })
);

export const getCategories = async () => (
  fetch(`${BASE_URL}/v1/categories`, 'get', { headers: BEARER_AUTH })
);

export const getIssues = async categoryId => (
  fetch(`${BASE_URL}/v1/categories/${categoryId}`, 'get', { headers: BEARER_AUTH })
);

export const getSchedule = async () => (
  fetch(`${BASE_URL}/v1/schedule/technician`, 'get', { headers: BEARER_AUTH })
);

export const getIssueStatus = async () => (
  fetch(`${BASE_URL}/v1/issue/status`, 'get', { headers: BEARER_AUTH })
);

export const getTicketComments = async id => (
  fetch(`${BASE_URL}/v1/comments/${id}`, 'get', { headers: BEARER_AUTH })
);

export const getTicketStatus = async id => (
  fetch(`${BASE_URL}/v1/ticket/${id}`, 'get', { headers: BEARER_AUTH })
);

export const postSchedule = async data => (
  fetch(`${BASE_URL}/v1/schedule`, 'post', data, { headers: BEARER_AUTH })
);

export const postTicketComment = async (issueId, comment) => (
  fetch(`${BASE_URL}/v1/comments`, 'post', { issueId, comment }, { headers: BEARER_AUTH })
);

export const resetModem = async () => (
  fetch(`${BASE_URL}/v1/modem/reset`, 'get', { headers: BEARER_AUTH })
);
