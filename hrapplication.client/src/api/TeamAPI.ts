import { AxiosError, AxiosResponse } from "axios";
import { mainAxiosInstance } from "./Axios";
import { TeamInputs } from "../types/Team/ITeam";
import { ExtractErrorsFromAPI } from "../utils/functions/ExtractErrorsFromAPI";
import { DeleteTeamMemberShiftInputs, ShiftInputs, TeamMemberShiftsToSend } from "../types/Shift/Shift";
import { IRequestInputs } from "../types/Request/IRequest";

export const GetUsersTeams = async (): Promise<AxiosResponse | null> => {
    try {
        return await mainAxiosInstance.get('api/Team/GetUsersTeams');
    } catch (error) {
        console.log(error)
        return null
    }
}
export const GetTeam = async (teamId : string): Promise<AxiosResponse | null> => {
    try {
        return await mainAxiosInstance.post('api/Team/GetTeam', {
            teamId: teamId
        });
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error("Error fetching team: ", error);

            const extractedErrors = ExtractErrorsFromAPI(error);

            const errorMessage = extractedErrors
                .map(e => `${e.messages.join(", ")}`)
                .join(" | ");
            if (errorMessage.length == 0) {
                throw new Error(error.response?.data.title);
            }
            throw new Error(errorMessage); 
        }
        throw new Error("Unexpected error occurred fetching team.");
    }
}
export const UpdateTeam = async(teamId : string , data: TeamInputs): Promise<AxiosResponse | null> => {
    try {
        return await mainAxiosInstance.put(`api/Team/UpdateTeam/${teamId}`, data);
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error("Error fetching team: ", error);

            const extractedErrors = ExtractErrorsFromAPI(error);

            const errorMessage = extractedErrors
                .map(e => `${e.messages.join(", ")}`)
                .join(" | ");
            if (errorMessage.length == 0) {
                throw new Error(error.response?.data.title);
            }
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
            if (errorMessage.length == 0) {
                throw new Error(error.response?.data.title); 
            }
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
            if (errorMessage.length == 0) {
                throw new Error(error.response?.data.title);
            }
            throw new Error(errorMessage); 
        }
        throw new Error("Unexpected error occurred fetching teams users.");
    }
};
export const DeleteTeamPermanently = async (teamId : string): Promise<AxiosResponse | null> => {
    try {
        const response = await mainAxiosInstance.delete(`api/Team/DisbandTeam/${teamId}`
        );
        return response;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error("Error disbanding team: ", error);

            const extractedErrors = ExtractErrorsFromAPI(error);

            const errorMessage = extractedErrors
                .map(e => `${e.messages.join(", ")}`)
                .join(" | ");
            if (errorMessage.length == 0) {
                throw new Error(error.response?.data.title);
            }
            throw new Error(errorMessage); 
        }
        throw new Error("Unexpected error occurred disbanding team.");
    }
};
export const GetTeamShifts = async (teamId: string): Promise<AxiosResponse | null> => {
    try {
        const response = await mainAxiosInstance.post('api/TeamShifts/GetTeamShifts', {
            teamId : teamId
        }
        );
        return response;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error("Error fetching team shifts: ", error);

            const extractedErrors = ExtractErrorsFromAPI(error);

            const errorMessage = extractedErrors
                .map(e => `${e.messages.join(", ")}`)
                .join(" | ");
            if (errorMessage.length == 0) {
                throw new Error(error.response?.data.title);
            }
            throw new Error(errorMessage); 
        }
        throw new Error("Unexpected error occurred while fetching team shifts.");
    }
};
export const CreateTeamShift = async (teamId: string, data: ShiftInputs): Promise<AxiosResponse | null> => {
    try {
        const response = await mainAxiosInstance.post('api/TeamShifts/CreateTeamShift', {
            teamId: teamId,
            ...data
        });
        return response;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error("Error creating new team shift: ", error);

            const extractedErrors = ExtractErrorsFromAPI(error);

            const errorMessage = extractedErrors
                .map(e => `${e.messages.join(", ")}`)
                .join(" | ");
            if (errorMessage.length == 0) {
                throw new Error(error.response?.data.title);
            }
            throw new Error(errorMessage); 
        }
        throw new Error("Unexpected error occurred while creating new team shift.");
    }
};
export const DeleteTeamShift = async (teamShiftId: string): Promise<AxiosResponse | null> => {
    try {
        const response = await mainAxiosInstance.delete(`api/TeamShifts/DeleteTeamShift/${teamShiftId}`);
        return response;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error("Error deleting team shift: ", error);

            const extractedErrors = ExtractErrorsFromAPI(error);

            const errorMessage = extractedErrors
                .map(e => `${e.messages.join(", ")}`)
                .join(" | ");
            if (errorMessage.length == 0) {
                throw new Error(error.response?.data.title);
            }
            throw new Error(errorMessage); 
        }
        throw new Error("Unexpected error occurred while deleting team shift.");
    }
};
export const GetTeamMembersShifts = async (teamId: string): Promise<AxiosResponse | null> => {
    try {
        const response = await mainAxiosInstance.post("/api/TeamMemberShifts/GetTeamMembersShifts", {
            teamId: teamId
        });
        return response;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error("Error fetching team members shifts: ", error);

            const extractedErrors = ExtractErrorsFromAPI(error);

            const errorMessage = extractedErrors
                .map(e => `${e.messages.join(", ")}`)
                .join(" | ");
            if (errorMessage.length == 0) {
                throw new Error(error.response?.data.title);
            }
            throw new Error(errorMessage); 
        }
        throw new Error("Unexpected error occurred while fetching team members shifts.");
    }
}; export const CreateTeamMemberShifts = async (data: TeamMemberShiftsToSend): Promise<AxiosResponse | null> => {
    try {
        const response = await mainAxiosInstance.post("/api/TeamMemberShifts/CreateTeamMemberShifts", data);
        return response;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error("Error creating team member shifts: ", error);

            const extractedErrors = ExtractErrorsFromAPI(error);

            const errorMessage = extractedErrors
                .map(e => `${e.messages.join(", ")}`)
                .join(" | ");
            if (errorMessage.length == 0) {
                throw new Error(error.response?.data.title);
            }
            throw new Error(errorMessage); 
        }
        throw new Error("Unexpected error occurred while creating team member shifts.");
    }
};
export const DeleteTeamMemberShift = async (data: DeleteTeamMemberShiftInputs): Promise<AxiosResponse | null> => {
    try {
        const response = await mainAxiosInstance.post("/api/TeamMemberShifts/DeleteTeamMemberShift", data);
        return response;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error("Error deleting team member shift: ", error);

            const extractedErrors = ExtractErrorsFromAPI(error);

            const errorMessage = extractedErrors
                .map(e => `${e.messages.join(", ")}`)
                .join(" | ");
            if (errorMessage.length == 0) {
                throw new Error(error.response?.data.title);
            }
            throw new Error(errorMessage);
        }
        throw new Error("Unexpected error occurred while deleting team member shift.");
    }
};
export const GetTeamProfilePicture = async (teamId: string): Promise<AxiosResponse | null> => {
    try {
        const response = await mainAxiosInstance.post("/api/Images/GetTeamImage", {
            teamId : teamId
        });
        return response;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error("Error fetching team profile picture: ", error);

            const extractedErrors = ExtractErrorsFromAPI(error);

            const errorMessage = extractedErrors
                .map(e => `${e.messages.join(", ")}`)
                .join(" | ");
            if (errorMessage.length == 0) {
                throw new Error(error.response?.data.title);
            }
            throw new Error(errorMessage);
        }
        throw new Error("Unexpected error occurred while fetching team profile picture.");
    } 
};
export const GetTeamsProfilePictures = async (): Promise<AxiosResponse | null> => {
    try {
        const response = await mainAxiosInstance.get("/api/Images/GetTeamsImages");
        return response;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error("Error fetching teams profile pictures: ", error);

            const extractedErrors = ExtractErrorsFromAPI(error);

            const errorMessage = extractedErrors
                .map(e => `${e.messages.join(", ")}`)
                .join(" | ");
            if (errorMessage.length == 0) {
                throw new Error(error.response?.data.title);
            }
            throw new Error(errorMessage);
        }
        throw new Error("Unexpected error occurred while fetching teams profile pictures.");
    } 
};
export const UploadTeamProfilePicture = async (data: FormData): Promise<AxiosResponse | null> => {
    try {
        const response = await mainAxiosInstance.post("/api/Images/UploadTeamImage", data);
        return response;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error("Error uploading team profile picture: ", error);

            const extractedErrors = ExtractErrorsFromAPI(error);

            const errorMessage = extractedErrors
                .map(e => `${e.messages.join(", ")}`)
                .join(" | ");
            if (errorMessage.length == 0) {
                throw new Error(error.response?.data.title);
            }
            throw new Error(errorMessage);
        }
        throw new Error("Unexpected error occurred while uploading team profile picture.");
    }
};
export const GetUsersRequests = async (teamId: string): Promise<AxiosResponse | null> => {
    try {
        const response = await mainAxiosInstance.post("api/TeamMemberRequest/GetTeamMemberRequests", {
            teamId: teamId
        });
        return response;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error("Error fetching users requests: ", error);

            const extractedErrors = ExtractErrorsFromAPI(error);

            const errorMessage = extractedErrors
                .map(e => `${e.messages.join(", ")}`)
                .join(" | ");
            if (errorMessage.length == 0) {
                throw new Error(error.response?.data.title);
            }
            throw new Error(errorMessage);
        }
        throw new Error("Unexpected error occurred while fetching users requests.");
    }
}
export const AddUserRequest = async ( RequestInputs : IRequestInputs ,teamId: string): Promise<AxiosResponse | null> => {
    try {
        const response = await mainAxiosInstance.post("api/TeamMemberRequest/AddTeamMemberRequest", {
            ...RequestInputs,
            teamId: teamId
        });
        return response;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error("Error adding new user request: ", error);

            const extractedErrors = ExtractErrorsFromAPI(error);

            const errorMessage = extractedErrors
                .map(e => `${e.messages.join(", ")}`)
                .join(" | ");
            if (errorMessage.length == 0) {
                throw new Error(error.response?.data.title);
            }
            throw new Error(errorMessage);
        }
        throw new Error("Unexpected error occurred while adding new user request.");
    }
}
export const DeleteUserRequest = async (teamMemberRequestId: string): Promise<AxiosResponse | null> => {
    try {
        const response = await mainAxiosInstance.delete(`api/TeamMemberRequest/DeleteTeamMemberRequest/${teamMemberRequestId}`);
        return response;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error("Error deleting user request: ", error);

            const extractedErrors = ExtractErrorsFromAPI(error);

            const errorMessage = extractedErrors
                .map(e => `${e.messages.join(", ")}`)
                .join(" | ");
            if (errorMessage.length == 0) {
                throw new Error(error.response?.data.title);
            }
            throw new Error(errorMessage);
        }
        throw new Error("Unexpected error occurred while deleting user request.");
    }
}
export const ResolveUserRequest = async (teammemberrequestid: string, answerContent? :string): Promise<AxiosResponse | null> => {
    try {
        const response = await mainAxiosInstance.post(`api/TeamMemberRequest/ResolveTeamMemberRequest`, {
            teammemberrequestid: teammemberrequestid,
            ...(answerContent && { answerContent: answerContent })
        });
        return response;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error("Error deleting user request: ", error);

            const extractedErrors = ExtractErrorsFromAPI(error);

            const errorMessage = extractedErrors
                .map(e => `${e.messages.join(", ")}`)
                .join(" | ");
            if (errorMessage.length == 0) {
                throw new Error(error.response?.data.title);
            }
            throw new Error(errorMessage);
        }
        throw new Error("Unexpected error occurred while deleting user request.");
    }
}
export const DeleteTeamMember = async (teamId: string, email: string): Promise<AxiosResponse | null> => {
    try {
        const response = await mainAxiosInstance.post(`api/Team/DeleteTeamMember`, {
            teamId: teamId,
            email: email
        });
        return response;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error("Error deleting user: ", error);

            const extractedErrors = ExtractErrorsFromAPI(error);

            const errorMessage = extractedErrors
                .map(e => `${e.messages.join(", ")}`)
                .join(" | ");
            if (errorMessage.length == 0) {
                throw new Error(error.response?.data.title);
            }
            throw new Error(errorMessage);
        }
        throw new Error("Unexpected error occurred while deleting user.");
    }
}






