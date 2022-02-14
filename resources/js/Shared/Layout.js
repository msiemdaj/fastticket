import React from 'react'
import Nav from './Nav'

export default function Layout({ children }) {
    return (
        <main>
            <Nav />
            <div className="container">
                {children}
            </div>
        </main>
    )
}