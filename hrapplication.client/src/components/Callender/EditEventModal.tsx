import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { eventTypes } from '../../utils/structs/eventTypes';
import { useAuth } from '../../contex/AppContex';
import { CalendarEventInputs, ICalendarEvent } from '../../types/Calendar/ICalendar';
import Notification from '../Notification/Notification';
import { UpdateCalendarEvent } from '../../api/CalendarAPI';

interface EditModalProps {
    onSave: (updatedEvent: ICalendarEvent) => void;
    onClose: () => void;
}

const EditModal: React.FC<EditModalProps> = ({ onSave, onClose }) => {
    const { selectedTeam, teamInformation } = useAuth();
    const [selectedUpdateEvent, setSelectedUpdateEvent] = useState<ICalendarEvent | null>(null);
    const [notificationMessage, setNotificationMessage] = useState<string[]>([]);
    const [showNotification, setShowNotification] = useState(false);
    const [isError, setIsError] = useState(false)

    const {
        handleSubmit,
        control,
        reset,
    } = useForm<(ICalendarEvent)>({
        defaultValues: selectedUpdateEvent || {},
    });

    const handleEventSelection = (eventId: string) => {
        const selectedEvent = teamInformation?.CalendarEvents.find((event) => event.calendareventid === eventId);
        setSelectedUpdateEvent(selectedEvent || null);
        if (selectedEvent) {
            // Reset form with new event data
            reset({
                ...selectedEvent,
                category: selectedEvent.category || "", // Ensure category is set
            });
        }
    };

    const onSubmit = async (data: CalendarEventInputs) => {
        if (!selectedTeam) return;
        try {
            if (new Date(data.endDate) < new Date(data.startDate)) {
                setIsError(true);
                setNotificationMessage(["End date cannot be earlier than start date"]);
                setShowNotification(true);
                return;
            }
            console.log(data)
            const response = await UpdateCalendarEvent(data);
            if (response?.status == 200) {
                setIsError(false)
                setNotificationMessage(["Event has been altered"])
                setShowNotification(true)
                setTimeout(() => {
                    console.log(response.data)
                    onSave(response.data)
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
            <div className="w-1/2 min-w-[410px] max-w-[550px] rounded bg-white p-6 shadow-lg">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="mb-2 block font-semibold">Select Event to Edit:</label>
                        <select
                            className="w-full rounded border p-2"
                            onChange={(e) => handleEventSelection(e.target.value)}
                            value={selectedUpdateEvent?.calendareventid || ""}
                        >
                            <option value="" disabled>-- Select an Event --</option>
                            {teamInformation?.CalendarEvents.map((event) => (
                                <option key={event.calendareventid} value={event.calendareventid}>
                                    {event.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    {selectedUpdateEvent && (
                        <>
                            <div>
                                <label>Title:</label>
                                <Controller
                                    name="title"
                                    control={control}
                                    render={({ field }) => (
                                        <input
                                            type="text"
                                            className="w-full rounded border p-2"
                                            {...field}
                                        />
                                    )}
                                />
                            </div>

                            <div>
                                <label>Start:</label>
                                <Controller
                                    name="startDate"
                                    control={control}
                                    render={({ field }) => (
                                        <input
                                            type="datetime-local"
                                            className="w-full rounded border p-2"
                                            {...field}
                                        />
                                    )}
                                />
                            </div>

                            <div>
                                <label>End:</label>
                                <Controller
                                    name="endDate"
                                    control={control}
                                    render={({ field }) => (
                                        <input
                                            type="datetime-local"
                                            className="w-full rounded border p-2"
                                            {...field}
                                        />
                                    )}
                                />
                            </div>

                            <div>
                                <label>Description:</label>
                                <Controller
                                    name="description"
                                    control={control}
                                    render={({ field }) => (
                                        <textarea
                                            className="w-full rounded border p-2"
                                            {...field}
                                        />
                                    )}
                                />
                            </div>

                            <div>
                                <label>Location:</label>
                                <Controller
                                    name="location"
                                    control={control}
                                    render={({ field }) => (
                                        <input
                                            type="text"
                                            className="w-full rounded border p-2"
                                            {...field}
                                        />
                                    )}
                                />
                            </div>
                            <div>
                                <label>
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
                                </label>
                            </div>
                            <div>
                                <label>Category:</label>
                                <Controller
                                    name="category"
                                    control={control}
                                    render={({ field }) => (
                                        <select
                                            className="w-full rounded border p-2"
                                            {...field}
                                        >
                                            <option value={selectedUpdateEvent.category} disabled>
                                                {selectedUpdateEvent.category || "-- Select a Category --"}
                                            </option>
                                            {Object.entries(eventTypes).map(([key, { label }]) => (
                                                <option
                                                    key={key}
                                                    value={label}
                                                >
                                                    {label}
                                                </option>
                                            ))}
                                        </select>
                                    )}
                                />
                            </div>
                        </>
                    )}

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
                            Save changes
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

export default EditModal;
