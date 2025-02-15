// src/features/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ACCESS_TOKEN, REFRESH_TOKEN } from 'constants/storage';
import { loginUserService } from 'interfaces/services/auth/login';

export const loginUser = createAsyncThunk('auth/login', async (creds: {email:string, password:string}) => {
  console.log('called')
  const {data} = await loginUserService(creds);
 
  const { access, refresh } = data;
  localStorage.setItem(ACCESS_TOKEN, access);
  localStorage.setItem(REFRESH_TOKEN, refresh);
 
  return data
});

export interface IUserReducer {
    loading: boolean;
    error: string | null;
    access_token?: string
    refresh_token?: string;
    user: {id: number, partnerName: string, partnerId: string, email: string} | null
  }
  
  const initialState: IUserReducer = {
    loading: false,
    user: null,
    error: null,
  };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(loginUser.pending, (state: { loading: boolean; }) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state: { loading: boolean; access_token: any; refresh_token: any; user: any; }, action: { payload: { access_token: any; refresh_token: any; user: any; }; }) => {
        state.loading = false;
        state.access_token = action.payload?.access_token;
        state.refresh_token = action.payload?.refresh_token;
        state.user = action.payload?.user;
      })
      .addCase(loginUser.rejected, (state: { loading: boolean; error: any; }, action: { error: { message: null; }; }) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      });
  },
});

export default authSlice.reducer;