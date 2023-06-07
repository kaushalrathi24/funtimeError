import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://8abe-136-233-9-98.ngrok-free.app',
});
export default instance;
