import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { CalendarEventExternal } from "@schedule-x/calendar";
import { eventTypes } from "../../utils/structs/eventTypes";
import { CalendarEventInputs } from "../../types/Calendar/ICalendar";
import { useAuth } from "../../contex/AppContex";
import { CreateCalendarEvent } from "../../api/CalendarAPI";
import { FormatDate } from "../../utils/functions/FormatData";
import Notification from "../Notification/Notification";

interface AddEventModalProps {
    onAdd: (event: CalendarEventExternal) => void;
    onClose: () => void;
}

const AddEventModal: React.FC<AddEventModalProps> = ({ onAdd, onClose }) => {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            title: "",
            description: "",
            category: "WorkRelated",
            startDate: "",
            endDate: "",
            permission: "Employee",
            location: "",
        },
    });
    const { selectedTeam } = useAuth();
    const [notificationMessage, setNotificationMessage] = useState<string[]>([]);
    const [showNotification, setShowNotification] = useState(false);
    const [isError, setIsError] = useState(false)

    const onSubmit = async (data: CalendarEventInputs) => {
        try {
            if (!selectedTeam) return

            if (new Date(data.endDate) < new Date(data.startDate)) {
                setIsError(true);
                setNotificationMessage(["End date cannot be earlier than start date"]);
                setShowNotification(true);
                return;
            }

            const response = await CreateCalendarEvent(selectedTeam.team.teamId, data)
            if (response?.status === 200) {
                setIsError(false)
                setNotificationMessage(["New event has been created"])
                setShowNotification(true)
                setTimeout(() => {
                    const event = response?.data
                    event.starDate = FormatDate(event.startDate)
                    event.endDate = FormatDate(event.endDate)
                    onAdd(event);
                    onClose();
                }, 3500)
            }
        } catch (error) {
            setIsError(true);
            setShowNotification(true);
            if (error instanceof Error) {
                setNotificationMessage(error.message.split(" | "))
            }
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative max-h-[97vh] w-3/4 overflow-y-auto rounded bg-white px-6 py-4 shadow-lg">
                <h2 className="mb-4 text-lg font-bold">Create new event in calendar</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label className="mb-2 block">
                        Title:
                        <Controller
                            name="title"
                            control={control}
                            rules={{ required: "Title is required." }}
                            render={({ field }) => (
                                <input
                                    type="text"
                                    placeholder="title of event"
                                    className="w-full rounded border p-2"
                                    {...field}
                                />
                            )}
                        />
                        {errors.title && (
                            <span className="text-red-500">{errors.title.message}</span>
                        )}
                    </label>
                    <label className="mb-2 block">
                        Start:
                        <Controller
                            name="startDate"
                            control={control}
                            rules={{ required: "Start date is required." }}
                            render={({ field }) => (
                                <input
                                    type="datetime-local"
                                    className="w-full rounded border p-2"
                                    {...field}
                                />
                            )}
                        />
                        {errors.startDate && (
                            <span className="text-red-500">{errors.startDate.message}</span>
                        )}
                    </label>
                    <label className="mb-2 block">
                        End:
                        <Controller
                            name="endDate"
                            control={control}
                            rules={{ required: "End date is required." }}
                            render={({ field }) => (
                                <input
                                    type="datetime-local"
                                    className="w-full rounded border p-2"
                                    {...field}
                                />
                            )}
                        />
                        {errors.endDate && (
                            <span className="text-red-500">{errors.endDate.message}</span>
                        )}
                    </label>
                    <label className="mb-2 block">
                        Category event:
                        <Controller
                            name="category"
                            control={control}
                            render={({ field }) => (
                                <select
                                    className="w-full rounded border p-2"
                                    {...field}
                                >
                                    {Object.entries(eventTypes).map(([key, type]) => (
                                        <option key={key} value={type.label}>
                                            {type.label}
                                        </option>
                                    ))}
                                </select>
                            )}
                        />
                    </label>
                    <label className="mb-2 block">
                        Description:
                        <Controller
                            name="description"
                            control={control}
                            render={({ field }) => (
                                <textarea
                                    className="w-full resize-none rounded border p-2"
                                    {...field}
                                />
                            )}
                        />
                    </label>
                    <label className="mb-2 block">
                        Location:
                        <Controller
                            name="location"
                            control={control}
                            render={({ field }) => (
                                <input
                                    type="text"
                                    placeholder="location of event"
                                    className="w-full rounded border p-2"
                                    {...field}
                                />
                            )}
                        />
                    </label>
                    <label className="mb-2 block">
                        Permission:
                        <Controller
                            name="permission"
                            control={control}
                            render={({ field }) => (
                                <select className="w-full rounded border p-2" {...field}>
                                    <option value="Administrator">Administrator</option>
                                    <option value="Employee">Employee</option>
                                </select>
                            )}
                        />
                        <span className="mt-2 block px-1 text-sm text-gray-500">
                            Administrators can view all events, while employees can only view
                            events with "Employee" permission.
                        </span>
                    </label>
                    <div className="mt-4 flex justify-end">
                        <button
                            type="button"
                            className="mr-2 rounded bg-gray-300 px-4 py-2 hover:bg-gray-400"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="rounded bg-cyan-blue px-4 py-2 text-white hover:bg-cyan-blue-hover"
                        >
                            Add new event
                        </button>
                    </div>
                </form>
            </div>
            {showNotification && (
                <Notification
                    messages={notificationMessage}
                    onClose={() => setShowNotification(false)}
                    isError={isError}
                />
            )}
        </div>
    );
};

export default AddEventModal;
