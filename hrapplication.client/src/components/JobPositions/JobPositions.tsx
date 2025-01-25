import {  useState } from "react";
import { ArrowRightCircleIcon, PlusIcon } from "@heroicons/react/24/solid";
import { IJobPosition } from "../../types/JobPosition/IJobPosition";
import AddJobModal from "./AddJobModal";
import EditJobModal from "./EditJobModal";
import { useAuth } from "../../contex/AppContex";

function JobPositions() {
    const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const [selectedJob, setSelectedJob] = useState<IJobPosition | null>(null);
    const { selectedTeam, teamInformation } = useAuth();

    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-6">
            {/* Header Section */}
            <div className="mb-4 flex flex-col space-y-4 bg-white p-4 shadow-md md:flex-row md:items-center md:justify-between md:space-y-0">
                <h2 className="text-lg font-semibold text-gray-700">
                    Job Positions: {teamInformation?.JobPositions.length}
                </h2>
                <div className="flex flex-col items-stretch space-y-3 md:flex-row md:items-center md:space-x-10 md:space-y-0">
                    {selectedTeam?.roleName === "Administrator" && (
                        <div className="group relative">
                            <PlusIcon
                                onClick={() => setIsAddModalOpen(true)}
                                className="h-8 w-8 cursor-pointer border-2 border-white rounded-md transition hover:border-gray-700"
                            />
                            <span className="opacity-0 group-hover:opacity-100 -translate-x-1/2 absolute left-1/2 top-9 transform whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-sm text-white shadow-lg transition-opacity">
                                Add Position
                            </span>
                        </div>
                    )}
                    {/* Search Input */}
                    <input
                        type="text"
                        placeholder="Search job position..."
                        className="w-full min-w-[200px] rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 sm:min-w-[300px]"
                    />
                </div>
            </div>

            {/* Job Positions Table */}
            <div className="max-h-[75%] overflow-x-auto overflow-y-auto rounded-lg bg-white shadow-md">
                {teamInformation?.JobPositions.length !== 0 ? (
                    <table className=" w-full border-collapse border border-gray-200 text-left">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-3 py-1 text-sm font-bold text-gray-600">
                                    Job Title
                                </th>
                                <th className="px-3 py-1 text-sm font-bold text-gray-600">
                                    Description
                                </th>
                                <th className="px-3 py-1 text-sm font-bold text-gray-600">
                                    Created At
                                </th>
                                <th className="px-3 py-1 text-sm font-bold text-gray-600">
                                    Status
                                </th>
                                <th className="px-3 py-1 text-sm font-bold text-gray-600">
                                    Recruiting
                                </th>
                                {selectedTeam?.roleName === "Administrator" && (
                                    <th className="border-l-2 px-3 py-1 text-center text-sm font-bold text-gray-600">
                                        Edit
                                    </th>
                                )}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {teamInformation?.JobPositions.map((job, key) => (
                                <tr key={key} className="hover:bg-gray-50">
                                    {/* Job Title */}
                                    <td className="px-3 py-1 text-gray-800">
                                        <p>{job.title}</p>
                                        <p className="text-xs text-gray-400">
                                            ID: {job.jobPositionId}
                                        </p>
                                    </td>
                                    {/* Description */}
                                    <td
                                        className="px-3 py-1 text-gray-800"
                                        title={job.description}
                                    >
                                        <p>
                                            {job.description.length > 15
                                                ? `${job.description.slice(0, 15)}...`
                                                : job.description}
                                        </p>
                                    </td>
                                    {/* Created At */}
                                    <td className="px-3 py-1 text-gray-800">
                                        <p>
                                            {new Date(job.createdDate).toLocaleDateString()}
                                        </p>
                                        <p className="text-sm text-gray-400">
                                            {new Date(job.createdDate).toLocaleTimeString()}
                                        </p>
                                    </td>
                                    {/* Status */}
                                    <td className="px-3 py-1 text-gray-500">
                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-semibold ${job.isActive
                                                    ? "bg-green-100 text-green-800"
                                                    : "bg-red-100 text-red-800"
                                                }`}
                                        >
                                            {job.isActive ? "Active" : "Inactive"}
                                        </span>
                                    </td>
                                    {/* Recruiting */}
                                    <td className="px-3 py-1 text-gray-500">
                                        <span className="text-md rounded-full px-3 py-1 font-semibold">
                                            {job.isRecruiting ? "yes" : "no"}
                                        </span>
                                    </td>
                                    {selectedTeam?.roleName === "Administrator" && (
                                        <td className="border-l-2 px-3 py-1 text-center">
                                            <button
                                                onClick={() => {
                                                    setSelectedJob(job);
                                                    setIsEditModalOpen(true);
                                                }}
                                                className="rounded-full bg-gray-100 p-2 hover:bg-gray-200"
                                            >
                                                <ArrowRightCircleIcon className="h-6 w-6 text-gray-500 hover:text-gray-400" />
                                            </button>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="p-4 text-sm text-gray-500">No job positions found.</p>
                )}
            </div>

            {/* Modals */}
            {selectedTeam?.roleName === "Administrator" && (
                <>
                    <AddJobModal
                        isOpen={isAddModalOpen}
                        onClose={() => setIsAddModalOpen(false)}
                    />
                    <EditJobModal
                        isOpen={isEditModalOpen}
                        onClose={() => setIsEditModalOpen(false)}
                        job={selectedJob}
                    />
                </>
            )}
        </div>
    );
}

export default JobPositions;
