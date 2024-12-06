import { useAuth } from '../../contex/AuthContex';
import SearchForTeam from '../SearchForTeam/SearchForTeam';
import WorkSchedule from './WorkSchedule';

function Panel() {
    const { decodedToken, isCheckingToken } = useAuth();

    if (isCheckingToken) {
        return (
            <div className="flex h-screen items-center justify-center">
                <p>Loading...</p>
            </div>
        );
    }

    if (!decodedToken) {
        return <SearchForTeam />;
    }

    return (
        <div className="min-h-screen w-full overflow-y-auto bg-gray-100">
            {/* Górny pasek */}
            <div className="flex items-center justify-between bg-dark-blue px-6 py-4 text-white">
                <span className="text-sm">Dobry wieczór, {decodedToken.given_name} {decodedToken.family_name}</span>
            </div>

            {/* Główna sekcja */}
            <div className="flex p-6">
                <div className="flex flex-col space-y-4 md:w-1/3 md:mr-6">
                    {/* Profil użytkownika */}
                    <div className="flex flex-col items-center rounded-lg bg-white p-6 shadow">
                        <img
                            src="https://via.placeholder.com/80"
                            alt="User"
                            className="mb-4 h-20 w-20 rounded-full"
                        />
                        <h2 className="text-lg font-semibold">{decodedToken.given_name} {decodedToken.family_name}</h2>
                        <p className="text-red-500">Jeszcze nie zameldowano</p>
                        <div className="mt-4">
                            <div className="text-2xl font-bold">00 : 00 : 00</div>
                            <button className="mt-2 rounded bg-green-500 px-4 py-2 text-white">
                                Rozpoczęcie pracy
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col rounded-lg bg-white p-6 text-left shadow">
                        <p className="text-lg">Team members</p>
                        <p className="text-sm text-gray-400"> No member has been found</p>
                    </div>
                </div>

                {/* Informacje i harmonogram */}
                <div className="flex flex-col md:w-2/3">
                    <WorkSchedule />
                    {/* Harmonogram pracy */}
                    <div>
                        <div className="mb-6 flex flex-col rounded-lg bg-white p-6 shadow">
                            <h3 className="mb-4 text-lg font-semibold">Harmonogram pracy</h3>
                            <div className="flex flex-col rounded-lg bg-gray-100 p-4">
                                <div className="flex justify-between">
                                    <span className="text-sm">01-Dec-2024 - 07-Dec-2024</span>
                                    <span className="text-sm text-blue-500">General</span>
                                </div>
                                <div className="mt-2 text-sm">
                                    9:00 PRZED POŁUDNIEM - 6:00 PO POŁUDNIU
                                </div>
                            </div>
                        </div>

                        {/* Wiadomości i inne */}
                        <div className="flex rounded-lg bg-white p-6 shadow">
                            <p className="text-sm text-orange-500">
                                Musisz jeszcze dziś przesłać swoje rejestry czasu pracy!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Panel;
