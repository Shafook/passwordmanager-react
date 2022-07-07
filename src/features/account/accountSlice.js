import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const ACCOUNT_TYPE_URL = 'https://localhost:44311/api/AccountType';

const initialState = {
  accountTypes: [],
  singleItem: {},
  status: 'idle',
  error: null,
};

export const fetchAccountTypes = createAsyncThunk(
  'accountTypes/fetchAccountTypes',
  async () => {
    try {
      const response = await axios.get(ACCOUNT_TYPE_URL);
      return response.data;
    } catch (err) {
      return { error: err.message };
    }
  }
);

export const fetchAccountTypeById = createAsyncThunk(
  'accountTypes/fetchAccountTypeById',
  async (initialState) => {
    const { Id } = initialState;
    try {
      const response = await axios.get(`${ACCOUNT_TYPE_URL}/${Id}`);
      return response.data;
    } catch (err) {
      return err.message;
    }
  }
);

export const addNewAccountType = createAsyncThunk(
  'accountTypes/addNewAccountType',
  async (initialState) => {
    try {
      const response = await axios.post(ACCOUNT_TYPE_URL, initialState);
      return response.data;
    } catch (err) {
      return err.message;
    }
  }
);

export const updateAccountType = createAsyncThunk(
  'accountTypes/updateAccountType',
  async (initialState) => {
    const { id } = initialState;
    try {
      const response = await axios.put(
        `${ACCOUNT_TYPE_URL}/${id}`,
        initialState
      );
      return initialState;
    } catch (err) {
      return err.message;
    }
  }
);

export const deleteAccountType = createAsyncThunk(
  'accountTypes/deleteAccountType',
  async (initialState) => {
    const { Id } = initialState;
    try {
      const response = await axios.delete(`${ACCOUNT_TYPE_URL}/${Id}`);
      if (response?.status === 204) return initialState;
      return response.data;
    } catch (err) {
      return err.message;
    }
  }
);

const accountSlice = createSlice({
  name: 'accountType',
  initialState,
  reducers: {},

  //extra reducer
  extraReducers(builder) {
    builder
      .addCase(fetchAccountTypes.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchAccountTypes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const loadedAccountTypes = action.payload;
        state.accountTypes = loadedAccountTypes;
      })
      .addCase(fetchAccountTypes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(fetchAccountTypeById.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchAccountTypeById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const loadedAccountType = action.payload;
        state.singleItem = loadedAccountType;
      })
      .addCase(fetchAccountTypeById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(addNewAccountType.fulfilled, (state, action) => {
        state.accountTypes = [...state.accountTypes, action.payload];
      })
      .addCase(updateAccountType.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log('Update could not complete');
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        const accountTypes = state.accountTypes.filter(
          (accountType) => accountType.id !== id
        );
        state.accountTypes = [...accountTypes, action.payload];
      })
      .addCase(deleteAccountType.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log('Delete could not complete');
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        const accountTypes = state.accountTypes.filter(
          (accountType) => accountType.id !== id
        );
        state.accountTypes = accountTypes;
      });
  },
});

export const { addAccountTypes, updateAccountTypes, deleteAccountTypes } =
  accountSlice.actions;

export const selectAccountTypes = (state) => state.accountType.accountTypes;
export const selectSingleItem = (state) => state.accountType.singleItem;
export const selectAccountTypesStatus = (state) => state.accountType.status;
export const selectAccountTypesError = (state) => state.accountType.error;

export const selectAccountTypeById = (state, accountTypeid) =>
  state.accountType.accountType.find(
    (accountType) => accountType.id === accountTypeid
  );

export default accountSlice.reducer;
