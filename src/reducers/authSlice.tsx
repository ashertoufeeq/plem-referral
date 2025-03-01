// src/features/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ACCESS_TOKEN, REFRESH_TOKEN } from 'constants/storage';
import { loginUserService } from 'interfaces/services/auth/login';

export const loginUser = createAsyncThunk('auth/login', async (creds: {email:string, password:string, navigate:any}) => {
  const {data} = await loginUserService(creds);
 
  const { data : innerData } = data;
  localStorage.setItem(ACCESS_TOKEN, innerData?.token);
  localStorage.setItem(REFRESH_TOKEN, innerData?.refresh_token);
  creds.navigate('/')  
  return {refresh_token: innerData.refresh_token,access_token: innerData?.token, user:null }
});

export interface IAuthReducer {
    loading: boolean;
    error: string | null;
    access_token?: string
    refresh_token?: string;
    user: {id: number, partnerName: string, partnerId: string, email: string} | null
  }
  
  const initialState: IAuthReducer = {
    loading: false,
    user: null,
    error: null,
  };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers:  {
    logout: (state) => {
      localStorage.removeItem(ACCESS_TOKEN);
      localStorage.removeItem(REFRESH_TOKEN);
      state.access_token = undefined;
      state.refresh_token = undefined;
      state.user = null;
    },
  },
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

export const { logout } = authSlice.actions;

export default authSlice.reducer;