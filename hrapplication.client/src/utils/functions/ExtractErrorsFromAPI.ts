import { AxiosError } from "axios";

interface ApiErrorResponse {
    errors?: Record<string, string[]>;
    title?: string;
}

export const ExtractErrorsFromAPI = <T>(error: AxiosError<T>): { field: string, messages: string[] }[] => {
    const errorMessages: { field: string, messages: string[] }[] = [];

    const errorDetails = (error.response?.data as ApiErrorResponse)?.errors || {};
    Object.keys(errorDetails).forEach((key) => {
        const messages = errorDetails[key];
        if (Array.isArray(messages)) {
            errorMessages.push({
                field: key,
                messages: messages 
            });
        } else if (typeof messages === "string") {
            errorMessages.push({
                field: key,
                messages: [messages] 
            });
        }
    });

    return errorMessages;
};
