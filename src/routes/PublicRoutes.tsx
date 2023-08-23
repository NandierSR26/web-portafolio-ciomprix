import { Navigate, Outlet } from "react-router-dom"
import { useAuthContext } from "../context/auth/AuthContext"

export const PublicRoutes = () => {

    const { auth } = useAuthContext()

    if(auth) return <Navigate to={'/admin/dashboard'} />

    return <Outlet />
}