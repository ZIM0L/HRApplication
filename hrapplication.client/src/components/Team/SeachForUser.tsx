import React, { useState } from "react";
import { SearchForUserInputs } from "../../types/Invitation/Invitation";
import { SeachForUser } from "../../api/InvitationAPI";
import Notification from "../Notification/Notification";

interface UserSearchProps {
    onSelectUser: (user: SearchForUserInputs) => void;
}

const UserSearch: React.FC<UserSearchProps> = ({ onSelectUser }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [emailQuery, setEmailQuery] = useState('');
    const [userSuggestions, setUserSuggestions] = useState<SearchForUserInputs[]>([]);
    const [isLoadingUsers, setIsLoadingUsers] = useState(false);
    const [notificationMessages, setNotificationMessages] = useState<string[]>([]);
    const [showNotification, setShowNotification] = useState(false);
    const [isError, setIsError] = useState(false);
    const [selectedUser, setSelectedUser] = useState<SearchForUserInputs | null>(null);

    const handleUserSearch = async () => {
        setIsLoadingUsers(true);
        try {
            const result = await SeachForUser({ fullName: searchQuery, email: emailQuery });
            if (result?.status === 200) {
                setUserSuggestions(result.data);
                setShowNotification(false);
                setIsError(false);
            }
        } catch (error) {
            setIsError(true);
            setShowNotification(true);
            if (error instanceof Error) {
                setNotificationMessages(["Full name cannot be empty"]);
            }
            setUserSuggestions([]);
        } finally {
            setIsLoadingUsers(false);
        }
    };

    const handleSelectUser = (user: SearchForUserInputs) => {
        setSelectedUser(user);
        onSelectUser(user);
        setUserSuggestions([]);
    };

    const handleResetSelection = () => {
        setSelectedUser(null);
        setSearchQuery('');
        setEmailQuery('');
    };

    return (
        <div className="flex flex-col space-y-2">
            {selectedUser ? (
                <div className="rounded-md border border-gray-300 bg-gray-100 p-4">
                    <p className="text-sm">
                        Selected user: <strong>{selectedUser.name} {selectedUser.surname}</strong> ({selectedUser.email})
                    </p>
                    <button
                        onClick={handleResetSelection}
                        className="mt-2 rounded-md bg-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-400"
                    >
                        Change selection
                    </button>
                </div>
            ) : (
                <>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">Full Name</label>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                            }}
                            placeholder="Enter first and last name"
                            className="w-full rounded-md border px-4 py-2"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">Email (optional)</label>
                        <input
                            type="email"
                            value={emailQuery}
                            onChange={(e) => setEmailQuery(e.target.value)}
                            placeholder="Enter email (optional)"
                            className="w-full rounded-md border px-4 py-2"
                        />
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={handleUserSearch}
                            className="rounded-md bg-cyan-blue px-4 py-2 text-white hover:bg-cyan-blue-hover"
                        >
                            Search
                        </button>
                    </div>

                    {userSuggestions.length === 0 && !isLoadingUsers && searchQuery.length > 0 && (
                        <p className="mt-2 text-sm text-gray-500">No users found with the given criteria.</p>
                    )}

                    {userSuggestions.length > 0 && (
                        <div className="mt-2 max-h-40 overflow-y-auto rounded-md border border-gray-300">
                            {userSuggestions.map((user) => (
                                <div
                                    key={user.email}
                                    className="cursor-pointer p-2 hover:bg-gray-200"
                                    onClick={() => handleSelectUser(user)}
                                >
                                    <p>{user.name} {user.surname} - {user.email}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}

            {showNotification && (
                <Notification
                    messages={notificationMessages}
                    onClose={() => { setShowNotification(false); }}
                    isError={isError}
                />
            )}
        </div>
    );
};

export default UserSearch;