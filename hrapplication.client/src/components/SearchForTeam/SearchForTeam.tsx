import { ArrowDownIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

const SearchForTeam = () => {

    const [teams, setTeams] = useState<ITeam[]>([]); 

    const toggleDropdown = (id: number | null) => {
        // Jeśli klikniesz ten sam dropdown, zamknie się
        setActiveDropdown((prev) => (prev === id ? null : id));
    };

    useEffect(() => {
        document.title = "Open4Hire | Search Team"
    },[])

    const jobOffers = [
        { id: 1, title: "US Designer", salary: "5000-7000 PLN", tags: ["Remote", "Full-Time"] },
        { id: 2, title: "QA Engineer", salary: "6000-9000 PLN", tags: ["On-Site", "Part-Time"] },
        { id: 3, title: "Frontend Developer", salary: "8000-12000 PLN", tags: ["Hybrid", "Full-Time", "Fusll-Time"] },
    ];
    return (
        <div className="flex min-h-screen w-full flex-col space-y-10 p-8">
            <h2 className="w-fit text-4xl">Job positions</h2>
            <div className="mb-6 flex h-auto w-full flex-col space-y-8 md:space-x-8 md:items-center md:flex-row md:space-y-0">
                <div className="flex h-fit items-center rounded-lg border border-gray-300 px-3 py-2 shadow-md focus:ring-2 focus:ring-blue-500 md:w-1/2">
                    <MagnifyingGlassIcon className="h-6 w-6 hover:cursor" />
                    <input
                        type="text"
                        placeholder="Search by job position, company, keyword"
                        className="ml-2 w-full outline-none"
                    />
                </div>
                <p>
                    You are currently a guest in the application. <br />
                    To fully access and use the platform's features, please join a group.
                </p>
            </div>
            <div>
                <p className="mb-2">{jobOffers.length} Offers have been found.</p>
                {jobOffers.map((offer) => (
                    <div key={offer.id} className="flex-col space-y-3">
                        <div className="border-2 flex flex-col items-start justify-between rounded-lg bg-white p-4 shadow-md md:flex-row md:items-center">
                            {/* Logo */}
                            <div className="flex-shrink-0 flex h-16 w-16 items-center justify-center rounded-lg bg-gray-200">
                                <span className="text-sm text-gray-500">Logo</span>
                            </div>

                            {/* Job Info */}
                            <div className="mx-4 flex-grow">
                                <h3 className="text-lg font-semibold text-gray-800">{offer.title}</h3>
                                <p className="text-sm text-gray-600">Company Name</p>
                                <p className="text-sm text-gray-500">Location</p>
                            </div>


                            {/* Tags */}
                            <div>
                                <div className="w-max-w-full mt-2 flex flex-wrap gap-2 md:mt-0">
                                    {offer.tags.map((tag, index) => (
                                        index < 2 ?
                                            <span
                                                key={index}
                                                className="rounded bg-gray-200 px-2 py-1 text-xs font-medium text-gray-600"
                                            >
                                                {tag}
                                            </span>
                                            : index >= 2 ?
                                                <span
                                                    key={index}
                                                    className="rounded bg-gray-200 px-2 py-1 text-xs font-medium text-gray-600"
                                                >
                                                    ...
                                                </span>
                                                :
                                                null
                                    ))}
                                </div>

                                {/* Dropdown Toggle Button */}
                                <button
                                    className="mt-2 flex items-center justify-center space-x-2 rounded bg-cyan-500 px-2 py-2 text-white hover:bg-cyan-600 focus:outline-none"
                                    onClick={() => toggleDropdown(offer.id)}
                                >
                                    <span>Available positions</span>
                                    <ArrowDownIcon className="h-6 w-6" />
                                </button>

                            </div>
                        </div>
                        {/* Dropdown Menu with Animation */}
                        <div
                            className={`ml-[3%] overflow-hidden transition-all duration-300 w-[97%]  ${activeDropdown === offer.id
                                ? "max-h-40 opacity-100 "
                                : "max-h-0 opacity-0"
                                }`}
                        >
                            <ul className="border-2 mb-2 rounded-lg bg-white py-2 shadow-md">
                                <li className="cursor-pointer px-4 py-2 hover:bg-gray-100">View Details</li>
                                <li className="cursor-pointer px-4 py-2 hover:bg-gray-100">Apply Now</li>
                                <li className="cursor-pointer px-4 py-2 hover:bg-gray-100">Save for Later</li>
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default SearchForTeam;

