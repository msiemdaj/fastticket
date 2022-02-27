import { Link, usePage } from '@inertiajs/inertia-react'
import React from 'react'
import Logo from './Logo'

export default () => {
    const { auth } = usePage().props
    return (
        <ul className="navbar-nav sidebar sidebar-bg accordion" id="accordionSidebar">
            <Logo />
            <hr className="sidebar-divider my-0" />
            <li className="nav-item">
                <Link href={route('dashboard')} className="nav-link"><i className="bi bi-bar-chart-fill"></i><span>Dashboard</span></Link>
            </li>
            <li className="nav-item">
                <Link href="#ticketsSubmenu" className="nav-link" data-bs-toggle="collapse" aria-expanded="false"><i className="bi bi-tag-fill"></i><span>Tickets</span></Link>
                <ul className="collapse list-unstyled" id="ticketsSubmenu">
                    {
                        auth.user.role == 'worker' || auth.user.role == 'admin'
                            ? <li className="nav-item">
                                <Link href={route('ticket.all')} className="nav-link"><span>Show all tickets</span></Link>
                            </li>
                            : ''
                    }
                    {
                        auth.user.role == 'worker' || auth.user.role == 'admin'
                            ? <li className="nav-item">
                                <Link href={route('ticket.mytickets')} className="nav-link"><span>Show my tickets</span></Link>
                            </li>
                            : ''
                    }
                    <li className="nav-item">
                        <Link href={route('ticket.create')} className="nav-link"><span>Create ticket</span></Link>
                    </li>
                </ul>
            </li>
            {
                auth.user.role == 'worker' || auth.user.role == 'admin'
                    ? <li className="nav-item">
                        <Link href="#usersSubmenu" className="nav-link" data-bs-toggle="collapse" aria-expanded="false"><i className="bi bi-people-fill"></i><span>Users</span></Link>
                        <ul className="collapse list-unstyled" id="usersSubmenu">
                            <li className="nav-item">
                                <Link href={route('users')} className="nav-link"><span>Show all users</span></Link>
                            </li>
                            {
                                auth.user.role == 'admin' &&
                                <li className="nav-item">
                                    <Link href={route('users.create')} className="nav-link"><span>Create user</span></Link>
                                </li>
                            }
                        </ul>
                    </li>
                    : ''
            }
            {
                auth.user.role == 'worker' || auth.user.role == 'admin'
                    ? <li className="nav-item">
                        <Link href="#categorySubmenu" className="nav-link" data-bs-toggle="collapse" aria-expanded="false"><i className="bi bi-list-ul"></i><span>Categories</span></Link>
                        <ul className="collapse list-unstyled" id="categorySubmenu">
                            <li className="nav-item">
                                <Link href={route('categories')} className="nav-link"><span>Show categories</span></Link>
                            </li>
                            {
                                auth.user.role == 'admin'
                                    ? <li className="nav-item">
                                        <Link href={route('categories.create')} className="nav-link"><span>Create category</span></Link>
                                    </li>
                                    : ''
                            }
                        </ul>
                    </li>
                    : ''
            }
            <li className="copyright-footer align-text-bottom">
                <span>Copyright</span>
            </li>
        </ul>
    )
}