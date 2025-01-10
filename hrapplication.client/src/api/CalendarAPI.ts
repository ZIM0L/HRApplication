import { AxiosError, AxiosResponse } from "axios";
import { mainAxiosInstance } from "./Axios";
import { ExtractErrorsFromAPI } from "../utils/functions/ExtractErrorsFromAPI";
import { CalendarEventInputs } from "../types/Calendar/ICalendar";

export const GetCalendarEvents = async (teamId : string): Promise<AxiosResponse | null> => {
    try {
        const response = await mainAxiosInstance.post('/api/CalendarEvents/GetCalendarEvents', {
            teamId: teamId,
        });
        return response;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error("Error fetching calendar events: ", error);

            const extractedErrors = ExtractErrorsFromAPI(error);

            const errorMessage = extractedErrors
                .map(e => `${e.messages.join(", ")}`)
                .join(" | ");
            if (errorMessage.length == 0) {
                throw new Error(error.response?.data.title);
            }
        }

        throw new Error("Unexpected error occurred while fetching calendar events.");
    }
};
export const CreateCalendarEvent = async (teamId : string, data : CalendarEventInputs): Promise<AxiosResponse | null> => {
    try {
        const response = await mainAxiosInstance.post('/api/CalendarEvents/CreateCalendarEvent', {
            teamId: teamId,
            ...data
        });
        return response;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error("Error adding new calendar event: ", error);

            const extractedErrors = ExtractErrorsFromAPI(error);

            const errorMessage = extractedErrors
                .map(e => `${e.messages.join(", ")}`)
                .join(" | ");

            if (errorMessage.length == 0) {
                throw new Error(error.response?.data.title);
            }
        }

        throw new Error("Unexpected error occurred while adding new calendar event.");
    }
};
export const DeleteCalendarEvent = async (calendarEventId : string): Promise<AxiosResponse | null> => {
    try {
        const response = await mainAxiosInstance.delete(`/api/CalendarEvents/DeleteCalendarEvent/${calendarEventId}`);
        return response;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error("Error deleting calendar event: ", error);

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