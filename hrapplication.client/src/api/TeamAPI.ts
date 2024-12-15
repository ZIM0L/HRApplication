import { AxiosError, AxiosResponse } from "axios";
import { mainAxiosInstance } from "./Axios";
import { TeamInputs } from "../types/Team/ITeam";
import { ExtractErrorsFromAPI } from "../utils/functions/ExtractErrorsFromAPI";

export const GetUsersTeams = async (): Promise<AxiosResponse | null> => {
    try {
        return await mainAxiosInstance.get('api/Team/GetUsersTeams');
    } catch (error) {
        console.log(error)
        return null
    }
}
export const GetTeam = async (): Promise<AxiosResponse | null> => {
    try {
        return await mainAxiosInstance.get('api/Team/GetTeam');
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error("Error fetching team: ", error);

            const extractedErrors = ExtractErrorsFromAPI(error);

            const errorMessage = extractedErrors
                .map(e => `${e.messages.join(", ")}`)
                .join(" | ");

            throw new Error(errorMessage); 
        }
        throw new Error("Unexpected error occurred fetching team.");
    }
}
export const CreateTeam = async (data: TeamInputs): Promise<AxiosResponse | null> => {
    try {
        return await mainAxiosInstance.post('api/Team/AddNewTeam', data);
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error("Error creating team: ", error);

            const extractedErrors = ExtractErrorsFromAPI(error);

            const errorMessage = extractedErrors
                .map(e => `${e.messages.join(", ")}`)
                .join(" | ");

            throw new Error(errorMessage); 
        }
        throw new Error("Unexpected error occurred while creating team.");
    }
}
export const GetTeamsUsers = async (id: string): Promise<AxiosResponse | null> => {
    try {
        const response = await mainAxiosInstance.post('api/Team/GetTeamsUsers', {
                teamId: id,
            } 
        );
        return response;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error("Error fetching teams users: ", error);

            const extractedErrors = ExtractErrorsFromAPI(error);

            const errorMessage = extractedErrors
                .map(e => `${e.messages.join(", ")}`)
                .join(" | ");

            throw new Error(errorMessage); 
        }
        throw new Error("Unexpected error occurred fetching teams users.");
    }
};