
import React from "react"
import { Link } from '@inertiajs/inertia-react'


const HomePage = () => {


    return (
        <div>

            <p>Welcome to home page</p>
            <Link
                as="button"
                href="/logg"
                className="w-100 btn btn-lg btn-primary"
                method="post"
            >
                Logout
            </Link>
        </div>
    )
}

export default HomePage