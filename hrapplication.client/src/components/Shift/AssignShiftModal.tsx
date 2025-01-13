import React, { useState } from "react";
import { EmployeeShiftsAssignment, Shift, ShiftsAssignmentInMonth } from "../../types/Shift/Shift";
import { IEmployeeData } from "../../types/User/IUser";

type AssignShiftModalProps = {
    teamUsers?: EmployeeShiftsAssignment[];
    availableShifts?: Shift[];
    setTeamUsersShifts: (newAssignments: EmployeeShiftsAssignment[]) => void;
};

const AssignShiftModal: React.FC<AssignShiftModalProps> = ({ teamUsers, availableShifts, setTeamUsersShifts }) => {
    const [selectedMode, setSelectedMode] = useState<'day' | 'range' | 'month'>('day');
    const [selectedShift, setSelectedShift] = useState<Shift | null>(null);
    const [selectedDate, setSelectedDate] = useState<string>(''); // For single day
    const [selectedRangeStart, setSelectedRangeStart] = useState<string>(''); // For date range
    const [selectedRangeEnd, setSelectedRangeEnd] = useState<string>(''); // For date range
    const [freeDays, setFreeDays] = useState<{ [key: string]: boolean }>({
        Monday: false,
        Tuesday: false,
        Wednesday: false,
        Thursday: false,
        Friday: false,
        Saturday: false,
        Sunday: false,
    });

    // Helper function to format date as "dd-MM-yyyy"
    const formatDate = (date: Date): string => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    // Helper function to get all dates in a given range
    const getDatesInRange = (startDate: string, endDate: string) => {
        const dates = [];
        let currentDate = new Date(startDate);
        const end = new Date(endDate);

        while (currentDate <= end) {
            dates.push(formatDate(new Date(currentDate))); // Use custom format
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return dates;
    };

    // Helper function to check if a day is a free day
    const isFreeDay = (date: string) => {
        const dayOfWeek = new Date(date).toLocaleString('en-US', { weekday: 'long' });
        return freeDays[dayOfWeek] === true;
    };

    // Function to handle "Entire Month" logic
    const getMonthDatesFromToday = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth(); // Current month (0-based index)

        // Calculate the last day of the current month
        const lastDay = new Date(year, month + 1, 0).getDate();

        // Start from today and go till the last day of the month
        const datesToAssign = [];
        for (let i = today.getDate(); i <= lastDay; i++) {
            today.setDate(i);
            datesToAssign.push(formatDate(today)); // Use custom format
        }

        return datesToAssign;
    };

    const handleAssignShift = (employee: IEmployeeData) => {
        if (!selectedShift) {
            return;
        }

        let datesToAssign: string[] = [];

        // Ustal daty w zależności od wybranego trybu
        if (selectedMode === 'day' && selectedDate) {
            datesToAssign = [selectedDate]; // Tylko wybrana data
        }

        if (selectedMode === 'range' && selectedRangeStart && selectedRangeEnd) {
            datesToAssign = getDatesInRange(selectedRangeStart, selectedRangeEnd); // Zakres dat
        }

        if (selectedMode === 'month') {
            datesToAssign = getMonthDatesFromToday(); // Wszystkie daty od dziś do końca miesiąca
        }

        // Filtracja dni wolnych
        datesToAssign = datesToAssign.filter((date) => {
            const isDayFree = isFreeDay(date);
            return !isDayFree;
        });

        if (datesToAssign.length === 0) {
            return;
        }

        // Tworzenie przypisań zmian na wybrane daty
        const newShiftsAssignments = datesToAssign.map((date) => ({
            shift: selectedShift!, // Wybrana zmiana
            date: date,            // Dla każdej daty
        }));

        // Aktualizacja stanu zespołu
        setTeamUsersShifts((prev: EmployeeShiftsAssignment[]) => {
            console.log("Previous state:", prev);

            const updatedAssignments = prev.map((assignment) => {
                if (assignment.employee.email === employee.email) {
                    // Nadpisz zmiany dla tych samych dat
                    const filteredShifts = assignment.shifts.filter(
                        (existingShift) => !datesToAssign.includes(existingShift.date)
                    );

                    return {
                        ...assignment,
                        shifts: [...filteredShifts, ...newShiftsAssignments], // Nadpisz daty nowymi zmianami
                    };
                }
                return assignment; // Nie zmieniaj innych pracowników
            });

            // Jeśli pracownik nie istnieje w `teamUsers`, dodaj go jako nowy element
            const isEmployeeInList = prev.some(
                (assignment) => assignment.employee.email === employee.email
            );

            if (!isEmployeeInList) {
                updatedAssignments.push({
                    employee: employee, // Nowy pracownik
                    shifts: newShiftsAssignments, // Nowe przypisania
                });
            }

            return updatedAssignments; // Zwróć zaktualizowaną listę
        });
    };



    return (
        <div className="p-6">
            {/* Mode selection */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Select Assignment Mode:</label>
                <div className="flex space-x-4">
                    <button
                        onClick={() => setSelectedMode('day')}
                        className={`btn ${selectedMode === 'day' ? 'bg-blue-700' : 'bg-blue-500'}`}
                    >
                        Single Day
                    </button>
                    <button
                        onClick={() => setSelectedMode('range')}
                        className={`btn ${selectedMode === 'range' ? 'bg-blue-700' : 'bg-blue-500'}`}
                    >
                        Custom Date Range
                    </button>
                    <button
                        onClick={() => setSelectedMode('month')}
                        className={`btn ${selectedMode === 'month' ? 'bg-blue-700' : 'bg-blue-500'}`}
                    >
                        Entire Month
                    </button>
                </div>
            </div>

            {/* Shift Selection */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Select Shift:</label>
                <select
                    className="rounded-md border p-2"
                    onChange={(e) => setSelectedShift(availableShifts?.find(shift => shift.shiftId === e.target.value) || null)}
                >
                    <option value="">Select a Shift</option>
                    {availableShifts?.map((shift) => (
                        <option key={shift.shiftId} value={shift.shiftId}>
                            {shift.start} - {shift.end}
                        </option>
                    ))}
                </select>
            </div>

            {/* Single Day Input */}
            {selectedMode === 'day' && (
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Select Date:</label>
                    <input
                        type="date"
                        className="rounded-md border p-2"
                        onChange={(e) => {
                            const formattedDate = formatDate(new Date(e.target.value)); // Formatowanie daty
                            setSelectedDate(formattedDate);
                        }}
                    />
                </div>
            )}

            {/* Date Range Input */}
            {selectedMode === 'range' && (
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Select Date Range:</label>
                    <div className="flex space-x-4">
                        <input
                            type="date"
                            className="rounded-md border p-2"
                            onChange={(e) => setSelectedRangeStart(e.target.value)}
                        />
                        <input
                            type="date"
                            className="rounded-md border p-2"
                            onChange={(e) => setSelectedRangeEnd(e.target.value)}
                        />
                    </div>
                </div>
            )}

            {/* Free Days Selection (Only available for Entire Month) */}
            {selectedMode === 'month' && (
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Select Free Days:</label>
                    <div className="flex space-x-4">
                        {Object.keys(freeDays).map((day) => (
                            <div key={day} className="flex items-center">
                                <input
                                    type="checkbox"
                                    id={day}
                                    checked={freeDays[day]}
                                    onChange={() => setFreeDays({ ...freeDays, [day]: !freeDays[day] })}
                                    className="mr-2"
                                />
                                <label htmlFor={day} className="text-sm">{day}</label>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Assign Shift Button */}
            <div>
                {teamUsers?.map((employee) => (
                    <button
                        key={employee.employee.email}
                        onClick={() => handleAssignShift(employee.employee)}
                        className="w-full rounded-md bg-green-500 py-2 text-white hover:bg-green-600 mb-2"
                    >
                        Assign Shift to {employee.employee.name}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default AssignShiftModal;
