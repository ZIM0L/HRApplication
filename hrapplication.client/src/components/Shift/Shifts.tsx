import React, { useEffect, useState } from "react";
import WeekSchedule from "./WeekSchedule";
import AddNewShift from "./AddNewShift";
import { EmployeeShiftsAssignment, Shift } from "../../types/Shift/Shift";
import AssignShiftModal from "./AssignShiftModal";
import { useAuth } from "../../contex/AppContex";

const Shifts: React.FC = () => {
   
    const [selectedAction, setSelectedAction] = useState("");
    const [teamShifts, setTeamShifts] = useState<Shift[]>([])
    const [employeeShiftsAssignment, setEmployeeShiftsAssignment] = useState<EmployeeShiftsAssignment[]>([])
    const { teamInformation } = useAuth()
    const actions = [
        { id: "add-shift", label: "Add Shift" },
        { id: "edit-shift", label: "Edit Shift" },
        { id: "assign-shift", label: "Assign Shifts" },
    ];
    const handleNewTeamShift = (newShift: Shift) => {
        setTeamShifts((prev) => {
            return [...prev, newShift]; 
        });
    };

    useEffect(() => {
        if (teamInformation?.UserData) {
            const updatedEmployeeAssignments = teamInformation.UserData.map(user => {
                const userShiftsAssignment: EmployeeShiftsAssignment = {
                    employee: user,
                    shifts: [],
                };
                return userShiftsAssignment;
            });
            const distinctAssignments = updatedEmployeeAssignments.filter(
                (assignment, index, self) =>
                    index === self.findIndex(a => a.employee.email === assignment.employee.email)
            );

            setEmployeeShiftsAssignment(distinctAssignments);
        }
        }, [teamInformation?.UserData])

    useEffect(() => {
        console.log("Updated employeeShiftsAssignment:", employeeShiftsAssignment);
    }, [employeeShiftsAssignment])
    return (
        <div className="overflow-y-auto px-4">
            <div className="">
                <WeekSchedule employeeAssignments={employeeShiftsAssignment} />
            </div>
            <div className="my-4 flex space-x-5">
                {actions.map((action) => (
                    <div
                        key={action.id}
                        onClick={() => setSelectedAction(action.id)}
                        className={`cursor-pointer rounded px-4 py-2 text-white ${selectedAction === action.id
                                ? "bg-blue-700"
                                : "bg-blue-500 hover:bg-blue-600"
                            }`}
                    >
                        {action.label}
                    </div>
                ))}
            </div>

            {/* Display the selected action's content */}
            <div className="mt-4">
                {selectedAction === "add-shift" && (
                    <AddNewShift teamShifts={teamShifts} addNewTeamShift={handleNewTeamShift} />
                )}
                {selectedAction === "edit-shift" && (
                    <div className="rounded border bg-gray-100 p-4">
                        <h3 className="text-lg font-bold">Edit Shift</h3>
                        <p>Select a shift to edit its details.</p>
                        {/* Add your form or functionality here */}
                    </div>
                )}
                {selectedAction === "assign-shift" && (
                    <AssignShiftModal teamUsers={employeeShiftsAssignment} availableShifts={teamShifts} setTeamUsersShifts={setEmployeeShiftsAssignment} />
                )}
                {!selectedAction && (
                    <p className="text-gray-500">Please select an action to perform.</p>
                )}
            </div>
        </div>
    );
};

export default Shifts;
