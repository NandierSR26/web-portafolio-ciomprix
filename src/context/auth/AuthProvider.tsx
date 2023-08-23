import { ReactNode, useEffect, useState } from "react"
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
    const [loading, setLoading] = useState<boolean>(true)

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

    const verifyAuth = async() => {
        try {
            const { data: {data} } = await usersApi.verifyAuth()

            if(data.error) {
                localStorage.removeItem('token')
                setAuth(null)
                setLoading(false)
                return
            }

            setAuth(data.user)
            setLoading(false)

        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    const logout = () => {
        setAuth(null)
        localStorage.removeItem('token')
    }

    useEffect(() => {
        verifyAuth()
    }, [])

    useEffect(() => {
        console.log(auth)
    }, [auth])

    return (
        <AuthContext.Provider value={{
            onLogin,
            logout,
            auth,
            loading
        }}>
            { children }
        </AuthContext.Provider>
    )
}