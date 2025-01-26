import { PencilSquareIcon } from "@heroicons/react/24/solid";
import ModifyOrganizationModal from "./ModifyOrganizationModal";
import { useState } from "react";
import { useAuth } from "../../contex/AppContex";

function Organization() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { selectedTeam, teamInformation } = useAuth();

    return (
        <>
            <div className="w-full space-y-6 rounded-lg bg-white p-6 shadow-lg">
                {/* Top section - Basic Info */}
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold text-gray-800">Organization Information</h1>
                    {selectedTeam?.roleName == "Administrator" ? 
                        <button
                            className="border-2 rounded-lg border-white p-2 transition hover:border-gray-500"
                            onClick={() => setIsModalOpen(true)}
                        >
                            <PencilSquareIcon className="h-6 w-6" />
                        </button>
                    : null}
                </div>

                {/* Basic Info Section */}
                <div className="border-2 flex flex-col items-center space-y-4 rounded-lg bg-gray-50 p-6 md:flex-row md:space-y-0 md:space-x-6">
                    {/* Icon */}
                        <img
                            src={teamInformation?.TeamProfileSrc ? teamInformation?.TeamProfileSrc : ""}
                            alt="User"
                            className="border-2 mb-4 h-20 w-20 rounded-full border-gray-400"
                        />

                    {/* Organizational Info */}
                    <div className="text-center md:text-left">
                        <h2 className="text-xl font-bold text-gray-800">{selectedTeam?.team?.name}</h2>
                        <p className="text-sm text-gray-600">
                            Industry: <span className="font-medium">{selectedTeam?.team?.industry}</span>
                        </p>
                        <p className="text-sm text-gray-600">
                            Country: <span className="font-medium">{selectedTeam?.team?.country}</span>
                        </p>
                        <p className="text-sm text-gray-600">
                            Website:{" "}
                            {selectedTeam?.team?.url ?
                            <a
                                href={`${selectedTeam?.team?.url}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 underline"
                                >
                                    {selectedTeam?.team?.url}
                            </a>
                            : "Not provided"}
                        </p>
                    </div>
                </div>

                {/* Bottom Section - Contact Info */}
                <div className="border-2 rounded-lg bg-gray-50 p-6">
                    <h2 className="mb-4 text-lg font-semibold text-gray-800">Contact Information</h2>
                    <div className="grid-cols-1 grid gap-y-2 text-sm text-gray-600 md:grid-cols-2 md:gap-x-6">
                        <p>
                            Email: <span className="font-medium">{selectedTeam?.team?.email}</span>
                        </p>
                        <p>
                            Address: <span className="font-medium">{selectedTeam?.team?.address}</span>
                        </p>
                        <p>
                            City: <span className="font-medium">{selectedTeam?.team?.city}</span>
                        </p>
                        <p>
                            Postal Code:{" "}
                            <span className="font-medium">
                                {selectedTeam?.team?.zipCode?.slice(0, 2)}{selectedTeam?.team?.zipCode?.slice(2)}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            {selectedTeam?.roleName == "Administrator" ?
                <ModifyOrganizationModal
                    isOpen={isModalOpen}
                    onClose={() => { setIsModalOpen(false); }}
                    team={selectedTeam?.team} // Pass team info as a prop
                />
                : null}
        </>
    );
}

export default Organization;
