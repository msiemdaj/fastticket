import React from 'react'
import DashboardMenu from './DashboardMenu'
import Sidebar from './Sidebar';

function Dashboard({ children }) {
    return (
        <main>
            <div id="wrapper">
                <Sidebar />
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <DashboardMenu />
                        <div className="container-fluid">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Dashboard;