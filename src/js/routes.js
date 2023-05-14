import DashboardPage from './views/pages/dashboard';
import CreateNotePage from './views/pages/notes/create';
import LoginPage from './views/pages/auth/login';
import RegisterPage from './views/pages/auth/register';
import BookmarkPage from './views/pages/bookmark';


const routes = {
  '/': DashboardPage, // default page
  '/dashboard': DashboardPage, // default page
  '/bookmark': BookmarkPage,
  '/note/create': CreateNotePage,

  // Auth
  '/login': LoginPage,
  '/register': RegisterPage,
};

export default routes;
