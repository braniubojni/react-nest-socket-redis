import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ILogged {
  isAuth: boolean;
}

const initialState: ILogged = {
  isAuth: false,
};

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setToken: (state, { payload }: PayloadAction<boolean>) => {
      state.isAuth = payload;
    },
  },
});

export const { setToken } = tokenSlice.actions;

export default tokenSlice.reducer;
