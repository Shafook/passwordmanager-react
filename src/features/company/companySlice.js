import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const COMPANY_URL = 'https://localhost:44311/api/Company';

const initialState = {
  companies: [],
  singleItem: {},
  status: 'idle',
  error: null,
};

export const fetchCompanies = createAsyncThunk(
  'companies/fetchCompanies',
  async () => {
    try {
      const response = await axios.get(COMPANY_URL);
      return response.data;
    } catch (err) {
      return { error: err.message };
    }
  }
);

export const fetchCompanyById = createAsyncThunk(
  'companies/fetchCompanyById',
  async (initialState) => {
    const { Id } = initialState;
    try {
      const response = await axios.get(`${COMPANY_URL}/${Id}`);
      return response.data;
    } catch (err) {
      return err.message;
    }
  }
);

export const addNewCompany = createAsyncThunk(
  'companies/addNewCompany',
  async (initialState) => {
    try {
      const response = await axios.post(COMPANY_URL, initialState);
      return response.data;
    } catch (err) {
      return err.message;
    }
  }
);

export const updateCompany = createAsyncThunk(
  'companies/updateCompany',
  async (initialState) => {
    const { id } = initialState;
    try {
      const response = await axios.put(`${COMPANY_URL}/${id}`, initialState);
      return initialState;
    } catch (err) {
      return err.message;
    }
  }
);

export const deleteCompany = createAsyncThunk(
  'companies/deleteCompany',
  async (initialState) => {
    const { Id } = initialState;
    try {
      const response = await axios.delete(`${COMPANY_URL}/${Id}`);
      if (response?.status === 204) return initialState;
      return response.data;
    } catch (err) {
      return err.message;
    }
  }
);

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {},

  //extra reducer
  extraReducers(builder) {
    builder
      .addCase(fetchCompanies.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const loadedCompanies = action.payload;
        state.companies = loadedCompanies;
      })
      .addCase(fetchCompanies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(fetchCompanyById.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchCompanyById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const loadedCompany = action.payload;
        state.singleItem = loadedCompany;
      })
      .addCase(fetchCompanyById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(addNewCompany.fulfilled, (state, action) => {
        state.companies = [...state.companies, action.payload];
      })
      .addCase(updateCompany.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log('Update could not complete');
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        const companies = state.companies.filter(
          (company) => company.id !== id
        );
        state.companies = [...companies, action.payload];
      })
      .addCase(deleteCompany.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log('Delete could not complete');
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        const companies = state.companies.filter(
          (company) => company.id !== id
        );
        state.companies = companies;
      });
  },
});

export const { addCompanies, updateCompanies, deleteCompanies } =
  companySlice.actions;

export const selectCompanies = (state) => state.company.companies;
export const selectSingleItem = (state) => state.company.singleItem;
export const selectCompaniesStatus = (state) => state.company.status;
export const selectCompaniesError = (state) => state.company.error;

export const selectCompanyById = (state, companyid) =>
  state.company.company.find((company) => company.id === companyid);

export default companySlice.reducer;
