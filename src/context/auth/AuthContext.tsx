import { createContext, useContext } from "react";
import { ILoginData, IUser } from "../../interfaces";

interface AuthContextProps {
    // PROPIEDADES
    auth: IUser | null;

    // METODOS
    onLogin: (data:ILoginData) => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextProps)

export const useAuthContext = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("No existe el contexto");
    }
    return context;
}