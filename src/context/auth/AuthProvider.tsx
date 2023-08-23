import { ReactNode, useState } from "react"
import { AuthContext } from "./AuthContext";
import { ILoginData, IUser } from "../../interfaces";
import { api } from "../../api";

interface AuthProviderProps {
    children: ReactNode;
}

interface LoginDataResponse {
    user: IUser;
    token: string;
}

const { usersApi } = api()

export const AuthProvider = ({ children }: AuthProviderProps) => {

    const [auth, setAuth] = useState<IUser | null>(null)

    const onLogin = async(dataValues: ILoginData) => {
        try {
            const { data:{ data } } = await usersApi.login(dataValues)
            const { user, token } = data as LoginDataResponse
            setAuth(user)
            localStorage.setItem('token', token)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <AuthContext.Provider value={{
            onLogin,
            auth
        }}>
            { children }
        </AuthContext.Provider>
    )
}