import { AxiosResponse } from "axios";
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
        console.log(error)
        return null
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
        console.error("Error fetching team users:", error);
        return null; 
    }
};