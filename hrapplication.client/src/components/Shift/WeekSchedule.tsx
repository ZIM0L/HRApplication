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
        console.log("Employee Assignments in WeekSchedule:", employeeAssignments);
    }, [employeeAssignments]);

    return (
        <div className="container mx-auto p-4">
            <h3 className="mb-4 text-center text-xl font-semibold">Employee Schedule</h3>

            {/* Navigation buttons */}
            <div className="mb-4 text-center">
                <button onClick={goToPrevWeek} className="mr-4 rounded bg-gray-500 p-2 text-white">
                    &lt; Previous Week
                </button>
                <button onClick={goToNextWeek} className="rounded bg-blue-500 p-2 text-white">
                    Next Week &gt;
                </button>
            </div>

            {/* Week Schedule Table */}
            <div className="overflow-x-auto">
                <table className="w-full table-auto border-collapse">
                    <thead>
                        <tr>
                            <th className="min-w-[200] max-w-[220px] border px-4 py-2 text-left text-sm">Employee</th>
                            {weekDates.map((date, index) => (
                                <th key={index} className="border px-4 py-2 text-center">
                                    <p className="text-sm font-bold">
                                        {new Date(date).toLocaleDateString("en-US", { weekday: "short" })}
                                    </p>
                                    <p className="text-xs text-gray-600">{date}</p>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {employeeAssignments.map((assignment) => (
                            <tr key={assignment.employee.email}>
                                <td className="border px-4 py-2 text-sm">{assignment.employee.name}</td>
                                {weekDates.map((date, index) => {
                                    // Używamy funkcji compareDates do porównania
                                    const shift = assignment.shifts.find(shift => compareDates(shift.date, date));
                                    return (
                                        <td
                                            key={index}
                                            className={`border px-4 py-2 text-sm text-center ${shift ? "bg-green-200" : ""}`}
                                        >
                                            {shift ? `${shift.shift.start} - ${shift.shift.end}` : "No Shift"}
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
