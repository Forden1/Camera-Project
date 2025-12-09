import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const baseURL = 'http://localhost:8000/api/';

const api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(async (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
        const decoded = jwtDecode(token);
        const isExpired = decoded.exp < Date.now() / 1000;

        if (isExpired) {
            const refreshToken = localStorage.getItem('refresh_token');
            try {
                const response = await axios.post(baseURL + 'token/refresh/', {
                    refresh: refreshToken,
                });
                localStorage.setItem('access_token', response.data.access);
                config.headers.Authorization = `Bearer ${response.data.access}`;
            } catch (error) {
                console.error('Token refresh failed', error);
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                window.location.href = '/login';
            }
        } else {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

export default api;
