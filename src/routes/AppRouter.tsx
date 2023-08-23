import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Landing } from '../pages'
import { CategoryDetail } from '../pages/CategoryDetail'
import { Login } from '../pages/Admin'

export const AppRouter = () => {

    return (
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/category/:id" element={<CategoryDetail />} />
            <Route path="/admin/login" element={<Login />} />
        </Routes>
    )
}
