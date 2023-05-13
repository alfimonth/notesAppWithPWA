import AuthApi from '../networks/auth-api';
import {
  authenticatedNavListTemplate,
  unauthenticatedNavListTemplate,
} from '../views/templates/template-creator';

const NavbarInitiator = {
  async renderAuthenticatedNavList(navListContainer) {
    try {
      const response = await AuthApi.getUserInfo();
      navListContainer.forEach((el) => {
        el.innerHTML = authenticatedNavListTemplate(response.data);
      });
      // navListContainer.innerHTML = authenticatedNavListTemplate(response.data);
      this._initialUnauthListener();
    } catch (error) {
      console.log(error);
    }
  },

  _initialUnauthListener() {
    const logoutButton = document.getElementById('userLogOut');
    logoutButton.addEventListener('click', async (event) => {
      event.preventDefault();

      try {
        const response = await AuthApi.logout();
        window.location.hash = '#/login';
      } catch (error) {
        console.error(error);
      }
    });
  },

  renderUnauthenticatedNavList(navListContainer) {
    navListContainer.forEach((el) => {
      el.innerHTML = unauthenticatedNavListTemplate();
    });

    // navListContainer.innerHTML = unauthenticatedNavListTemplate();
  },
};

export default NavbarInitiator;
