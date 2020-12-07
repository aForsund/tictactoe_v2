import axios from 'axios';
//import { store } from '../store/store'

const BASE_URL = 'http://localhost:3000';

axios.interceptors.response.use(response => response, error => {if (error.response.status === 401) console.log('logout....')
return Promise.reject(error)}
);

const apiClient = axios.create({
	baseURL: BASE_URL,
	withCredentials: false,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
});





export default {
	getUsers() {
		return apiClient.get('/api/user');
	},
	getUser(id) {
		return apiClient.get('/api/user/' + id);
	},
	registerUser(data) {
		return apiClient.post('/api/auth/register', {
			username: data.name,
			email: data.email,
			password: data.password,
		});
	},
	loginUser(data) {
		console.log('loginUser - API-interface');
		return axios.post('/api/auth/login', {
			username: data.name,
			password: data.password,
		});
	},
	search(data) {
		return apiClient.get('/api/user/search/' + data);
	},
	testJWT(jwt) {
		const authorizedRequest = axios.create({
			baseURL: BASE_URL,
			withCredentials: false,
			headers: {
				'Authorization': jwt,
				Accept: 'application/json',
				'Content-Type': 'application/json',
				
			}
		});
		return authorizedRequest.get('/api/user/posts');
	},
	testJWT2(jwt) {
		apiClient.defaults.headers.common['Authorization'] = jwt;
		
		return apiClient.get('/api/user/posts');
  },
  getChallenges(jwt, username) {
    apiClient.defaults.headers.common['Authorization'] = jwt;
    return apiClient.get('api/user/challenges/' + username);
  }
};
