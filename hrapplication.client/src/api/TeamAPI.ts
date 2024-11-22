import { AxiosResponse } from "axios";
import { mainAxiosInstance } from "./Axios";

export const GetTeams = async (): Promise<AxiosResponse | null> => {
    try {
        return await mainAxiosInstance.get('api/Team/GetTeams');
    } catch (error) {
        console.log(error)
        return null
    }
}