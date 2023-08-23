import { Navigate, Outlet } from "react-router-dom"
import { useAuthContext } from "../context/auth/AuthContext"


export const PrivateRoutes = () => {

    const {auth} = useAuthContext()

    if(!auth) return <Navigate to={'/'} />

    return <Outlet />
}