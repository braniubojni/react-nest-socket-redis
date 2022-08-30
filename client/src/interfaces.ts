import { ReactNode } from 'react';

export interface IBasePropsInterface {
  children?: ReactNode;
}

export interface ISignUpValues {
  email: string;
  password: string;
}

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export interface IVewsProps extends IBasePropsInterface {}
