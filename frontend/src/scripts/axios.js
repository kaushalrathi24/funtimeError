import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://165.232.190.229:3000',
});
export default instance;
