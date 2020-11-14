import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

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
		return apiClient.post('/api/auth/login', {
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
	}
};
