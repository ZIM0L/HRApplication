import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ChangeUserCredential, UploadUserImage } from '../../api/UserAPI';
import { Cog8ToothIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../contex/AppContex';
import { IUserToChangeCredentials } from '../../types/User/IUser';
import Notification from '../Notification/Notification';

interface IFormInput {
    image: FileList;
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
    name: string;
    surname: string;
    phoneNumber: string;
    email: string;  // Nowe pole email
    currentPassword: string;  // Nowe pole do potwierdzenia hasła
}

interface UserSettingsProps {
    isOpen: boolean;
    onClose: () => void;
    userData: {
        name: string;
        surname: string;
        phoneNumber: string;
        email: string;  // Nowe pole email
    };
}

const UserSettings: React.FC<UserSettingsProps> = ({ isOpen, onClose, userData }) => {
    const { register, handleSubmit, watch } = useForm<IFormInput>();
    const [activeSection, setActiveSection] = useState<'user' | 'password' | 'image'>('user');
    const [uploading, setUploading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const { selectedTeam, logOut } = useAuth();

    const [notificationMessage, setNotificationMessage] = useState<string[]>([]);
    const [showNotification, setShowNotification] = useState(false);
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();

    const handleSectionChange = (section: 'user' | 'password' | 'image') => {
        setActiveSection(section);
        setErrorMessage(null); // Clear error message when section changes
    };

    const handleUserChange = async (data: IUserToChangeCredentials) => {
        try {
            if (!selectedTeam) return;
            const result = await ChangeUserCredential(data);
            if (result?.status === 200) {
                setIsError(false);
                setNotificationMessage(["Applying changes...", "Logging off..."]);
                setShowNotification(true);
                setTimeout(() => {
                    logOut();
                    navigate('/auth');
                }, 3500);

            }
        } catch (error) {
            if (error instanceof Error) {
                setIsError(true);
                setNotificationMessage([error.message]);
                setShowNotification(true);
            }
        }
    }

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {

        if (activeSection === 'user' && data.currentPassword) {
            if (
                data.name === userData.name &&
                data.surname === userData.surname &&
                data.phoneNumber === userData.phoneNumber &&
                data.email === userData.email
            ) {
                setErrorMessage('No changes detected.');
                return;
            }

            const userToChange: IUserToChangeCredentials = {
                email: data.email,
                name: data.name,
                surname: data.surname,
                password: data.currentPassword,
                phoneNumber: data.phoneNumber
            }
            await handleUserChange(userToChange);
            return;
        }

        if (activeSection === 'password') {
            if (!data.oldPassword || !data.newPassword || !data.confirmPassword) {
                setErrorMessage('All fields for password change are required.');
                return;
            }
            if (data.newPassword !== data.confirmPassword) {
                console.log('New password and confirm password do not match.');
                return;
            }
        }

        if (activeSection === 'image') {
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
        }

        if (activeSection === 'user') {
            console.log('All user information:', data);
        }
    };

    const isUserSectionValid = watch('currentPassword');
    const isPasswordSectionValid = watch('oldPassword') && watch('newPassword') && watch('confirmPassword');
    const isImageSectionValid = watch('image')?.length > 0;

    useEffect(() => {
        if (errorMessage === 'No changes detected.') {
            setErrorMessage(null);
        }
    }, [watch('name'), watch('surname'), watch('phoneNumber'), watch('email')]);

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50 ${isOpen ? 'opacity-100' : 'opacity-0'} transition-opacity`}>
            <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
                <div className="mb-3 w-full text-center">
                    <h2 className="font-semibol space-x-1 text-2xl">
                        <Cog8ToothIcon className="inline-block h-7 w-7" />
                        <span>
                            User Settings
                        </span>
                    </h2>
                </div>
                <div className="mb-4 flex justify-around">
                    <button onClick={() => handleSectionChange('user')} className={`px-4 py-2 rounded-sm transition ${activeSection === 'user' ? 'bg-indigo-400 text-white' : 'bg-gray-300'}`}>User Information</button>
                    <button onClick={() => handleSectionChange('password')} className={`px-4 py-2 rounded-sm transition ${activeSection === 'password' ? 'bg-indigo-400 text-white' : 'bg-gray-300'}`}>Password</button>
                    <button onClick={() => handleSectionChange('image')} className={`px-4 py-2 rounded-sm transition ${activeSection === 'image' ? 'bg-indigo-400 text-white' : 'bg-gray-300'}`}>Image</button>
                </div>
                {activeSection === 'user' && (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <p className="mb-4 border-l-4 border-gray-400 bg-gray-100 p-2 text-sm">
                            Modify your personal data below. You will be logged out after saving changes.
                        </p>
                        <label>Name:</label>
                        <input {...register('name')} placeholder="Name" defaultValue={userData.name} className="mb-2 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        <label>Surname:</label>
                        <input {...register('surname')} placeholder="Surname" defaultValue={userData.surname} className="mb-2 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        <label>Phone Number:</label>
                        <input {...register('phoneNumber')} placeholder="Phone Number" defaultValue={userData.phoneNumber} className="mb-2 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        <label>Email:</label>  {/* Nowe pole email */}
                        <input {...register('email')} placeholder="Email" defaultValue={userData.email} className="mb-2 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        <label>Current Password:</label>
                        <input {...register('currentPassword')} placeholder="Current Password" type="password" className="mb-4 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        <button type="submit" className={`rounded p-2 text-white ${isUserSectionValid ? 'bg-cyan-blue hover:bg-cyan-blue-hover transition-colors' : 'bg-gray-500 transition-colors'}`} disabled={!isUserSectionValid}>Make changes</button>
                    </form>
                )}

                {activeSection === 'password' && (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <p className="mb-4 border-l-4 border-gray-400 bg-gray-100 p-2 text-sm">
                            Change your password below. You will be logged out after saving changes.
                        </p>
                        <label>Old Password:</label>
                        <input {...register('oldPassword')} placeholder="Old Password" type="password" className="mb-2 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        <label>New Password:</label>
                        <input {...register('newPassword')} placeholder="New Password" type="password" className="mb-2 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        <label>Confirm New Password:</label>
                        <input {...register('confirmPassword')} placeholder="Confirm New Password" type="password" className="mb-4 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        <button type="submit" className={`rounded p-2 text-white ${isPasswordSectionValid ? 'bg-cyan-blue hover:bg-cyan-blue-hover transition-colors' : 'bg-gray-500 transition-colors'}`} disabled={!isPasswordSectionValid}>Change password</button>
                    </form>
                )}

                {activeSection === 'image' && (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <p className="mb-4 border-l-4 border-gray-400 bg-gray-100 p-2 text-sm">
                            Upload a new profile picture (JPG, JPEG, PNG). You will be logged out after saving changes.
                        </p>
                        <label>Upload Image:</label>
                        <input type="file" {...register('image')} className="mb-4 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        <button type="submit" className={`rounded p-2 text-white ${isImageSectionValid ? 'bg-cyan-blue hover:bg-cyan-blue-hover transition-colors' : 'bg-gray-500 transition-colors'}`} disabled={uploading || !isImageSectionValid}>{uploading ? 'Uploading...' : 'Upload Image'}</button>
                    </form>
                )}

                {errorMessage && <p className="mt-2 text-red-500">{errorMessage}</p>}
                <button onClick={onClose} className="mt-4 rounded bg-gray-400 p-2 text-white transition-colors hover:bg-gray-500">Close</button>
            </div>
            {showNotification && (
                <Notification messages={notificationMessage} onClose={() => setShowNotification(false)} isError={isError} />
            )}
        </div>
    );
};

export default UserSettings;
