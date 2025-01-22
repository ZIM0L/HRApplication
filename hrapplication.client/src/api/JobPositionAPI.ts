import { AxiosError, AxiosResponse } from "axios";
import { mainAxiosInstance } from "./Axios";
import { IAddJobPositionInputs, IJobPosition } from "../types/JobPosition/IJobPosition";
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

        if (error instanceof AxiosError) {
            const extractedErrors = ExtractErrorsFromAPI(error);

            const errorMessage = extractedErrors
                .map(e => `${e.messages.join(", ")}`)
                .join(" | ");
            if (errorMessage.length == 0) {
                throw new Error(error.response?.data.title);
            }
        }
        throw new Error("Unexpected error occurred while fetching job position.");
    }
};
export const AddJobPosition = async (
    id: string,
    data: IAddJobPositionInputs
): Promise<AxiosResponse> => {
    try {
        const response = await mainAxiosInstance.post('/api/JobPosition/AddJobPosition', {
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

            if (extractedErrors.length == 0) {
                throw new Error(error.response?.data.title); 
            }
            throw new Error(errorMessage); 
        }
        throw new Error("Unexpected error occurred while adding the job position.");
    }
};
export const UpdateJobPosition = async (data: IJobPosition): Promise<AxiosResponse> => {
    try {
        const response = await mainAxiosInstance.post('/api/JobPosition/UpdateJobPosition', data);
        return response;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error("Error editing job position: ", error);

            const extractedErrors = ExtractErrorsFromAPI(error);

            const errorMessage = extractedErrors
                .map(e => `${e.messages.join(", ")}`)
                .join(" | ");

            if (extractedErrors.length == 0) {
                throw new Error(error.response?.data.title);
            }
            throw new Error(errorMessage);
        }
        throw new Error("Unexpected error occurred while editing job position.");
    }
};