import React, { useState } from "react";
import {  ShiftsAssignmentInMonth } from "../../types/Shift/Shift";
import { useAuth } from "../../contex/AppContex";
import { DeleteTeamMemberShift } from "../../api/TeamAPI";
import Notification from "../Notification/Notification";

const DeleteAssignShiftModal: React.FC = () => {
    const { employeeShiftsAssignment, teamInformation, setEmployeeShiftsAssignment } = useAuth(); // Pobranie danych o pracownikach i zmianach
    const [isDeleting, setIsDeleting] = useState(false);
    const [selectedUser, setSelectedUser] = useState<string | null>(null); // Przechowuje wybranego użytkownika


    const [notificationMessage, setNotificationMessage] = useState<string[]>([]);
    const [showNotification, setShowNotification] = useState(false);
    const [isError, setIsError] = useState(false)


    const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedUser(e.target.value);
    };

    const getUserShifts = (email: string) => {
        const userAssignment = employeeShiftsAssignment?.find(
            (assignment) => assignment.employee.email === email
        );

        return userAssignment ? userAssignment.shifts : [];
    };
    const handleDelete = async (shift: ShiftsAssignmentInMonth) => {
        if (!selectedUser) return;
        try {
            const response = await DeleteTeamMemberShift({
                teamShiftId: shift.shift.teamShiftId,
                email: selectedUser,
                date: shift.date + "T00:00:00"
            });
            if (response?.status == 200) {
               
                //@ts-expect-error works
                setEmployeeShiftsAssignment((prev: EmployeeShiftsAssignment[]) => {
                    return prev.map((assignment) => {
                        if (assignment.employee.email === selectedUser) {
                            return {
                                ...assignment,
                                shifts: assignment.shifts.filter((x: ShiftsAssignmentInMonth) => x.date !== shift.date),
                            };
                        }
                        return assignment;
                    });
                });

                setIsError(false)
                setNotificationMessage(["Deleted Assigned shift successfully"])
                setIsDeleting(true);
                setShowNotification(true)
            }
        } catch(err) {
            setIsError(true);
            setShowNotification(true);
            if (err instanceof Error) {
                setNotificationMessage(err.message.split(" | "))
            }
        }

        setIsDeleting(false);
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2 className="mb-4 text-xl font-semibold">Delete Shift</h2>

                {/* Wybór użytkownika */}
                <div className="grid-cols-1 mb-4 grid gap-4 md:grid-cols-1">
                    <div className="w-full md:w-1/2">
                        <label htmlFor="user-select" className="block text-gray-700">Select Employee</label>
                        <select
                            id="user-select"
                            className="w-full rounded-md border border-gray-300 px-4 py-2"
                            onChange={handleUserChange}
                            value={selectedUser || ""}
                        >
                            <option value="" disabled>Select a user</option>
                            {teamInformation?.UserData.filter((user, index, self) =>
                                index === self.findIndex((u) => u.email === user.email)).map(user => (
                                    <option key={user.email} value={user.email}>
                                        {user.name} {user.surname}
                                    </option>
                                ))}
                        </select>
                    </div>

                    {/* Jeśli użytkownik jest wybrany, pokaż zmiany */}
                    {selectedUser && (
                        <div className="w-full space-y-4">
                            <h3 className="mb-4 text-lg font-semibold">Assigned Shifts</h3>
                            <div className="grid-cols-1 grid max-h-96 gap-4 overflow-auto md:grid-cols-2">
                                {getUserShifts(selectedUser).map((shift, key) => (
                                    <div
                                        key={key}
                                        className="flex items-center justify-between rounded-lg border bg-white p-4 shadow-sm"
                                    >
                                        <div>
                                            <span className="block font-semibold text-gray-800">
                                                {shift.shift.shiftStart.slice(0, 5)} - {shift.shift.shiftEnd.slice(0, 5)}
                                            </span>
                                            <span className="text-sm text-gray-500">
                                                {new Date(shift.date).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <button
                                            className="btn btn-danger text-sm"
                                            onClick={() => handleDelete(shift)}
                                            disabled={isDeleting}
                                        >
                                            {isDeleting ? "Deleting..." : "Delete"}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Jeśli nie wybrano żadnej zmiany, pokazujemy komunikat */}
                {!selectedUser && (
                    <p className="text-gray-500">Please select a user to view and delete shifts.</p>
                )}
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

export default DeleteAssignShiftModal;
