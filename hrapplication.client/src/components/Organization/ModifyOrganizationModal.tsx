import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import DeleteTeamModal from "./DeleteTeamModal";
import { ITeam } from "../../types/Team/ITeam";
import { DeleteTeamPermanently } from "../../api/TeamAPI";
import { useAuth } from "../../contex/AuthContex";
import { useNavigate } from "react-router-dom";
import Notification from "../Notification/Notification";
import ConfirmChangeModal from "./ConfirmChangesModal"; // Importing the new modal

interface ModifyOrganizationProp {
    isOpen: boolean;
    onClose: () => void;
    team: ITeam | null; // Receive team data from parent
}

interface Inputs {
    name: string;
    industry: string;
    country: string;
    url: string;
    email: string;
    city: string;
    address: string;
    phoneNumber: string;
    zipCode: string;
}

const ModifyOrganizationModal = ({ isOpen, onClose, team }: ModifyOrganizationProp) => {
    const { register, handleSubmit, setValue, watch, reset } = useForm<Inputs>();
    const { selectedTeam } = useAuth();
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState<string[]>([]);
    const [showNotification, setShowNotification] = useState(false);
    const [isError, setIsError] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false); 
    const [changes, setChanges] = useState<{ [key: string]: string }>({}); 
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            setShowConfirmModal(false)
            onClose();
        } catch (error) {
            console.error("Adding new record error:", error);
        }
    };

    const handleClose = () => {
        onClose();
        reset(team ? {
            name: team.name,
            industry: team.industry,
            country: team.country,
            city: team.city,
            address: team.address,
            url: team.url,
            email: team.email,
            phoneNumber: team.phoneNumber,
            zipCode: team.zipCode,
        } : {});
    };

    useEffect(() => {
        if (team) {
            setValue("name", team.name);
            setValue("industry", team.industry);
            setValue("country", team.country);
            setValue("city", team.city);
            setValue("address", team.address);
            setValue("url", team.url);
            setValue("email", team.email);
            setValue("phoneNumber", team.phoneNumber);
            setValue("zipCode", team.zipCode);
        }
    }, [team, setValue]);

    useEffect(() => {
        const formData = watch();
        const newChanges: { [key: string]: string } = {};

        Object.keys(formData).forEach((key) => {
            if (formData[key as keyof Inputs] !== team?.[key as keyof ITeam]) {
                newChanges[key] = formData[key as keyof Inputs];
            }
        });

    }, [watch, team]); 

    const handleSaveChanges = () => {
        const formData = watch();
        const newChanges: { [key: string]: string } = {};

        Object.keys(formData).forEach((key) => {
            if (formData[key as keyof Inputs] !== team?.[key as keyof ITeam]) {
                newChanges[key] = formData[key as keyof Inputs];
            }
        });

        if (Object.keys(newChanges).length >= 1) {


            setChanges(newChanges);
            setShowConfirmModal(true);
        } else {
            setIsError(true)
            setNotificationMessage(["No changes have been made"])
            setShowNotification(true)
        }
    };


    const handleDelete = async () => {
        if (!selectedTeam) return null;
        try {
            const result = await DeleteTeamPermanently(selectedTeam.team.teamId);
            if (result?.status == 200) {
                setShowNotification(true);
                setNotificationMessage(["You will be redirected to organization tab"]);
                setTimeout(() => {
                    navigate("/organizations");
                }, 4000);
            }
        } catch (err) {
            setIsError(true);
            setShowNotification(true);
            if (err instanceof Error) {
                setNotificationMessage(err.message.split(" | "));
            }
        }
    };

    return (
        <div
            className={`fixed justify-center md:justify-end inset-0 z-50 flex items-center ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                } bg-gray-900 bg-opacity-50 transition-opacity duration-300`}
        >
            <div
                className={`md:h-full md:w-[40%] bg-white px-4 py-2 shadow-lg rounded-none md:rounded-l-lg transition-transform duration-500 transform ${isOpen ? "translate-x-0" : "translate-x-full"
                    } md:ml-auto`}
            >
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-lg font-semibold">Modifying Organization</h2>
                    </div>

                    {/* Form fields with labels */}
                    <div className=" space-y-1">
                        <div className="col-span-1 sm:col-span-2">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Name of Organization
                            </label>
                            <input
                                {...register("name", { required: true, maxLength: 255 })}
                                type="text"
                                id="name"
                                required
                                placeholder="Name of organization"
                                className="w-full rounded-md border border-gray-300 px-4 py-2"
                            />
                        </div>

                        <div>
                            <label htmlFor="industry" className="block text-sm font-medium text-gray-700">
                                Industry
                            </label>
                            <input
                                {...register("industry", { required: true, maxLength: 255 })}
                                type="text"
                                id="industry"
                                required
                                placeholder="Industry"
                                className="w-full rounded-md border border-gray-300 px-4 py-2"
                            />
                        </div>

                        <div>
                            <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                Country
                            </label>
                            <input
                                {...register("country", { required: true, maxLength: 255 })}
                                type="text"
                                id="country"
                                required
                                placeholder="Country"
                                className="w-full rounded-md border border-gray-300 px-4 py-2"
                            />
                        </div>

                        <div>
                            <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                                City
                            </label>
                            <input
                                {...register("city", { maxLength: 255 })}
                                type="text"
                                id="city"
                                placeholder="City"
                                className="w-full rounded-md border border-gray-300 px-4 py-2"
                            />
                        </div>

                        <div>
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                                Address
                            </label>
                            <input
                                {...register("address", { maxLength: 255 })}
                                type="text"
                                id="address"
                                placeholder="Address"
                                className="w-full rounded-md border border-gray-300 px-4 py-2"
                            />
                        </div>

                        <div>
                            <label htmlFor="url" className="block text-sm font-medium text-gray-700">
                                Website URL
                            </label>
                            <input
                                {...register("url", { maxLength: 255 })}
                                type="text"
                                id="url"
                                placeholder="Website URL"
                                className="w-full rounded-md border border-gray-300 px-4 py-2"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                {...register("email", { maxLength: 255 })}
                                type="email"
                                id="email"
                                placeholder="Email"
                                className="w-full rounded-md border border-gray-300 px-4 py-2"
                            />
                        </div>

                        <div>
                            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                                Phone Number
                            </label>
                            <input
                                {...register("phoneNumber", { maxLength: 12,})}
                                type="text"
                                id="phoneNumber"
                                placeholder="Phone Number"
                                className="w-full rounded-md border border-gray-300 px-4 py-2"
                               
                                onInput={(e) => {
                                    e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, "");
                                    if (e.currentTarget.value.length > 12) {
                                        e.currentTarget.value = e.currentTarget.value.slice(0, 12);
                                    }
                                }}
                            />
                        </div>

                        <div>
                            <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
                                Zip Code
                            </label>
                            <input
                                {...register("zipCode", { maxLength: 10 })}
                                type="text"
                                id="zipCode"
                                placeholder="Zip Code"
                                className="w-full rounded-md border border-gray-300 px-4 py-2"
                            />
                        </div>
                    </div>
                </form>

                <div className="mt-4 flex justify-end space-x-3">
                    <button
                        type="button"
                        className="text-flex-nowrap rounded-md bg-cyan-blue px-4 text-white hover:bg-cyan-blue-hover"
                        onClick={handleSaveChanges} 
                    >
                        Save Changes
                    </button>
                    <button
                        className="rounded-md bg-gray-400 px-4 py-2 text-white hover:bg-gray-600"
                        onClick={handleClose}
                    >
                        Cancel
                    </button>
                </div>
                <div className="mt-2 w-full text-right">
                    <button
                        className="rounded-lg bg-light-red px-2 py-1 text-sm text-white hover:bg-red-600"
                        type="button"
                        onClick={() => setIsDeleteModalOpen(true)}
                    >
                        Disband Team
                    </button>
                </div>
            </div>

            {selectedTeam?.roleName == "Administrator" ? 
            <>
                <DeleteTeamModal
                    isOpen={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                    onDelete={handleDelete}
                    teamName={team?.name || ""}
                />

                <ConfirmChangeModal
                    isOpen={showConfirmModal}
                    onClose={() => setShowConfirmModal(false)}
                    onConfirm={handleSubmit(onSubmit)}
                    changes={changes} // Passing the changes to confirm modal
                />
            </>
            : null}

            {/* Notification */}
            {showNotification && (
                <Notification
                    messages={notificationMessage}
                    onClose={() => setShowNotification(false)}
                    isError={isError}
                />
            )}
        </div>
    );
};

export default ModifyOrganizationModal;
