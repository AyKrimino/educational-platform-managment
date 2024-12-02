import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_PUBLIC_API_BASE_URL;

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
        accept: 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    config => {
        const authTokens = JSON.parse(localStorage.getItem('authTokens'));
        if (authTokens && authTokens.access) {
            config.headers['Authorization'] = 'Bearer ' + authTokens.access;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const authTokens = JSON.parse(localStorage.getItem('authTokens'));
                const response = await axiosInstance.post('/token/refresh/', { refresh: authTokens.refresh });
                authTokens.access = response.data.access;
                localStorage.setItem('authTokens', JSON.stringify(authTokens));
                axiosInstance.defaults.headers['Authorization'] = 'Bearer ' + response.data.access;
                originalRequest.headers['Authorization'] = 'Bearer ' + response.data.access;
                return axiosInstance(originalRequest);
            } catch (err) {
                console.error('Token refresh failed', err);
                localStorage.removeItem('authTokens');
                window.location.href = '/';
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
