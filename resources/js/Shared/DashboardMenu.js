import React from 'react'
import { Link, usePage } from '@inertiajs/inertia-react'

import Logo from './Logo'

export default () => {

    const { auth } = usePage().props

    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-light bg-light py-3">
                <div className="container">
                    <a className="navbar-brand" href="https://github.com/msiemdaj/fastticket">
                        <Logo />
                        <span className="align-middle ms-2">FAST TICKET</span>
                    </a>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link href="#" className="nav-link">Link</Link>
                            </li>
                            <li className="nav-item">
                                <Link href="#" className="nav-link">Link</Link>
                            </li>
                            <li className="nav-item">
                                <Link href={route('categories')} className="nav-link">Categories</Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <span className='h5 align-middle me-2'>{auth.user.first_name} {auth.user.last_name}</span>
                                    <img src={`https://eu.ui-avatars.com/api/?name=${auth.user.first_name}+${auth.user.last_name}`} width="36px" height="36px" className='rounded-circle' />
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    <Link href={route('profile')} className="dropdown-item">Profile</Link>
                                    <Link href={route('logout')} method="post" className="dropdown-item" as="button">Logout</Link>
                                </ul>
                            </li>
                        </ul>
                    </div >
                </div >
            </nav >
        </header >
    )
}