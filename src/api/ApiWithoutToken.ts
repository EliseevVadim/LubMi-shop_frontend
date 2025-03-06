import axios, { AxiosResponse } from "axios";
import { ApiErrorHandler } from "../middleware/api-error-handler";
import { HttpErrorHandler } from "../middleware/http-error-handler";
import { message } from "antd";

const api = axios.create({
  baseURL: 'https://api.lubmi.ru/api', //prod
  // baseURL: 'http://193.168.49.60/api', //dev
  headers: {
    Accept: 'application/json',
    withCredentials: false,
  },
  timeout: 10000,
  timeoutErrorMessage: "Превышено время ожидания ответа от сервера",
  validateStatus: function (status){
    return (status >= 200 && status < 300) || status === 422 || status === 401;
  },
});

api.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response: AxiosResponse<any, any>) => {
    try {
      return Promise.resolve(ApiErrorHandler(response));
    } catch (e: any) {
      // message.error(e.message);
      return Promise.reject(e);
    }
  },
  (error) => {
    HttpErrorHandler(error);
    return Promise.reject(error);
  }
);


export { api };
