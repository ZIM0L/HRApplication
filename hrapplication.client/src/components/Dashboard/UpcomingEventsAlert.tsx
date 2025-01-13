import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import { useAuth } from "../../contex/AppContex";
import { Link } from "react-router-dom";

const UpcomingEventsAlert = () => {
    const { teamInformation } = useAuth();

    const upcomingEvents = teamInformation?.CalendarEvents
        ?.filter(event => new Date(event.startDate) > new Date()) 
        .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()) 
        .slice(0, 4); 

    return (
        <div className="h-min-[252px] w-1/2 rounded-lg bg-white p-4 text-sm shadow-md">
            <div className="mb-3 flex justify-between border-b">
                <p className="mb-2 font-semibold text-gray-800">
                    Upcoming events
                </p>
                <Link to="../calendar">
                    <ArrowTopRightOnSquareIcon className="h-5 w-5 transform transition-all duration-300 hover:cursor-pointer hover:text-cyan-blue-hover hover:scale-110" />
                </Link>
            </div>
            {upcomingEvents && upcomingEvents.length > 0 ? (
                <ul className="space-y-2">
                    {upcomingEvents.map(event => (
                        <li
                            key={event.calendareventid}
                            className="flex items-center gap-4 rounded-lg bg-blue-50 p-2 hover:bg-blue-100"
                        >
                            <div>
                                <h3 className="text-md font-semibold">
                                    {event.title}
                                </h3>
                                <p className="text-sm text-gray-600">
                                    {new Date(event.startDate).toLocaleDateString()} {/* Format daty */}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500">No upcoming events.</p>
            )}
        </div>
    );
};

export default UpcomingEventsAlert;
