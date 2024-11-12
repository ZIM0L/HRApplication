export interface IAuthenticationResult {
    token: string,
    user:
    {
        createdAt: string,
        email: string,
        isActive: string,
        name: string,
        password: string,
        phoneNumber: string,
        refreshTokenExpiryTime: string,
        surname: string,
        updatedAt: string,
        userId: string,
    }
}
export interface IUser {
        createdAt: string,
        email: string,
        isActive: string,
        name: string,
        password: string,
        phoneNumber: string,
        refreshTokenExpiryTime: string,
        surname: string,
        updatedAt: string,
        userId: string,
}