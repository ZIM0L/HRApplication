import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { BuildingOffice2Icon } from "@heroicons/react/24/solid";
import ModifyOrganizationModal from "./ModifyOrganizationModal";
import { useEffect, useState } from "react";
import { GetTeam } from "../../api/TeamAPI";
import { ITeam } from "../../types/Team/ITeam";

function Organization() {

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Stan kontrolujący widoczność modalu
    const [team, setTeam] = useState<ITeam>();
    useEffect(() => {
        const result = GetTeam()
        result.then((resolve) => {
            if (resolve?.status == 200) {
                setTeam(resolve.data)
            }
        })
    },[])
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
                            <h1 className="text-lg font-bold text-gray-800">{team?.name}</h1>
                            <p className="text-sm text-gray-600">
                                Przemysł: <span className="font-medium">{team?.industry}</span>
                            </p>
                            <p className="text-sm text-gray-600">
                                Kraj zamieszkania: <span className="font-medium">{team?.country}</span>
                            </p>
                            <p className="text-sm text-gray-600">
                                Portal (URL):{" "}
                                <a
                                    href={`https://${team?.url}`}
                                    target="_blank"
                                    className="text-blue-500 underline"
                                >
                                    {team?.url}
                                </a>
                            </p>
                        </div>
                </div>

                {/* Dolna część - Kontakt */}
                <div className="border-2 mt-6 w-[70vw] border-t p-6">
                    <h2 className="text-lg font-semibold text-gray-800">Kontakt</h2>
                    <div className="grid-cols-2 mt-2 grid gap-y-2 text-sm text-gray-600">
                            <p>
                                E-mail: <span className="font-medium">{team?.email}</span>
                        </p>
                            <p>
                                Adres1: <span className="font-medium">{team?.address}</span>
                        </p>
                            <p>
                                Miasto: <span className="font-medium">{team?.city}</span>
                        </p>
                            <p>
                                Kod pocztowy: <span className="font-medium">{team?.zipCode.slice(0, 2)}-{team?.zipCode.slice(2)}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
            <ModifyOrganizationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
              />
        </>

    );
}

export default Organization;