import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Landing } from '../pages'
import { CategoryDetail } from '../pages/CategoryDetail'
import { Categories, CategoriesForm, Companies, CompaniesForm, Contents, ContentsForm, Dashboard, Login, Solutions, SolutionsForm } from '../pages/Admin'

export const AppRouter = () => {

    return (
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/category/:id" element={<CategoryDetail />} />
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin/categories" element={<Categories />} />
            <Route path="/admin/companies" element={<Companies />} />
            <Route path="/admin/contents" element={<Contents />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/solutions" element={<Solutions />} />
            <Route path="/admin/create-solution" element={<SolutionsForm /> } />
            <Route path="/admin/edit-solution/:id" element={<SolutionsForm /> } />
            <Route path="/admin/create-category" element={<CategoriesForm />} />
            <Route path="/admin/edit-category/:id" element={<CategoriesForm />} />
            <Route path="/admin/create-content" element={<ContentsForm />} />
            <Route path="/admin/edit-content/:id" element={<ContentsForm />} />
            <Route path="/admin/create-company" element={<CompaniesForm />} />
            <Route path="/admin/edit-company/:id" element={<CompaniesForm />} />
        </Routes>
    )
}
