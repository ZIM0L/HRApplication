import { useEffect, useState } from "react";
import { EmployeeShiftsAssignment } from "../../types/Shift/Shift";
import { useAuth } from "../../contex/AppContex";
import { ClockIcon } from "@heroicons/react/24/solid";

const WeekSchedule = () => {
    const [currentWeek, setCurrentWeek] = useState(new Date());
    const { teamInformation, decodedToken, employeeShiftsAssignment, setEmployeeShiftsAssignment } = useAuth();

    const getStartOfWeek = (date: Date): Date => {
        const day = date.getDay() || 7;
        const startOfWeek = new Date(date);
        startOfWeek.setDate(startOfWeek.getDate() - day + 1);
        return startOfWeek;
    };

    const getWeekDates = (startDate: Date): string[] => {
        const weekDates: string[] = [];
        for (let i = 0; i < 7; i++) {
            const currentDate = new Date(startDate);
            currentDate.setDate(startDate.getDate() + i);
            weekDates.push(currentDate.toISOString().split("T")[0]);
        }
        return weekDates;
    };

    const goToPrevWeek = () => {
        const prevWeek = new Date(currentWeek);
        prevWeek.setDate(currentWeek.getDate() - 7);
        setCurrentWeek(prevWeek);
    };

    const goToNextWeek = () => {
        const nextWeek = new Date(currentWeek);
        nextWeek.setDate(currentWeek.getDate() + 7);
        setCurrentWeek(nextWeek);
    };

    const startOfWeek = getStartOfWeek(new Date(currentWeek));
    const weekDates = getWeekDates(startOfWeek);

    const compareDates = (shiftDate: string, weekDate: string): boolean => {
        return shiftDate === weekDate;
    };

    useEffect(() => {
        if (!teamInformation?.TeamMembersShifts || teamInformation.TeamMembersShifts.length === 0) return;
        if (teamInformation?.UserData) {
            const updatedEmployeeAssignments = teamInformation.UserData.map(user => {
                const userShifts = teamInformation.TeamMembersShifts
                    .filter(shift => shift.email === user.email)
                    .map(shift => ({
                        shift: {
                            teamShiftId: shift.teamShiftId,
                            shiftStart: shift.startShift,
                            shiftEnd: shift.endShift,
                        },
                        date: shift.shiftDate.split("T")[0],
                    }));
                const userShiftsAssignment: EmployeeShiftsAssignment = {
                    employee: user,
                    shifts: userShifts,
                };

                return userShiftsAssignment;
            });

            const distinctAssignments = updatedEmployeeAssignments.filter(
                (assignment, index, self) =>
                    index === self.findIndex(a => a.employee.email === assignment.employee.email)
            );
            setEmployeeShiftsAssignment(distinctAssignments);
        }
    }, [teamInformation]);

    return (
        <div className="h-fit rounded-xl bg-white p-2 shadow-lg">
            {/* Work Schedule Title */}
            <div className="flex items-center justify-between text-lg font-semibold text-gray-800">
                <div className="flex items-center space-x-2">
                    <ClockIcon className="h-6 w-6" />
                    <span>Work Schedule</span>
                </div>
                <span className="text-sm text-gray-500">
                    {new Date(weekDates[0]).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} -
                    {new Date(weekDates[6]).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </span>
            </div>

            {/* Navigation buttons */}
            <div className="mt-4 flex justify-between">
                <button
                    onClick={goToPrevWeek}
                    className="border-2 rounded-md  px-2 py-1 text-lg text-gray-500 transition-colors hover:text-black hover:border-gray-400"
                >
                    &lt; Previous Week
                </button>
                <button
                    onClick={goToNextWeek}
                    className="border-2 rounded-md  px-2 py-1 text-lg text-gray-500 transition-colors hover:text-black hover:border-gray-400"
                >
                    Next Week &gt;
                </button>
            </div>

            {/* Week Schedule Table */}
            <table className="mt-4 w-full table-auto border-collapse">
                <thead className="bg-gray-100">
                    <tr>
                        {weekDates.map((date, index) => (
                            <th key={index} className="border border-1 border-gray-400 px-2 py-3 text-center text-sm text-gray-700">
                                <p className="font-semibold text-gray-700">
                                    {new Date(date).toLocaleDateString("en-US", { weekday: "short" })}
                                </p>
                                <p className="text-xs text-gray-500">{date}</p>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {employeeShiftsAssignment!
                        .filter(shift => shift.employee.email === decodedToken?.email)
                        .map((assignment) => (
                            <tr key={assignment.employee.email} className="hover:bg-gray-50">
                                {weekDates.map((date, index) => {
                                    const shift = assignment.shifts.find(s => compareDates(s.date, date));
                                    return (
                                        <td
                                            key={index}
                                            className={`border border-1 border-gray-400 text-center px-2 py-3 text-sm ${shift ? "bg-green-200" : ""}`}
                                        >
                                            {shift
                                                ? `${shift.shift.shiftStart.slice(0, 5)} - ${shift.shift.shiftEnd.slice(0, 5)}`
                                                : "No Shift"}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default WeekSchedule;
