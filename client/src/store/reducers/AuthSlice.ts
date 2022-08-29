import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { signIn, signUp } from './ActionCreator';

interface AuthState {
  isLoading: boolean;
  accessToken: string;
  error: string;
}

export interface AuthPayload {
  accessToken: string;
  refreshToken: string;
  email: string;
}

const initialState: AuthState = {
  isLoading: false,
  accessToken: '',
  error: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    /** Sign out  change to async*/
    signOut(state) {
      state.isLoading = true;
    },
    signOutSuccess(state) {
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('accessToken');
      state.isLoading = false;
      state.error = '';
    },
    signOutError(state, { payload }: PayloadAction<string>) {
      state.isLoading = false;
      state.error = payload;
    },
  },
  extraReducers: {
    /** Sign up */
    [signUp.fulfilled.type]: (
      state,
      { payload }: PayloadAction<AuthPayload>
    ) => {
      localStorage.setItem('refreshToken', payload.refreshToken);
      localStorage.setItem('accessToken', payload.accessToken);
      state.accessToken = payload.accessToken;
      state.isLoading = false;
      state.error = '';
    },
    [signUp.pending.type]: (state) => {
      state.isLoading = true;
    },
    [signUp.rejected.type]: (state, { payload }: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = payload;
    },
    /** Sign in */
    [signIn.fulfilled.type]: (
      state,
      { payload }: PayloadAction<AuthPayload>
    ) => {
      console.log(payload, '<-- payload\n');

      localStorage.setItem('refreshToken', payload.refreshToken);
      localStorage.setItem('accessToken', payload.accessToken);
      state.accessToken = payload.accessToken;
      state.isLoading = false;
      state.error = '';
    },
    [signIn.pending.type]: (state) => {
      state.isLoading = true;
    },
    [signIn.rejected.type]: (state, { payload }: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = payload;
    },
  },
});

export default authSlice.reducer;
