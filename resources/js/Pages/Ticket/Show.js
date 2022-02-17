import { usePage } from "@inertiajs/inertia-react";
import React from "react"

import Dashboard from "../../Shared/Dashboard"


const Show = () => {
    const { ticket } = usePage().props;

    return (
        <h1>show ticket</h1>
    )
}

Show.layout = page => <Dashboard children={page} />
export default Show