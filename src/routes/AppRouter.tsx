import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Landing } from '../pages'

export const AppRouter = () => {

    return (
        <Routes>
            <Route path="/" element={<Landing />} />
        </Routes>
    )
}
