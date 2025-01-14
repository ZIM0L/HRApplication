import React, { useEffect, useState } from "react";
import WeekSchedule from "./WeekSchedule";
import AddNewShift from "./AddNewShift";
import { EmployeeShiftsAssignment, Shift } from "../../types/Shift/Shift";
import AssignShiftModal from "./AssignShiftModal";
import { useAuth } from "../../contex/AppContex";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { ITeamInformation } from "../../types/Team/ITeam";

const Shifts: React.FC = () => {
   
    const [selectedAction, setSelectedAction] = useState("");
    const [employeeShiftsAssignment, setEmployeeShiftsAssignment] = useState<EmployeeShiftsAssignment[]>([])
    const { teamInformation, setTeamInformation } = useAuth()
    const actions = [
        { id: "add-shift", label: "Add Shift" },
        { id: "edit-shift", label: "Edit Shift" },
        { id: "assign-shift", label: "Assign Shifts" },
    ];
    const handleNewTeamShift = (newShift: Shift) => {
        setTeamInformation((prev: ITeamInformation) => {
            return {
                ...prev,
                TeamShifts: [...prev.TeamShifts, newShift]
            }
        })
    };

    useEffect(() => {
        console.log(teamInformation?.TeamMembersShifts)
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
    }, [employeeShiftsAssignment])
    return (
        <div className="h-screen overflow-y-auto bg-gray-100 px-4">
            <div className="border-b-2 flex items-center justify-between">
                <p className="border-b-2 border-dark-blue-ligher py-2 text-start text-xl font-semibold text-gray-800">Employee Schedule</p>
                <div className="group relative">
                    <QuestionMarkCircleIcon className="group-hover:opacity-100 h-7 w-7 cursor-pointer text-gray-500" />
                    <div className="opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto pointer-events-none absolute -right-full mr-4 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-200">
                        <div className="w-96 rounded-lg bg-white p-6 shadow-lg">
                            <div className="mb-4 flex items-center justify-between">
                                <h2 className="text-xl font-semibold">Information</h2>
                                <button className="text-gray-500 hover:text-black">&times;</button>
                            </div>
                            <div>
                                <p>Add Shift: Allows you to add new shifts to the system.</p>
                                <p>Edit Shift: Lets you modify the details of an existing shift.</p>
                                <p>Assign Shifts: Enables you to assign shifts to team members.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="">
                <WeekSchedule employeeAssignments={employeeShiftsAssignment} />
            </div>
            <div className="my-4 flex space-x-1">
                {actions.map((action) => (
                    <div
                        key={action.id}
                        onClick={() => setSelectedAction(action.id)}
                        className={`cursor-pointer border-2 rounded-md border-gray-100 px-2 py-1 text-lg transition-colors hover:text-black hover:border-gray-400  ${selectedAction === action.id
                                ? "border-gray-600 text-black"
                            : "text-gray-500"
                            }`}
                    >
                        {action.label}
                    </div>
                ))}
            </div>

            {/* Display the selected action's content */}
            <div className="mt-4">
                {selectedAction === "add-shift" && (
                    <AddNewShift addNewTeamShift={handleNewTeamShift} />
                )}
                {selectedAction === "edit-shift" && (
                    <div className="rounded border bg-gray-100 p-4">
                        <h3 className="text-lg font-bold">Edit Shift</h3>
                        <p>Select a shift to edit its details.</p>
                        {/* Add your form or functionality here */}
                    </div>
                )}
                {selectedAction === "assign-shift" && (
                    <AssignShiftModal teamUsers={employeeShiftsAssignment} setTeamUsersShifts={setEmployeeShiftsAssignment} />
                )}
                {!selectedAction && (
                    <p className="text-gray-500">Please select an action to perform.</p>
                )}
            </div>
        </div>
    );
};

export default Shifts;
