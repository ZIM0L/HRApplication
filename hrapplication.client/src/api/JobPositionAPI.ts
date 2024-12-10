import { AxiosError, AxiosResponse } from "axios";
import { mainAxiosInstance } from "./Axios";
import { IAddJobPositionInputs } from "../types/JobPosition/IJobPosition";

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
export const AddJobPosition = async (
    id: string,
    data: IAddJobPositionInputs
): Promise<AxiosResponse> => {
    try {
        const response = await mainAxiosInstance.post('/api/JobPosition/addJobPosition', {
            teamId: id,
            title: data.title,
            description: data.description,
            isRecruiting: data.isRecruiting,
        });
        return response;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error("Error fetching job position: ", error);
            throw new Error(error.response?.data?.title);
        }
        throw new Error("Unexpected error occurred while adding the job position.");
    }
};