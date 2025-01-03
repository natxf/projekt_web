import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

export const fetchData = () => API.get('/data');
export const fetchMYear = () => API.get('/m-year');
export const fetchBYear = () => API.get('/b-year');