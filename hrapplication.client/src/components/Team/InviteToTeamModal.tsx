import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { IJobPosition } from "../../types/JobPosition/IJobPosition";
import { GetJobPositionsBasedOnTeams } from "../../api/JobPositionAPI";
import { useAuth } from "../../contex/AuthContex";
import { InvitationInputs } from "../../types/Invitation/Invitation";
import { InviteUserToTeam } from "../../api/InvitationAPI";
import Notification from "../Notification/Notification";

interface InviteToTeamModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const InviteToTeamModal: React.FC<InviteToTeamModalProps> = ({ isOpen, onClose }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<InvitationInputs>();
    const { selectedTeam } = useAuth();
    const [notificationMessages, setNotificationMessages] = useState<string[]>([]); 
    const [showNotification, setShowNotification] = useState(false);
    const [isError, setIsError] = useState(false);
    const [jobPositions, setJobPositions] = useState<IJobPosition[]>([]);

    const onSubmit: SubmitHandler<InvitationInputs> = async (data) => {
        try {
            console.log(data);
            const response = await InviteUserToTeam(data);
            if (response?.status === 200) {
                setNotificationMessages(["Invitation has been sent."]);
                setShowNotification(true);
                setIsError(false);
            }
            reset();
        } catch (error) {
            setIsError(true);
            setShowNotification(true);
            if (error instanceof Error) {
                setNotificationMessages(error.message.split(" | "));  
            }
            console.error("Error inviting user:", error);
        }
    };

    useEffect(() => {
        const fetchJobPositions = async () => {
            try {
                if (!selectedTeam?.team.teamId) {
                    return;
                }
                const response = await GetJobPositionsBasedOnTeams(selectedTeam?.team.teamId);
                if (response?.status === 200) {
                    setJobPositions(response.data);
                } else {
                    throw new Error("Something went wrong");
                }
            } catch (e) {
                console.log(e);
            }
        };
        fetchJobPositions();
    }, [selectedTeam?.team.teamId]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="w-[90%] rounded-lg bg-white p-6 shadow-lg">
                <h2 className="mb-4 text-lg font-semibold">Invite to Team</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Employee ID */}
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">Employee ID</label>
                        <input
                            {...register("userId", { required: "Employee ID is required" })}
                            type="text"
                            placeholder="Enter employee ID"
                            className={`w-full rounded-md border px-4 py-2 ${errors.userId ? "border-red-500" : "border-gray-300"}`}
                        />
                        {errors.userId && <p className="text-sm text-red-500">{errors.userId.message}</p>}
                    </div>

                    {/* First Name */}
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">First Name</label>
                        <input
                            {...register("name", { required: "First name is required", maxLength: 50 })}
                            type="text"
                            placeholder="Enter first name"
                            className={`w-full rounded-md border px-4 py-2 ${errors.name ? "border-red-500" : "border-gray-300"}`}
                        />
                        {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                    </div>

                    {/* Last Name */}
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">Last Name</label>
                        <input
                            {...register("surname", { required: "Last name is required", maxLength: 50 })}
                            type="text"
                            placeholder="Enter last name"
                            className={`w-full rounded-md border px-4 py-2 ${errors.surname ? "border-red-500" : "border-gray-300"}`}
                        />
                        {errors.surname && <p className="text-sm text-red-500">{errors.surname.message}</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
                        <input
                            {...register("email", { required: "Email is required", pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })}
                            type="email"
                            placeholder="Enter email"
                            className={`w-full rounded-md border px-4 py-2 ${errors.email ? "border-red-500" : "border-gray-300"}`}
                        />
                        {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                    </div>

                    {/* Job Position */}
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">Job Position</label>
                        {jobPositions.length === 0 ? (
                            <div>
                                <select disabled className="w-full border border-gray-300 bg-gray-100 px-4 py-2">
                                    <option value="">No positions available</option>
                                </select>
                                <p className="mt-2 text-sm text-red-500">Please add a job position first before inviting a new team member.</p>
                            </div>
                        ) : (
                                <select
                                    {...register("jobPositionId", { required: "Job position is required" })}
                                    className={`w-full rounded-md border px-4 py-2 ${errors.jobPositionId ? "border-red-500" : "border-gray-300"}`}
                            >
                                <option disabled value="">Select a job position</option>
                                {jobPositions.map((job, index) => (
                                    <option key={index} value={job.jobPositionId}>{job.title}</option>
                                ))}
                            </select>
                        )}
                        {errors.jobPositionId && <p className="mt-1 text-sm text-red-500">{errors.jobPositionId.message}</p>}
                    </div>

                    {/* Info Section */}
                    <p className="mt-2 text-sm text-gray-500">
                        Fill in the required fields and click the invitation button. The user will receive an
                        email invitation. After accepting, they will become part of the organization.
                    </p>

                    {/* Buttons */}
                    <div className="mt-4 flex justify-end">
                        <button
                            type="submit"
                            className="mr-2 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
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
