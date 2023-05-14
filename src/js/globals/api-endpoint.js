import CONFIG from './config';

const API_ENDPOINT = {
  // Auth
  REGISTER: `${CONFIG.ENDPOINT}/register`,
  LOGIN: `${CONFIG.ENDPOINT}/login`,
  GET_USER_INFO: `${CONFIG.ENDPOINT}/users/me`,

  // Notes
  GET_ALL_NOTES: `${CONFIG.ENDPOINT}/notes`,
  GET_NOTE_BY_ID: (id) => `${CONFIG.ENDPOINT}/notes/${id}`,
  STORE_NOTE: `${CONFIG.ENDPOINT}/notes`,
  DELETE_NOTE: (id) => `${CONFIG.ENDPOINT}/notes/${id}`,

  // Web Push Notification
  PUSH_MSG_URL: `${CONFIG.ENDPOINT}/notifications/subscriptions`,

};

export default API_ENDPOINT;
