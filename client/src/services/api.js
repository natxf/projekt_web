import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

axios.defaults.withCredentials = true;

export const mainPage = () => API.get('/', {withCredentials:true});
export const fetchData = () => API.get('/data', { withCredentials: true });
export const fetchMYear = () => API.get('/m-year', { withCredentials: true });
export const fetchBYear = () => API.get('/b-year', { withCredentials: true });
export const fetchPerson = () => API.get('/search', { withCredentials: true });
export const registerForm = (values) => API.post('/register', values, { withCredentials: true });
export const loginForm = (values) => API.post('/login', values, { withCredentials: true });
export const logout = () => API.get('/logout', {withCredentials: true});
export const createPerson = (values) => API.post('/add-person', values, {withCredentials:true});
export const fetchPersonalList = () => API.get('/personal-list', {withCredentials:true});
export const editPerson = (values) => API.post('/edit-data', values, {withCredentials:true}); 
export const deletePerson = (values) =>API.post('/delete', values, {withCredentials:true});