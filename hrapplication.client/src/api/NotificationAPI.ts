import { AxiosError, AxiosResponse } from "axios";
import { mainAxiosInstance } from "./Axios";
import { ExtractErrorsFromAPI } from "../utils/functions/ExtractErrorsFromAPI";

export const GetUserInvitation = async (): Promise<AxiosResponse | null> => {
    try {
        const response = await mainAxiosInstance.get('api/Invitation/GetUserInvitation');
        return response;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error("Error fetching users invitations: ", error);

            const extractedErrors = ExtractErrorsFromAPI(error);

            const errorMessage = extractedErrors
                .map(e => `${e.messages.join(", ")}`)
                .join(" | ");

            throw new Error(errorMessage); 
        }
        throw new Error("Unexpected error occurred fetching users invitations.");
    }
};
export const CheckIfAnyInvitationForUser = async (): Promise<AxiosResponse | null> => {
    try {
        const response = await mainAxiosInstance.get('api/Invitation/CheckIfAnyInvitationForUser');
        return response;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error("Error fetching users invitations: ", error);

            const extractedErrors = ExtractErrorsFromAPI(error);

            const errorMessage = extractedErrors
                .map(e => `${e.messages.join(", ")}`)
                .join(" | ");

            throw new Error(errorMessage); 
        }
        throw new Error("Unexpected error occurred fetching users invitations.");
    }
};