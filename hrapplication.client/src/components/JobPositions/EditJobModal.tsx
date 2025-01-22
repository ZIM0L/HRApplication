import { useEffect, useState } from 'react';
import { IJobPosition } from '../../types/JobPosition/IJobPosition';
import { useForm, SubmitHandler } from 'react-hook-form';
import Notification from '../Notification/Notification';
import { useAuth } from '../../contex/AppContex';
import { UpdateJobPosition } from '../../api/JobPositionAPI';
import DeleteConfimationJobPosition from './DeleteConfimationJobPosition';

interface EditJobModalProps {
    job: IJobPosition | null;
    isOpen: boolean;
    onClose: () => void;
}

type Inputs = {
    title: string;
    description: string;
    isRecruiting: boolean;
    isActive: boolean;
};

const EditJobModal = ({ isOpen, onClose, job }: EditJobModalProps) => {
    const { register, handleSubmit, setValue, watch, reset } = useForm<Inputs>({
        defaultValues: {
            title: '',
            description: '',
            isRecruiting: false,
            isActive: false,
        },
    });
    const [notificationMessage, setNotificationMessage] = useState<string[]>([]);
    const [showNotification, setShowNotification] = useState(false);
    const [isError, setIsError] = useState(false)
    const isRecruiting = watch('isRecruiting');
    const isActive = watch('isActive');
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const { selectedTeam, setTeamInformation } = useAuth()

    useEffect(() => {
        if (isOpen && job) {
            reset({
                title: job.title || '',
                description: job.description || '',
                isRecruiting: job.isRecruiting,
                isActive: job.isActive,
            });
        }
        setNotificationMessage([]);
        setShowNotification(false);
        setIsError(false);
    }, [isOpen, job, reset]);

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        if (!job && !selectedTeam) return;

        // Sprawdzenie, czy dane różnią się od oryginalnych
        const isChanged =
            data.title !== job?.title ||
            data.description !== job?.description ||
            data.isRecruiting !== job?.isRecruiting ||
            data.isActive !== job?.isActive;

        if (!isChanged) {
            setNotificationMessage(["No changes detected."]);
            setIsError(true);
            setShowNotification(true);
            return;
        }

        try {
            const updatedJob = {
                jobPositionId: job!.jobPositionId,
                createdDate: job!.createdDate,
                title: data.title,
                description: data.description,
                isRecruiting: data.isRecruiting,
                isActive: data.isActive,
            };

            const response = await UpdateJobPosition(updatedJob);
            if (response.status === 200) {
                setNotificationMessage(["Job position has been altered"]);
                setIsError(false);
                setShowNotification(true);
                setTimeout(() => {
                    onClose();
                    //@ts-expect-error works
                    setTeamInformation((prev: ITeamInformation) => ({
                        ...prev,
                        JobPositions: prev.JobPositions.map((jobPosition: IJobPosition) =>
                            jobPosition.jobPositionId === updatedJob.jobPositionId
                                ? { ...jobPosition, ...updatedJob }
                                : jobPosition
                        ),
                    }));
                }, 3500);
            }
        } catch (error) {
            setIsError(true);
            setShowNotification(true);
            if (error instanceof Error) {
                setNotificationMessage(error.message.split(" | "));
            }
        }
    };

    const handleCancel = () => {
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50 md:justify-end">
            <div className=" w-[80%] rounded-lg bg-white p-6 shadow-lg md:w-1/2 md:max-w-[400px] md:h-full">
                <h2 className="mb-4 text-2xl font-semibold">Modify position</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                    <div>
                        <h1 className="py-1 text-xl">Title</h1>
                        <input
                            {...register('title', { required: true, maxLength: 255 })}
                            type="text"
                            placeholder="Position name"
                            className="w-full rounded-md border border-gray-300 px-2 py-2"
                        />
                    </div>
                    <div>
                        <h1 className="py-1 text-xl">Description</h1>
                        <textarea
                            {...register('description', { required: true, maxLength: 255 })}
                            placeholder="Description"
                            className="h-80 max-h-32 w-full resize-none rounded-md border border-gray-300 px-2 py-2"
                        />
                    </div>

                    {/* Recruit Checkbox */}
                    <div>
                        <h1 className="py-1 text-xl">Recruiting</h1>
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                {...register('isRecruiting')}
                                className="h-6 w-6 transform rounded border-gray-300 text-cyan-blue transition duration-300 ease-in-out"
                                checked={isRecruiting}
                                onChange={() => setValue('isRecruiting', !isRecruiting)}
                            />
                            <span>{isRecruiting ? 'Active' : 'Inactive'}</span>
                        </label>
                    </div>

                    {/* Active Checkbox */}
                    <div>
                        <h1 className="py-1 text-xl">Active</h1>
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                {...register('isActive')}
                                className="h-6 w-6 transform rounded border-gray-300 text-cyan-blue transition duration-300 ease-in-out"
                                checked={isActive}
                                onChange={() => setValue('isActive', !isActive)}
                            />
                            <span>{isActive ? 'Active' : 'Inactive'}</span>
                        </label>
                    </div>

                    <div className="mt-4 flex justify-end">
                        <button
                            className="mr-2 rounded-md bg-cyan-blue px-2 py-1 text-white transition hover:bg-cyan-blue-hover"
                            type="submit"
                        >
                            Modify position
                        </button>
                        <button
                            className="rounded-md bg-gray-300 px-2 py-1 text-gray-700 transition hover:bg-gray-600"
                            onClick={handleCancel}
                            type="button"
                        >
                            Cancel
                        </button>
                    </div>
                    <div className="flex justify-end">
                        <button
                            onClick={() => setShowDeleteConfirm(true)}
                            className="rounded-md bg-red-600 px-2 py-1 text-white transition hover:bg-red-700"
                            type="button"
                        >
                            Delete Position
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
            {showDeleteConfirm && (
                <DeleteConfimationJobPosition
                job={job!}
                isOpen={showDeleteConfirm}
                onClose={() => setShowDeleteConfirm(false)}
            />
            )}
        </div>
    );
};

export default EditJobModal;