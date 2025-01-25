import React, { useEffect, useState } from "react";
import { useAuth } from "../../contex/AppContex";
import RequestForm from "./RequestForm";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { IRequest, IRequestInputs } from "../../types/Request/IRequest";
import Notification from "../Notification/Notification";
import { AddUserRequest, DeleteUserRequest, ResolveUserRequest } from "../../api/TeamAPI";
import DeleteRequest from "./DeleteRequest";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";

const RequestDashboard: React.FC = () => {
    const [selectedRequest, setSelectedRequest] = useState<IRequest | null>(null);
    const [selectedRequestToDelete, setselectedRequestToDelete] = useState<IRequest>();
    const [isClosing, setIsClosing] = useState(false);
    const { selectedTeam, teamInformation, setTeamInformation } = useAuth();
    const [isAdding, setIsAdding] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState<string[]>([]);
    const [showNotification, setShowNotification] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { register, setValue, watch, reset } = useForm();

    const toggleView = (isForm: boolean) => {
        setIsAdding(isForm);
    };

    const selectRequest = async (request: IRequest) => {
        if (selectedRequest?.teamMemberRequestId === request.teamMemberRequestId) return;

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
        setIsClosing(true);
        setTimeout(() => {
            setSelectedRequest(null);
            setIsClosing(false);
        }, 300);
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
    const deleteRequest = async (request: IRequest) => {
        if (!selectedTeam) return;
        try {
            const response = await DeleteUserRequest(request.teamMemberRequestId);
            if (response?.status === 200) {
                setIsModalOpen(false)
                setNotificationMessage(["Request has been deleted successfully"]);
                setIsError(false);
                setShowNotification(true);
                //@ts-expect-error works
                setTeamInformation((prev: ITeamInformation) => ({
                    ...prev,
                    UsersRequests: prev.UsersRequests.filter(
                        (req: IRequest) => req.teamMemberRequestId !== request.teamMemberRequestId
                    ),
                }));
                setSelectedRequest(null);
                setIsModalOpen(false);
            }
        } catch (error) {
            setIsError(true);
            setShowNotification(true);
            if (error instanceof Error) {
                setNotificationMessage(error.message.split(" | "));
            }
        }
    }
    const resolveRequest = async (request: IRequest) => {
        if (!selectedTeam || !selectedRequest) return;
        const answerContent = watch("answerContent");
        try {
            const response = await ResolveUserRequest(request.teamMemberRequestId, answerContent);

            if (response?.status === 200) {
                setIsModalOpen(false);
                setNotificationMessage(["Request has been resolved"]);
                setIsError(false);
                setShowNotification(true);
                //@ts-expect-error works
                setTeamInformation((prev: ITeamInformation) => ({
                    ...prev,
                    UsersRequests: prev.UsersRequests.map((req: IRequest) =>
                        req.teamMemberRequestId === request.teamMemberRequestId
                            ? { ...req, status: "resolved", answerContent: answerContent }
                            : req
                    ),
                }));
                setSelectedRequest(null);
                reset()
            }
        } catch (error) {
            setIsError(true);
            setShowNotification(true);
            if (error instanceof Error) {
                setNotificationMessage(error.message.split(" | "));
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
                                <p>View Requests: Display all off the users sent requests.</p>
                                <p>Add Request: Allows you to send a request to system admin.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex min-h-screen w-full flex-col space-y-2 bg-gray-100 px-4 py-4 md:flex-row md:space-x-4">

                {/* Górny panel z przyciskami */}
                <div className="flex flex-col md:w-1/3">
                    <div className="mb-4 flex items-center justify-around space-x-2">
                        <button
                            onClick={() => toggleView(false)}
                            className={`rounded  px-2 py-1 border-2 border-gray-100 transition hover:border-gray-600 ${!isAdding && "hover:border-gray-100 opacity-50 cursor-not-allowed"}`}
                            disabled={!isAdding}
                        >
                            View Requests
                        </button>
                        {selectedTeam?.roleName != "Administrator" ?
                            <button
                                onClick={() => toggleView(true)}
                                className={`rounded  px-2 py-1 border-2 border-gray-100 transition hover:border-gray-600 ${isAdding && "hover:border-gray-100 opacity-50 cursor-not-allowed"}`}
                                disabled={isAdding}
                            >
                                Add Request
                            </button>
                            : null}
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
                                    <div className="h-[400px] overflow-y-auto p-2 md:h-full md:max-h-[85%]">
                                        {teamInformation.UsersRequests.length === 0 ? (
                                            <div className="flex items-center justify-center px-2 text-gray-500">
                                                No requests have been created by the user.
                                            </div>
                                        ) : (
                                            <ul className="space-y-4 py-2">
                                                {teamInformation.UsersRequests.map((request, index) => (
                                                    <li
                                                        key={index}
                                                        onClick={() => {
                                                            setSelectedRequest(request);
                                                            setselectedRequestToDelete(request);
                                                            selectRequest(request);
                                                        }}
                                                        className="rounded-lg border bg-gray-50 p-4 shadow-md transition-shadow duration-300 hover:cursor-pointer hover:shadow-lg"
                                                    >
                                                        <div className="flex items-center justify-between">
                                                            {/* Left Section */}
                                                            <div className="flex w-1/2 flex-col space-y-1 overflow-hidden">
                                                                <p className="truncate text-lg font-medium">{request.title}</p>
                                                                <p className="truncate text-sm font-medium text-gray-400">
                                                                    Requested by: {request.name} {request.surname}
                                                                </p>
                                                            </div>

                                                            {/* Right Section */}
                                                            <div className="flex flex-col items-end space-y-2">
                                                                <TrashIcon
                                                                    className="h-5 w-5 text-gray-600 transition-colors hover:text-red-500"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation(); // Prevent triggering the parent click
                                                                        setSelectedRequest(null);
                                                                        setIsModalOpen(true);
                                                                    }}
                                                                />
                                                                <span
                                                                    className={`rounded px-2 py-1 text-sm ${request.status === "resolved"
                                                                            ? "bg-green-100 text-green-600"
                                                                            : "bg-yellow-100 text-yellow-600"
                                                                        }`}
                                                                >
                                                                    {request.status}
                                                                </span>
                                                            </div>
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
                            {/* Status */}
                            {selectedRequest.status === "resolved" && (
                                <div className="rounded-lg bg-green-100 px-4 py-2 text-sm font-medium text-green-600">
                                    Status: {selectedRequest.status}
                                </div>
                            )}
                            {selectedRequest.answerContent != null && selectedRequest.status == "resolved" && selectedTeam?.roleName != "Administrator" ?
                                <>
                                    <p className="text-xl">Provided answer by system admin: </p>
                                    <div className="border-l-4 pl-4">
                                        <span className="mb-4 border-gray-300 leading-relaxed text-gray-700" style={{ wordBreak: "break-word" }}>
                                            {selectedRequest.answerContent}
                                        </span>
                                    </div>
                                </>
                                : null}
                            <div>
                                <p className="text-sm text-gray-500">Submitted by: {selectedRequest.name} {selectedRequest.surname}</p>
                                <p className="text-sm text-gray-500">Submitted at: {selectedRequest.submittedAt.toLocaleString().slice(0, 16).replace("T", " ")}</p>
                            </div>

                            {/* Admin options */}
                            {selectedTeam?.roleName === "Administrator" && selectedRequest.status == "pending" ? (
                                <>
                                    <div className="flex flex-col space-y-4">
                                        {/* Checkbox - kontrola wyświetlania pola tekstowego */}
                                        <div className="flex items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                id="showAnswer"
                                                {...register("showAnswer")}
                                                onChange={(e) => setValue("showAnswer", e.target.checked)}
                                            />
                                            <label htmlFor="showAnswer" className="text-gray-700">Provide an answer</label>
                                        </div>

                                        {/* Jeśli checkbox jest zaznaczony, pokaż input */}
                                        {watch("showAnswer") && (
                                            <div className="flex flex-col space-y-2">
                                                <label htmlFor="answerContent" className="text-gray-700">Answer</label>
                                                <textarea
                                                    id="answerContent"
                                                    {...register("answerContent", { required: "Answer is required if checkbox is checked" })}
                                                    className="w-full resize-none rounded-md border px-4 py-2"
                                                    rows={4}
                                                    placeholder="Type your response here..."
                                                />
                                            </div>
                                        )}
                                    </div>
                                    {selectedRequest.status === "pending" && (
                                        <button
                                            onClick={() => { resolveRequest(selectedRequest) }}
                                            className="rounded-md bg-green-500 py-2 font-medium text-white transition hover:bg-green-600"
                                        >
                                            Mark as Resolved
                                        </button>
                                    )}
                                </>
                            ) :
                                <>
                                    {selectedRequest.answerContent != null && (
                                        <>
                                            <p className="text-xl">Provided answer:</p>
                                            <div className="border-l-4 pl-4">
                                                <span
                                                    className="mb-4 border-gray-300 leading-relaxed text-gray-700"
                                                    style={{ wordBreak: "break-word" }}
                                                >
                                                    {selectedRequest.answerContent}
                                                </span>
                                            </div>
                                        </>
                                    )}
                                </>
                            }
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
            {isModalOpen && (
                <DeleteRequest
                    request={selectedRequestToDelete!}
                    onConfirm={deleteRequest}
                    onCancel={() => setIsModalOpen(false)}
                />
            )}
        </>
    );
};

export default RequestDashboard;