import axios from 'axios';

const nexusApi = axios.create({
  baseURL: 'http://localhost:3000', // La URL de tu backend NestJS
});

export default nexusApi;
