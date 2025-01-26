import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { UploadUserImage } from '../../api/UserAPI';

interface IFormInput {
    image: FileList;
}
interface UserSettingsProps {
    isOpen: boolean;
    onClose: () => void;
}

const UserSettings: React.FC<UserSettingsProps> = ({ isOpen, onClose }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();
    const [uploading, setUploading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        const file = data.image[0];

        const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        if (!validTypes.includes(file.type)) {
            setErrorMessage('Invalid file type. Only JPG, JPEG, and PNG are allowed.');
            return;
        }

        const formData = new FormData();
        formData.append('image', file);

        setUploading(true);

        try {
            const response = await UploadUserImage(formData);
            if (response.status === 200) {
                setErrorMessage(null);
                alert('Image uploaded successfully!');
            }
        } catch (error) {
            setErrorMessage('Error uploading image. Please try again.');
            console.error(error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div
            className={`fixed justify-center md:justify-end inset-0 z-50 flex items-center ${isOpen ? "opacity-100" : "opacity-0"
                } bg-gray-900 bg-opacity-50 transition-all duration-500`}
        >
            <div
                className={`md:h-full bg-white px-4 py-2 shadow-lg rounded-none transition-transform md:rounded-l-lg transform duration-500 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
            >
                <h2 className="mb-4 text-xl font-semibold">Select User Image</h2>
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
                        {errors.image && (
                            <p className="text-sm text-red-500">{errors.image.message}</p>
                        )}
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            className="rounded-md bg-gray-400 px-2 py-1 text-white transition hover:bg-gray-600"
                            onClick={() => onClose()}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="rounded-md bg-blue-500 px-2 py-1 text-white hover:bg-blue-600"
                            disabled={uploading}
                        >
                            {uploading ? 'Uploading...' : 'Upload Image'}
                        </button>
                    </div>
                </form>

                {errorMessage && (
                    <div className="mt-4 text-sm text-red-500">{errorMessage}</div>
                )}
            </div>
        </div>
    );
};

export default UserSettings;
