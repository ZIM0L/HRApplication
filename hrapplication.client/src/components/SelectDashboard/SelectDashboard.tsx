import { ArrowLeftStartOnRectangleIcon, ChevronLeftIcon } from "@heroicons/react/24/solid";
import { useAuth } from "../../contex/AuthContex";
import { useEffect, useState } from "react";
import { GetUsersTeams } from "../../api/TeamAPI";
import { ITeamWithUserPermission } from "../../types/Team/ITeam";
import { UsersIcon } from "@heroicons/react/24/solid";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import CookieFooter from "../CookieFooter/CookieFooter";
import CreateNewTeamModal from "./CreateNewTeamModal";


const SelectDashboard = () => {

    const { decodedToken, setSelectedTeamState, logOut } = useAuth();
    const [teams, setTeams] = useState<ITeamWithUserPermission[] | null>();
    const navigate = useNavigate();
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [isCreateNewTeamModalOpen, setIsCreateNewTeamModalOpen] = useState(false);

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

    const LogOutOfSystem = () => {
        setIsLoggingOut(true);
        setTimeout(() => {
            logOut();
            navigate("/auth", { replace: true });
        }, 1000);
    };
    const RedirectToDashboard = (team: ITeamWithUserPermission) => {
        setSelectedTeamState(team)
        navigate(`/dashboard/${team.team.name.replace(/\s/g, '')}/${decodedToken?.given_name}`);
    }

    if (isLoggingOut) {
        return (
            <div className="flex h-screen items-center justify-center bg-gray-100">
                <h1 className="text-xl font-bold text-gray-600">Logging out...</h1>
            </div>
        );
    }

    return (
        <div className="min-h-screen space-y-8 bg-gray-100">
            <div className="flex justify-between bg-dark-blue p-4 text-white shadow-md">
                <div>
                    <button
                        className=" flex w-full items-center justify-center space-x-4 rounded-md border border-dark-blue p-1 transition-colors duration-200 hover:border-white"
                        onClick={() => LogOutOfSystem()}
                    >
                        <ArrowLeftStartOnRectangleIcon className="h-6 w-6" />
                        <span className="text-sm font-semibold">Log out</span>
                    </button>
                </div>
                <div className="flex gap-4">
                    <button onClick={() => setIsCreateNewTeamModalOpen(true)} className="border-2 rounded-lg border-dark-blue px-4 py-2 transition-all duration-300 ease-in-out hover:text-cyan-blue hover:border-cyan-blue">
                        Create Team
                        </button>
                        <button className="border-2 rounded-lg border-dark-blue px-4 py-2 transition-all duration-300 ease-in-out hover:text-light-red hover:border-light-red">
                        Delete Team
                        </button>
                    </div>
            </div>
            <div className="mx-auto w-3/4 rounded-lg bg-white shadow-md">
                <h1 className="px-6 py-1 text-2xl font-bold">Welcome {decodedToken?.given_name} !</h1>
                <p className="border-b px-6 py-1 text-gray-500">
                    Select the system you want to access.
                </p>
                <div className="divide-y">
                    {teams?.length == 0 ?
                        <div className=" px-6 py-5 text-center">You are not part of any team yet. Please wait for an invitation or create your own team to get started.</div>
                        :
                    teams?.map((org, index) => (
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
                                    <h3 className="flex items-center text-lg font-semibold">
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
                <CreateNewTeamModal
                    isOpen={isCreateNewTeamModalOpen}
                    onClose={() => { setIsCreateNewTeamModalOpen(false) }}
                />
            <CookieFooter />
            </div>
        </div>
    );
};

export default SelectDashboard;
