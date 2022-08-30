import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';
import { SIGN_IN } from '../paths';

const Home = () => {
  const nav = useNavigate();
  const isAuth = useAppSelector((state) => state.tokenSlice.isAuth);

  useEffect(() => {
    if (!isAuth) {
      nav(SIGN_IN);
    }
  }, [isAuth, nav]);
  return <div>You are signed in</div>;
};

export default Home;
