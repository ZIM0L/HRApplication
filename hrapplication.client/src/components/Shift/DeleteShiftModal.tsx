import React, { useState } from "react";
import { Shift } from "../../types/Shift/Shift";
import Notification from "../Notification/Notification";
import { useAuth } from "../../contex/AppContex";
import { DeleteTeamShift } from "../../api/TeamAPI";
import { ITeamInformation } from "../../types/Team/ITeam";
interface DeleteShiftModalProps {
    isOpen: boolean;
    onClose: () => void;
    shiftToDelete: Shift;
}

const DeleteShiftModal: React.FC<DeleteShiftModalProps> = ({ isOpen, onClose, shiftToDelete }) => {
    const [notificationMessage, setNotificationMessage] = useState<string[]>([]);
    const [showNotification, setShowNotification] = useState(false);
    const [isError, setIsError] = useState(false)
    const { selectedTeam, setTeamInformation} = useAuth()

    if (!isOpen) return null;

    const handleDelete = async () => {
        try {
            if (!selectedTeam) return
            const response = await DeleteTeamShift(shiftToDelete.teamShiftId)
            if (response?.status == 200) {
                setNotificationMessage(["Shift has been deleted"])
                setIsError(false)
                setShowNotification(true)
                setTimeout(() => {
                    setTeamInformation((prev: ITeamInformation) => {
                        return {
                            ...prev,
                            TeamShifts: prev.TeamShifts.filter(shift => shift.teamShiftId !== shiftToDelete.teamShiftId),
                        }
                    })
                    onClose()
                },3500)
            }
        } catch(err) {
            setIsError(true);
            setShowNotification(true);
            if (err instanceof Error) {
                setNotificationMessage(err.message.split(" | "))
            }
        }
    }
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="rounded-lg bg-white p-6 shadow-lg">
                <h2 className="text-lg font-semibold">Confirm Delete</h2>
                <p className="mt-2 text-gray-600">
                    Are you sure you want to delete the shift ? This action cannot be undone.
                </p>
                <div className="mt-4 flex justify-end space-x-2">
                    <button
                        onClick={onClose}
                        className="rounded bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleDelete}
                        className="rounded bg-light-red px-4 py-2 text-white hover:bg-red-600"
                    >
                        Delete
                    </button>
                </div>
            </div>
            {showNotification && (
                <Notification
                    messages={notificationMessage}
                    onClose={() => setShowNotification(false)}
                    isError={isError}
                />
            )}
        </div>
    );
};

export default DeleteShiftModal;
