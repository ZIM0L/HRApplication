import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAuth } from '../../contex/AppContex';
import { UploadTeamProfilePicture } from '../../api/TeamAPI';
import Notification from '../Notification/Notification';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface IFormInput {
    image: FileList;
}

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const UploadTeamPicture: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    const { register, handleSubmit, formState: { errors }, watch, reset } = useForm<IFormInput>();
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const { selectedTeam } = useAuth();
    const [notificationMessage, setNotificationMessage] = useState<string[]>([]);
    const [showNotification, setShowNotification] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        if (isOpen) {
            reset();
            setImagePreview(null);
            setUploading(false);
            setErrorMessage(null);
            setNotificationMessage([]);
            setShowNotification(false);
            setIsError(false);
        }
    }, [isOpen, reset]);

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        if (!selectedTeam) return;
        const file = data.image[0];

        const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        if (!validTypes.includes(file.type)) {
            setErrorMessage('Invalid file format. Only JPG, JPEG, and PNG files are allowed.');
            return;
        }

        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);

        const formData = new FormData();
        formData.append('image', file);
        formData.append('teamId', selectedTeam?.team.teamId);

        setUploading(true);

        try {
            const response = await UploadTeamProfilePicture(formData);
            if (response?.status === 200) {
                setNotificationMessage(["Applying changes ..."])
                setIsError(false)
                setShowNotification(true)
                setErrorMessage(null);
                setTimeout(() => {
                    window.location.reload();
                },3500)
            }
        } catch (error) {
            setIsError(true);
            setShowNotification(true);
            if (error instanceof Error) {
                setNotificationMessage(error.message.split(" | "))
            }
        } finally {
            setUploading(false);
        }
    };

    if (!isOpen) return null;

    const image = watch('image');

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute right-2 top-2 text-2xl text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                    <XMarkIcon className="h-6 w-6" />
                </button>

                <h2 className="mb-4 text-center text-xl font-semibold">Select Team Image</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <input
                            type="file"
                            {...register('image', {
                                required: 'File is required',
                                validate: (files) => {
                                    const file = files?.[0];
                                    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
                                    return (
                                        file &&
                                        validTypes.includes(file.type) ||
                                        'Only JPG, JPEG, and PNG files are allowed.'
                                    );
                                }
                            })}
                            className="w-full rounded border border-gray-300 p-2"
                        />
                        {errors.image && <p className="text-sm text-red-500">{errors.image.message}</p>}
                    </div>

                    <button
                        type="submit"
                        className={`w-full rounded-md py-2 text-white transition ${image ? 'bg-cyan-blue hover:bg-cyan-blue-hover' : 'bg-gray-400 cursor-not-allowed'}`}
                        disabled={uploading || !image}
                    >
                        {uploading ? 'Uploading...' : 'Submit Image'}
                    </button>
                </form>

                {/* Displaying image preview */}
                {imagePreview && (
                    <div className="mt-4">
                        <p className="text-sm text-gray-600">Preview of the selected team image:</p>
                        <img
                            src={imagePreview}
                            alt="Team Image Preview"
                            className="mt-2 h-auto max-w-full rounded-md"
                        />
                    </div>
                )}

                {/* Displaying error message */}
                {errorMessage && (
                    <div className="mt-4 text-sm text-red-500">
                        {errorMessage}
                    </div>
                )}
                {showNotification && (
                    <Notification
                        messages={notificationMessage}
                        onClose={() => setShowNotification(false)}
                        isError={isError}
                    />
                )}
            </div>
        </div>
    );
};

export default UploadTeamPicture;
