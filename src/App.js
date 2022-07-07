import 'devextreme/dist/css/dx.common.css';
import './themes/generated/theme.base.css';
import './themes/generated/theme.additional.css';
import React, { useEffect } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import './dx-styles.scss';
import LoadPanel from 'devextreme-react/load-panel';
import { NavigationProvider } from './contexts/navigation';
import { AuthProvider, useAuth } from './contexts/auth';
import { useScreenSizeClass } from './utils/media-query';
import Content from './Content';
import UnauthenticatedContent from './UnauthenticatedContent';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPasswords } from './features/vault/vaultSlice';
import {
  fetchCompanies,
  selectCompanies,
} from './features/company/companySlice';
import {
  selectNavigation,
  setNavigation,
} from './features/navigation/navigationSlice';
import { navigation as appnav } from './app-navigation';
import {
  fetchAccountTypes,
  selectAccountTypes,
} from './features/account/accountSlice';
import ConfirmEmail from './pages/ConfirmEmail/ConfirmEmail';
import { SingleCard } from './layouts';

function App() {
  const { user, loading } = useAuth();

  const companies = useSelector(selectCompanies);
  const navigation = useSelector(selectNavigation);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(fetchPasswords());
      dispatch(fetchCompanies());
      dispatch(fetchAccountTypes());
    }
  }, [user]);

  useEffect(() => {
    const links = companies
      .map(({ name, id }) => {
        return {
          text: name,
          path: `/companies/${id}`,
        };
      })
      .sort((a, b) => {
        const nameA = a.text.toUpperCase();
        const nameB = b.text.toUpperCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;

        return 0;
      });

    const nav = appnav.map((item) =>
      item.text === 'Companies' ? { ...item, items: [...links] } : item
    );

    dispatch(setNavigation(nav));
  }, [companies]);

  if (loading) {
    return <LoadPanel visible={true} />;
  }

  if (user) {
    return <Content />;
  }

  return <UnauthenticatedContent />;
}

export default function Root() {
  const screenSizeClass = useScreenSizeClass();

  return (
    <Router>
      <AuthProvider>
        <NavigationProvider>
          <div className={`app ${screenSizeClass}`}>
            <App />
          </div>
        </NavigationProvider>
      </AuthProvider>
    </Router>
  );
}
