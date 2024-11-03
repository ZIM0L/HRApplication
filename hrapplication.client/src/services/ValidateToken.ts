import { AxiosError } from "axios";
import { api } from "../routes/api";

export const ValidateToken = async (): Promise<number | undefined> => {
    try {
        const response = await api.get('/api/ValidateAuthToken');
        return response.status;
    } catch (error) {
        if (error instanceof AxiosError && error.response) {
            return error.response.status;
        }
        console.error("Unexpected error:", error);
        return undefined;
    }
};