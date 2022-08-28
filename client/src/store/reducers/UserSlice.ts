import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../models/IUser';

interface UserState {
  users: IUser[];
  isLoading: boolean;
  isAuth: boolean;
  error: string;
}

const initialState: UserState = {
  users: [],
  isLoading: false,
  isAuth: false,
  error: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    usersFetching(state) {
      state.isLoading = true;
    },
    usersFetchingSuccess(state, { payload }: PayloadAction<IUser[]>) {
      state.isLoading = false;
      state.error = '';
      state.users = payload;
    },
    usersFetchingError(state, { payload }: PayloadAction<string>) {
      state.isLoading = false;
      state.error = payload;
    },
  },
});

export default userSlice.reducer;
