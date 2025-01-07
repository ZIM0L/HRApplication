import { AxiosError, AxiosResponse } from "axios";
import { mainAxiosInstance } from "./Axios";
import { AcceptInvitationInputs, InvitationInputs, SearchForfullNameInputs } from "../types/Invitation/Invitation";
import { ExtractErrorsFromAPI } from "../utils/functions/ExtractErrorsFromAPI";

export const InviteUserToTeam = async (data: InvitationInputs): Promise<AxiosResponse | null> => {
    try {
        // Wys³anie zaproszenia
        const response = await mainAxiosInstance.post('/api/Invitation/SendInvitation', data);
        return response;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error("Error inviting user to team: ", error);

            const extractedErrors = ExtractErrorsFromAPI(error);

            const errorMessage = extractedErrors
                .map(e => `${e.messages.join(", ")}`)
                .join(" | ");
            if (errorMessage.length == 0) {
                throw new Error(error.response?.data.title);
            }
        }

        throw new Error("Unexpected error occurred inviting user.");
    }
};
export const SeachForUser = async (data: SearchForfullNameInputs): Promise<AxiosResponse | null> => {
    try {
        const response = await mainAxiosInstance.post('/api/Invitation/SeachForUser', data);
        return response;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error("Error fetching users: ", error);

            const extractedErrors = ExtractErrorsFromAPI(error);

            const errorMessage = extractedErrors
                .map(e => `${e.messages.join(", ")}`) 
                .join(" | "); 
            if (errorMessage.length == 0) {
                throw new Error(error.response?.data.title);
            }
            throw new Error(errorMessage); 
        }

        throw new Error("Unexpected error occurred while fetching users.");
    }
};
export const AcceptInvitation = async (data: AcceptInvitationInputs): Promise<AxiosResponse | null> => {
    try {
        // Wys³anie zaproszenia
        const response = await mainAxiosInstance.post('/api/Invitation/AcceptInvitation', data);
        return response;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error("Error accepting invitation user to team: ", error);

            const extractedErrors = ExtractErrorsFromAPI(error);

            const errorMessage = extractedErrors
                .map(e => `${e.messages.join(", ")}`)
                .join(" | ");
            if (errorMessage.length == 0) {
                throw new Error(error.response?.data.title);
            }

            throw new Error(errorMessage);
        }

        throw new Error("Unexpected error occurred while accepting invitation user to team.");
    }
};
