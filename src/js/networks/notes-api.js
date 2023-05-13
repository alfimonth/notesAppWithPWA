import API_ENDPOINT from '../globals/api-endpoint';
import CONFIG from '../globals/config';
import AuthApi from './auth-api';

class NotesApi {
  static async getAll() {
    const response = await fetch(API_ENDPOINT.GET_ALL_NOTES, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AuthApi.getUserToken(CONFIG.USER_TOKEN)}`,
      },
    });

    return await response.json();
  }

  static async getById(id) {
    const response = await fetch(API_ENDPOINT.GET_NOTE_BY_ID(id), {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AuthApi.getUserToken(CONFIG.USER_TOKEN)}`,
      },
    });

    return await response.json();
  }

  static async store({ title, body }) {
    const response = await fetch(API_ENDPOINT.STORE_NOTE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AuthApi.getUserToken(CONFIG.USER_TOKEN)}`,
      },
      body: JSON.stringify({ title, body }),
    });

    return await response.json();
  }

  static async destroy(id) {
    const response = await fetch(API_ENDPOINT.DELETE_NOTE(id), {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AuthApi.getUserToken(CONFIG.USER_TOKEN)}`,
      },
    });

    return await response.json();
  }
}

export default NotesApi;
