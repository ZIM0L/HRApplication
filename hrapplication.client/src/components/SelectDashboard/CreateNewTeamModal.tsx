import { useForm, SubmitHandler } from "react-hook-form";
import { useState, useRef, useEffect } from "react";
import Country from "../../utils/enums/Country"; // Import Country enum
import Industry from "../../utils/enums/Industry"; // Import Industry enum

interface AddJobModalProps {
    isOpen: boolean;
    onClose: () => void;
}

type Inputs = {
    name: string;
    industry: string;
    country: string;
    url?: string;
    email: string;
    address?: string;
    city?: string;
    phoneNumber?: string;
    zipcode?: string;
};

const CreateNewTeamModal: React.FC<AddJobModalProps> = ({ isOpen, onClose }) => {
    const { register, handleSubmit, reset} = useForm<Inputs>();
    const [searchCountry, setSearchCountry] = useState("");
    const [searchIndustry, setSearchIndustry] = useState("");
    const [isCountryDropdownVisible, setIsCountryDropdownVisible] = useState(false);
    const [isIndustryDropdownVisible, setIsIndustryDropdownVisible] = useState(false);
    const [invalidCountry, setInvalidCountry] = useState(false);
    const [invalidIndustry, setInvalidIndustry] = useState(false);

    // Refs to detect clicks outside the dropdown
    const countryInputRef = useRef<HTMLInputElement>(null);
    const industryInputRef = useRef<HTMLInputElement>(null);
    const countryDropdownRef = useRef<HTMLUListElement>(null);
    const industryDropdownRef = useRef<HTMLUListElement>(null);

    // Filtrowanie listy krajów i branż
    const filteredCountries = Object.values(Country).filter(country =>
        country.toLowerCase().includes(searchCountry.toLowerCase())
    );
    const filteredIndustries = Object.values(Industry).filter(industry =>
        industry.toLowerCase().includes(searchIndustry.toLowerCase())
    );

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            validateCountry(searchCountry);
            validateIndustry(searchIndustry);
            console.log("Data submitted:", data);
            //reset();
            onClose(); // Zamknij modal po pomyślnym przesłaniu
        } catch (error) {
            console.error("Error submitting data:", error);
        }
    };

    const validateCountry = (value: string) => {
        if (!filteredCountries.includes(value)) {
            setInvalidCountry(true);
        } else {
            setInvalidCountry(false);
        }
    };

    const validateIndustry = (value: string) => {
        if (!filteredIndustries.includes(value)) {
            setInvalidIndustry(true);
        } else {
            setInvalidIndustry(false);
        }
    };

    // Detect clicks outside the input/dropdown
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                (countryInputRef.current && !countryInputRef.current.contains(e.target as Node)) &&
                (countryDropdownRef.current && !countryDropdownRef.current.contains(e.target as Node))
            ) {
                setIsCountryDropdownVisible(false);
            }
            if (
                (industryInputRef.current && !industryInputRef.current.contains(e.target as Node)) &&
                (industryDropdownRef.current && !industryDropdownRef.current.contains(e.target as Node))
            ) {
                setIsIndustryDropdownVisible(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="w-[90%] max-w-4xl rounded-lg bg-white p-6 shadow-lg">
                <div className="mb-4">
                    <p className="text-lg font-semibold">Create new team</p>
                    <p className="text-sm font-semibold text-gray-500">By creating a team, you will automatically be assigned the role of Administrator.</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="grid-cols-1 grid gap-4 sm:grid-cols-2">
                    {/* Name */}
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            {...register("name", { required: true })}
                            type="text"
                            required
                            placeholder="Enter name"
                            className="w-full rounded-md border border-gray-300 px-4 py-2"
                        />
                    </div>

                    {/* Industry */}
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Industry <span className="text-red-500">*</span>
                        </label>
                        <input
                            ref={industryInputRef}
                            type="text"
                            placeholder="Search industry"
                            value={searchIndustry}
                            onFocus={() => setIsIndustryDropdownVisible(true)}
                            onChange={(e) => { setSearchIndustry(e.target.value); setInvalidIndustry(false)}}
                            className="w-full rounded-md border border-gray-300 px-4 py-2 mb-2"
                        />
                        {isIndustryDropdownVisible && (
                            <ul
                                ref={industryDropdownRef}
                                className="absolute max-h-36 overflow-y-auto rounded-md border border-gray-300 bg-white p-2"
                                style={{ maxHeight: "180px" }} // Ustawiłem wysokość na 180px (ok. 3 elementów)
                            >
                                {filteredIndustries.length > 0 ? (
                                    filteredIndustries.map((industry) => (
                                        <li
                                            key={industry}
                                            onClick={() => {
                                                setSearchIndustry(industry);
                                                setIsIndustryDropdownVisible(false);
                                            }}
                                            className="cursor-pointer py-1 px-2 hover:bg-gray-200"
                                        >
                                            {industry}
                                        </li>
                                    ))
                                ) : (
                                    <li className="text-gray-500">No matching industries</li>
                                )}
                            </ul>
                        )}
                        {invalidIndustry && (
                            <p className="text-xs text-red-500">Invalid industry. Please choose a valid option from the list.</p>
                        )}
                    </div>

                    {/* Country */}
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Country <span className="text-red-500">*</span>
                        </label>
                        <input
                            ref={countryInputRef}
                            type="text"
                            placeholder="Search country"
                            value={searchCountry}
                            onFocus={() => setIsCountryDropdownVisible(true)}
                            onChange={(e) => { setSearchCountry(e.target.value); setInvalidCountry(false) }}
                            className="w-full relative rounded-md border border-gray-300 px-4 py-2 mb-2"
                        />
                        {isCountryDropdownVisible && (
                            <ul
                                ref={countryDropdownRef}
                                className="absolute max-h-36 overflow-y-auto rounded-md border border-gray-300 bg-white p-2"
                                style={{ maxHeight: "180px" }} // Ustawiłem wysokość na 180px (ok. 3 elementów)
                            >
                                {filteredCountries.length > 0 ? (
                                    filteredCountries.map((country) => (
                                        <li
                                            key={country}
                                            onClick={() => {
                                                setSearchCountry(country);
                                                setIsCountryDropdownVisible(false);
                                            }}
                                            className="cursor-pointer py-1 px-2 hover:bg-gray-200"
                                        >
                                            {country}
                                        </li>
                                    ))
                                ) : (
                                    <li className="text-gray-500">No matching countries</li>
                                )}
                            </ul>
                        )}
                        {invalidCountry && (
                            <p className="text-xs text-red-500">Invalid country. Please choose a valid option from the list.</p>
                        )}
                    </div>

                    {/* URL */}
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">Website URL</label>
                        <input
                            {...register("url")}
                            type="url"
                            placeholder="Enter website URL"
                            className="w-full rounded-md border border-gray-300 px-4 py-2"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Email <span className="text-red-500">*</span>
                        </label>
                        <input
                            {...register("email", {
                                required: true,
                                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            })}
                            type="email"
                            placeholder="Enter email"
                            className="w-full rounded-md border border-gray-300 px-4 py-2"
                        />
                    </div>

                    {/* Address */}
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">Address</label>
                        <input
                            {...register("address")}
                            type="text"
                            placeholder="Enter address"
                            className="w-full rounded-md border border-gray-300 px-4 py-2"
                        />
                    </div>

                    {/* City */}
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">City</label>
                        <input
                            {...register("city")}
                            type="text"
                            placeholder="Enter city"
                            className="w-full rounded-md border border-gray-300 px-4 py-2"
                        />
                    </div>

                    {/* Phone Number */}
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">Phone Number</label>
                        <input
                            {...register("phoneNumber")}
                            type="text"
                            placeholder="Enter phone number"
                            className="w-full rounded-md border border-gray-300 px-4 py-2"
                        />
                    </div>

                    {/* Zipcode */}
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">Zipcode</label>
                        <input
                            {...register("zipcode")}
                            type="text"
                            placeholder="Enter zipcode"
                            className="w-full rounded-md border border-gray-300 px-4 py-2"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="col-span-1 flex justify-end sm:col-span-2">
                        <button
                            type="submit"
                            className="mr-2 rounded-md bg-cyan-blue px-4 py-2 text-white hover:bg-cyan-blue-hover"
                        >
                            Create Team
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-md bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateNewTeamModal;
