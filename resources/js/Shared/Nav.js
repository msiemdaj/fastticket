import React from 'react'
import { Link } from '@inertiajs/inertia-react'

export default () => {
    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-light bg-light py-3">
                <div className="container">
                    <a className="navbar-brand" href="#">FAST TICKET</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className="nav-link" href={route('login')}>Sign in</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

        </header>

    )
}