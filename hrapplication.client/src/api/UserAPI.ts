import { AxiosError, AxiosResponse } from "axios";
import { LoginInputs, RegisterInputs } from "../types/Auth/AuthInputTypes";
import { mainAxiosInstance } from "./Axios";
import { ExtractErrorsFromAPI } from "../utils/functions/ExtractErrorsFromAPI";

export const loginUser = async (data: LoginInputs): Promise<AxiosResponse> => {
    try {
        return await mainAxiosInstance.post('/auth/login', data);
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error("Error login user: ", error);

            const extractedErrors = ExtractErrorsFromAPI(error);

            const errorMessage = extractedErrors
                .map(e => `${e.messages.join(", ")}`)
                .join(" | ");
            if (errorMessage.length == 0) {
                throw new Error(error.response?.data.title);
            }

            throw new Error(errorMessage); 
        }
        throw new Error("Unexpected error occurred while loggin");
    }
}
export const registerUser = async (data: RegisterInputs): Promise<AxiosResponse > => {
    try {
        return await mainAxiosInstance.post('auth/register', data)
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error("Error registering user: ", error);

            const extractedErrors = ExtractErrorsFromAPI(error);

            const errorMessage = extractedErrors
                .map(e => `${e.messages.join(", ")}`)
                .join(" | ");
            if (errorMessage.length == 0) {
                throw new Error(error.response?.data.title);
            }

            throw new Error(errorMessage); 
        }
        throw new Error("Unexpected error occurred while registering user");
    }
}