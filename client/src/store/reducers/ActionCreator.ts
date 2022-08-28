import $api from '../../http';
import { IUser } from '../../models/IUser';
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
