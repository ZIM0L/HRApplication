import { AxiosError, AxiosResponse } from "axios";
import { LoginInputs, RegisterInputs } from "../types/Auth/AuthInputTypes";
import { mainAxiosInstance } from "./Axios";
import { ExtractErrorsFromAPI } from "../utils/functions/ExtractErrorsFromAPI";
import { IUserToChangeCredentials } from "../types/User/IUser";

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
export const UploadUserImage = async (data: FormData): Promise<AxiosResponse> => {
    try {
        return await mainAxiosInstance.post('api/Images/UploadUserImage', data)
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error("Error uplouding image: ", error);

            const extractedErrors = ExtractErrorsFromAPI(error);

            const errorMessage = extractedErrors
                .map(e => `${e.messages.join(", ")}`)
                .join(" | ");
            if (errorMessage.length == 0) {
                throw new Error(error.response?.data.title);
            }

            throw new Error(errorMessage);
        }
        throw new Error("Unexpected error occurred uploading image");
    }
}
export const GetUserImage = async (): Promise<AxiosResponse> => {
    try {
        return await mainAxiosInstance.get('api/Images/GetUserImage')
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error("Error uplouding image: ", error);

            const extractedErrors = ExtractErrorsFromAPI(error);

            const errorMessage = extractedErrors
                .map(e => `${e.messages.join(", ")}`)
                .join(" | ");
            if (errorMessage.length == 0) {
                throw new Error(error.response?.data.title);
            }

            throw new Error(errorMessage);
        }
        throw new Error("Unexpected error occurred uploading image");
    }
}
export const ChangeUserCredential = async (data: IUserToChangeCredentials): Promise<AxiosResponse> => {
    try {
        return await mainAxiosInstance.post('api/User/ChangeUserCredential', data)
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error("Error changing user credentials: ", error);

            const extractedErrors = ExtractErrorsFromAPI(error);

            const errorMessage = extractedErrors
                .map(e => `${e.messages.join(", ")}`)
                .join(" | ");
            if (errorMessage.length == 0) {
                throw new Error(error.response?.data.title);
            }

            throw new Error(errorMessage);
        }
        throw new Error("Unexpected error occurred while changing user credentials.");
    }
}
export const ChangeUserPassword = async (password : string, newPassword : string): Promise<AxiosResponse> => {
    try {
        return await mainAxiosInstance.put('api/User/ChangeUserPassword', {
            password: password,
            newPassword: newPassword
        })
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error("Error changing user password: ", error);

            const extractedErrors = ExtractErrorsFromAPI(error);

            const errorMessage = extractedErrors
                .map(e => `${e.messages.join(", ")}`)
                .join(" | ");
            if (errorMessage.length == 0) {
                throw new Error(error.response?.data.title);
            }

            throw new Error(errorMessage);
        }
        throw new Error("Unexpected error occurred while changing user password.");
    }
}



