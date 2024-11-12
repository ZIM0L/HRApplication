// AddJobModal.tsx
import { useState } from 'react';
import { IAddJobPosition } from '../../types/JobPosition/IJobPosition';
import { api } from '../../api/api';
import { useForm, SubmitHandler } from "react-hook-form";

    interface AddJobModalProps {
        isOpen: boolean;
        onClose: () => void;
        onRefresh: () => void;
    }

    type Inputs = {
        title: string;
        description: string;
    };
    const AddJobModal = ({ isOpen, onClose, onRefresh }: AddJobModalProps) => {

        const { register, handleSubmit } = useForm<Inputs>();
        const [newJob, setNewJob] = useState<IAddJobPosition>({
            title: "",
            description: "",
        });

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            const response = await api.post('/api/JobPosition/addJobPosition', data);
            if (response.status === 200) {
                onRefresh();
                onClose();
            }
        } catch (error) {
            console.error("Adding new record error:", error); //smtihn better
        }
    };

    if (!isOpen) return null;  

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="w-96 rounded-lg bg-white p-6 shadow-lg">
                <h2 className="mb-4 text-lg font-semibold">Dodaj stanowisko</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <input
                            {...register("title", { required: true, maxLength: 255 })}
                            type="text"
                            placeholder="Tytuł stanowiska"
                            className="w-full rounded-md border border-gray-300 px-4 py-2"
                            value={newJob.title}
                            onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                        />
                        <textarea
                            {...register("description", { required: true, maxLength: 255 })}
                            placeholder="Opis"
                            className="h-50 w-full rounded-md border border-gray-300 px-4 py-2"
                            value={newJob.description}
                            onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                        />
                        <div className="mt-4 flex justify-end">
                            <button
                                className="mr-2 rounded-md bg-blue-600 px-4 py-2 text-white"
                                type="submit"
                            >
                                Dodaj
                            </button>
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

export default AddJobModal;
