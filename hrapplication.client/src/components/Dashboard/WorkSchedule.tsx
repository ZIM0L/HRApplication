import { ClockIcon } from '@heroicons/react/24/solid';
import React from 'react';

const WorkSchedule = () => {
    const weekSchedule = [
        { date: '01-Dec-2024', day: 'Mon', status: 'Absent', hours: '9:00 AM - 6:00 PM' },
        { date: '02-Dec-2024', day: 'Tue', status: 'Working', hours: '9:00 AM - 6:00 PM' },
        { date: '03-Dec-2024', day: 'Wed', status: 'Absent', hours: '9:00 AM - 6:00 PM' },
        { date: '04-Dec-2024', day: 'Thu', status: 'Working', hours: '9:00 AM - 6:00 PM' },
        { date: '05-Dec-2024', day: 'Fri', status: 'Weekend', hours: '9:00 AM - 6:00 PM' },
        { date: '06-Dec-2024', day: 'Sat', status: 'Working', hours: '9:00 AM - 6:00 PM' },
        { date: '07-Dec-2024', day: 'Sun', status: 'Weekend', hours: '9:00 AM - 6:00 PM' },
    ];

    const statusColors = {
        Absent: 'bg-red-500',
        Working: 'bg-green-500',
        Weekend: 'bg-yellow-500'
    };

    return (
        <div className="bg-gray-100">
            <div className=" rounded-lg bg-white p-4 shadow-lg">
                <div className=" mb-4 border-b">
                    <div className="flex items-center space-x-2">
                        <ClockIcon className="h-6 w-6" />
                        <p className=" text-start text-xl">Work Schedule</p>
                    </div>
                    <p className="text-md mb-3 text-start text-gray-500">{weekSchedule[0].date} - {weekSchedule[6].date} </p>
                </div>
                <div className="grid-cols-7 grid gap-4">
                    {weekSchedule.map((day, index) => (
                        <div key={index} className="flex flex-col items-center justify-between rounded-lg border p-3">
                            <span className="font-semibold">{day.day}</span>
                            
                            {day.hours && <span className="mt-2 text-xs text-gray-600">{day.hours}</span>}
                            <p className="mt-2 text-sm text-gray-600">Hours Worked</p>
                            <p>8:00 Hrs</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WorkSchedule;
