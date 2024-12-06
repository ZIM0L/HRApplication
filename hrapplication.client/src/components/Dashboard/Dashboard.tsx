import { Link, Outlet, useNavigate } from 'react-router-dom';
import { ArrowLeftStartOnRectangleIcon, HomeIcon } from '@heroicons/react/24/solid';
import { BriefcaseIcon } from '@heroicons/react/24/solid';
import { NewspaperIcon } from '@heroicons/react/24/solid';
import { useAuth } from '../../contex/AuthContex';
import LogoSVG from '../LogoSVG/LogoSVG';
import { useState } from 'react';
 
const Dashboard: React.FC = () => {
    const { logOut, decodedToken } = useAuth();
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

    return (
        <div className="flex h-[100vh] flex-col bg-white md:flex-row">
            {/* Sidebar */}
            <div className="flex flex-col justify-between bg-dark-blue p-4 text-white md:w-[160px]">
                <div>
                    <div className="space-y-4 text-xl">
                        <LogoSVG width={140}/>
                        <div>
                            <Link to="panel">
                                <div className="group relative flex items-center space-x-4 overflow-hidden rounded-lg dark:text-white">
                                    <HomeIcon className="h-6 w-6" />
                                    <span className="z-10 relative text-sm">Home</span>
                                    <div className="translate-x-[-120%] group-hover:translate-x-6 absolute inset-0 transform bg-gray-200 transition-transform duration-300 dark:bg-gray-700"></div>
                                </div>
                            </Link>
                        </div>
                        {
                            !decodedToken ? null : (
                                <>
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
            {/* Main */}
            <Outlet />
        </div>
    );
};

export default Dashboard;