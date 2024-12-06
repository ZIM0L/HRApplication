import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { useAuth } from "../../contex/AuthContex";
import { useEffect, useState } from "react";
import { GetUsersTeams } from "../../api/TeamAPI";
import { ITeamWithUserPermission } from "../../types/Team/ITeam";
import { UsersIcon } from "@heroicons/react/24/solid";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";


const SelectDashboard = () => {

    const { decodedToken, setSelectedTeam } = useAuth();
    const [teams, setTeams] = useState<ITeamWithUserPermission[] | null>();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = GetUsersTeams();
                response.then(resolve => {
                    if (resolve?.status === 200) {
                        setTeams(resolve.data);
                    }
                })
            } catch (error) {
                console.error("Error message: " + error);
            }
        }
        fetchTeams();
    },[])

    const RedirectToDashboard = (team: ITeamWithUserPermission) => {
        navigate(`/dashboard/${team.team.name.replace(/\s/g, '')}/${decodedToken?.given_name}`);
        setSelectedTeam(team)
    }
    return (
        <div className="min-h-screen space-y-4 bg-gray-100">
            <div className="flex justify-between bg-dark-blue p-4 text-white shadow-md">
                <div>
                    <ChevronLeftIcon className="h-6 w-6 hover:cursor-pointer" onClick={() => { }} />
                </div>
                    <div className="flex gap-4">
                        <button className="rounded-lg bg-cyan-blue px-4 py-2 hover:bg-cyan-blue-hover">
                            Add team
                        </button>
                        <button className="rounded-lg bg-light-red px-4 py-2 hover:bg-red-600">
                            Delete team
                        </button>
                    </div>
            </div>
            <div className="mx-auto rounded-lg bg-white shadow-md">
                <h1 className="px-6 py-2 text-2xl font-bold">Welcome {decodedToken?.given_name} !</h1>
                <p className="border-b px-6 py-2 text-gray-700">
                    Select the system you want to access.
                </p>
                <div className="divide-y">
                    {teams?.map((org, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center justify-between px-6 py-2 hover:bg-gray-50 md:flex-row"
                        >
                            <div className="flex items-center gap-4">
                                <img
                                    src="https://via.placeholder.com/40"
                                    alt="Zoho Logo"
                                    className="h-10 w-10"
                                />
                                <div>
                                    <h3 className="flex items-center gap-2 text-lg font-semibold">
                                        {org.team.name}  
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        Organization ID - {org.team.teamId}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Country - {org.team.country}
                                    </p>
                                </div>
                            </div>
                            <div className="mt-4 flex space-x-4 md:mt-0">
                                <span className="flex items-center gap-2 text-sm text-gray-600">
                                    <UsersIcon className="h-4 w-4" /> {org.roleName}
                                </span>
                                <button onClick={() => RedirectToDashboard(org)}>
                                    <ArrowTopRightOnSquareIcon className="h-5 w-5 transform transition-all duration-300 hover:text-cyan-blue-hover hover:scale-110" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SelectDashboard;
