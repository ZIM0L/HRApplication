//import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../../contex/AuthContex';
import { useNavigate } from 'react-router-dom';
import { HttpStatusCode } from 'axios';
import { ValidateToken } from '../../services/ValidateToken';

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const authToken = useAuth();

    useEffect(() => {
        const checkToken = async () => {
            const status = await ValidateToken();
            console.log("Token status:", status);
                
            if (status === HttpStatusCode.Unauthorized) {
                navigate("/auth"); // maybe smth else 
            }
        };
            
        checkToken();
    });

    return (
        <div className="flex h-[100vh] bg-gray-100">
            {/* Sidebar */}
            <div className="flex w-20 flex-col justify-between bg-gray-800 p-4 text-white lg:w-1/6">
                <div>
                    <h1 className="mb-8 text-lg font-bold text-teal-300">HrApp</h1>
                    <div className="space-y-4">
                        <div className="rounded bg-gray-700 p-2">Applications <span className="ml-2 rounded-full bg-red-500 px-2 text-xs">2</span></div>
                        <div className="rounded bg-gray-700 p-2">Applications</div>
                        <div className="rounded bg-gray-700 p-2">Applications</div>
                        <div className="rounded bg-gray-700 p-2">Applications</div>
                        <div className="rounded bg-gray-700 p-2">Applications</div>
                    </div>
                </div>
                <div className="mt-6 text-center">
                    <div className="mx-auto mb-2 h-12 w-12 rounded-full bg-gray-500"></div>
                    <p className="text-sm">Adrian Z.</p>
                    <p className="text-xs text-gray-400">Role: HR</p>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 h-screen space-y-6 overflow-y-auto p-6 lg:ml-1/6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Welcome Adrian 👋</h2>
                    <button className="rounded bg-teal-500 px-4 py-2 text-white">Add New Event</button>
                </div>

                {/* Calendar Placeholder */}
                <div className="flex h-64 items-center justify-center rounded-lg bg-gray-300">
                    <p className="text-gray-500">Big Calendar</p>
                </div>

                {/* Upcoming Events and Active Courses */}
                <div className="grid-cols-1 grid gap-6 md:grid-cols-2">
                    <div className="rounded-lg bg-white p-4 shadow">
                        <h3 className="mb-4 text-lg font-semibold">Upcoming Events</h3>
                        <div className="mb-2 h-16 rounded bg-gray-200"></div>
                        <div className="mb-2 h-16 rounded bg-gray-200"></div>
                        <div className="mb-2 h-16 rounded bg-gray-200"></div>
                    </div>

                    <div className="rounded-lg bg-white p-4 shadow">
                        <h3 className="mb-4 text-lg font-semibold">Active Courses</h3>
                        <div className="mb-2 h-16 rounded bg-gray-200"></div>
                        <div className="mb-2 h-16 rounded bg-gray-200"></div>
                        <div className="mb-2 h-16 rounded bg-gray-200"></div>
                    </div>
                </div>

                {/* Right Side Section */}
                <div className="grid-cols-1 grid gap-6 md:grid-cols-2">
                    <div className="rounded-lg bg-white p-4 shadow">
                        <h3 className="text-lg font-semibold">Incoming Applications</h3>
                        <div className="mt-4 flex space-x-4">
                            <div className="h-12 w-12 rounded-full bg-gray-300"></div>
                            <div className="h-12 w-12 rounded-full bg-gray-300"></div>
                            <div className="h-12 w-12 rounded-full bg-gray-300"></div>
                        </div>
                    </div>

                    <div className="rounded-lg bg-white p-4 shadow">
                        <h3 className="text-lg font-semibold">Teams</h3>
                        <button className="mt-2 text-teal-500">View all</button>
                        <div className="mt-4 flex h-10 items-center rounded bg-gray-200 p-2">
                            <div className="mr-2 h-6 w-6 rounded-full bg-gray-500"></div>
                            <p>Team whateverr - Members: 15</p>
                        </div>
                        <div className="mt-2 flex h-10 items-center rounded bg-gray-200 p-2">
                            <div className="mr-2 h-6 w-6 rounded-full bg-gray-500"></div>
                            <p>Team whateverr - Members: 15</p>
                        </div>
                    </div>

                    <div className="col-span-1 rounded-lg bg-white p-4 shadow md:col-span-2">
                        <h3 className="text-lg font-semibold">Daily Schedule</h3>
                        <div className="mt-2 flex h-10 items-center rounded bg-gray-200 p-2">
                            <div className="mr-2 h-6 w-6 rounded-full bg-teal-500"></div>
                            <p>Design Whatever - Type: Test</p>
                        </div>
                        <div className="mt-2 flex h-10 items-center rounded bg-gray-200 p-2">
                            <div className="mr-2 h-6 w-6 rounded-full bg-teal-500"></div>
                            <p>Design Whatever - Type: Test</p>
                        </div>
                        <div className="mt-2 flex h-10 items-center rounded bg-gray-200 p-2">
                            <div className="mr-2 h-6 w-6 rounded-full bg-teal-500"></div>
                            <p>Design Whatever - Type: Test</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;