import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Landing } from '../pages'
import { CategoryDetail } from '../pages/CategoryDetail'
import { Categories, Companies, Contents, Dashboard, Login, Solutions } from '../pages/Admin'

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
        </Routes>
    )
}
