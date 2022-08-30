import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAppDispatch } from '../hooks/redux';
import { IVewsProps } from '../interfaces';
import { ANY, ROOT, SIGN_UP } from '../paths';
import { setToken } from '../store/reducers/TokenSlice';
import Home from './Home';
import SignIn from './login/SignIn';
import SignUp from './login/SignUp';

const Views = ({ children }: IVewsProps) => {
  const dispatch = useAppDispatch();
  const accessToken = localStorage.getItem('accessToken');
  useEffect(() => {
    console.log(accessToken, '<---- accessToken');
    if (!!accessToken) {
      dispatch(setToken(true));
    } else {
      dispatch(setToken(false));
    }
  }, [accessToken]);
  return (
    <Routes>
      <Route path={ROOT} element={<Home />} />
      <Route path={SIGN_UP} element={<SignUp />} />
      <Route path={ANY} element={<SignIn />} />
    </Routes>
  );
};

export default Views;
