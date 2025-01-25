import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import { useAuth } from "../../contex/AppContex";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ICalendarEvent } from "../../types/Calendar/ICalendar";

const UpcomingEventsAlert = () => {
    const { teamInformation } = useAuth();

    const fakeCalendarEvents: ICalendarEvent[] = [
        {
            calendareventid: "1",
            title: "Team Meeting",
            description: "Monthly team sync to discuss project progress and goals.",
            category: "Meeting",
            startDate: "2025-02-01T09:00:00",
            endDate: "2025-02-01T10:00:00",
            permission: "Public",
            location: "Conference Room A",
        },
        {
            calendareventid: "2",
            title: "Quarterly Review",
            description: "Review of quarterly performance and business strategy.",
            category: "Review",
            startDate: "2025-02-05T14:00:00",
            endDate: "2025-02-05T16:00:00",
            permission: "Private",
            location: "Main Office",
        },
        {
            calendareventid: "3",
            title: "Product Launch",
            description: "Launch event for the new product release.",
            category: "Launch",
            startDate: "2025-02-10T11:00:00",
            endDate: "2025-02-10T12:30:00",
            permission: "Public",
            location: "Virtual Event",
        },
        {
            calendareventid: "4",
            title: "Team Building",
            description: "Outdoor team-building activities to improve collaboration.",
            category: "Team Building",
            startDate: "2025-02-15T08:00:00",
            endDate: "2025-02-15T17:00:00",
            permission: "Public",
            location: "Park Event Space",
        },
        {
            calendareventid: "5",
            title: "Client Meeting",
            description: "Meeting with client to discuss new partnership opportunities.",
            category: "Meeting",
            startDate: "2025-02-17T10:00:00",
            endDate: "2025-02-17T11:00:00",
            permission: "Private",
            location: "Client's Office",
        },
        {
            calendareventid: "6",
            title: "Leadership Training",
            description: "Training session for senior management on leadership skills.",
            category: "Training",
            startDate: "2025-02-20T09:00:00",
            endDate: "2025-02-20T12:00:00",
            permission: "Private",
            location: "Online",
        },
        {
            calendareventid: "7",
            title: "Annual Conference",
            description: "Annual conference with keynotes, panels, and networking events.",
            category: "Conference",
            startDate: "2025-03-01T08:00:00",
            endDate: "2025-03-01T18:00:00",
            permission: "Public",
            location: "Convention Center",
        },
        {
            calendareventid: "8",
            title: "Design Sprint",
            description: "Collaborative sprint to finalize design prototypes.",
            category: "Workshop",
            startDate: "2025-03-03T09:00:00",
            endDate: "2025-03-03T17:00:00",
            permission: "Private",
            location: "Creative Lab",
        },
        {
            calendareventid: "9",
            title: "Company Retreat",
            description: "Weekend retreat for the entire company to relax and bond.",
            category: "Retreat",
            startDate: "2025-03-10T12:00:00",
            endDate: "2025-03-12T12:00:00",
            permission: "Private",
            location: "Mountain Resort",
        },
        {
            calendareventid: "10",
            title: "End of Year Party",
            description: "Celebration of the year's achievements with food, drinks, and entertainment.",
            category: "Celebration",
            startDate: "2025-12-20T18:00:00",
            endDate: "2025-12-20T22:00:00",
            permission: "Public",
            location: "Company Headquarters",
        }
    ];

    const upcomingEvents = fakeCalendarEvents
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
