import React, { useEffect, useState } from "react";
import { EmployeeShiftsAssignment } from "../../types/Shift/Shift";

interface WeekScheduleProps {
    employeeAssignments: EmployeeShiftsAssignment[];
}

const WeekSchedule: React.FC<WeekScheduleProps> = ({ employeeAssignments }) => {
    const [currentWeek, setCurrentWeek] = useState(new Date());

    // Get the start date of the week (Monday)
    const getStartOfWeek = (date: Date): Date => {
        const day = date.getDay() || 7; // Get day of the week (1-7, where 1 = Monday)
        return new Date(date.setDate(date.getDate() - day + 1)); // Set to Monday
    };

    // Generate the dates for the current week
    const getWeekDates = (startDate: Date) => {
        const weekDates: string[] = [];
        for (let i = 0; i < 7; i++) {
            const currentDate = new Date(startDate);
            currentDate.setDate(startDate.getDate() + i);
            weekDates.push(currentDate.toISOString().split("T")[0]); // Format as YYYY-MM-DD
        }
        return weekDates;
    };

    const goToPrevWeek = () => {
        setCurrentWeek(new Date(currentWeek.setDate(currentWeek.getDate() - 7)));
    };

    const goToNextWeek = () => {
        setCurrentWeek(new Date(currentWeek.setDate(currentWeek.getDate() + 7)));
    };

    const startOfWeek = getStartOfWeek(new Date(currentWeek));
    const weekDates = getWeekDates(startOfWeek);

    const compareDates = (shiftDate: string, weekDate: string): boolean => {
        const shiftDateObj = new Date(shiftDate.split('-').reverse().join('-'));
        const weekDateObj = new Date(weekDate);
        return shiftDateObj.getTime() === weekDateObj.getTime();
    };
    useEffect(() => {
    }, [employeeAssignments]);

    return (
        <div className=" mt-4 flex flex-col space-y-4">
            <div className="flex flex-col space-y-4">
                {/* Navigation buttons */}
                <div className="flex justify-start space-x-4">
                    <button
                        onClick={goToPrevWeek}
                        className="border-2 rounded-md border-gray-100 px-2 py-1 text-lg text-gray-500 transition-colors hover:text-black hover:border-gray-400"
                    >
                        &lt; Previous Week
                    </button>
                    <button
                        onClick={goToNextWeek}
                        className="border-2 rounded-md border-gray-100 px-2 py-1 text-lg text-gray-500 transition-colors hover:text-black hover:border-gray-400"
                    >
                        Next Week &gt;
                    </button>
                </div>
            </div>

            {/* Week Schedule Table */}
            <div className="overflow-x-auto rounded-lg bg-white shadow-md">
                <table className="w-full table-auto border-collapse">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="min-w-[200px] max-w-[220px] border px-4 py-2 text-left text-sm font-medium text-gray-600">
                                Employees
                            </th>
                            {weekDates.map((date, index) => (
                                <th key={index} className="border text-center text-sm text-gray-600">
                                    <p className="font-bold text-gray-700">
                                        {new Date(date).toLocaleDateString("en-US", { weekday: "short" })}
                                    </p>
                                    <p className="text-xs text-gray-500">{date}</p>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {employeeAssignments.map((assignment) => (
                            <tr key={assignment.employee.email} className="hover:bg-gray-50">
                                <td className="border px-4 py-3 text-sm font-medium text-gray-800">
                                    {assignment.employee.name}
                                </td>
                                {weekDates.map((date, index) => {
                                    // Używamy funkcji compareDates do porównania
                                    const shift = assignment.shifts.find((shift) => compareDates(shift.date, date));
                                    return (
                                        <td
                                            key={index}
                                            className={`border px-4 py-3 text-sm text-center ${shift ? "bg-green-200" : ""}`}
                                        >
                                            {shift ? `${shift.shift.shiftStart.slice(0, 5)} - ${shift.shift.shiftEnd.slice(0, 5)}` : "No Shift"}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    );
};

export default WeekSchedule;
