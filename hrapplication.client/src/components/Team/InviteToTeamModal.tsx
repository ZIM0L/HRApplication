// InviteToTeamModal.tsx
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { IJobPosition } from "../../types/JobPosition/IJobPosition";
import { GetJobPositionsBasedOnTeams } from "../../api/JobPositionAPI";
import { useAuth } from "../../contex/AuthContex";
import { InvitationInputs, SearchForUserInputs } from "../../types/Invitation/Invitation";
import { InviteUserToTeam } from "../../api/InvitationAPI";
import Notification from "../Notification/Notification";
import UserSearch from "./SeachForUser";

interface InviteToTeamModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const InviteToTeamModal: React.FC<InviteToTeamModalProps> = ({ isOpen, onClose }) => {
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<InvitationInputs>();
    const { selectedTeam } = useAuth();
    const [notificationMessages, setNotificationMessages] = useState<string[]>([]);
    const [showNotification, setShowNotification] = useState(false);
    const [isError, setIsError] = useState(false);
    const [jobPositions, setJobPositions] = useState<IJobPosition[]>([]);

    useEffect(() => {
        const fetchJobPositions = async () => {
            try {
                if (!selectedTeam?.team.teamId) {
                    return;
                }
                const response = await GetJobPositionsBasedOnTeams(selectedTeam?.team.teamId);
                if (response?.status === 200) {
                    setJobPositions(response.data);
                } 
            } catch (e) {
                console.log(e);
            }
        };
        fetchJobPositions();
    }, [selectedTeam?.team.teamId]);

    const handleUserSelect = (user: SearchForUserInputs) => {
        setValue("name", user.name);
        setValue("surname", user.surname);
        setValue("email", user.email);
    };

    const onSubmit: SubmitHandler<InvitationInputs> = async (data) => {
        try {
            const response = await InviteUserToTeam(data);
            if (response?.status === 200) {
                setNotificationMessages(["Invitation has been sent."]);
                setShowNotification(true);
                setIsError(false);
                setTimeout(() => {
                    reset()
                    onClose()
                    setShowNotification(false);
                },2000)
            }
        } catch (error) {
            setIsError(true);
            setShowNotification(true);
            if (error instanceof Error) {
                setNotificationMessages([error.message]);
            }
            console.error("Error inviting user:", error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="w-[90%] rounded-lg bg-white p-6 shadow-lg">
                <h2 className="mb-4 text-lg font-semibold">Invite to Team</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <UserSearch onSelectUser={handleUserSelect} />
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">Job Position</label>
                        {jobPositions.length === 0 ? (
                            <select disabled className="w-full border border-gray-300 bg-gray-100 px-4 py-2">
                                <option value="">No positions available</option>
                            </select>
                        ) : (
                            <select {...register("jobPositionId", { required: "Job position is required" })} className="w-full rounded-md border px-4 py-2">
                                <option disabled value="">Select a job position</option>
                                {jobPositions.map((job, index) => (
                                    <option key={index} value={job.jobPositionId}>{job.title}</option>
                                ))}
                            </select>
                        )}
                        {errors.jobPositionId && <p className="mt-1 text-sm text-red-500">{errors.jobPositionId.message}</p>}
                    </div>

                    <p className="mt-2 text-sm text-gray-500">
                        Fill in the required fields and click the invitation button. The user will receive an
                        email invitation. After accepting, they will become part of the organization.
                    </p>

                    <div className="mt-4 flex justify-end">
                        <button
                            type="submit"
                            className="mr-2 rounded-md bg-cyan-blue px-4 py-2 text-white hover:bg-cyan-blue-hover"
                        >
                            Invite
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-md bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>

            {showNotification && (
                <Notification
                    messages={notificationMessages}
                    onClose={() => { setShowNotification(false); }}
                    isError={isError}
                />
            )}
        </div>
    );
};

export default InviteToTeamModal;
