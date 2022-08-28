import { AxiosResponse } from 'axios';
import $api from '../http';
import { SIGN_IN, SIGN_OUT, SIGN_UP } from '../paths';

export default class AuthService {
  static async signUp(email: string, password: string): Promise<AxiosResponse> {
    return $api.post(`/users/${SIGN_UP}`, { email, password });
  }

  static async signIn(email: string, password: string): Promise<AxiosResponse> {
    return $api.post(`/users/${SIGN_IN}`, { email, password });
  }

  static async signOut(): Promise<AxiosResponse> {
    return $api.post(`/users/${SIGN_OUT}`);
  }
}
