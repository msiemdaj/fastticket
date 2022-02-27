import React from 'react'
import { Link, usePage } from '@inertiajs/inertia-react'

import Notifications from './Notifications'

export default () => {

    const { auth } = usePage().props

    return (
        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
            <button id="sidebarToggleTop" className="btn btn-link d-md-none mr-3">
                <i className="bi bi-list"></i>
            </button>

            <ul className="navbar-nav ms-auto">
                <Notifications />
                <li className="nav-item dropdown">
                    <a className="nav-link" id="userDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span className="me-2 d-none d-lg-inline text-gray-600">{auth.user.first_name} {auth.user.last_name}</span>
                        <img src={`https://eu.ui-avatars.com/api/?name=${auth.user.first_name}+${auth.user.last_name}`} width="32px" height="32px" className='rounded-circle' />
                    </a>

                    <div className="dropdown-menu dropdown-menu-right shadow" aria-labelledby="userDropdown">
                        <Link href={route('profile')} className="dropdown-item"><i className="bi bi-person align-middle me-2"></i>Profile</Link>
                        <Link href={route('logout')} method="post" className="dropdown-item" as="button"> <i className="bi bi-box-arrow-right align-middle me-2"></i>Logout</Link>
                    </div>
                </li>
            </ul>
        </nav>
    )
}