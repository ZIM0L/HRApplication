import React from 'react';

const WorkSchedule = () => {
    const weekSchedule = [
        { date: '01-Dec-2024', day: 'Mon', status: 'Absent', hours: '' },
        { date: '02-Dec-2024', day: 'Tue', status: 'Working', hours: '9:00 AM - 6:00 PM' },
        { date: '03-Dec-2024', day: 'Wed', status: 'Absent', hours: '' },
        { date: '04-Dec-2024', day: 'Thu', status: 'Working', hours: '9:00 AM - 6:00 PM' },
        { date: '05-Dec-2024', day: 'Fri', status: 'Weekend', hours: '' },
        { date: '06-Dec-2024', day: 'Sat', status: 'Working', hours: '9:00 AM - 6:00 PM' },
        { date: '07-Dec-2024', day: 'Sun', status: 'Weekend', hours: '' },
    ];

    const statusColors = {
        Absent: 'bg-red-500',
        Working: 'bg-green-500',
        Weekend: 'bg-yellow-500'
    };

    return (
        <div className="bg-gray-100 p-6">
            <div className="mx-auto max-w-4xl rounded-lg bg-white p-4 shadow-lg">
                <h2 className="mb-4 text-center text-2xl font-semibold">Work Schedule</h2>
                <div className="grid-cols-7 grid gap-4">
                    {weekSchedule.map((day, index) => (
                        <div key={index} className="flex flex-col items-center rounded-lg border p-4">
                            <span className="text-sm font-semibold">{day.day}</span>
                            <span className="text-lg">{day.date}</span>
                            <div className={`mt-2 px-4 py-2 rounded-lg text-white ${statusColors[day.status]}`}>
                                {day.status}
                            </div>
                            {day.hours && <span className="mt-2 text-sm text-gray-600">{day.hours}</span>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WorkSchedule;
