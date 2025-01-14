import React, { useState } from "react";
import { Shift, ShiftInputs } from "../../types/Shift/Shift";
import { CreateTeamShift } from "../../api/TeamAPI";
import { useAuth } from "../../contex/AppContex";
import Notification from "../Notification/Notification";
import { XMarkIcon } from "@heroicons/react/24/solid";
import DeleteShiftModal from "./DeleteShiftModal";

type AddNewShiftProps = {
    addNewTeamShift: (newShift: Shift) => void; // Function to add a new shift
};

const AddNewShift: React.FC<AddNewShiftProps> = ({ addNewTeamShift }) => {
    const [customTime, setCustomTime] = useState<ShiftInputs>({ shiftStart: "", shiftEnd: "" });
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [notificationMessage, setNotificationMessage] = useState<string[]>([]);
    const [showNotification, setShowNotification] = useState(false);
    const [isError, setIsError] = useState(false)
    const { selectedTeam, teamInformation } = useAuth()
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [shiftToDelete, setShiftToDelete] = useState<Shift | null>(null); 

    const handleAddShift = async () => {
        try {
            if (!selectedTeam) return
            const { shiftStart, shiftEnd } = customTime;

            if (!shiftStart || !shiftEnd) {
                setErrorMessage("Both start and end times are required.");
                return;
            }
            const isDuplicate = teamInformation?.TeamShifts.some(
                (shift) => shift.shiftStart === customTime.shiftStart && shift.shiftEnd === customTime.shiftEnd
            );

            if (isDuplicate) {
                setErrorMessage("This shift already exists.");
                return;
            }
            const newShift: ShiftInputs = {
                shiftStart: customTime.shiftStart,
                shiftEnd: customTime.shiftEnd,
            };
            const response = await CreateTeamShift(selectedTeam.team.teamId, newShift);
            if (response?.status == 200) {
                setNotificationMessage(["New shift has been added"])
                setIsError(false)
                setShowNotification(true)
                addNewTeamShift(response.data);
            }
            setCustomTime({ shiftStart: "", shiftEnd: "" });

            setErrorMessage("");
        } catch(error) {
            setIsError(true);
            setShowNotification(true);
            if (error instanceof Error) {
                setNotificationMessage(error.message.split(" | "))
            }
        }
    };

    return (
        <>
            <div className="flex w-full flex-col space-y-4 border p-4 md:flex-row md:space-y-0 md:space-x-4">
                {/* Left Column: Add New Shift */}
                <div className="w-full md:w-1/3">
                    <h3 className="mb-4 text-xl font-semibold">Add New Shift</h3>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Shift Time:</label>
                        <div className="flex space-x-4">
                            <input
                                type="time"
                                value={customTime.shiftStart}
                                onChange={(e) => setCustomTime({ ...customTime, shiftStart: e.target.value })}
                                className="w-1/2 rounded-md border p-2"
                            />
                            <input
                                type="time"
                                value={customTime.shiftEnd}
                                onChange={(e) => setCustomTime({ ...customTime, shiftEnd: e.target.value })}
                                className="w-1/2 rounded-md border p-2"
                            />
                        </div>
                    </div>
                    <button
                        onClick={handleAddShift}
                        className="w-full rounded-md bg-cyan-blue py-2 text-white hover:bg-cyan-blue-hover"
                    >
                        Add Shift
                    </button>

                    {errorMessage && <div className="mb-4 text-red-600">{errorMessage}</div>}
                </div>

                {/* Right Column: Display Existing Shifts */}
                <div className="w-full md:w-2/3">
                    <h4 className="mb-4 text-lg font-semibold">Existing Shifts</h4>
                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                        {teamInformation?.TeamShifts.map((shift, index) => (
                            <div
                                key={shift.teamShiftId}
                                className="min-w-fit rounded-lg border border-gray-300 bg-gray-100 p-4 shadow-sm"
                            >
                                <div className="mb-4 flex items-end justify-between">
                                    <span className="text-sm text-gray-500">Shift {index + 1}</span>
                                    <XMarkIcon onClick={() => {setShiftToDelete(shift); setDeleteModalOpen(true)}} className="h-5 w-5 cursor-pointer" />
                                </div>
                                <div className="flex justify-between">
                                    <div className="mb-2">
                                        <p className="text-sm text-gray-500">Start</p>
                                        <p className="text-lg font-medium text-gray-800">{shift.shiftStart.slice(0,5)}</p>
                                    </div>
                                    {/* Separator with dots */}
                                    <div className="mx-2 text-gray-500">•••</div>
                                    <div>
                                        <p className="text-sm text-gray-500">End</p>
                                        <p className="text-lg font-medium text-gray-800">{shift.shiftEnd.slice(0, 5)}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {showNotification && (
                <Notification
                    messages={notificationMessage}
                    onClose={() => setShowNotification(false)}
                    isError={isError}
                />
            )}
            {/* Modal usunięcia */}
            {deleteModalOpen && (
                <DeleteShiftModal
                    isOpen={deleteModalOpen}
                    onClose={() => setDeleteModalOpen(false)}
                    shiftToDelete={shiftToDelete!}
                />
            )}
        </>
    );
};

export default AddNewShift;
