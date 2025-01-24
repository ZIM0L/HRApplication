import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAuth } from "../../contex/AppContex";
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
    const { teamInformation } = useAuth();
    const [notificationMessages, setNotificationMessages] = useState<string[]>([]);
    const [showNotification, setShowNotification] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isDisabledInvite, setIsDisabledInvite] = useState(true);

    useEffect(() => {
        setIsDisabledInvite(teamInformation?.JobPositions.length === 0);
    }, [teamInformation?.JobPositions]);

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
                    reset();
                    onClose();
                    setShowNotification(false);
                }, 2000);
            }
        } catch (error) {
            setIsError(true);
            setShowNotification(true);
            if (error instanceof Error) {
                setNotificationMessages([error.message]);
            }
        }
    };
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="w-[95%] max-w-md rounded-lg bg-white p-6 shadow-lg sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
                <h2 className="mb-4 text-lg font-semibold text-gray-800">Invite to Team</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Wyszukiwanie użytkownika */}
                    <UserSearch onSelectUser={handleUserSelect} />

                    {/* Pozycja w zespole */}
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">Job Position</label>
                        {teamInformation?.JobPositions.length === 0 ? (
                            <select
                                disabled
                                className="w-full cursor-not-allowed rounded-md border border-gray-300 bg-gray-100 px-4 py-2 text-gray-500"
                            >
                                <option value="">No positions available</option>
                            </select>
                        ) : (
                            <select
                                {...register("jobPositionId", { required: "Job position is required" })}
                                className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 focus:border-cyan-500 focus:ring-cyan-500"
                            >
                                <option disabled value="">Select a job position</option>
                                {teamInformation?.JobPositions.map((job, index) => (
                                    <option key={index} value={job.jobPositionId}>
                                        {job.title}
                                    </option>
                                ))}
                            </select>
                        )}
                        {errors.jobPositionId && <p className="mt-1 text-sm text-red-500">{errors.jobPositionId.message}</p>}
                    </div>

                    {/* Dodatkowy tekst informacyjny */}
                    <p className="mt-2 text-sm leading-relaxed text-gray-500">
                        Fill in the required fields and click the invitation button. The user will receive an
                        email invitation. After accepting, they will become part of the organization.
                    </p>

                    {/* Przyciski */}
                    <div className="mt-4 flex flex-col items-center space-y-2 sm:flex-row sm:justify-end sm:space-y-0 sm:space-x-4">
                        <button
                            type="submit"
                            className={`w-full sm:w-auto rounded-md ${isDisabledInvite ? "bg-cyan-blue-hover" : "bg-cyan-blue"} px-6 py-2 text-white hover:bg-cyan-blue-hover`}
                            disabled={isDisabledInvite}
                        >
                            Invite
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="w-full rounded-md bg-gray-300 px-6 py-2 text-gray-700 hover:bg-gray-400 sm:w-auto"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>

            {/* Powiadomienia */}
            {showNotification && (
                <Notification
                    messages={notificationMessages}
                    onClose={() => setShowNotification(false)}
                    isError={isError}
                />
            )}
        </div>
    );

};

export default InviteToTeamModal;
