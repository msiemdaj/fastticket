import React from 'react'
import { Link, usePage } from '@inertiajs/inertia-react'

export default () => {
    const { auth } = usePage().props

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
                            {auth.user == null
                                ? <li className="nav-item">
                                    <Link className="nav-link" href={route('login')}>Sign in</Link>
                                </li>
                                : <li className="nav-item dropdown">
                                    <a className="nav-link" id="userDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <span className="me-2 d-none d-lg-inline text-gray-600">{auth.user.first_name} {auth.user.last_name}</span>
                                        <img src={`https://eu.ui-avatars.com/api/?name=${auth.user.first_name}+${auth.user.last_name}`} width="32px" height="32px" className='rounded-circle' />
                                    </a>

                                    <div className="dropdown-menu dropdown-menu-right shadow" aria-labelledby="userDropdown">
                                        <Link href={route('logout')} method="post" className="dropdown-item" as="button"> <i className="bi bi-box-arrow-right align-middle me-2"></i>Logout</Link>
                                    </div>
                                </li>
                            }
                        </ul>
                    </div>
                </div>
            </nav>

        </header>

    )
}