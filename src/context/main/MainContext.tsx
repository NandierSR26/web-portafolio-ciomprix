import { createContext, useContext } from "react";
import { ICategory, ICompany, IContent, ISolutions } from "../../interfaces";

interface MainContextProps {
    // PROPIEDADES
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

    // METODOS
    // solutions
    getSolutions: () => Promise<void>;
    getSolutionByID: (id:number) => Promise<void>;
    createSolution: (data:ISolutions) => Promise<void>
    updateSolution: (id:number, data:ISolutions) => Promise<void>;
    deleteSolution: (id:number) => Promise<void>;
    
    // categories
    getCategories: () => Promise<void>;
    getCategoryById: (id:number) => Promise<void>;
    getCategoryByIdSolution: (id:number) => Promise<void>;
    createCategory: (data:ICategory) => Promise<void>;
    updateCategory: (id:number, data:ICategory) => Promise<void>;
    deleteCategory: (id:number) => Promise<void>;

    // contenidos
    getContents: () => Promise<void>
    getContentByID: (id:number) => Promise<void>
    getContentByCategory: (id_category:number) => Promise<void>
    createContent: (data:IContent) => Promise<void>
    updateContent: (id:number, data:IContent) => Promise<void>
    deleteContent: (id:number) => Promise<void>

    // empresas
    getCompanies: () => Promise<void>
    getCompanyByID: (id:number) => Promise<void>
    createCompany: (data:ICompany) => Promise<void>
    updateCompany: (id:number, data:ICompany) => Promise<void>
    deleteComany: (id:number) => Promise<void>

}

export const MainContext = createContext({} as MainContextProps)

export const useMainContext = () => {
    const context = useContext(MainContext)
    if (!context) {
        throw new Error("No existe el contexto");
    }
    return context;
}