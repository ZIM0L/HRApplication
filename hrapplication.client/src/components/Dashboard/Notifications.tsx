import { useEffect, useState } from "react";
import { useAuth } from "../../contex/AppContex";
import { Link } from "react-router-dom";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

const Notifications = () => {
    const { teamInformation } = useAuth();
   const [currentPage, setCurrentPage] = useState(1);
    const [messagesPerPage, setMessagesPerPage] = useState(8); 

    const notifications = teamInformation?.UsersRequests;

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

    const totalPages = Math.ceil(notifications!.length / messagesPerPage);
    const startIndex = (currentPage - 1) * messagesPerPage;
    const endIndex = startIndex + messagesPerPage;
    const currentMessages = notifications!.slice(startIndex, endIndex);

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
                <div className="flex flex-1 flex-col gap-4 overflow-hidden py-2">
                    {currentMessages.length > 0 ? (
                        currentMessages.filter(req => req.status == "pending").map((message, index) => (
                            <div key={message.teamMemberRequestId} className="flex items-center justify-between border-l-4 pl-2">
                                <div>
                                    <p className="font-medium text-gray-800">
                                        {message.title || `Request #${index + 1}`}
                                    </p>
                                    <span className="text-xs text-gray-500">{message.name} {message.surname}</span>
                                </div>
                                <div className="flex justify-between space-x-4 text-xs text-gray-500">
                                    <span>{new Date(message.submittedAt).toLocaleDateString()}</span>
                                    <span className={`font-semibold text-yellow-500`}>
                                        {message.status}
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
                        className={`px-3 py-1 rounded-md text-white ${currentPage === totalPages
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
