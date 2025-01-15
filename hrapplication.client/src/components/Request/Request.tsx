import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAuth } from "../../contex/AppContex";

interface Request {
    id: number;
    title: string;
    content: string;
    status: "pending" | "resolved";  // Status requestu
    userId: number;  // Dodajemy identyfikator użytkownika, aby wiedzieć, kto wysłał zapytanie
}

interface FormInputs {
    title: string;
    content: string;
}

const RequestForm: React.FC = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormInputs>();
    const [requests, setRequests] = useState<Request[]>([
        { id: 1, title: "Request 1", content: "This is the first request.", status: "pending", userId: 1 },
        { id: 2, title: "Request 2", content: "This is the second request.", status: "pending", userId: 2 },
    ]);
    const [expandedRequestId, setExpandedRequestId] = useState<number | null>(null);
    const { selectedTeam } = useAuth();

    const onSubmit: SubmitHandler<FormInputs> = (data) => {
        const newRequest: Request = {
            id: Date.now(),
            title: data.title,
            content: data.content,
            status: "pending",  // Nowe zapytania są domyślnie oczekujące
            userId: selectedTeam?.id || 0,  // Przypisanie id użytkownika
        };

        setRequests([newRequest, ...requests]);
        reset(); // Resetowanie formularza po wysłaniu
    };

    const toggleRequest = (id: number) => {
        setExpandedRequestId((prevId) => (prevId === id ? null : id));
    };

    const markAsResolved = (id: number) => {
        setRequests((prevRequests) =>
            prevRequests.map((request) =>
                request.id === id ? { ...request, status: "resolved" } : request
            )
        );
    };

    const undoRequest = (id: number) => {
        setRequests((prevRequests) =>
            prevRequests.map((request) =>
                request.id === id ? { ...request, status: "pending" } : request
            )
        );
    };

    return (
        <div className="flex min-h-screen w-full flex-col space-y-4 bg-gray-100 px-4">
            {selectedTeam?.roleName !== "Administrator" ? (
                <>
                    {/* Sekcja dla użytkownika do wysyłania zapytań */}
                    <div className="border-b-2 flex items-center justify-between">
                        <p className="border-dark-blue-ligher py-2 text-start text-xl font-semibold text-gray-800">
                            Requests
                        </p>
                        <div className="group relative">
                            <QuestionMarkCircleIcon className="group-hover:opacity-100 h-7 w-7 cursor-pointer text-gray-500" />
                            <div className="opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto pointer-events-none absolute -right-full mr-4 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-200">
                                <div className="w-96 rounded-lg bg-white p-6 shadow-lg">
                                    <div className="mb-4 flex items-center justify-between">
                                        <h2 className="text-xl font-semibold">Information</h2>
                                        <button className="text-gray-500 hover:text-black">&times;</button>
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

                    <div className="flex w-full space-x-4">
                        {/* Formularz dodawania zapytania */}
                        <div className="rounded-lg bg-white p-6 shadow-md">
                            <h1 className="mb-6 text-2xl font-bold text-gray-800">
                                Create a Request for the Team Admin
                            </h1>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Request Title
                                    </label>
                                    <input
                                        {...register("title", { required: "Title is required" })}
                                        placeholder="Enter the title"
                                        className={`w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300 focus:outline-none ${errors.title ? "border-red-500" : ""
                                            }`}
                                    />
                                    {errors.title && (
                                        <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Request Content
                                    </label>
                                    <textarea
                                        {...register("content", { required: "Content is required" })}
                                        placeholder="Describe your request"
                                        rows={4}
                                        className={`w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300 focus:outline-none ${errors.content ? "border-red-500" : ""
                                            }`}
                                    ></textarea>
                                    {errors.content && (
                                        <p className="mt-1 text-sm text-red-500">{errors.content.message}</p>
                                    )}
                                </div>
                                <button
                                    type="submit"
                                    className="w-full rounded-md bg-blue-500 py-2 font-medium text-white transition hover:bg-blue-600"
                                >
                                    Submit Request
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Sekcja wyświetlania wysłanych zapytań */}
                    <div className="mt-6 rounded-lg bg-white p-6 shadow-md">
                        <h2 className="mb-4 text-xl font-semibold text-gray-800">Your Submitted Requests</h2>
                        {requests.filter(req => req.userId === selectedTeam?.tea).length > 0 ? (
                            <ul className="space-y-4">
                                {requests
                                    .filter(req => req.userId === selectedTeam?.id)
                                    .map((request) => (
                                        <li
                                            key={request.id}
                                            className="cursor-pointer rounded-lg border bg-white p-4 shadow-md"
                                            onClick={() => toggleRequest(request.id)}
                                        >
                                            <div className="flex items-center justify-between text-lg font-bold text-gray-800">
                                                {request.title}
                                                <span
                                                    className={`transform transition-transform ${expandedRequestId === request.id ? "rotate-180" : "rotate-0"
                                                        }`}
                                                >
                                                    ▼
                                                </span>
                                            </div>
                                            <div
                                                className={`overflow-hidden transition-all duration-200 ${expandedRequestId === request.id ? "max-h-screen mt-4" : "max-h-0"
                                                    }`}
                                            >
                                                <p className="text-gray-600">{request.content}</p>
                                                <p className="mt-2 text-sm text-gray-500">
                                                    Status: {request.status === "pending" ? "Pending" : "Resolved"}
                                                </p>
                                            </div>
                                        </li>
                                    ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500">No requests submitted yet.</p>
                        )}
                    </div>
                </>
            ) : (
                <div className="flex min-h-screen flex-col items-center bg-gray-100 px-6 py-8">
                    <div className="w-full max-w-4xl rounded-lg bg-white p-6 shadow-md">
                        <h1 className="mb-6 text-2xl font-bold text-gray-800">Incoming Requests</h1>
                        {requests.length > 0 ? (
                            <ul className="space-y-4">
                                {requests.map((request) => (
                                    <li
                                        key={request.id}
                                        className="cursor-pointer rounded-lg border bg-gray-50 p-4 shadow-md"
                                        onClick={() => toggleRequest(request.id)}
                                    >
                                        <div className="flex items-center justify-between">
                                            <h2 className="text-lg font-semibold text-gray-800">
                                                {request.title}
                                            </h2>
                                            <span
                                                className={`transform transition-transform ${expandedRequestId === request.id ? "rotate-180" : "rotate-0"
                                                    }`}
                                            >
                                                ▼
                                            </span>
                                        </div>
                                        <div
                                            className={`overflow-hidden transition-all duration-200 ${expandedRequestId === request.id ? "max-h-screen mt-4" : "max-h-0"
                                                }`}
                                        >
                                            <p className="text-gray-600">{request.content}</p>
                                            <p className="mt-2 text-sm text-gray-500">
                                                Status: {request.status === "pending" ? "Pending" : "Resolved"}
                                            </p>
                                        </div>

                                        {request.status === "pending" && (
                                            <button
                                                onClick={() => markAsResolved(request.id)}
                                                className="mt-4 w-full rounded-md bg-green-500 py-2 font-medium text-white transition hover:bg-green-600"
                                            >
                                                Mark as Resolved
                                            </button>
                                        )}

                                        {request.status === "resolved" && (
                                            <button
                                                onClick={() => undoRequest(request.id)}
                                                className="mt-4 w-full rounded-md bg-yellow-500 py-2 font-medium text-white transition hover:bg-yellow-600"
                                            >
                                                Undo Resolution
                                            </button>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500">No requests available.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default RequestForm;
