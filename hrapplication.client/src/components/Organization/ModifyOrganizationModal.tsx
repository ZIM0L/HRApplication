import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { IOrganization } from "../../types/Organization/IOrganization";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
    interface ModifyOrganizationProp {
    isOpen: boolean;
    onClose: () => void;
}
    interface Inputs {
        name: string,
        industry: string,
        country: string,
        url: string,
        email: string,
        city: string,
        phoneNumber: string,
        zipCode: string
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
        zipCode: ""
    });

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            console.log(data)
                onClose();
        } catch (error) {
            console.error("Adding new record error:", error); //smtihn better
        }
    };

    if (!isOpen) return null;  

    return (
        <div className="fixed inset-0 z-50 flex h-full items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="w-1/2 rounded-lg bg-white p-6 shadow-lg">
                <form onSubmit={handleSubmit(onSubmit)}  className="space-y-3">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-lg font-semibold">Modifying organization</h2>
                        <button
                            className="text-green-500"
                            type="submit"
                        >
                            <CheckCircleIcon className="h-10 w-10">

                            </CheckCircleIcon>
                        </button>
                    </div>
                    <input
                        {...register("name", { required: true, maxLength: 255 })}
                            type="text"
                            placeholder="name of organization"
                            className="w-full rounded-md border border-gray-300 px-4 py-2"
                            onChange={(e) => setOrganization({ ...organization, name: e.target.value })}
                        />
                    <input
                        {...register("industry", { required: true, maxLength: 255 })}
                        type="text"
                        placeholder="industry"
                        className="w-full rounded-md border border-gray-300 px-4 py-2"
                        onChange={(e) => setOrganization({ ...organization, name: e.target.value })}
                    />
                    <input
                        {...register("country", { required: true, maxLength: 255 })}
                        type="text"
                        placeholder="Country"
                        className="w-full rounded-md border border-gray-300 px-4 py-2"
                        onChange={(e) => setOrganization({ ...organization, name: e.target.value })}
                    />
                    <input
                        {...register("city", { required: true, maxLength: 255 })}
                        type="text"
                        placeholder="City"
                        className="w-full rounded-md border border-gray-300 px-4 py-2"
                        onChange={(e) => setOrganization({ ...organization, name: e.target.value })}
                    />
                    <input
                        {...register("url", { required: true, maxLength: 255 })}
                        type="text"
                        placeholder="Url"
                        className="w-full rounded-md border border-gray-300 px-4 py-2"
                        onChange={(e) => setOrganization({ ...organization, name: e.target.value })}
                    />
                    <input
                        {...register("email", { required: true, maxLength: 255 })}
                        type="text"
                        placeholder="Email"
                        className="w-full rounded-md border border-gray-300 px-4 py-2"
                        onChange={(e) => setOrganization({ ...organization, name: e.target.value })}
                    />
                    <input
                        {...register("phoneNumber", { required: true, maxLength: 15 })}
                        type="text"
                        placeholder="phone number"
                        className="w-full rounded-md border border-gray-300 px-4 py-2"
                        onChange={(e) => setOrganization({ ...organization, name: e.target.value })}
                    />
                       
                        <div className="mt-4 flex justify-end">
                            <button
                            className="rounded-md bg-gray-300 px-4 py-2 text-gray-700"
                            onClick={onClose}
                            >
                                Anuluj
                            </button>
                        </div>
                    </form>
            </div>
        </div>
    );
};

export default ModifyOrganizationModal;
