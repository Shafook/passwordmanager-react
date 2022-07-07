import { createSlice } from '@reduxjs/toolkit';

const data = [
  {
    text: 'Vault',
    path: '/vault',
    icon: 'key',
  },
  {
    text: 'Companies',
    path: '/companies',
    icon: 'folder',
  },
];

const initialState = {
  navigation: [],
  staus: 'idle',
};

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setNavigation: (state, action) => {
      state.staus = 'idle';
      state.navigation = [...action.payload];
      state.staus = 'loaded';
    },
  },
});

export const { setNavigation, setNavigationMode } = navigationSlice.actions;

export const selectNavigation = (state) => state.navigation.navigation;

export default navigationSlice.reducer;
