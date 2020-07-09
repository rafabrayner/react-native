import axios from 'axios';

const api = axios.create({
  baseURL: 'https://node-todo-dev.herokuapp.com/api',
});

export default api;
