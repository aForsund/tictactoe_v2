import axios from 'axios';

//const BASE_URL = 'http://localhost:3000';
const BASE_URL = '';

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
			password: data.email,
		});
	},
	search(data) {
		return apiClient.get('/api/user/search/' + data);
	},
};
