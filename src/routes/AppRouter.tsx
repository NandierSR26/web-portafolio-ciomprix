import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Landing } from '../pages'
import { CategoryDetail } from '../pages/CategoryDetail'
import { Categories, CategoriesForm, Companies, CompaniesForm, Contents, ContentsForm, Dashboard, Login, Solutions, SolutionsForm, Users, UsersForm } from '../pages/Admin'
import { PrivateRoutes } from './PrivateRoutes'
import { useAuthContext } from '../context/auth/AuthContext'
import { PublicRoutes } from './PublicRoutes'

export const AppRouter = () => {

    const { loading } = useAuthContext()

    if (loading) return <h1>Cargando...</h1>

    return (
        <Routes>
            <Route element={<PublicRoutes />}>
                <Route path="/" element={<Landing />} />
                <Route path="/:alias" element={<Landing />} />
                <Route path="/category/:id" element={<CategoryDetail />} />
                <Route path="/admin/login" element={<Login />} />
            </Route>

            <Route element={<PrivateRoutes />}>
                <Route path="/admin/categories" element={<Categories />} />
                <Route path="/admin/companies" element={<Companies />} />
                <Route path="/admin/contents" element={<Contents />} />
                <Route path="/admin/dashboard" element={<Dashboard />} />
                <Route path="/admin/solutions" element={<Solutions />} />
                <Route path="/admin/users" element={<Users />} />
                <Route path="/admin/create-solution" element={<SolutionsForm />} />
                <Route path="/admin/edit-solution/:id" element={<SolutionsForm />} />
                <Route path="/admin/create-category" element={<CategoriesForm />} />
                <Route path="/admin/edit-category/:id" element={<CategoriesForm />} />
                <Route path="/admin/create-content" element={<ContentsForm />} />
                <Route path="/admin/edit-content/:id" element={<ContentsForm />} />
                <Route path="/admin/create-company" element={<CompaniesForm />} />
                <Route path="/admin/edit-company/:id" element={<CompaniesForm />} />
                <Route path="/admin/create-user" element={<UsersForm />} />
                <Route path="/admin/edit-user/:id" element={<UsersForm />} />
            </Route>
        </Routes>
    )
}
