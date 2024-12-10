import { AxiosError, AxiosResponse } from "axios";
import { mainAxiosInstance } from "./Axios";

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
            throw new Error(error.response?.data?.title);
        }
        throw new Error("Unexpected error occurred fetching team.");
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
            throw new Error(error.response?.data?.title);
        }
        throw new Error("Unexpected error occurred fetching teams users.");
    }
};