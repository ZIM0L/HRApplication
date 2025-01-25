import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import { useAuth } from "../../contex/AppContex";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const UpcomingEventsAlert = () => {
    const { teamInformation } = useAuth();

    const upcomingEvents = teamInformation?.CalendarEvents
        ?.filter(event => new Date(event.startDate) > new Date())
        .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
        .slice(0, 10); // Display only first 10 events

    const [currentPage, setCurrentPage] = useState(1);
    const [eventsPerPage, setEventsPerPage] = useState(5);

    // Calculate the total number of pages
    const totalPages = Math.ceil(upcomingEvents!.length / eventsPerPage);

    // Slice the events for the current page
    const currentEvents = upcomingEvents!.slice(
        (currentPage - 1) * eventsPerPage,
        currentPage * eventsPerPage
    );

    // Handle page change
    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    // Dynamically calculate the events per page based on the screen height
    useEffect(() => {
        const calculateEventsPerPage = () => {
            const availableHeight = window.innerHeight - 150; // Adjust for header and pagination
            const eventHeight = 120; 
            setEventsPerPage(Math.floor(availableHeight / eventHeight));
        };

        // Recalculate on window resize
        window.addEventListener("resize", calculateEventsPerPage);
        calculateEventsPerPage(); // Initial calculation

        return () => {
            window.removeEventListener("resize", calculateEventsPerPage);
        };
    }, []);

    return (
        <div className="flex h-full flex-col bg-white p-4 text-sm shadow-md md:w-1/2">
            <div className="mb-3 flex justify-between border-b">
                <p className="mb-2 font-semibold text-gray-800">Upcoming Events</p>
                <Link to="../calendar">
                    <ArrowTopRightOnSquareIcon className="h-5 w-5 transform transition-all duration-300 hover:cursor-pointer hover:text-cyan-600 hover:scale-110" />
                </Link>
            </div>

            {/* Event List Container */}
            <div className="flex flex-grow flex-col space-y-4">
                {currentEvents && currentEvents.length > 0 ? (
                    <ul className="space-y-4">
                        {currentEvents.map(event => (
                            <li
                                key={event.calendareventid}
                                className="flex items-center gap-4 rounded-lg bg-blue-50 px-4 py-1 transition-all duration-300 hover:bg-blue-100"
                            >
                                {/* Event Category Indicator */}
                                <div className={"w-1.5 h-1.5 rounded-full bg-gray-500"} />

                                {/* Event Info */}
                                <div className="flex-1">
                                    <h3 className="text-md truncate font-semibold text-gray-800">{event.title}</h3>
                                    <p className="truncate text-sm text-gray-600">{new Date(event.startDate).toLocaleString()}</p>
                                </div>

                                {/* Event Location */}
                                <div className="truncate text-xs text-gray-500">
                                    <p>{event.location}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">No upcoming events.</p>
                )}
            </div>

            {/* Pagination Controls at the bottom */}
            <div className="mt-auto flex items-center justify-between">
                <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className={`px-3 py-1 rounded-md transition-all ${currentPage === 1 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-cyan-blue text-white hover:bg-cyan-blue-hover"}`}
                >
                    Previous
                </button>
                <span className="text-gray-500">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-1 rounded-md transition-all ${currentPage === totalPages ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-cyan-blue text-white hover:bg-cyan-blue-hover"}`}
                >
                    Next
                </button>
            </div>
        </div>

    );
};

export default UpcomingEventsAlert;
