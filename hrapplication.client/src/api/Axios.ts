import axios, { AxiosResponse } from 'axios';

export interface TokenResponse {
    accessToken: string;
}

export const mainAxiosInstance = axios.create({
    baseURL: 'https://localhost:7250',
    withCredentials: true,
    headers: {}
});

export const setAuthToken = (token: string | null) => {
    if (token) {
        mainAxiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete mainAxiosInstance.defaults.headers.common['Authorization'];
    }
};

// before sending request
mainAxiosInstance.interceptors.request.use(async (request) => {
    // check if there's a valid access token
    let accessToken = localStorage.getItem('accessToken');

    // If no access token in localStorage, try to refresh the token
    if (!accessToken) {
        try {
            const refreshToken = localStorage.getItem('refreshToken'); // Assuming the refresh token is stored too
            if (refreshToken) {
                const response: AxiosResponse<TokenResponse> = await mainAxiosInstance.post('/refresh-Token', null, {
                    headers: {
                        'Authorization': `Bearer ${refreshToken}`
                    }
                });

                accessToken = response.data.accessToken;
                localStorage.setItem('accessToken', accessToken);
                setAuthToken(accessToken);
            }
        } catch (refreshError) {
            console.error('Token refresh failed:', refreshError);
            // Optional: Redirect to login or session expired page if refresh fails
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            window.location.href = '/sessionexpired';
            return Promise.reject(refreshError);
        }
    }

    if (accessToken) {
        request.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return request;
}, (error) => {
    return Promise.reject(error);
});

let isRefreshing = false; // Flaga, kt�ra kontroluje, czy token jest w trakcie od�wie�ania

// refresh token if 401
mainAxiosInstance.interceptors.response.use(
    (response) => response, // Je�li zapytanie zako�czy si� powodzeniem, po prostu zwr�� odpowied�
    async (error) => { // Je�li wyst�pi b��d, np. 401, spr�buj od�wie�y� token
        const originalRequest = error.config;

        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            // Je�li token nie jest od�wie�any i dostajemy b��d 401, spr�buj od�wie�y� token
            originalRequest._retry = true;

            if (isRefreshing) {
                return new Promise((resolve) => {
                    const interval = setInterval(() => {
                        if (!isRefreshing) {
                            clearInterval(interval);
                            resolve(mainAxiosInstance(originalRequest));
                        }
                    }, 100); 
                });
            }

            try {
                isRefreshing = true; 
                const refreshToken = localStorage.getItem('refreshToken');
                const response = await mainAxiosInstance.post('/refresh-Token', null, {
                    headers: {
                        'Authorization': `Bearer ${refreshToken}`,
                    },
                });

                localStorage.setItem('accessToken', response.data.accessToken);
                setAuthToken(response.data.accessToken);

                // Po udanym od�wie�eniu tokenu, wy�lij oryginalne zapytanie
                return mainAxiosInstance(originalRequest);
            } catch (refreshError) {
                console.error('Token refresh failed:', refreshError);
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.location.href = '/sessionexpired'; // Przekierowanie do strony wyga�ni�cia sesji
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false; // Zresetuj flag� po zako�czeniu od�wie�ania
            }
        }

        return Promise.reject(error);
    }
);

