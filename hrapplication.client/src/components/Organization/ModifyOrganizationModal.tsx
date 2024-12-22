import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { IOrganization } from "../../types/Organization/IOrganization";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

interface ModifyOrganizationProp {
    isOpen: boolean;
    onClose: () => void;
}

interface Inputs {
    name: string;
    industry: string;
    country: string;
    url: string;
    email: string;
    city: string;
    phoneNumber: string;
    zipCode: string;
}

const ModifyOrganizationModal = ({ isOpen, onClose }: ModifyOrganizationProp) => {
    const { register, handleSubmit } = useForm<Inputs>();
    const [organization, setOrganization] = useState<IOrganization>({
        name: "",
        industry: "",
        country: "",
        city: "",
        url: "",
        email: "",
        phoneNumber: "",
        zipCode: "",
    });

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            console.log(data);
            onClose(); // Close modal after submitting
        } catch (error) {
            console.error("Adding new record error:", error);
        }
    };

    const handleClose = () => {
            onClose();
    };

    useEffect(() => {
        if (!isOpen) {
            setOrganization({
                name: "",
                industry: "",
                country: "",
                city: "",
                url: "",
                email: "",
                phoneNumber: "",
                zipCode: "",
            });
        }
    }, [isOpen]);

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-end bg-gray-900 bg-opacity-50 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
        >
            <div
                className={`h-full w-1/3 bg-white p-6 shadow-lg rounded-l-lg transition-transform duration-500 transform ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-lg font-semibold">Modifying Organization</h2>
                        <button className="text-green-500" type="submit">
                            <CheckCircleIcon className="h-10 w-10" />
                        </button>
                    </div>

                    {/* Inputs for modifying organization */}
                    <input
                        {...register("name", { required: true, maxLength: 255 })}
                        type="text"
                        placeholder="Name of organization"
                        className="w-full rounded-md border border-gray-300 px-4 py-2"
                        onChange={(e) => setOrganization({ ...organization, name: e.target.value })}
                    />
                    {/* Other input fields */}
                    <input
                        {...register("industry", { required: true, maxLength: 255 })}
                        type="text"
                        placeholder="Industry"
                        className="w-full rounded-md border border-gray-300 px-4 py-2"
                        onChange={(e) => setOrganization({ ...organization, industry: e.target.value })}
                    />
                    <input
                        {...register("country", { required: true, maxLength: 255 })}
                        type="text"
                        placeholder="Country"
                        className="w-full rounded-md border border-gray-300 px-4 py-2"
                        onChange={(e) => setOrganization({ ...organization, country: e.target.value })}
                    />

                </form>
                    <div className="mt-4 flex justify-end">
                        <button
                            className="rounded-md bg-gray-300 px-4 py-2 text-gray-700"
                            onClick={handleClose} 
                        >
                            Cancel
                        </button>
                    </div>
            </div>
        </div>
    );
};

export default ModifyOrganizationModal;
