import { useForm, SubmitHandler } from "react-hook-form";

interface InviteToTeamModalProps {
    isOpen: boolean;
    onClose: () => void;
}

type Inputs = {
    employeeId: string;
    firstName: string;
    lastName: string;
    email: string;
};

const InviteToTeamModal: React.FC<InviteToTeamModalProps> = ({ isOpen, onClose }) => {
    const { register, handleSubmit, reset } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            console.log("Data submitted:", data);
            reset(); 
        } catch (error) {
            console.error("Error inviting user:", error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="w-[90%] rounded-lg bg-white p-6 shadow-lg">
                <h2 className="mb-4 text-lg font-semibold">Invite to Team</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Employee ID */}
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">Employee ID</label>
                        <input
                            {...register("employeeId", { required: true })}
                            type="text"
                            placeholder="Enter employee ID"
                            className="w-full rounded-md border border-gray-300 px-4 py-2"
                        />
                    </div>

                    {/* First Name */}
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">First Name</label>
                        <input
                            {...register("firstName", { required: true, maxLength: 50 })}
                            type="text"
                            placeholder="Enter first name"
                            className="w-full rounded-md border border-gray-300 px-4 py-2"
                        />
                    </div>

                    {/* Last Name */}
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">Last Name</label>
                        <input
                            {...register("lastName", { required: true, maxLength: 50 })}
                            type="text"
                            placeholder="Enter last name"
                            className="w-full rounded-md border border-gray-300 px-4 py-2"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
                        <input
                            {...register("email", { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })}
                            type="email"
                            placeholder="Enter email"
                            className="w-full rounded-md border border-gray-300 px-4 py-2"
                        />
                    </div>

                    {/* Info Section */}
                    <p className="mt-2 text-sm text-gray-500">
                        Fill in the required fields and click the invitation button. The user will receive an
                        email invitation. After accepting, they will become part of the organization.
                    </p>

                    {/* Buttons */}
                    <div className="mt-4 flex justify-end">
                        <button
                            type="submit"
                            className="mr-2 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                        >
                            Invite
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

export default InviteToTeamModal;
