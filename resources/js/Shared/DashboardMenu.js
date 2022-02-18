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
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" id="ticketDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <span className='h5 align-middle me-2'>Ticket</span>
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="ticketDropdown">
                                    <Link href={route('ticket.all')} className="nav-link">Show all tickets</Link>
                                    <Link href={route('ticket.create')} className="nav-link">Create ticket</Link>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" id="usersDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <span className='h5 align-middle me-2'>Users</span>
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="usersDropdown">
                                    <Link href={route('users')} className="nav-link">Users</Link>
                                    <Link href={route('users.create')} className="nav-link">Create user</Link>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" id="categoriesDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <span className='h5 align-middle me-2'>Categories</span>
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="categoriesDropdown">
                                    <Link href={route('categories')} className="nav-link">Categories</Link>
                                    <Link href={route('categories.create')} className="nav-link">Create category</Link>
                                </ul>
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