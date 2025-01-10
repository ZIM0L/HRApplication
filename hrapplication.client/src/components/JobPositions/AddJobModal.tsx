import { IAddJobPositionInputs } from "../../types/JobPosition/IJobPosition";
import { useForm, SubmitHandler } from "react-hook-form";
import Notification from "../Notification/Notification";
import { useState } from "react";
import { AddJobPosition } from "../../api/JobPositionAPI";
import { useAuth } from "../../contex/AppContex";
import { ITeamInformation } from "../../types/Team/ITeam";

interface AddJobModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AddJobModal: React.FC<AddJobModalProps> = ({ isOpen, onClose }) => {
    const { register, handleSubmit, reset } = useForm<IAddJobPositionInputs>();
    const [notificationMessage, setNotificationMessage] = useState<string[]>([]);
    const [showNotification, setShowNotification] = useState(false);
    const [isError, setIsError] = useState(false)
    const { selectedTeam, setTeamInformation } = useAuth();

    const onSubmit: SubmitHandler<IAddJobPositionInputs> = async (data: IAddJobPositionInputs) => {
        try {
            if (!selectedTeam?.team.teamId) return
            const response = await AddJobPosition(selectedTeam?.team.teamId, data)
            if (response?.status == 200) {
                setIsError(false)
                setShowNotification(true); 
                setNotificationMessage(["New job position was added"])
                setTimeout(() => {
                    setTeamInformation((prev: ITeamInformation) => {
                        return {
                            ...prev,
                            JobPositions: [...prev.JobPositions, response.data], 
                        };
                    });
                    reset()
                    onClose()
                },3500)
            } 

        } catch (err) {
            setIsError(true);
            setShowNotification(true); 
            if (err instanceof Error) {
                setNotificationMessage(err.message.split(" | "))
            }
        }
    };

    if (!isOpen) return null; 

    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
                <div className="w-96 rounded-lg bg-white p-6 shadow-lg">
                    <h2 className="mb-4 text-lg font-semibold">Add Job Position</h2>


                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                        <input
                            {...register("title", { required: "Position name is required.", maxLength: 255 })}
                            type="text"
                            placeholder="Position name"
                            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                        />

                        <textarea
                            {...register("description", { required: "Description is required.", maxLength: 500 })}
                            placeholder="Description"
                            className="h-24 w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                        />

                        <div className="flex items-center space-x-2">
                            <input
                                {...register("isRecruiting")}
                                type="checkbox"
                                id="isRecruiting"
                                className="h-4 w-4"
                                defaultChecked
                            />
                            <label htmlFor="isRecruiting" className="text-sm">
                                Is Recruiting
                            </label>
                        </div>

                        <div className="mt-4 flex justify-end space-x-2">
                            <button
                                type="submit"
                                className="rounded-md bg-blue-600 px-4 py-2 text-white transition-colors duration-200 hover:bg-blue-700"
                            >
                                Add
                            </button>
                            <button
                                type="button"
                                className="rounded-md bg-gray-300 px-4 py-2 text-gray-700 transition-colors duration-200 hover:bg-gray-400"
                                onClick={() => {
                                    reset();
                                    onClose();
                                }}
                            >
                                Close
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            {showNotification && (
                <Notification
                    messages={notificationMessage}
                    onClose={() => setShowNotification(false)}
                    isError={isError}
                />
            )}
        </>
    );
};

export default AddJobModal;
