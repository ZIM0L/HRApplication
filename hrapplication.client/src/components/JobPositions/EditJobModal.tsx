import { useEffect } from 'react';
import { IJobPosition } from '../../types/JobPosition/IJobPosition';
import { useForm, SubmitHandler } from 'react-hook-form';

interface EditJobmodalProps {
    job: IJobPosition | null;
    isOpen: boolean;
    onClose: () => void;
    onRefresh: () => void;
}

type Inputs = {
    title: string;
    description: string;
    isRecruiting: boolean;
};

const EditJobmodal = ({ isOpen, onClose, job }: EditJobmodalProps) => {
    const { register, handleSubmit, setValue, watch } = useForm<Inputs>();
    const isRecruiting = watch('isRecruiting');

    useEffect(() => {
        if (job) {
            setValue('isRecruiting', job.isRecruting === '1'); // Konwersja z "1"/"0" na boolean
            setValue('title', job.title );
            setValue('description', job.description);
        }
    }, [job, setValue]);

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        if (!job) return;

        try {
            console.log(data)
        } catch (error) {
            console.error('Error updating job position:', error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-gray-900 bg-opacity-50">
            <div className="h-full w-96 rounded-lg bg-white p-6 shadow-lg">
                <h2 className="mb-4 text-2xl font-semibold">Modify position</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <h1 className="py-1 text-xl">Title</h1>
                        <input
                            {...register('title', { required: true, maxLength: 255 })}
                            type="text"
                            placeholder="Position name"
                            className="w-full rounded-md border border-gray-300 px-4 py-2"
                        />
                    </div>
                    <div>
                        <h1 className="py-1 text-xl">Description</h1>
                        <textarea
                            {...register('description', { required: true, maxLength: 255 })}
                            placeholder="Description"
                            className="h-50 w-full rounded-md border border-gray-300 px-4 py-2"
                        />
                    </div>
                    <div>
                        <h1 className="py-1 text-xl">Recruiting</h1>
                        {/* Toggle Switch */}
                        <div className="flex items-center">
                            <span className="mr-2 w-14">{isRecruiting ? 'Active' : 'Inactive'}</span>
                            <div
                                onClick={() => setValue('isRecruiting', !isRecruiting)} // Zmiana stanu
                                className={`relative inline-block w-12 h-6 rounded-full transition-all duration-300 ease-in-out 
                ${isRecruiting ? 'bg-teal-500' : 'bg-gray-300'}`}
                            >
                                <span
                                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-all duration-300 ease-in-out
                  ${isRecruiting ? 'transform translate-x-6' : ''}`}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                        <button
                            className="mr-2 rounded-md bg-blue-600 px-4 py-2 text-white"
                            type="submit"
                        >
                            Change
                        </button>
                        <button
                            className="rounded-md bg-gray-300 px-4 py-2 text-gray-700"
                            onClick={onClose}
                            type="button" // Dodano typ button, aby uniknąć submit
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditJobmodal;
