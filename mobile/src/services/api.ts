import axios from 'axios';

const api = axios.create({
  baseURL: 'https://backend-happy-deploy.herokuapp.com/',
});

export default api;
