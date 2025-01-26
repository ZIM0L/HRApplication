import { AxiosError, AxiosResponse } from "axios";
import { mainAxiosInstance } from "./Axios";
import { ExtractErrorsFromAPI } from "../utils/functions/ExtractErrorsFromAPI";
import { IQuestionInput } from "../types/Questions/ITeamQuestions";

export const GetTeamQuestions = async (teamId : string): Promise<AxiosResponse | null> => {
    try {
        const response = await mainAxiosInstance.post('api/TeamQuestion/GetTeamQuestions', {
            teamId: teamId
        });
        return response;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error("Error fetching team questions: ", error);

            const extractedErrors = ExtractErrorsFromAPI(error);

            const errorMessage = extractedErrors
                .map(e => `${e.messages.join(", ")}`)
                .join(" | ");
            if (errorMessage.length == 0) {
                throw new Error(error.response?.data.title);
            }

            throw new Error(errorMessage);
        }
        throw new Error("Unexpected error occurred while fetching team questions.");
    }
};
export const DeleteTeamQuestion = async (teamQuestionId: string): Promise<AxiosResponse | null> => {
    try {
        const response = await mainAxiosInstance.delete(`api/TeamQuestion/DeleteTeamQuestion/${teamQuestionId}`);
        return response;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error("Error deleting team question: ", error);

            const extractedErrors = ExtractErrorsFromAPI(error);

            const errorMessage = extractedErrors
                .map(e => `${e.messages.join(", ")}`)
                .join(" | ");
            if (errorMessage.length == 0) {
                throw new Error(error.response?.data.title);
            }

            throw new Error(errorMessage);
        }
        throw new Error("Unexpected error occurred while deleting team question.");
    }
};
export const AddTeamQuestion = async (teamId: string, data: IQuestionInput): Promise<AxiosResponse | null> => {
    try {
        const mappedSubQuestions = data.subQuestions?.map((sq) => ({
            key: sq.key,
            value: sq.value
        })) || [];

        const response = await mainAxiosInstance.post('api/TeamQuestion/AddTeamQuestion', {
            teamId: teamId,
            title: data.title,
            description: data.description,
            subQuestions: mappedSubQuestions,
        });

        return response;

    } catch (error) {
        if (error instanceof AxiosError) {
            console.error("Error fetching team questions: ", error);

            const extractedErrors = ExtractErrorsFromAPI(error);

            const errorMessage = extractedErrors
                .map(e => `${e.messages.join(", ")}`)
                .join(" | ");
            if (errorMessage.length == 0) {
                throw new Error(error.response?.data.title);
            }

            throw new Error(errorMessage);
        }
        throw new Error("Unexpected error occurred while fetching team questions.");
    }
};