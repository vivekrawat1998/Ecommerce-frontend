import axios from "axios";
import Cookies from "js-cookie";

const AxiosInstance = axios.create({
    baseURL: "http://localhost:9878/api/v1",
    withCredentials: true,
});

// Request Interceptor: attach token
AxiosInstance.interceptors.request.use((config) => {
    const token = Cookies.get("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Response Interceptor: handle 401 and refresh token
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

AxiosInstance.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            if (isRefreshing) {
                // Queue the request if a refresh is already in progress
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then(token => {
                    originalRequest.headers.Authorization = 'Bearer ' + token;
                    return AxiosInstance(originalRequest);
                }).catch(err => {
                    return Promise.reject(err);
                });
            }

            isRefreshing = true;

            try {
                const res = await axios.post('http://localhost:9878/api/v1/user/refresh', {}, {
                    withCredentials: true
                });

                const newToken = res.data.token;
                Cookies.set("token", newToken);

                AxiosInstance.defaults.headers.Authorization = 'Bearer ' + newToken;
                processQueue(null, newToken);
                return AxiosInstance(originalRequest);
            } catch (refreshError) {
                processQueue(refreshError, null);
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);


export default AxiosInstance;