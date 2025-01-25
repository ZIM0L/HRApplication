import { ArrowLeftStartOnRectangleIcon } from '@heroicons/react/24/solid';
import { useAuth } from '../../contex/AppContex';
import Loading from '../ErrorComponents/Loading';
import Notifications from './Notifications';
import UpcomingEventsAlert from './UpcomingEventsAlert';
import WorkSchedule from './WorkSchedule';
import { Cog8ToothIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import UserSettings from '../UserSettings/UserSettings';

function Panel() {
    const { decodedToken, isCheckingToken, userProfileSrc, logOut, selectedTeam } = useAuth();
    const navigate = useNavigate();
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [isUserSettingsModalOpen, setIsUserSettingsModalOpen] = useState(false)

    if (isCheckingToken) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loading />
            </div>
        );
    }

    const LogOutOfSystem = () => {
        setIsLoggingOut(true);
        setTimeout(() => {
            logOut();
            navigate("/auth", { replace: true });
        }, 1000);
    };

    if (!decodedToken) {
        return <div>No Token</div>;
    }

    if (isLoggingOut) {
        return (
            <div className="flex h-screen items-center justify-center bg-gray-100">
                <h1 className="text-xl font-bold text-gray-600">Logging out...</h1>
            </div>
        );
    }

    return (
        <>
            <div className="flex h-full w-full flex-col gap-6 p-5 md:flex-row">
                {/* Profile Section */}
                <div className="flex w-full flex-col space-y-6 md:w-1/4">
                    <div className="border-2 flex flex-col items-center space-y-4 rounded-lg bg-gradient-to-br px-6 py-6 shadow-xl">
                        <img
                            src={userProfileSrc || ""}
                            alt="User"
                            className="border-4 mb-4 h-24 w-24 rounded-full border-white shadow-xl transition-transform duration-300 hover:scale-105"
                        />
                        <h2 className="text-center text-lg font-semibold">{decodedToken.given_name} {decodedToken.family_name}</h2>
                        <p className="text-center text-sm">{decodedToken.email}</p>
                        <p className="rounded-full bg-gray-200 px-3 py-1 text-center text-sm shadow">
                            Role: {selectedTeam?.roleName}
                        </p>
                        <p className="text-center text-xs">
                            Joined: {new Date().toLocaleDateString()}
                        </p>

                        <div className="w-full space-y-2">
                            <button
                                className="border-2 flex w-full items-center justify-center space-x-4 rounded-md border-gray-300 py-1 text-gray-400 transition-all duration-300 hover:text-gray-800 hover:scale-105 hover:border-dark-blue"
                                onClick={() => setIsUserSettingsModalOpen(true)}
                            >
                                <Cog8ToothIcon className="h-6 w-6" />
                                <span className="text-sm font-semibold">Edit Profile</span>
                            </button>
                            <button
                                className="border-2 flex w-full items-center justify-center space-x-4 rounded-md border-gray-300 py-1 text-gray-400 transition-all duration-300 hover:text-gray-800 hover:scale-105 hover:border-dark-blue"
                                onClick={() => LogOutOfSystem()}
                            >
                                <ArrowLeftStartOnRectangleIcon className="h-6 w-6" />
                                <span className="text-sm font-semibold">Log out</span>
                            </button>
                        </div>
                    </div>

                    {/* Team Section */}
                    <div className="flex flex-col rounded-lg bg-white p-6 shadow-md">
                        <p className="text-lg font-semibold">Team members</p>
                        <p className="text-sm text-gray-400">No member has been found</p>
                    </div>
                </div>

                {/* Main Content Section */}
                <div className="flex w-full flex-col space-y-2">
                    <WorkSchedule />
                    <div className=" flex h-full flex-col gap-4 overflow-auto md:flex-row lg:flex-row">
                        {/* These components are now constrained within their container */}
                        <UpcomingEventsAlert />
                        <Notifications />
                    </div>
                </div>
            </div>

            {/* User Settings Modal */}
            {isUserSettingsModalOpen && (
                <UserSettings
                    isOpen={isUserSettingsModalOpen}
                    onClose={() => setIsUserSettingsModalOpen(false)}
                />
            )}
        </>
    );
}

export default Panel;
