import axios from 'axios';
import {AsyncStorage} from "react-native"


export const HTTP = axios.create({
  baseURL: `http://localhost:3000/`
})

HTTP.interceptors.request.use(
  async (config) => {
    let token = await AsyncStorage.getItem('token');
    config.headers.authorization = `Bearer ${token}`;
    return config;
  },
  error => Promise.reject(error)
);