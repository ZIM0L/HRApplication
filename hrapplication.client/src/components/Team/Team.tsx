import React, { useState, useEffect } from 'react';
import { FunnelIcon } from '@heroicons/react/24/solid';
import { GetTeamsUsers } from '../../api/TeamAPI';
import { useAuth } from '../../contex/AuthContex';
import { PlusIcon } from '@heroicons/react/24/solid';
import InviteToTeamModal from './InviteToTeamModal';

interface EmployeeData {
    name: string;
    surname: string;
    email: string;
    jobPosition: string;
    permission: string;
    leftAt: Date | null;
    joinedAt: string;
    isActive: boolean;
    phoneNumber: string;
}

const Team: React.FC = () => {
    const [sortBy, setSortBy] = useState<string>(''); 
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [searchQuery, setSearchQuery] = useState<string>(''); 
    const [userData, setUserData] = useState<EmployeeData[]>([]); 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { selectedTeam } = useAuth();

    useEffect(() => {
        if (!selectedTeam?.team?.teamId) {
            return;
        }

        const fetchData = async () => {
            try {
                const response = await GetTeamsUsers(selectedTeam.team.teamId);
                if (response?.status === 200) {
                    setUserData(response.data); 
                } else {
                    setUserData([]); 
                }
            } catch (error) {
                console.error('Error fetching team users:', error);
                setUserData([]);
            }
        };

        fetchData();
    }, [selectedTeam]);

    if (!selectedTeam) {
        return <div>No team has been selected</div>;
    }

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const column = event.target.value;
        if (column === sortBy) {
            setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
        } else {
            setSortBy(column);
            setSortOrder('asc');
        }
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value.toLowerCase());
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
 
    const processedData = () => {
        if (!userData || userData.length === 0) return [];

        let filteredData = userData;

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
                let valueA = a[sortBy as keyof EmployeeData];
                let valueB = b[sortBy as keyof EmployeeData];

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

    // Przetworzone dane do wyświetlenia
    const dataToDisplay = processedData();


    return (
        <div className="min-h-screen bg-gray-100 p-6">
            {/* Search Section */}
            <div className="mb-4 flex items-center justify-between space-x-2 bg-white p-2 shadow-md">
                <div className="flex items-center">
                    <FunnelIcon className="h-6 w-6 text-gray-500" />
                    <select
                        value={sortBy}
                        onChange={handleSortChange}
                        className="ml-2 rounded-lg border border-gray-300 px-4 py-2"
                    >
                        <option value="">Sort by...</option>
                        <option value="name">First Name</option>
                        <option value="surname">Last Name</option>
                        <option value="email">Email</option>
                        <option value="jobPosition">Job Position</option>
                        <option value="permission">Permission</option>
                        <option value="joinedAt">Joined At</option>
                    </select>
                </div>
                <div className="group relative flex items-center space-x-4">
                    {/* Plus Icon with Tooltip */}
                    <div className="relative">
                        <PlusIcon onClick={() => setIsModalOpen(true)} className="h-6 w-6 hover:cursor-pointer" />
                        <span className="opacity-0 group-hover:opacity-100 -translate-x-1/2 absolute left-1/2 top-7 transform whitespace-nowrap bg-gray-800 px-2 py-1 text-sm text-white shadow-lg transition-opacity">
                            Invite 
                        </span>
                    </div>

                    {/* Search Input */}
                    <input
                        type="text"
                        placeholder="Search employee..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                </div>
            </div>

            {/* Table Section */}
            <div className="max-w-[100vw] rounded-lg shadow">
                <table className="w-full border-collapse overflow-auto rounded-lg border border-gray-300 shadow-md">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3 text-left text-sm font-bold text-gray-600">Name</th>
                            <th className="p-3 text-left text-sm font-bold text-gray-600">Surname</th>
                            <th className="p-3 text-left text-sm font-bold text-gray-600">Email</th>
                            <th className="p-3 text-left text-sm font-bold text-gray-600">Job Position</th>
                            <th className="p-3 text-left text-sm font-bold text-gray-600">Permission</th>
                            <th className="p-3 text-left text-sm font-bold text-gray-600">Left At</th>
                            <th className="p-3 text-left text-sm font-bold text-gray-600">Joined At</th>
                            <th className="p-3 text-left text-sm font-bold text-gray-600">Status</th>
                            <th className="p-3 text-left text-sm font-bold text-gray-600">Phone</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {dataToDisplay.map((employee) => (
                            <tr
                                key={`${employee.name}-${employee.surname}`}
                                className="transition-colors duration-200 hover:bg-gray-50"
                            >
                                <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-700">{employee.name}</td>
                                <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-700">{employee.surname}</td>
                                <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-700">{employee.email}</td>
                                <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-700">
                                    {employee.jobPosition || ""}   
                                </td>                              
                                <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-700">{employee.permission}</td>
                                <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-700">
                                    {employee.leftAt ? new Date(employee.leftAt).toLocaleString() : ""}
                                </td>
                                <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-700">
                                    {new Date(employee.joinedAt).toLocaleString()}
                                </td>
                                <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-700">
                                    <span
                                        className={`rounded-full px-2 py-1 text-xs font-semibold ${employee.isActive
                                                ? "bg-green-100 text-green-800"
                                                : "bg-red-100 text-red-800"
                                            }`}
                                    >
                                        {employee.isActive ? "Active" : "Inactive"}
                                    </span>
                                </td>
                                <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-700">
                                    {employee.phoneNumber}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
            <InviteToTeamModal
                isOpen={isModalOpen}
                onClose={() => handleCloseModal()}
                />
        </div>
    );
};

export default Team;
