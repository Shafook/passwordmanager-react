import { withNavigationWatcher } from './contexts/navigation';
import {
  TasksPage,
  ProfilePage,
  VaultPage,
  CompaniesPage,
  AccountsPage,
  ConfirmEmailPage,
} from './pages';

const routes = [
  // {
  //   path: '/tasks',
  //   component: TasksPage,
  // },
  // {
  //   path: '/profile',
  //   component: ProfilePage,
  // },
  // {
  //   path: '/home',
  //   component: HomePage
  // },
  {
    path: '/vault',
    component: VaultPage,
  },
  {
    path: '/companies',
    component: CompaniesPage,
  },
  // {
  //   path: '/accounts',
  //   component: AccountsPage,
  // },,
  {
    path: '/confirmemail',
    component: ConfirmEmailPage,
  },
];

export default routes.map((route) => {
  return {
    ...route,
    component: withNavigationWatcher(route.component),
  };
});
