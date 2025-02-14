// src/features/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUserService } from 'interfaces/services/auth/login';

export const loginUser = createAsyncThunk('auth/login', loginUserService);

export interface IUserReducer {
    loading: boolean;
    error: string | null;
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
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;