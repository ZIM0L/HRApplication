import React, { useState } from "react";
import { Shift, ShiftInputs } from "../../types/Shift/Shift";

//temp solution
function uuidv4() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
        (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
    );
}
type AddNewShiftProps = {
    teamShifts: Shift[]; // List of existing shifts
    addNewTeamShift: (newShift: Shift) => void; // Function to add a new shift
};

const AddNewShift: React.FC<AddNewShiftProps> = ({ teamShifts, addNewTeamShift }) => {
    const [customTime, setCustomTime] = useState<ShiftInputs>({ start: "", end: "" });
    const [errorMessage, setErrorMessage] = useState<string>("");

    const handleAddShift = () => {
        const { start, end } = customTime;

        if (!start || !end) {
            setErrorMessage("Both start and end times are required.");
            return;
        }
        const isDuplicate = teamShifts.some(
            (shift) => shift.start === customTime.start && shift.end === customTime.end
        );

        if (isDuplicate) {
            setErrorMessage("This shift already exists.");
            return;
        }
        const newShift: Shift = {
            shiftId: uuidv4(),
            start: customTime.start,
            end: customTime.end,
        };
        setCustomTime({ start: "", end: "" });
        addNewTeamShift(newShift);

        setErrorMessage("");
    };

    return (
        <div className="flex w-full flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
            {/* Left Column: Add New Shift */}
            <div className="w-full md:w-1/3">
                <h3 className="mb-4 text-xl font-semibold">Add New Shift</h3>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Shift Time:</label>
                    <div className="flex space-x-4">
                        <input
                            type="time"
                            value={customTime.start}
                            onChange={(e) => setCustomTime({ ...customTime, start: e.target.value })}
                            className="w-1/2 rounded-md border p-2"
                        />
                        <input
                            type="time"
                            value={customTime.end}
                            onChange={(e) => setCustomTime({ ...customTime, end: e.target.value })}
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
                    {teamShifts.map((shift, index) => (
                        <div
                            key={index}
                            className="min-w-fit rounded-lg border border-gray-300 bg-gray-100 p-4 shadow-sm"
                        >
                            <p className="mb-2 text-sm text-gray-500">Shift {index + 1}</p>
                            <div className="flex items-center justify-between">
                                <div className="mb-2">
                                    <p className="text-sm text-gray-500">Start</p>
                                    <p className="text-lg font-medium text-gray-800">{shift.start}</p>
                                </div>
                                {/* Separator with dots */}
                                <div className="mx-2 text-gray-500">•••</div>
                                <div>
                                    <p className="text-sm text-gray-500">End</p>
                                    <p className="text-lg font-medium text-gray-800">{shift.end}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
};

export default AddNewShift;
