import API_ENDPOINT from '../globals/api-endpoint';
import CONFIG from '../globals/config';

class AuthApi {
  static async register({ name, email, password }) {
    const response = await fetch(API_ENDPOINT.REGISTER, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    const responseJson = await response.json();

    return responseJson;
  }

  static async login({ email, password }) {
    const response = await fetch(API_ENDPOINT.LOGIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const responseJson = await response.json();

    AuthApi.setUserToken(CONFIG.USER_TOKEN, responseJson.data.accessToken);

    return responseJson;
  }

  static async logout() {
    const response = AuthApi.destroyUserToken(CONFIG.USER_TOKEN);
    return response;
  }

  static async getUserInfo() {
    const response = await fetch(API_ENDPOINT.GET_USER_INFO, {
      headers: {
        Authorization: `Bearer ${this.getUserToken(CONFIG.USER_TOKEN)}`,
      },
    });

    const responseJson = await response.json();

    return responseJson;
  }

  static setUserToken(key, value) {
    return sessionStorage.setItem(key, value);
  }

  static getUserToken(key) {
    return sessionStorage.getItem(key);
  }

  static destroyUserToken(key) {
    return sessionStorage.removeItem(key);
  }
}

export default AuthApi;
