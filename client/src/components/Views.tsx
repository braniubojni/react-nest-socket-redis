import { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';
import { IVewsProps } from '../interfaces';
import { ANY, ROOT, SIGN_IN, SIGN_UP } from '../paths';
import Home from './Home';
import SignIn from './login/SignIn';
import SignUp from './login/SignUp';

const Views = ({ children }: IVewsProps) => {
  const nav = useNavigate();
  const isAuth = useAppSelector((state) => state.authReducer.accessToken);

  useEffect(() => {
    console.log(isAuth, '<_isAuth');
    if (!isAuth) {
      nav(SIGN_IN);
    }
  }, [nav, isAuth]);
  return (
    <Routes>
      <Route path={ROOT} element={<Home />} />
      <Route path={SIGN_UP} element={<SignUp />} />
      <Route path={ANY} element={<SignIn />} />
    </Routes>
  );
};

export default Views;
