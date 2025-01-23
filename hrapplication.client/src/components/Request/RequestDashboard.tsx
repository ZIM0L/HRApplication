import React, { useEffect, useState } from "react";
import { useAuth } from "../../contex/AppContex";
import RequestForm from "./RequestForm";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { IRequest, IRequestInputs } from "../../types/Request/IRequest";
import Notification from "../Notification/Notification";
import { AddUserRequest } from "../../api/TeamAPI";

const RequestDashboard: React.FC = () => {
    const [selectedRequest, setSelectedRequest] = useState<IRequest | null>(null);
    const [isClosing, setIsClosing] = useState(false); // Kontroluje animację wychodzenia
    const { selectedTeam, teamInformation, setTeamInformation } = useAuth();
    const [isAdding, setIsAdding] = useState(false); // Kontroluje widok listy/formularza
    const [notificationMessage, setNotificationMessage] = useState<string[]>([]);
    const [showNotification, setShowNotification] = useState(false);
    const [isError, setIsError] = useState(false);

    const toggleView = (isForm: boolean) => {
        setIsAdding(isForm);
    };

    const selectRequest = async (request: IRequest) => {
        if (selectedRequest?.teammemberrequestid === request.teammemberrequestid) return;

        if (selectedRequest) {
            setIsClosing(true);
            setTimeout(() => {
                setSelectedRequest(request);
                setIsClosing(false);
            }, 300); 
        } else {
            setSelectedRequest(request);
        }
    };

    const closeRequestDetails = async () => {
        setIsClosing(true); // Uruchamiamy animację zamykania
        setTimeout(() => {
            setSelectedRequest(null); // Po zakończeniu animacji ustawiamy null
            setIsClosing(false); // Kończymy animację
        }, 300); // Czas trwania animacji (w ms)
    };


    const addNewUserRequest = async (data: IRequestInputs) => {
        if (!selectedTeam) return null
        try {
            const response = await AddUserRequest(data, selectedTeam.team.teamId)
            if (response?.status == 200) {
                setNotificationMessage(["New user request has been created"])
                setIsError(false)
                setShowNotification(true)
                //@ts-expect-error works
                setTeamInformation((prev: ITeamInformation) => {
                    return {
                        ...prev,
                        UsersRequests: [...prev.UsersRequests, response?.data]
                    }
                })
                setIsAdding(false)
            }
        } catch (error) {
            setIsError(true);
            setShowNotification(true);
            if (error instanceof Error) {
                setNotificationMessage(error.message.split(" | "))
            }
        }
    };
    useEffect(() => {
    }, [teamInformation?.UsersRequests, isAdding])

    if (!teamInformation) return null
    return (
        <>
            <div className="border-b-2 flex items-center justify-between px-4 py-2">
                <p className=" border-dark-blue-lighertext-start text-xl font-semibold text-gray-800">Request Dashboard</p>
                <div className="z-10 group relative">
                    <QuestionMarkCircleIcon className="group-hover:opacity-100 h-7 w-7 cursor-pointer text-gray-500" />
                    <div className="opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto pointer-events-none absolute -right-full mr-4 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-200">
                        <div className="w-96 rounded-lg bg-white p-6 shadow-lg">
                            <div className="mb-4 flex items-center justify-between">
                                <h2 className="text-xl font-semibold">Information</h2>
                            </div>
                            <div>
                                <p>Add Shift: Allows you to add new shifts to the system.</p>
                                <p>Edit Shift: Lets you modify the details of an existing shift.</p>
                                <p>Assign Shifts: Enables you to assign shifts to team members.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex min-h-screen w-full flex-col space-y-2 bg-gray-100 px-4 py-4 md:space-x-4 md:flex-row">
                {/* Górny panel z przyciskami */}
                <div className="flex flex-col md:w-1/3">
                    <div className="mb-4 flex items-center justify-between space-x-2">
                        <div className="space-x-4">
                            <button
                                onClick={() => toggleView(false)}
                                className={`rounded  px-2 py-1 border-2 border-gray-100 transition hover:border-gray-600 ${!isAdding && "hover:border-gray-100 opacity-50 cursor-not-allowed"}`}
                                disabled={!isAdding}
                            >
                                View Requests
                            </button>
                            <button
                                onClick={() => toggleView(true)}
                                className={`rounded  px-2 py-1 border-2 border-gray-100 transition hover:border-gray-600 ${isAdding && "hover:border-gray-100 opacity-50 cursor-not-allowed"}`}
                                disabled={isAdding}
                            >
                                Add Request
                            </button>
                        </div>
                    </div>

                    {/* Główna sekcja */}
                    <div
                        className={` h-[75%] w-full rounded-lg bg-white shadow-md transition-transform duration-500 transform`}
                    >
                        {isAdding ? (
                            <RequestForm onSubmit={addNewUserRequest} />
                        ) : (
                            <>
                                <h2 className="p-4 text-xl font-semibold text-gray-800">Your Submitted Requests</h2>
                                {/* Kontener listy z overflow-y-auto, działa na urządzeniach mobilnych i desktopowych */}
                                <div className="h-[400px] overflow-y-auto p-2 md:h-full md:max-h-[85%]">
                                    {teamInformation.UsersRequests.length === 0 ? (
                                        <div className="flex items-center justify-center px-2 text-gray-500">
                                            No requests have been created by the user.
                                        </div>
                                    ) : (
                                        <ul className="space-y-4 py-2">
                                            {teamInformation.UsersRequests.map((request, key) => (
                                                <li
                                                    onClick={() => { setSelectedRequest(request); selectRequest(request); }}
                                                    key={key}
                                                    className="rounded-lg border bg-gray-50 p-4 hover:cursor-pointer shadow-md transition-shadow duration-300 hover:shadow-lg"
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <p className="text-lg font-medium">{request.title}</p>
                                                            <span className="text-sm font-medium text-gray-400">Request {key + 1}</span>
                                                        </div>
                                                        <span
                                                            className={`rounded px-2 py-1 text-sm ${request.status === "resolved"
                                                                ? "bg-green-100 text-green-600"
                                                                : "bg-yellow-100 text-yellow-600"
                                                                }`}
                                                        >
                                                            {request.status}
                                                        </span>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </>
                        )}
                    </div>


                </div>

                {/* Separator pionowy */}
                <div className="h-[83%] w-[2px] bg-gray-300"></div>

                {/* Panel szczegółów requestu z animacją */}
                <div
                    className={`top-0 left-0 h-full bg-white shadow-lg transition-transform duration-300 md:relative md:h-[82%] md:w-2/3 ${selectedRequest ? (isClosing ? "transform translate-x-[105%]" : "transform translate-x-0") : "transform translate-x-[105%]"}`}
                >
                    {selectedRequest && !isClosing ? (
                        <div className="flex w-full flex-col space-y-4 p-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-bold text-gray-800">{selectedRequest.title}</h2>
                                <button
                                    onClick={closeRequestDetails}
                                    className="border-2 mb-4 self-end rounded-md border-gray-300 px-3 py-2 text-gray-500 transition-colors hover:text-gray-800 hover:border-gray-700"
                                >
                                    Close
                                </button>
                            </div>

                            {/* Treść requestu */}
                            <div className="border-l-4 pl-4">
                                <span className="mb-4 border-gray-300 leading-relaxed text-gray-700" style={{ wordBreak: "break-word" }}>
                                    {selectedRequest.requestContent}
                                </span>
                            </div>

                            {/* Status */}
                            {selectedRequest.status === "pending" && (
                                <div className="rounded-lg bg-yellow-100 px-4 py-2 text-sm font-medium text-yellow-700">
                                    Status: {selectedRequest.status}
                                </div>
                            )}

                            {/* Admin options */}
                            {selectedTeam?.roleName === "Administrator" ? (
                                <>
                                    {selectedRequest.status === "pending" && (
                                        <button
                                            className="w-full rounded-md bg-green-500 py-2 font-medium text-white transition hover:bg-green-600"
                                        >
                                            Mark as Resolved
                                        </button>
                                    )}
                                    {selectedRequest.status === "resolved" && (
                                        <button
                                            className="w-full rounded-md bg-yellow-500 py-2 font-medium text-white transition hover:bg-yellow-600"
                                        >
                                            Undo Resolution
                                        </button>
                                    )}
                                </>
                            ) : null}
                        </div>
                    ) : null}
                </div>


                {/* Notification */}
                {showNotification && (
                    <Notification
                        messages={notificationMessage}
                        onClose={() => setShowNotification(false)}
                        isError={isError}
                    />
                )}
            </div>
        </>
    );
};

export default RequestDashboard;