import { createAsyncThunk } from '@reduxjs/toolkit';
import $api from '../../http';
import { ISignUpValues } from '../../interfaces';
import { IUser } from '../../models/IUser';
import { SIGN_IN, SIGN_UP } from '../../paths';
import AuthService from '../../services/AuthService';
import { AppDispatch } from '../store';
import { userSlice } from './UserSlice';

export const fetchUsers = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(userSlice.actions.usersFetching());
    const response = await $api.get<IUser[]>('/users/');
    dispatch(userSlice.actions.usersFetchingSuccess(response.data));
  } catch (e) {
    if (e instanceof Error) {
      dispatch(userSlice.actions.usersFetchingError(e.message));
    }
    console.log('Unexpected error: ', e);
  }
};

export const signIn = createAsyncThunk(
  `/users${SIGN_IN}`,
  async ({ email, password }: ISignUpValues, thunkAPI) => {
    try {
      const response = await AuthService.signIn(email, password);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (e) {
      return thunkAPI.rejectWithValue(
        'Something went wrong while tring to sign in'
      );
    }
  }
);

export const signUp = createAsyncThunk(
  `/users${SIGN_UP}`,
  async ({ email, password }: ISignUpValues, thunkAPI) => {
    try {
      const response = await AuthService.signUp(email, password);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (e) {
      return thunkAPI.rejectWithValue(
        'Something went wrong while tring to sign up'
      );
    }
  }
);
