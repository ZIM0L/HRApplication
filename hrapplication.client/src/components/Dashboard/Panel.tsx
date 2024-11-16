import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { ReadLocalStorageUserFromToken } from '../../services/LocalStorageTokenService';
import { Role } from '../../types/Role/Role';
import { useEffect, useState } from 'react';
import { ValidateTokenService } from '../../services/ValidateTokenService';
import { HttpStatusCode } from 'axios';
import { JwtPayload } from 'jwt-decode';

function Panel() {
    const { name } = useParams();
    const mlocalizer = dayjsLocalizer(dayjs);
    const navigate = useNavigate();

    const [decodedToken, setDecodedToken] = useState<JwtPayload | null>();
    const [isCheckingToken, setIsCheckingToken] = useState(true);

    useEffect(() => {
        const checkToken = async () => {
            try {
                const status = await ValidateTokenService();
                if (status === HttpStatusCode.Unauthorized) {
                    navigate("/*");
                    return;
                }

                setDecodedToken(ReadLocalStorageUserFromToken());
            } catch (error) {
                console.error("Error checking token:", error);
                navigate("/auth");
            } finally {
                setIsCheckingToken(false);
            }
        };

        checkToken();
    }, [navigate]);

    if (isCheckingToken) {
        return (
            <div className="flex h-screen items-center justify-center">
                <p>Loading...</p> {/* Możesz dodać spinner */}
            </div>
        );
    }
    if (!decodedToken || decodedToken.role === Role.Guest) {
        return (
            <>
                <div className="flex-1 h-screen space-y-6 overflow-y-auto p-6 lg:ml-1/6">
                 <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Welcome {name} 👋</h2>
                    <button className="rounded bg-dark-blue px-4 py-2 text-xl font-bold text-white">
                        Add New Event
                    </button>
                </div>
                    <div>No access</div>
                </div>
            </>
        )}
    return (
        <div className="flex-1 h-screen space-y-6 overflow-y-auto p-6 lg:ml-1/6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Welcome {name} 👋</h2>
                <button className="rounded bg-dark-blue px-4 py-2 text-xl font-bold text-white">
                    Add New Event
                </button>
            </div>
                <>
                    <Calendar
                        localizer={mlocalizer}
                        startAccessor="start"
                        endAccessor="end"
                    />

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
                                <p>Team Whatever - Members: 15</p>
                            </div>
                            <div className="mt-2 flex h-10 items-center rounded bg-gray-200 p-2">
                                <div className="mr-2 h-6 w-6 rounded-full bg-gray-500"></div>
                                <p>Team Whatever - Members: 15</p>
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
                </>
        </div>
    );
}

export default Panel;
