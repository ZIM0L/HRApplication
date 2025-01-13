import React, { useState } from "react";
import { Shift, ShiftInputs } from "../../types/Shift/Shift";

// Helper function to convert a time string (HH:MM) into a Date object
const convertTo24HourFormat = (time: string): Date => {
    const [hours, minutes] = time.split(":").map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0); // Set time in 24-hour format
    return date;
};
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
        <div className="w-1/2">
            <h3 className="mb-4 text-xl font-semibold">Add New Shift</h3>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Shift Time:</label>
                <div className="flex space-x-4">
                    <input
                        type="time"
                        value={customTime.start}
                        onChange={(e) => setCustomTime({ ...customTime, start: e.target.value })}
                        className="p-2 w-1/2 border rounded-md"
                    />
                    <input
                        type="time"
                        value={customTime.end}
                        onChange={(e) => setCustomTime({ ...customTime, end: e.target.value })}
                        className="p-2 w-1/2 border rounded-md"
                    />
                </div>
            </div>

            {errorMessage && <div className="mb-4 text-red-600">{errorMessage}</div>}

            <button
                onClick={handleAddShift}
                className="w-full rounded-md bg-green-500 py-2 text-white hover:bg-green-600"
            >
                Add Shift
            </button>

            {/* Display the added shifts */}
            <div className="mt-6">
                <h4 className="mb-4 text-lg font-semibold">Existing Shifts</h4>
                {teamShifts.map((shift, index) => (
                    <div key={index} className="shift-item mb-2 rounded-md border p-4">
                        <div className="shift-time">
                            <span className="font-semibold">Start:</span> {shift.start}
                        </div>
                        <div className="shift-time">
                            <span className="font-semibold">End:</span> {shift.end}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AddNewShift;
