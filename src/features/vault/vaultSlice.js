import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const VAULT_URL = 'https://localhost:44311/api/Password';

const initialState = {
  vault: [],
  singleItem: {},
  status: 'idle',
  error: null,
};

export const fetchPasswords = createAsyncThunk(
  'passwords/fetchPasswords',
  async () => {
    try {
      const response = await axios.get(VAULT_URL);
      return response.data;
    } catch (err) {
      return { error: err.message };
    }
  }
);

export const fetchPasswordById = createAsyncThunk(
  'passwords/fetchPasswordById',
  async (initialState) => {
    const { Id } = initialState;
    try {
      const response = await axios.get(`${VAULT_URL}/${Id}`);
      return response.data;
    } catch (err) {
      return err.message;
    }
  }
);

export const addNewPassword = createAsyncThunk(
  'passwords/addNewPassword',
  async (initialState) => {
    console.log(initialState);
    try {
      const response = await axios.post(VAULT_URL, initialState);
      return response.data;
    } catch (err) {
      return err.message;
    }
  }
);

export const updatePassword = createAsyncThunk(
  'passwords/updatePassword',
  async (initialState) => {
    const { id } = initialState;
    try {
      const response = await axios.put(`${VAULT_URL}/${id}`, initialState);
      return response.data;
    } catch (err) {
      return err.message;
    }
  }
);

export const deletePassword = createAsyncThunk(
  'passwords/deletePassword',

  async (initialState) => {
    const { Id } = initialState;
    try {
      const response = await axios.delete(`${VAULT_URL}/${Id}`);
      if (response?.status === 204) return initialState;
      return response.data;
    } catch (err) {
      return err.message;
    }
  }
);

const vaultSlice = createSlice({
  name: 'vault',
  initialState,
  reducers: {
    // addVault: (state, action) => {
    //   state.vault = [...state.vault, action.payload];
    // },
    // updateVault: (state, action) => {
    //   var oldPass = state.vault.find((pass) => pass.Id === action.payload.Id);
    //   var newPass = { ...action.payload, Id: oldPass.Id };
    //   var filteredVault = state.vault.filter(
    //     (pass) => pass.Id !== action.payload.Id
    //   );
    //   var newVault = [...filteredVault, newPass];
    //   state.vault = newVault;
    // },
    // deletePasswordItem: (state, action) => {
    //   var filteredVault = state.vault.filter(
    //     (pass) => pass.Id !== action.payload
    //   );
    //   state.vault = filteredVault;
    // },
    resetSingleItem: (state, action) => {
      state.singleItem = {};
    },
  },

  //extra reducer
  extraReducers(builder) {
    builder
      .addCase(fetchPasswords.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchPasswords.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const loadedPasswords = action.payload;
        state.vault = loadedPasswords;
      })
      .addCase(fetchPasswords.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(fetchPasswordById.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchPasswordById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const loadedPasswords = action.payload;
        state.singleItem = loadedPasswords;
      })
      .addCase(fetchPasswordById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(addNewPassword.fulfilled, (state, action) => {
        // console.log(action.payload);
        state.vault = [...state.vault, action.payload];
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log('Update could not complete');
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        const passwords = state.vault.filter((password) => password.id !== id);
        state.vault = [...passwords, action.payload];
      })
      .addCase(deletePassword.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log('Delete could not complete');
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        const passwords = state.vault.filter((password) => password.id !== id);
        state.vault = passwords;
      });
  },
});

export const { addVault, updateVault, deletePasswordItem, resetSingleItem } =
  vaultSlice.actions;

export const selectVault = (state) => state.vault.vault;
export const selectSingleItem = (state) => state.vault.singleItem;
export const selectVaultStatus = (state) => state.vault.status;
export const selectVaultError = (state) => state.vault.error;

export const selectPassById = (state, passid) =>
  state.vault.vault.find((pass) => pass.id === passid);

export default vaultSlice.reducer;
