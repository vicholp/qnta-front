import axios from 'axios';

const api = axios.create();

api.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

api.defaults.withCredentials = true;
api.defaults.withXSRFToken = true;

api.defaults.baseURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export function createAccount(data) {
    return api.post('/accounts', data);
}

export function getAccount(slug) {
    return api.get(`/accounts/${slug}`);
}