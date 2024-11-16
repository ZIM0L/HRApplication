import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { BuildingOffice2Icon } from "@heroicons/react/24/solid";
import ModifyOrganizationModal from "./ModifyOrganizationModal";
import { useState } from "react";
import { ValidateUserByToken } from "../../services/ValidateUser";

function Organization() {

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Stan kontrolujący widoczność modalu

    const refreshJobPositions = () => {
    };
    ValidateUserByToken()
    const ModifyTeam = () => {

    }
    return (

        <>
        <div className="w-full space-y-4 bg-white p-6">
            {/* Górna część - informacje podstawowe */}
            <button className="rounded-full bg-cyan-blue p-2 text-white transition hover:bg-dark-blue">
                    <PencilSquareIcon className="h-6 w-6" onClick={() => setIsModalOpen(true)} />
            </button>

            <div className="flex flex-col items-center justify-center">
                {/* Sekcja informacji podstawowych */}
                <div className="border-2 h-fit w-[70vw] flex-col items-center justify-center p-4 md:flex md:flex-row">
                        {/* Ikona */}
                            <div className="flex h-16 w-16 items-center justify-center rounded-md bg-gray-200 md:mr-6">
                                <BuildingOffice2Icon className="h-10 w-10" />
                            </div>

                        {/* Informacje organizacyjne */}
                        <div>
                            <h1 className="text-lg font-bold text-gray-800">My Organization</h1>
                            <p className="text-sm text-gray-600">
                                Numer rejestracyjny: <span className="font-medium">123456</span>
                            </p>
                            <p className="text-sm text-gray-600">
                                Przemysł: <span className="font-medium">Other</span>
                            </p>
                            <p className="text-sm text-gray-600">
                                Kraj zamieszkania: <span className="font-medium">Poland</span>
                            </p>
                            <p className="text-sm text-gray-600">
                                Portal (URL):{" "}
                                <a
                                    href="https://hr.my/go/portal/71516ffeab6a425388e1b757bc955b3c"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 underline"
                                >
                                    https://hr.my/go/portal/71516ffeab6a425388e1b757bc955b3c
                                </a>
                            </p>
                        </div>
                </div>

                {/* Dolna część - Kontakt */}
                <div className="border-2 mt-6 w-[70vw] border-t p-6">
                    <h2 className="text-lg font-semibold text-gray-800">Kontakt</h2>
                    <div className="grid-cols-2 mt-2 grid gap-y-2 text-sm text-gray-600">
                        <p>
                            E-mail: <span className="font-medium">–</span>
                        </p>
                        <p>
                            Strona internetowa: <span className="font-medium">–</span>
                        </p>
                        <p>
                            Adres1: <span className="font-medium">–</span>
                        </p>
                        <p>
                            Adres2: <span className="font-medium">–</span>
                        </p>
                        <p>
                            Miasto: <span className="font-medium">–</span>
                        </p>
                        <p>
                            Kod pocztowy: <span className="font-medium">–</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
            <ModifyOrganizationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onRefresh={refreshJobPositions} />
        </>

    );
}

export default Organization;