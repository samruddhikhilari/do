import axios from 'axios';

const api = axios.create({
    baseURL: '/api', // This will be proxied to http://localhost:8081/api
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
