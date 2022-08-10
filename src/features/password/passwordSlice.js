// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   password: {},
//   passwordMode: 'password',
//   staus: 'idle',
// };

// const passwordSlice = createSlice({
//   name: 'password',
//   initialState,
//   reducers: {
//     addPassword: (state, action) => {
//       state.staus = 'idle';
//       state.password = action.payload;
//       state.staus = 'loaded';
//     },
//     setPasswordMode: (state, action) => {
//       state.passwordMode = action.payload;
//     },
//     togglePasswordMode: (state) => {
//       state.passwordMode = state.passwordMode === 'text' ? 'password' : 'text';
//     },
//   },
// });

// export const { addPassword, setPasswordMode, togglePasswordMode } =
//   passwordSlice.actions;

// export const selectPassword = (state) => state.password.password;
// export const selectPasswordMode = (state) => state.password.passwordMode;

// export default passwordSlice.reducer;
