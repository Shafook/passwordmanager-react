import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  password: {},
  passwordMode: 'password',
  staus: 'idle',
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    addPassword: (state, action) => {
      state.staus = 'idle';
      state.password = action.payload;
      state.staus = 'loaded';
    },
    setPasswordMode: (state, action) => {
      state.passwordMode = action.payload;
    },
    togglePasswordMode: (state) => {
      state.passwordMode = state.passwordMode === 'text' ? 'password' : 'text';
    },
  },
});

export const { addPassword, setPasswordMode, togglePasswordMode } =
  formSlice.actions;

export const selectPassword = (state) => state.form.password;
export const selectPasswordMode = (state) => state.form.passwordMode;

export default formSlice.reducer;
