import React, { useState } from "react";
import { EmployeeShiftsAssignment, Shift, TeamMemberShift, TeamMemberShiftsToSend } from "../../types/Shift/Shift";
import { IEmployeeData } from "../../types/User/IUser";
import { useAuth } from "../../contex/AppContex";
import { CreateTeamMemberShifts } from "../../api/TeamAPI";
import Notification from "../Notification/Notification";
import { ITeamInformation } from "../../types/Team/ITeam";


const AssignShiftModal= () => {
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
    const { teamInformation, setTeamInformation, employeeShiftsAssignment, setEmployeeShiftsAssignment } = useAuth()
    const [notificationMessage, setNotificationMessage] = useState<string[]>([]);
    const [showNotification, setShowNotification] = useState(false);
    const [isError, setIsError] = useState(false)

    // Helper function to format date as "dd-MM-yyyy"
    const formatDate = (date: Date): string => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${year}-${month}-${day}`;
    };
    const parseDate = (dateString: string): Date => {
        const [year, month, day] = dateString.split('-').map((part) => parseInt(part, 10));
        return new Date(year, month - 1, day); // Month w obiekcie Date jest 0-indexowany, stąd `month - 1`
    };

    // Helper function to get all dates in a given range
    const getDatesInRange = (startDate: string, endDate: string) => {
        const dates = [];
        const currentDate = new Date(startDate);
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

    const handleAssignShift = async (employee: IEmployeeData) => {
        try {

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
        const newShiftsAssignments = datesToAssign.map((date) => ({
            shift: selectedShift!,
            date: formatDate(parseDate(date)),           
        }));

        const shiftsToSend: TeamMemberShiftsToSend = {
            email: employee.email,
            teamShiftId: selectedShift.teamShiftId,
            teamMemberShiftsDates: newShiftsAssignments.map(x => x.date + "T00:00:00")
        }
        const response = await CreateTeamMemberShifts(shiftsToSend)
        if (response?.status == 200) {
            setNotificationMessage(["Applaying changes..."])
            setIsError(false)
            setShowNotification(true)
            setTimeout(() => {
                setEmployeeShiftsAssignment((prev: EmployeeShiftsAssignment[]) => {

                    const updatedAssignments = prev.map((assignment) => {
                        if (assignment.employee.email === employee.email) {
                            const filteredShifts = assignment.shifts.filter(
                                (existingShift) =>
                                    !datesToAssign.some((newDate) => newDate === existingShift.date)
                            );
                            return {
                                ...assignment,
                                shifts: [...filteredShifts, ...newShiftsAssignments], 
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
                window.location.reload();
            },3500)
        }
        } catch(err) {
            setIsError(true);
            setShowNotification(true);
            if (err instanceof Error) {
                setNotificationMessage(err.message.split(" | "))
            }
        }
    };

    let previewDates: string[] = [];
    if (selectedMode === 'day' && selectedDate) {
        previewDates = [selectedDate];
    } else if (selectedMode === 'range' && selectedRangeStart && selectedRangeEnd) {
        previewDates = getDatesInRange(selectedRangeStart, selectedRangeEnd);
    } else if (selectedMode === 'month') {
        previewDates = getMonthDatesFromToday();
    }
    previewDates = previewDates.filter((date) => !isFreeDay(date));

    return (
        <div className="flex flex-col border p-4 md:space-x-5 md:flex-row">
            <div className="w-1/2">
                <h3 className="mb-6 text-xl font-semibold">Assign Shifts</h3>

                {/* Mode Selection */}
                <div className="mb-6">
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Select Assignment Mode:
                    </label>
                    <div className="flex space-x-4">
                        {['day', 'range', 'month'].map((mode) => (
                            <button
                                key={mode}
                                onClick={() => setSelectedMode(mode)}
                                className={`px-3 py-2 rounded ${selectedMode === mode
                                        ? 'border-2 border-gray-600'
                                        : 'bg-gray-100 hover:bg-gray-200'
                                    }`}
                            >
                                {mode === 'day' && 'Single Day'}
                                {mode === 'range' && 'Custom Date Range'}
                                {mode === 'month' && 'Entire Month'}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Shift Selection */}
                <div className="mb-6">
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Select Shift:
                    </label>
                    <select
                        className="w-full rounded-md border p-2"
                        onChange={(e) =>
                            setSelectedShift(
                                teamInformation?.TeamShifts?.find(
                                    (shift) => shift.teamShiftId === e.target.value
                                ) || null
                            )
                        }
                    >
                        <option value="">Select a Shift</option>
                        {teamInformation?.TeamShifts?.map((shift) => (
                            <option key={shift.teamShiftId} value={shift.teamShiftId}>
                                {shift.shiftStart.slice(0, 5)} - {shift.shiftEnd.slice(0, 5)}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Input Fields Based on Mode */}
                <div className="mb-6">
                    {selectedMode === 'day' && (
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Select Date:
                            </label>
                            <input
                                type="date"
                                className="w-full rounded-md border p-2"
                                onChange={(e) => {
                                    const formattedDate = formatDate(new Date(e.target.value));
                                    setSelectedDate(formattedDate);
                                }}
                            />
                        </div>
                    )}

                    {selectedMode === 'range' && (
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Select Date Range:
                            </label>
                            <div className="flex space-x-4">
                                <input
                                    type="date"
                                    className="w-full rounded-md border p-2"
                                    onChange={(e) => setSelectedRangeStart(e.target.value)}
                                />
                                <input
                                    type="date"
                                    className="w-full rounded-md border p-2"
                                    onChange={(e) => setSelectedRangeEnd(e.target.value)}
                                />
                            </div>
                        </div>
                    )}

                    {selectedMode === 'month' && (
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Select Free Days:
                            </label>
                            <div className="flex flex-wrap gap-4">
                                {Object.keys(freeDays).map((day) => (
                                    <div key={day} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id={day}
                                            checked={freeDays[day]}
                                            onChange={() =>
                                                setFreeDays({
                                                    ...freeDays,
                                                    [day]: !freeDays[day],
                                                })
                                            }
                                            className="mr-2"
                                        />
                                        <label htmlFor={day} className="text-sm">
                                            {day}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                {/* Preview Section */}
                <div className="border-2 mb-6 rounded border-gray-300 bg-gray-200 p-4">
                    <h4 className="mb-4 text-lg font-semibold">Shift Preview</h4>
                    {selectedShift && (
                        <>
                            <p>
                                <span className="font-medium">Shift:</span>{" "}
                                {selectedShift.shiftStart.slice(0, 5)} - {selectedShift.shiftEnd.slice(0, 5)}
                            </p>
                            <p>
                                <span className="font-medium">Date Range:</span>{" "}
                                {previewDates.length > 0
                                    ? `${previewDates[0]} - ${previewDates[previewDates.length - 1]}`
                                    : "No valid range selected"}
                            </p>
                        </>
                    )}
                    {!selectedShift && <p className="text-gray-500">No shift selected.</p>}
                </div>
            </div>
            {/* Assign Shift Buttons */}
            <div className="flex flex-col space-y-4">
                {employeeShiftsAssignment?.map((employee) => (
                    <div
                        key={employee.employee.email}
                        className="flex items-center justify-between space-x-8 rounded-md border border-gray-300 p-4 shadow-sm hover:bg-gray-100"
                    >
                        {/* Employee Name */}
                        <div>
                            <p className="text-sm font-medium text-gray-700">{employee.employee.name}</p>
                            <p className="text-sm font-medium text-gray-700">{employee.employee.surname}</p>
                        </div>

                        {/* Assign Button */}
                        <button
                            onClick={() => handleAssignShift(employee.employee)}
                            className="flex items-center justify-center text-gray-300 transform transition-all duration-200 hover:scale-110  hover:text-gray-600"
                        >
                            Assign
                        </button>
                    </div>
                ))}
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

export default AssignShiftModal;
