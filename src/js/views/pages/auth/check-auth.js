import CONFIG from '../../../globals/config';
import AuthApi from '../../../networks/auth-api';

const CheckAuth = {
  excludeUrl: ['#/login', '#/register'],

  observeLoginState(navbarCallback) {
    if (typeof navbarCallback !== 'function') {
      throw new Error('Parameter navbarCallback should be callback function');
    }

    // Check if user is on auth page
    const isOnAuthPage = this._isOnAuthPage(this.excludeUrl);
    const token = AuthApi.getUserToken(CONFIG.USER_TOKEN);

    // If user has token and on auth page, redirect to dashboard page
    if (token) {
      if (isOnAuthPage) {
        window.location.hash = '#/dashboard';
      }
    } else {
      if (!isOnAuthPage) {
        window.location.hash = '#/login';
      }
    }

    navbarCallback();
  },

  _isOnAuthPage(pages) {
    const filteredPages = pages.filter((item) => window.location.hash === item);
    return Boolean(filteredPages.length);
  },
};

export default CheckAuth;
