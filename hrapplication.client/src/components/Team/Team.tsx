import React, { useState } from 'react';
import { FunnelIcon } from '@heroicons/react/24/solid';
import { useAuth } from '../../contex/AppContex';
import { PlusIcon } from '@heroicons/react/24/solid';
import InviteToTeamModal from './InviteToTeamModal';
import { IEmployeeData } from '../../types/User/IUser';
import KickConfirmationModal from './KickConfirmationModal';
import Notification from '../Notification/Notification';
import { DeleteTeamMember } from '../../api/TeamAPI';
import { ITeamInformation } from '../../types/Team/ITeam';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import TeamMembersTable from './TeamMembersInfo';
import UsersAndRolesTable from './UsersAndRoles';

const Team: React.FC = () => {
    const [sortBy, setSortBy] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { selectedTeam, teamInformation, setTeamInformation } = useAuth();

    const [notificationMessage, setNotificationMessage] = useState<string[]>([]);
    const [showNotification, setShowNotification] = useState(false);
    const [isError, setIsError] = useState(false);

    const [isKickModalOpen, setIsKickModalOpen] = useState(false);
    const [userToKick, setUserToKick] = useState<IEmployeeData>();

    // Nowy stan do przechowywania wybranego widoku tabeli
    const [selectedTable, setSelectedTable] = useState<'usersAndRoles' | 'teamMembers'>('usersAndRoles');

    if (!selectedTeam) {
        return <div>No team has been selected</div>;
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const processedData = () => {
        if (!teamInformation?.UserData || teamInformation?.UserData.length === 0) return [];

        let filteredData = teamInformation?.UserData;

        if (searchQuery.trim() !== '') {
            filteredData = filteredData.filter((employee) => {
                const query = searchQuery.toLowerCase();
                return (
                    employee.name.toLowerCase().includes(query) ||
                    employee.surname.toLowerCase().includes(query) ||
                    employee.email.toLowerCase().includes(query) ||
                    employee.jobPosition.toLowerCase().includes(query) ||
                    employee.permission.toLowerCase().includes(query) ||
                    employee.phoneNumber.toLowerCase().includes(query)
                );
            });
        }

        if (sortBy) {
            filteredData = filteredData.sort((a, b) => {
                let valueA = a[sortBy as keyof IEmployeeData];
                let valueB = b[sortBy as keyof IEmployeeData];

                if (valueA == null && valueB == null) return 0;
                if (valueA == null) return sortOrder === 'asc' ? 1 : -1;
                if (valueB == null) return sortOrder === 'asc' ? -1 : 1;

                if (typeof valueA === 'string' && typeof valueB === 'string') {
                    valueA = valueA.toLowerCase();
                    valueB = valueB.toLowerCase();
                }
                if (valueA < valueB) return sortOrder === 'asc' ? -1 : 1;
                if (valueA > valueB) return sortOrder === 'asc' ? 1 : -1;
                return 0;
            });
        }

        return filteredData;
    };

    const handleKick = (employee: IEmployeeData) => {
        setUserToKick(employee);
        setIsKickModalOpen(true);
    };

    const handleConfirmKick = async (userToKick: IEmployeeData) => {
        try {
            if (!selectedTeam && !userToKick) return;
            const result = await DeleteTeamMember(selectedTeam?.team.teamId, userToKick?.email);
            if (result?.status == 200) {
                setIsError(false);
                setNotificationMessage([`${userToKick.name} ${userToKick.surname} has been kicked`]);
                setShowNotification(true);
                //@ts-expect-error works
                setTeamInformation((prev: ITeamInformation) => {
                    return {
                        ...prev,
                        UserData: [...prev.UserData.filter(user => user.email != userToKick.email)]
                    }
                })
            }
        } catch (error) {
            if (error instanceof Error) {
                setIsError(true);
                setNotificationMessage([error.message]);
                setShowNotification(true);
            }
        }
    };

    const dataToDisplay = processedData();

    return (
        <div className="px-4">
            <div className="flex items-center justify-between border-b-2 py-2">
                <p className=" text-xl font-semibold text-gray-800">Team Management</p>
                <div className="group relative z-10">
                    <QuestionMarkCircleIcon className="h-7 w-7 cursor-pointer text-gray-500 group-hover:opacity-100" />
                    <div className="pointer-events-none absolute -right-full mr-4 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-hover:pointer-events-auto">
                        <div className="w-96 rounded-lg bg-white p-6 shadow-lg">
                            <div className="mb-4 flex items-center justify-between">
                                <h2 className="text-xl font-semibold">Information</h2>
                            </div>
                            <div>
                                <p>Manage Team: View and manage team members.</p>
                                <p>Invite Member: Send an invitation to a new team member.</p>
                                <p>Sort & Search: Easily filter and find team members.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Table Selection */}
            <div className="my-4 flex flex-col space-y-2">
                <p className="text-sm text-gray-600">Select a table to view the relevant data</p>
                <div className="flex space-x-4">
                    <button
                        className={`px-4 py-2 rounded-lg transition-all border-2 hover:border-gray-300 ${selectedTable === 'usersAndRoles' ? 'border-black' : 'border-gray-100'}`}
                        onClick={() => setSelectedTable('usersAndRoles')}
                    >
                        Users & Roles
                    </button>
                    <button
                        className={`px-4 py-2 rounded-lg transition-all border-2 hover:border-gray-300 ${selectedTable === 'teamMembers' ? 'border-black' : 'border-gray-100'}`}
                        onClick={() => setSelectedTable('teamMembers')}
                    >
                        Team Members
                    </button>
                </div>
            </div>
            {/* Display Selected Table */}
            {selectedTable === 'teamMembers' && <TeamMembersTable data={dataToDisplay} handleKick={handleKick} setIsModalOpenInvite={() => setIsModalOpen(true)}/>}
            {selectedTable === 'usersAndRoles' && <UsersAndRolesTable dataToDisplay={dataToDisplay} handleRemoveRole={handleKick} />}

            {/* Modals */}
            {selectedTeam.roleName == "Administrator" && (
                <InviteToTeamModal isOpen={isModalOpen} onClose={handleCloseModal} />
            )}
            {selectedTeam.roleName == "Administrator" && (
                <KickConfirmationModal
                    isOpen={isKickModalOpen}
                    onClose={() => setIsKickModalOpen(false)}
                    onConfirm={() => handleConfirmKick(userToKick!)}
                    userName={userToKick ? `${userToKick.name} ${userToKick.surname}` : ''}
                />
            )}

            {showNotification && (
                <Notification messages={notificationMessage} onClose={() => setShowNotification(false)} isError={isError} />
            )}
        </div>
    );
};

export default Team;
