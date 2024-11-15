import axios, { AxiosResponse } from 'axios';
export interface TokenResponse {
    accessToken: string;
};

export const api = axios.create({
    baseURL: 'https://localhost:7250',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json' // Wysy³anie danych w formacie JSON
    }
});

export const setAuthToken = (token: string | null) => {
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common['Authorization'];
    }
};



// before sending request
api.interceptors.request.use(request => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
        request.headers['Authorization'] = `Bearer ${accessToken}`
    }
    return request;
}, error => {
    return Promise.reject(error);
});

// refresh token if 401
api.interceptors.response.use(
    (response) => response,  // if good return response
    async (error) => {   // if 401 send refresh token
        const originalRequest = error.config;

        if (error.response && error.response.status === 401 && !originalRequest._retry) {

            originalRequest._retry = true;

            try {

                const refreshRequestConfig = { ...originalRequest };
                delete refreshRequestConfig.headers['Authorization'];

                const response: AxiosResponse<TokenResponse> = await api.post('/refresh-Token', null, refreshRequestConfig);

                localStorage.setItem('accessToken', response.data.accessToken)

                //automatically sets header of every task
                setAuthToken(response.data.accessToken);

                //originalRequest.headers = originalRequest.headers || {};
                //originalRequest.headers['Authorization'] = `Bearer ${response.data.accessToken}`;

                return api(originalRequest);

            } catch (refreshError) {
                console.error('Odœwie¿enie tokenu nie powiod³o siê: ', refreshError);
                localStorage.removeItem('accessToken');
                window.location.href = '/login';
                document.cookie = "refreshToken=; expires=Wed, 01 Jan 1970 00:00:00 GMT; path=/; samesite=strict; httponly"
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);