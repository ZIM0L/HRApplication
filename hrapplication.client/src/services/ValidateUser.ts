import { ReadLocalStorageUserFromToken } from "./LocalStorageTokenService"

export const ValidateUserByToken = async () => {
    const user = ReadLocalStorageUserFromToken()
    console.log(user)
}