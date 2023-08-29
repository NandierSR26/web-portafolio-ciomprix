import React from 'react'
import './Loader.css'

export const Loader = () => {
    return (
        <main className="absolute left-0 top-0 w-full h-screen bg-blue-primary grid place-items-center">
            <div className="sk-chase w-20 h-20">
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
            </div>
        </main>
    )
}
