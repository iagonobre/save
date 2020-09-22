import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://134.209.46.170',
});

export const suapApi = axios.create({
  baseURL: 'https://suap.ifrn.edu.br/api/v2',
});
