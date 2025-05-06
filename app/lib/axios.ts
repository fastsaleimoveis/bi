import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://dev.fastsaleimoveis.com.br/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
