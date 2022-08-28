import { Routes, Route } from 'react-router-dom';
import { IVewsProps } from '../interfaces';
import { ANY, ROOT, SIGN_UP } from '../paths';
import SignIn from './login/SignIn';
import SignUp from './login/SignUp';

const Views = ({ children }: IVewsProps) => {
  return (
    <Routes>
      <Route path={ROOT} element={<SignIn />} />
      <Route path={SIGN_UP} element={<SignUp />} />
      <Route path={ANY} element={<SignIn />} />
    </Routes>
  );
};

export default Views;
