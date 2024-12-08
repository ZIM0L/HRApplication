import React, { useState, useMemo, useEffect } from 'react';
import { FunnelIcon } from '@heroicons/react/24/solid';
import { GetTeamsUsers } from '../../api/TeamAPI';
import { useAuth } from '../../contex/AuthContex';

interface EmployeeData {
    name: string;
    surname: string;
    email: string;
    jobPosition: string;
    permission: string;
    leftAt: Date | null;
    joinedAt: string; // Join date can remain as string for now
    isActive: boolean;
    phoneNumber: string;
}
interface UserResponse {
    data: EmployeeData[]; // Odpowiedź zawiera tablicę danych użytkowników
}

const Team: React.FC = () => {
    const [sortBy, setSortBy] = useState<string>(''); // Column to sort by
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc'); // Sorting order
    const [searchQuery, setSearchQuery] = useState<string>(''); // Search query
    const { selectedTeam } = useAuth();

    useEffect(() => {
        if (!selectedTeam?.team?.teamId) {
            return; 
        }
        const fetchData = async () => {
            console.log(typeof selectedTeam.team.teamId)
            const response = await GetTeamsUsers(selectedTeam.team.teamId) as UserResponse;

            if (response) {
                console.log("Team users:", response.data); 
                console.log("Failed to fetch team users");
            }
        };

        fetchData();
    }, [selectedTeam]); 

    if (selectedTeam == null) {
        return <div>No team has benn selected</div>
    }
    const data = useMemo<EmployeeData[]>(() => [
        {
            name: 'test',
            surname: 'Zygmunt',
            email: 'test@test.com',
            jobPosition: '', // Empty string if no job position is provided
            permission: 'Administrator',
            leftAt: null, // Nullable DateTime
            joinedAt: '2024-12-06T14:45:34.4090078',
            isActive: true,
            phoneNumber: '123456789',
        },
        {
            name: 'Adrian',
            surname: 'Zygmunt',
            email: 'sylzyg555@interia.pl',
            jobPosition: 'Admin',
            permission: 'System Administrator',
            leftAt: null,
            joinedAt: '2022-04-01',
            isActive: true,
            phoneNumber: '+123456789',
        },
        {
            name: 'Jan',
            surname: 'Kowalski',
            email: 'jan.kowalski@company.com',
            jobPosition: 'Manager',
            permission: 'HR Manager',
            leftAt: null,
            joinedAt: '2020-07-15',
            isActive: false,
            phoneNumber: '+987654321',
        },
    ], []);



    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const column = event.target.value;
        if (column === sortBy) {
            setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
        } else {
            setSortBy(column);
            setSortOrder('asc');
        }
    };


    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value.toLowerCase());
    };

    const sortedData = useMemo(() => {
        if (!sortBy) return data;

        const sorted = [...data].sort((a, b) => {
            let valueA = a[sortBy as keyof EmployeeData];
            let valueB = b[sortBy as keyof EmployeeData];

            if (typeof valueA === 'string') {
                valueA = valueA.toLowerCase();
                valueB = valueB.toLowerCase();
            }

            if (valueA < valueB) return sortOrder === 'asc' ? -1 : 1;
            if (valueA > valueB) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });

        return sorted;
    }, [data, sortBy, sortOrder]);

    const filteredData = useMemo(() => {
        return sortedData.filter(employee => {
            return (
                employee.name.toLowerCase().includes(searchQuery) ||
                employee.surname.toLowerCase().includes(searchQuery) ||
                employee.email.toLowerCase().includes(searchQuery) ||
                employee.jobPosition.toLowerCase().includes(searchQuery) ||
                employee.permission.toLowerCase().includes(searchQuery) ||
                employee.phoneNumber.toLowerCase().includes(searchQuery)
            );
        });
    }, [sortedData, searchQuery]);

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
                        <option value="name">First Name</option>
                        <option value="surname">Last Name</option>
                        <option value="email">Email</option>
                        <option value="jobPosition">Job Position</option>
                        <option value="permission">Permission</option>
                        <option value="joinedAt">Joined At</option>
                    </select>
                </div>

                {/* Search Input */}
                <input
                    type="text"
                    placeholder="Search employee..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="rounded-lg border border-gray-300 px-4 py-2"
                />
            </div>

            {/* Table Section */}
            <div className="max-w-[100vw] rounded-lg shadow">
                <table className="overflow-auto">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="p-2 text-left text-sm font-semibold tracking-wide text-gray-600">Name</th>
                            <th className="p-2 text-left text-sm font-semibold tracking-wide text-gray-600">Surname</th>
                            <th className="p-2 text-left text-sm font-semibold tracking-wide text-gray-600">Email</th>
                            <th className="p-2 text-left text-sm font-semibold tracking-wide text-gray-600">Job Position</th>
                            <th className="p-2 text-left text-sm font-semibold tracking-wide text-gray-600">Permission</th>
                            <th className="p-2 text-left text-sm font-semibold tracking-wide text-gray-600">Left At</th>
                            <th className="p-2 text-left text-sm font-semibold tracking-wide text-gray-600">Joined At</th>
                            <th className="p-2 text-left text-sm font-semibold tracking-wide text-gray-600">Status</th>
                            <th className="p-2 text-left text-sm font-semibold tracking-wide text-gray-600">Phone</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-300">
                        {filteredData.map((employee) => (
                            <tr key={`${employee.name}-${employee.surname}`} className="hover:bg-gray-50">
                                <td className="whitespace-nowrap p-2 text-sm text-gray-700">{employee.name}</td>
                                <td className="whitespace-nowrap p-2 text-sm text-gray-700">{employee.surname}</td>
                                <td className="whitespace-nowrap p-2 text-sm text-gray-700">{employee.email}</td>
                                <td className="whitespace-nowrap p-2 text-sm text-gray-700">{employee.jobPosition || "N/A"}</td>
                                <td className="whitespace-nowrap p-2 text-sm text-gray-700">{employee.permission}</td>
                                <td className="whitespace-nowrap p-2 text-sm text-gray-700">{employee.leftAt ? new Date(employee.leftAt).toLocaleString() : "N/A"}</td>
                                <td className="whitespace-nowrap p-2 text-sm text-gray-700">{new Date(employee.joinedAt).toLocaleString()}</td>
                                <td className="whitespace-nowrap p-2 text-sm text-gray-700">{employee.isActive ? "Active" : "Inactive"}</td>
                                <td className="whitespace-nowrap p-2 text-sm text-gray-700">{employee.phoneNumber}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>

            {/* Mobile Grid - for small screens */}
            <div className="grid-cols-1 grid gap-4 md:hidden">
                {filteredData.map((employee) => (
                    <div key={employee.name} className="rounded-lg bg-white p-4 shadow">
                        <div className="flex justify-between text-sm text-gray-500">
                            <span className="font-bold">Name:</span>
                            <span>{employee.name} {employee.surname}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-500">
                            <span className="font-bold">Email:</span>
                            <span>{employee.email}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-500">
                            <span className="font-bold">jobPosition:</span>
                            <span>{employee.jobPosition}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-500">
                            <span className="font-bold">permission:</span>
                            <span>{employee.permission}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-500">
                            <span className="font-bold">joinedAt:</span>
                            <span>{employee.joinedAt}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-500">
                            <span className="font-bold">Hire Date:</span>
                            <span>{employee.joinedAt}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Team;
