import { AxiosResponse } from "axios";
import { LoginInputs, RegisterInputs } from "../types/Auth/AuthInputTypes";
import { mainAxiosInstance } from "./Axios";

export const loginUser = async (data: LoginInputs): Promise<AxiosResponse | null> => {
    try {
        return await mainAxiosInstance.post('/auth/login', data);
    } catch (error) {
        alert("Invalid Credentials")
        return null
    }
}
export const registerUser = async (data: RegisterInputs): Promise<AxiosResponse | null> => {
    try {
        return await mainAxiosInstance.post('/auth/register', data)
    } catch (error) {
        alert("Invalid Credentials")
        return null
    }
}