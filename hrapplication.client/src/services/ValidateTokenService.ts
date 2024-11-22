import { AxiosError } from "axios";
import { mainAxiosInstance } from "../api/Axios";

export const ValidateTokenService = async (): Promise<number | undefined> => {
    try {
        const response = await mainAxiosInstance.get('/api/ValidateAuthToken');
        return response.status;
    } catch (error) {
        if (error instanceof AxiosError && error.response) {
            return error.response.status;
        }
        console.error("Unexpected error:", error);
        return undefined;
    }
};