import React from "react"

import Dashboard from "../../Shared/Dashboard"

const UserPage = () => {

    return (
        <h1>User page</h1>
    )
}

UserPage.layout = page => <Dashboard children={page} />
export default UserPage