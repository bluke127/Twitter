import axios, { AxiosInstance, AxiosResponse } from 'axios';
const instance: AxiosInstance = axios.create({
  baseURL: 'https://reqres.in/api/',
});

export const loginApi = {
  async FETCH_LOGIN(info: { email: string; password: string }): Promise<AxiosResponse<any, any>> {
    const response = await instance.post(`login/email=${info.email}&password=${info.password}`);
    return response;
  },
};
