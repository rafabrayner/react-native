import axios from 'axios';

const api = axios.create({
  baseURL: 'https://node-todo-dev.herokuapp.com/api/todos',
});

export default api;
