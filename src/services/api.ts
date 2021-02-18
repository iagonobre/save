import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://save.oulu.ifrn.edu.br',
});

export const suapApi = axios.create({
  baseURL: 'https://suap.ifrn.edu.br/api/v2',
});
