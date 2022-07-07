import { configureStore } from '@reduxjs/toolkit';
import accountSlice from '../features/account/accountSlice';
import companySlice from '../features/company/companySlice';
import formSlice from '../features/form/formSlice';
import navigationSlice from '../features/navigation/navigationSlice';
import vaultSlice from '../features/vault/vaultSlice';

export const store = configureStore({
  reducer: {
    vault: vaultSlice,
    form: formSlice,
    company: companySlice,
    navigation: navigationSlice,
    accountType: accountSlice,
  },
});
