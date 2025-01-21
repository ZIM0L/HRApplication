import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { UploadUserImage } from '../../api/UserAPI';

interface IFormInput {
    image: FileList;
}

const UserSettings: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        const file = data.image[0];

        // Sprawdzenie typu pliku
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        if (!validTypes.includes(file.type)) {
            setErrorMessage('Nieprawidłowy format pliku. Dozwolone są tylko pliki JPG, JPEG i PNG.');
            return;
        }

        setSelectedImage(file);
        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);

        // Tworzymy FormData, by wysłać obrazek do API
        const formData = new FormData();
        formData.append('image', file);

        setUploading(true); // Zmieniamy stan na 'uploading'

        try {
            // Wywołanie funkcji UploadUserImage, aby wysłać obraz
            const response = await UploadUserImage(formData);
            if (response.status === 200) {
                setErrorMessage(null);
                alert('Obrazek został pomyślnie wysłany!');
            }
        } catch (error) {
            setErrorMessage('Błąd podczas wysyłania obrazu. Spróbuj ponownie.');
            console.error(error);
        } finally {
            setUploading(false); // Przywrócenie stanu 'uploading' do false
        }
    };

    return (
        <div className="mx-auto max-w-md rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-semibold">Wybierz obrazek</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <input
                        type="file"
                        {...register('image', {
                            required: 'Plik jest wymagany',
                            validate: (files) => {
                                const file = files?.[0];
                                const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
                                return (
                                    file &&
                                    validTypes.includes(file.type) ||
                                    'Dozwolone są tylko pliki JPG, JPEG i PNG.'
                                );
                            }
                        })}
                        className="w-full rounded border border-gray-300 p-2"
                    />
                    {errors.image && <p className="text-sm text-red-500">{errors.image.message}</p>}
                </div>

                <button
                    type="submit"
                    className="w-full rounded-md bg-blue-500 py-2 text-white hover:bg-blue-600"
                    disabled={uploading} // Disable button when uploading
                >
                    {uploading ? 'Wysyłanie...' : 'Wybierz obraz'}
                </button>
            </form>

            {/* Wyświetlanie podglądu obrazu */}
            {imagePreview && (
                <div className="mt-4">
                    <p className="text-sm text-gray-600">Podgląd wybranego obrazu:</p>
                    <img
                        src={imagePreview}
                        alt="Podgląd obrazu"
                        className="mt-2 h-auto max-w-full rounded-md"
                    />
                </div>
            )}

            {/* Wyświetlanie błędu, jeśli wystąpił */}
            {errorMessage && (
                <div className="mt-4 text-sm text-red-500">
                    {errorMessage}
                </div>
            )}
        </div>
    );
};

export default UserSettings;
