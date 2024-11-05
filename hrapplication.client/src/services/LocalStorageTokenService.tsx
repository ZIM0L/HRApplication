import { IAuthenticationResult, IUser } from "../utils/interfaces/IAuthenticationResult";

export const SetLocalStorageUser = (user: IAuthenticationResult) => {
    localStorage.setItem("user", JSON.stringify(user));
}
export const ReadLocalStorageUser = (): IUser | null => {
    const storedUser = localStorage.getItem("user");
    const parsedUser = storedUser ? JSON.parse(storedUser) as IUser : null;
    return parsedUser;
}
