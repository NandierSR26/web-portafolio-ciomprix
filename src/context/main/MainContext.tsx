import { createContext, useContext } from "react";
import { ICategory, ICompany, IContent, IRegisterUserData, ISolutions, IUser } from "../../interfaces";

interface MainContextProps {
    // PROPIEDADES
    fetching: boolean;

    // soluciones
    solutions: ISolutions[];
    solutionByID: ISolutions;

    // categorias
    categories: ICategory[];
    categoryByID: ICategory;
    categoriesBySolution: ICategory[];

    // contenidos
    contents: IContent[];
    contentsByID: IContent;
    contentsByCategory: IContent[];

    // empresas
    companies: ICompany[];
    companyByID: ICompany;
    companyByAlias: ICompany;

    // usuarios
    users: IUser[];
    userByID: IUser;

    videoModalOpen: boolean;
    videoContentUrl: string | null;

    // METODOS
    setFetching: React.Dispatch<React.SetStateAction<boolean>>;
    setVideoModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setVideoContentUrl: React.Dispatch<React.SetStateAction<string | null>>;

    // solutions
    getSolutions: () => Promise<void>;
    getSolutionByID: (id: number) => Promise<ISolutions>;
    createSolution: (data: FormData) => Promise<void>
    updateSolution: (id: number, data: FormData) => Promise<void>;
    deleteSolution: (id: number) => Promise<void>;

    // categories
    getCategories: () => Promise<void>;
    getCategoryById: (id: number) => Promise<void>;
    getCategoryByIdSolution: (id: number) => Promise<ICategory[]>;
    createCategory: (data: FormData) => Promise<void>;
    updateCategory: (id: number, data: FormData) => Promise<void>;
    deleteCategory: (id: number) => Promise<void>;

    // contenidos
    getContents: () => Promise<void>
    getContentByID: (id: number) => Promise<void>
    getContentByCategory: (id_category: number) => Promise<void>
    createContent: (data: FormData) => Promise<void>
    updateContent: (id: number, data: FormData) => Promise<void>
    deleteContent: (id: number) => Promise<void>

    // empresas
    getCompanies: () => Promise<void>
    getCompanyByID: (id: number) => Promise<void>
    getCompanyByAlias: (alias: string) => Promise<void>
    createCompany: (data: FormData) => Promise<void>
    updateCompany: (id: number, data: FormData) => Promise<void>
    deleteCompany: (id: number) => Promise<void>

    // usuarios
    getUsers: () => Promise<void>;
    getUserByID: (id_user:number) => Promise<void>;
    createUser: (dataValues: IRegisterUserData) => Promise<void>;
    updateUser: (id_user:number, dataValues:IRegisterUserData) => Promise<void>;
    deleteUser: (id_user: number) => Promise<void>;

}

export const MainContext = createContext({} as MainContextProps)

export const useMainContext = () => {
    const context = useContext(MainContext)
    if (!context) {
        throw new Error("No existe el contexto");
    }
    return context;
}