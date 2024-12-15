import { AxiosError, AxiosResponse } from "axios";
import { mainAxiosInstance } from "./Axios";
import { IAddJobPositionInputs } from "../types/JobPosition/IJobPosition";
import { ExtractErrorsFromAPI } from "../utils/functions/ExtractErrorsFromAPI";

export const GetJobPositionsBasedOnTeams = async (teamId: string): Promise<AxiosResponse | null> => {
    try {
        const response = await mainAxiosInstance.post('/api/JobPosition/GetJobPositionsBasedOnTeams', {
                teamId: teamId,
            }
        );
        return response;
    } catch (error) {
        console.error("Error fetching job position: ", error);

        const extractedErrors = ExtractErrorsFromAPI(error);

        const errorMessage = extractedErrors
            .map(e => `${e.messages.join(", ")}`)
            .join(" | ");

        throw new Error(errorMessage); 
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

            const extractedErrors = ExtractErrorsFromAPI(error);

            const errorMessage = extractedErrors
                .map(e => `${e.messages.join(", ")}`)
                .join(" | ");

            throw new Error(errorMessage); 
        }
        throw new Error("Unexpected error occurred while adding the job position.");
    }
};