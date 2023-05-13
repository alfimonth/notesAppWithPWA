import NavbarInitiator from '../utils/navbar-initiator';
import UrlParser from '../utils/url-parser';
import CheckAuth from './pages/auth/check-auth';
import AuthApi from '../networks/auth-api';
import CONFIG from '../globals/config';
import routes from '../routes';

class App {
  constructor({ content, navListContainer }) {
    this._content = content;
    this._navListContainer = navListContainer;
  }

  async renderPage() {
    CheckAuth.observeLoginState(() => {
      const token = AuthApi.getUserToken(CONFIG.USER_TOKEN);

      if (token) {
        NavbarInitiator.renderAuthenticatedNavList(this._navListContainer);
      } else {
        NavbarInitiator.renderUnauthenticatedNavList(this._navListContainer);
      }
    });

    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];
    this._content.innerHTML = await page.render();

    await page.afterRender();
  }
}

export default App;
