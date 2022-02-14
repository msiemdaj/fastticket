
import React from "react"


import Dashboard from "../Shared/Dashboard"


const HomePage = () => {


    return (
        <div>

            <p>Welcome to home page</p>

        </div>
    )
}

HomePage.layout = page => <Dashboard children={page} />
export default HomePage