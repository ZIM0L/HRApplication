import { AxiosResponse } from "axios";
import { mainAxiosInstance } from "./Axios";

export const GetTeam = async (): Promise<AxiosResponse | null> => {
    try {
        return await mainAxiosInstance.get('api/Team/GetTeam');
    } catch (error) {
        console.log(error)
        return null
    }
}