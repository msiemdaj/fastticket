import React from 'react'
import DashboardMenu from './DashboardMenu'

function Dashboard({ children }) {
    return (
        <main>
            <DashboardMenu />
            <div className="container">
                {children}
            </div>
        </main>
    )
}

export default Dashboard;