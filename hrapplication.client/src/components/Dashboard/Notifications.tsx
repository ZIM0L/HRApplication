import { useEffect, useState } from "react";
import { useAuth } from "../../contex/AppContex";
import { Link } from "react-router-dom";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { IRequest } from "../../types/Request/IRequest";

const Notifications = () => {
    const { teamInformation } = useAuth();
   const [currentPage, setCurrentPage] = useState(1);
    const [messagesPerPage, setMessagesPerPage] = useState(8); 

    const asd: IRequest[] = [
        {
            teamMemberRequestId: "1",
            title: "Request for Time Off",
            requestContent: "I would like to request a day off on March 5th for personal reasons.",
            status: "pending",
            name: "John",
            surname: "Doe",
            email: "ejemplo@ejemplo.mx",
            submittedAt: new Date("2025-01-20T10:00:00Z"),
        },
        {
            teamMemberRequestId: "2",
            title: "Change of Working Hours",
            requestContent: "I am requesting to change my working hours from 9 AM to 3 PM.",
            status: "resolved",
            name: "Jane",
            surname: "Smith",
            email: "ejemplo@ejemplo.mx",
            submittedAt: new Date("2025-01-21T09:30:00Z"),
            alteredAt: new Date("2025-01-22T14:00:00Z"),
        },
        {
            teamMemberRequestId: "3",
            title: "Equipment Request",
            requestContent: "I need a new laptop for my project as the current one is outdated.",
            status: "pending",
            name: "Chris",
            surname: "Johnson",
            email: "ejemplo@ejemplo.mx",
            submittedAt: new Date("2025-01-22T11:15:00Z"),
        },
        {
            teamMemberRequestId: "4",
            title: "Access to New Software",
            requestContent: "Requesting access to Adobe Photoshop for graphic design purposes.",
            status: "resolved",
            name: "Emily",
            surname: "Davis",
            email: "ejemplo@ejemplo.mx",
            submittedAt: new Date("2025-01-23T08:45:00Z"),
            alteredAt: new Date("2025-01-23T12:00:00Z"),
        },
        {
            teamMemberRequestId: "5",
            title: "Conference Attendance",
            requestContent: "I would like to attend the Web Development Conference on February 10th.",
            status: "pending",
            name: "Michael",
            surname: "Brown",
            email: "ejemplo@ejemplo.mx",
            submittedAt: new Date("2025-01-24T13:30:00Z"),
        },
        {
            teamMemberRequestId: "6",
            title: "Remote Work Request",
            requestContent: "I am requesting to work remotely for the next two weeks.",
            status: "resolved",
            name: "Sarah",
            surname: "Miller",
            email: "ejemplo@ejemplo.mx",
            submittedAt: new Date("2025-01-25T10:00:00Z"),
            alteredAt: new Date("2025-01-26T09:00:00Z"),
        },
        {
            teamMemberRequestId: "7",
            title: "Training Request",
            requestContent: "Requesting approval to attend a Python programming course.",
            status: "pending",
            name: "David",
            surname: "Wilson",
            email: "ejemplo@ejemplo.mx",
            submittedAt: new Date("2025-01-26T11:00:00Z"),
        },
        {
            teamMemberRequestId: "8",
            title: "Vacation Request",
            requestContent: "Requesting approval for two weeks of vacation from March 1st to March 14th.",
            status: "resolved",
            name: "Olivia",
            surname: "Martinez",
            email: "ejemplo@ejemplo.mx",
            submittedAt: new Date("2025-01-27T14:30:00Z"),
            alteredAt: new Date("2025-01-28T08:45:00Z"),
        },
        {
            teamMemberRequestId: "9",
            title: "Equipment Upgrade",
            requestContent: "Requesting an upgrade to a dual monitor setup for improved productivity.",
            status: "pending",
            name: "Sophia",
            surname: "Taylor",
            email: "ejemplo@ejemplo.mx",
            submittedAt: new Date("2025-01-28T09:00:00Z"),
        },
        {
            teamMemberRequestId: "10",
            title: "Annual Leave Request",
            requestContent: "I would like to request 3 days of leave for personal reasons in March.",
            status: "resolved",
            name: "Daniel",
            surname: "Anderson",
            email: "ejemplo@ejemplo.mx",
            submittedAt: new Date("2025-01-29T16:00:00Z"),
            alteredAt: new Date("2025-01-30T10:00:00Z"),
        }
    ];
    const notifications = asd;

    useEffect(() => {
        const handleResize = () => {
            const availableHeight = window.innerHeight - 150; // Adjust for header and pagination
            const messageHeight = 120; // Approximate height of each message (you can adjust this as needed)
            setMessagesPerPage(Math.floor(availableHeight / messageHeight));
        };

        window.addEventListener("resize", handleResize);
        handleResize(); 

        // Cleanup
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const totalPages = Math.ceil(notifications.length / messagesPerPage);
    const startIndex = (currentPage - 1) * messagesPerPage;
    const endIndex = startIndex + messagesPerPage;
    const currentMessages = notifications.slice(startIndex, endIndex);

    const goToPreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    return (
        <div className="flex h-full w-full flex-col rounded-lg bg-white p-4 text-sm shadow-md md:w-1/2">
            <div className="mb-3 flex justify-between border-b">
                <p className="mb-2 font-semibold text-gray-800">Request Notifications</p>
                <Link to="../request">
                    <ArrowTopRightOnSquareIcon className="h-5 w-5 transform transition-all duration-300 hover:cursor-pointer hover:text-cyan-blue-hover hover:scale-110" />
                </Link>
            </div>

            <div className="flex flex-grow flex-col">
                {/* Lista wiadomości */}
                <div className="flex-1 flex flex-col gap-4 overflow-hidden py-2">
                    {currentMessages.length > 0 ? (
                        currentMessages.map((message, index) => (
                            <div key={message.teamMemberRequestId} className="border-l-4 flex items-center justify-between pl-2">
                                <div>
                                    <p className="font-medium text-gray-800">
                                        {message.title || `Request #${index + 1}`}
                                    </p>
                                    <span className="text-xs text-gray-500">{message.name} {message.surname}</span>
                                </div>
                                <div className="flex justify-between space-x-4 text-xs text-gray-500">
                                    <span>{new Date(message.submittedAt).toLocaleDateString()}</span>
                                    <span className={`font-semibold text-yellow-500`}>
                                        Pending
                                    </span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-400">No notifications available</p>
                    )}
                </div>

                {/* Paginacja */}
                <div className="mt-4 flex items-center justify-between space-x-2">
                    <button
                        onClick={goToPreviousPage}
                        disabled={currentPage === 1}
                        className={`px-3 py-1 rounded-md transition ${currentPage === 1
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-cyan-blue text-gray-800 hover:bg-cyan-blue-hover"
                            }`}
                    >
                        Previous
                    </button>
                    <span className="text-gray-500">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={goToNextPage}
                        disabled={currentPage === totalPages}
                        className={`px-3 py-1 rounded-md ${currentPage === totalPages
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-cyan-blue text-gray-800 hover:bg-cyan-blue-hover"
                            }`}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>

    );
};

export default Notifications;
