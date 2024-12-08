import { Link, Outlet, useNavigate } from 'react-router-dom';
import { ArrowLeftStartOnRectangleIcon, ListBulletIcon, Squares2X2Icon } from '@heroicons/react/24/solid';
import { BriefcaseIcon } from '@heroicons/react/24/solid';
import { NewspaperIcon } from '@heroicons/react/24/solid';
import { useAuth } from '../../contex/AuthContex';
import LogoSVG from '../LogoSVG/LogoSVG';
import { useState } from 'react';
import { UserGroupIcon } from '@heroicons/react/24/solid';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/solid';
import { UsersIcon } from '@heroicons/react/24/solid';
import { RectangleStackIcon } from '@heroicons/react/24/solid';
import { TableCellsIcon } from '@heroicons/react/24/solid';
 
const Dashboard: React.FC = () => {
    const { logOut, decodedToken, setSelectedTeamState, selectedTeam } = useAuth();
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const navigate = useNavigate();

    const LogOutOfSystem = () => {
        setIsLoggingOut(true);
        setTimeout(() => {
            logOut(); 
            navigate("/auth", { replace: true }); 
        }, 1000); 
    };
    if (isLoggingOut) {
        return (
            <div className="flex h-screen items-center justify-center bg-gray-100">
                <h1 className="text-xl font-bold text-gray-600">Logging out...</h1>
            </div>
        );
    }
    if (!selectedTeam) {
        return <div>No team</div>
    }

    const onChangeTeam = () => {
        setSelectedTeamState(null)
        navigate("/organizations")
    }

    return (
        <div className="flex h-[100vh] w-full flex-col bg-white md:overflow-hidden md:flex-row">
            {/* Sidebar */}
            <div className="flex flex-col justify-between bg-dark-blue p-4 text-white">
                <div>
                    <div className="space-y-4 text-xl">
                        <LogoSVG width={140}/>
                        <div>
                            <Link to="panel">
                                <div className="group relative flex items-center space-x-4 overflow-hidden rounded-lg dark:text-white">
                                    <Squares2X2Icon className="h-6 w-6" />
                                    <span className="z-10 relative text-sm">Dashboard</span>
                                    <div className="translate-x-[-120%] group-hover:translate-x-6 absolute inset-0 transform bg-gray-200 transition-transform duration-300 dark:bg-gray-700"></div>
                                </div>
                            </Link>
                        </div>
                        {
                            !decodedToken ? null : (
                                <>
                                    <div>
                                        <Link to="team">
                                            <div className="group relative flex items-center space-x-4 overflow-hidden rounded-lg dark:text-white">
                                                <UserGroupIcon className="h-6 w-6" />
                                                <span className="z-10 relative text-sm">Team</span>
                                                <div className="translate-x-[-120%] group-hover:translate-x-6 absolute inset-0 transform bg-gray-200 transition-transform duration-300 dark:bg-gray-700"></div>
                                            </div>
                                        </Link>
                                    </div>
                                    <div>
                                        <Link to="job_positions">
                                            <div className="group relative flex items-center space-x-4 overflow-hidden rounded-lg dark:text-white">
                                                <UsersIcon className="h-6 w-6" />
                                                <span className="z-10 relative text-sm">Aplications</span>
                                                <div className="translate-x-[-120%] group-hover:translate-x-6 absolute inset-0 transform bg-gray-200 transition-transform duration-300 dark:bg-gray-700"></div>
                                            </div>
                                        </Link>
                                    </div>
                                    <div>
                                        <Link to="job_positions">
                                            <div className="group relative flex items-center space-x-4 overflow-hidden rounded-lg dark:text-white">
                                                <BriefcaseIcon className="h-6 w-6" />
                                                <span className="z-10 relative text-sm">Job Positions</span>
                                                <div className="translate-x-[-120%] group-hover:translate-x-6 absolute inset-0 transform bg-gray-200 transition-transform duration-300 dark:bg-gray-700"></div>
                                            </div>
                                        </Link>
                                    </div>
                                    <div>
                                        <Link to="organization">
                                            <div className="group relative flex items-center space-x-4 overflow-hidden rounded-lg dark:text-white">
                                                <NewspaperIcon className="h-6 w-6" />
                                                <span className="z-10 relative text-sm">Organization</span>
                                                <div className="translate-x-[-120%] group-hover:translate-x-6 absolute inset-0 transform bg-gray-200 transition-transform duration-300 dark:bg-gray-700"></div>
                                            </div>
                                        </Link>
                                    </div>
                                    <div>
                                        <Link to="organization">
                                            <div className="group relative flex items-center space-x-4 overflow-hidden rounded-lg dark:text-white">
                                                <TableCellsIcon className="h-6 w-6" />
                                                <span className="z-10 relative text-sm">Shifts</span>
                                                <div className="translate-x-[-120%] group-hover:translate-x-6 absolute inset-0 transform bg-gray-200 transition-transform duration-300 dark:bg-gray-700"></div>
                                            </div>
                                        </Link>
                                    </div>
                                    <div>
                                        <Link to="organization">
                                            <div className="group relative flex items-center space-x-4 overflow-hidden rounded-lg dark:text-white">
                                                <RectangleStackIcon className="h-6 w-6" />
                                                <span className="z-10 relative text-sm">Requests</span>
                                                <div className="translate-x-[-120%] group-hover:translate-x-6 absolute inset-0 transform bg-gray-200 transition-transform duration-300 dark:bg-gray-700"></div>
                                            </div>
                                        </Link>
                                    </div>
                                    <div>
                                        <Link to="organization">
                                            <div className="group relative flex items-center space-x-4 overflow-hidden rounded-lg dark:text-white">
                                                <ListBulletIcon className="h-6 w-6" />
                                                <span className="z-10 relative text-sm">Tasks</span>
                                                <div className="translate-x-[-120%] group-hover:translate-x-6 absolute inset-0 transform bg-gray-200 transition-transform duration-300 dark:bg-gray-700"></div>
                                            </div>
                                        </Link>
                                    </div> <div>
                                        <Link to="organization">
                                            <div className="group relative flex items-center space-x-4 overflow-hidden rounded-lg dark:text-white">
                                                <QuestionMarkCircleIcon className="h-6 w-6" />
                                                <span className="z-10 relative text-sm">Questions</span>
                                                <div className="translate-x-[-120%] group-hover:translate-x-6 absolute inset-0 transform bg-gray-200 transition-transform duration-300 dark:bg-gray-700"></div>
                                            </div>
                                        </Link>
                                    </div>
                                </>
                            )
                        }

                    </div>
                </div>
                <div className="mt-6 text-center">
                    <button
                        className="my-4 flex w-full items-center justify-center space-x-4 rounded-md border border-dark-blue p-1 transition-colors duration-200 hover:border-white"
                        onClick={() => LogOutOfSystem()}
                    >
                        <ArrowLeftStartOnRectangleIcon className="h-6 w-6" />
                        <span className="text-sm font-semibold">Log out</span>
                    </button>
                </div>
            </div>
            <div className="flex w-full flex-col">
                {/* Górny pasek powitania */}
                {decodedToken && (
                    <div className="flex h-fit items-center justify-between bg-dark-blue px-4 py-2 text-white">
                        <span className="text-sm">Dobry wieczór, {decodedToken.given_name} {decodedToken.family_name}</span>
                        <div className="relative flex items-center space-x-2">
                            <div className="group relative flex flex-col items-center">
                                <button onClick={() => onChangeTeam()}>
                                    <ArrowLeftStartOnRectangleIcon className="h-6 w-6 hover:cursor-pointer" />
                                </button>
                                <span className="opacity-0 group-hover:opacity-100 absolute top-8 whitespace-nowrap bg-dark-blue px-2 py-1 text-sm text-white transition-opacity">
                                    Change Team
                                </span>
                            </div>
                            <img
                                src="https://via.placeholder.com/40"
                                alt="User"
                                className="h-8 w-8 rounded-full"
                            />
                        </div>
                    </div>
                )}
                        <div className="border-2 w-full px-4 py-2 text-sm text-gray-500">{selectedTeam.team.name}</div>
                {/* Main */}
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;