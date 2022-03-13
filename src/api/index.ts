import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { info } from 'sass';
const instance: AxiosInstance = axios.create({
  baseURL: 'https://reqres.in/api/',
});

export const loginApi = {
  async FETCH_LOGIN(info: {
    email: string;
    password: string;
  }): Promise<AxiosResponse<any, any>> {
    const response = await instance.post(
      `login/email=${info.email}&password=${info.password}`,
    );
    return response;
  },
};

export const joinApi = {
  async FETCH_JOIN(): Promise<AxiosResponse<any, any>> {
    const response = await instance.post(`register`, {
      email: 'eve.holt@reqres.in',
      password: 'pistol',
    });
    return response;
  },
};
