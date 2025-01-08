import { useState } from "react";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import { AcceptInvitation } from "../../api/InvitationAPI";
import Notification from "./Notification";
import { useAuth } from "../../contex/AuthContex";

interface NotificationModalProps {
    isOpen: boolean; 
    onClose: () => void;
}
const NotificationModal: React.FC<NotificationModalProps> = ({
    isOpen,
    onClose,
}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const invitationsPerPage = 5;
    const [notificationMessage, setNotificationMessage] = useState<string[]>([]);
    const [showNotification, setShowNotification] = useState(false);
    const [isError, setIsError] = useState(false)
    const { notifications, getUserInvitations } = useAuth()


    const AcceptInvitationHandle = async (invitaitonId: string, jobPositionId: string) => {
        const result = await AcceptInvitation({
            invitaitonId: invitaitonId,
            jobPositionId: jobPositionId
        });

        if (result?.status === 200) {
            setShowNotification(true);
            setIsError(false);
            setNotificationMessage(["You joined a new team"]);
        }

        setTimeout(() => {
            getUserInvitations()
            onClose();  
        },3500)
    };


    if (!isOpen) return null;

    const totalInvitations = notifications?.Invitations?.length || 0;
    const totalPages = Math.ceil(totalInvitations / invitationsPerPage);
    const currentInvitations = notifications?.Invitations?.slice(
        (currentPage - 1) * invitationsPerPage,
        currentPage * invitationsPerPage
    ) || [];

    const handlePageChange = (direction: "next" | "prev") => {
        if (direction === "next" && currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        } else if (direction === "prev" && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="h-3/4 w-3/4 rounded-lg bg-white p-6 shadow-lg transition-all duration-500">
                <div className="flex h-full flex-col">
                    {totalInvitations > 0 &&
                        <h2 className="py-2 text-xl font-semibold">Incoming team invitations</h2>}   
                    <div className="flex-grow overflow-y-auto">
                        {totalInvitations > 0 ? (
                            currentInvitations.map((invitation, key) => (
                                <div
                                    key={key}
                                    className="mb-2 flex items-center justify-between gap-4 overflow-hidden rounded-sm border shadow-sm"
                                >
                                    <div className="flex h-[80px] items-center bg-blue-100 px-4 py-2">
                                        <UserPlusIcon className="h-6 w-6 text-blue-500" />
                                    </div>
                                    <div className="flex-grow">
                                        <span className="text-lg font-semibold">
                                            {invitation.teamName}
                                        </span>
                                        <span className="ml-2 text-xs text-gray-600">
                                            Industry: {invitation.teamIndustry}
                                        </span>
                                        <p className="text-md">
                                            Position: {invitation.jobPositionTitle}
                                        </p>
                                        <p className="text-xs text-gray-600">
                                            Invited by:{" "}
                                            {`${invitation.fromUserName} ${invitation.fromUserSurname}`}
                                        </p>
                                    </div>
                                    <div className="flex w-[110px] flex-col justify-between space-y-4 px-2">
                                        <button
                                            onClick={() => console.log("Dismiss invitation")}
                                        >
                                            <div className="flex w-full items-center justify-center space-x-2 rounded-md text-gray-600 hover:bg-red-100 hover:text-red-800">
                                                <span>✕</span>
                                                <span className="text-sm">Decline</span>
                                            </div>
                                        </button>
                                        <button
                                            onClick={() =>
                                                AcceptInvitationHandle(
                                                    invitation.invitationId,
                                                    invitation.jobPositionId
                                                )
                                            }
                                        >
                                            <div className="flex w-full items-center justify-center space-x-2 rounded-md text-gray-600 hover:bg-green-100 hover:text-green-600">
                                                <span>✓</span>
                                                <span className="text-sm">Accept</span>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-600">
                                No notifications available
                            </p>
                        )}
                    </div>

                    {totalPages > 1 && (
                        <div className="mt-4 flex justify-center gap-4">
                            <button
                                className={`rounded-lg px-4 py-2 ${currentPage === 1
                                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                        : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                                    }`}
                                onClick={() => handlePageChange("prev")}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </button>
                            <button
                                className={`rounded-lg px-4 py-2 ${currentPage === totalPages
                                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                        : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                                    }`}
                                onClick={() => handlePageChange("next")}
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </button>
                        </div>
                    )}
                    <button
                        className="mt-4 self-end rounded-lg bg-gray-700 px-4 py-2 text-white hover:bg-gray-800"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>
            {showNotification ? 
            <Notification
                messages={notificationMessage}
                onClose={() => {setShowNotification(false)}}
                isError={isError} />
            : null }
        </div>
    );
}

export default NotificationModal;