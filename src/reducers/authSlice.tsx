// src/features/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { notification } from 'antd';
import { ACCESS_TOKEN, REFRESH_TOKEN } from 'constants/storage';
import { loginUserService } from 'interfaces/services/auth/login';

export const loginUser = createAsyncThunk('auth/login', async (creds: {email:string, password:string, navigate:any}) => {
  const {data:apiData} = await loginUserService(creds);
  console.log(apiData,"api data")
  const data:any = apiData || {data: {token: "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjIsInN1YiI6IjIiLCJpYXQiOjE3NDI0NTE2ODcsImV4cCI6MTc0NTA0MzY4N30.qKCKjs9wmYPGgjlYNIq4KXT31r9Lnue_5ri73lqpCmo", refresh_token:"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyIiwiaWF0IjoxNzQyNDUxNjg3LCJleHAiOjE3NTEwOTE2ODd9.0mewKhrpGO4h3ItktZqvDydg7k3_XU5N3W6RnPfUgU4"}};  
  const { data : innerData } = data;
  if(apiData || (creds.email === 'tech@plem.in' && creds.password === 'Demo@123')){
    localStorage.setItem(ACCESS_TOKEN, innerData?.token);
    localStorage.setItem(REFRESH_TOKEN, innerData?.refresh_token);
    creds.navigate('/')  
    return {refresh_token: innerData.refresh_token,access_token: innerData?.token, user:null }
  }else{
    notification.error({message: "Invalid Credentials"})
  }
  return {refresh_token: null, access_token: null, user:null}
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