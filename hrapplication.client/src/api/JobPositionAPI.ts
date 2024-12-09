import { AxiosResponse } from "axios";
import { mainAxiosInstance } from "./Axios";

export const GetJobPositionsBasedOnTeams = async (id: string): Promise<AxiosResponse | null> => {
    try {
        const response = await mainAxiosInstance.post('/api/JobPosition/GetJobPositionsBasedOnTeams', {
                teamId: id,
            }
        );
        return response;
    } catch (error) {
        console.error("Error fetching job position: ", error);
        return null;
    }
};