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
                <Link href={route('dashboard')} className={`nav-link ${route().current('dashboard') && 'active'}`}><i className="bi bi-bar-chart-fill"></i><span>Dashboard</span></Link>
            </li>
            <li className="nav-item">
                <Link href="#ticketsSubmenu" className={`nav-link sidebar-dropdown ${route().current('ticket.*') && 'active'}`} data-bs-toggle="collapse" aria-expanded="false"><i className="bi bi-tag-fill"></i><span>Tickets</span></Link>
                <ul className="collapse list-unstyled" id="ticketsSubmenu">
                    {
                        auth.user.role == 'worker' || auth.user.role == 'admin'
                            ? <>
                                <li className="nav-item">
                                    <Link href={route('ticket.all')} className={`nav-link ${route().current('ticket.all') && 'active'}`}><span>Show all tickets</span></Link>
                                </li>
                                <li className="nav-item">
                                    <Link href={route('ticket.mytickets')} className={`nav-link ${route().current('ticket.mytickets') && 'active'}`}><span>Show my tickets</span></Link>
                                </li>
                                <li className="nav-item">
                                    <Link href={route('ticket.deleted')} className={`nav-link ${route().current('ticket.deleted') && 'active'}`}><span>Deleted tickets</span></Link>
                                </li>
                            </>
                            : ''
                    }
                    <li className="nav-item">
                        <Link href={route('ticket.create')} className={`nav-link ${route().current('ticket.create') && 'active'}`}><span>Create ticket</span></Link>
                    </li>
                </ul>
            </li>
            {
                auth.user.role == 'worker' || auth.user.role == 'admin'
                    ? <li className="nav-item">
                        <Link href="#usersSubmenu" className={`nav-link sidebar-dropdown ${route().current('users.*') && 'active'}`} data-bs-toggle="collapse" aria-expanded="false"><i className="bi bi-people-fill"></i><span>Users</span></Link>
                        <ul className="collapse list-unstyled" id="usersSubmenu">
                            <li className="nav-item">
                                <Link href={route('users')} className={`nav-link ${route().current('users') && 'active'}`}><span>Show all users</span></Link>
                            </li>
                            {
                                auth.user.role == 'admin' &&
                                <li className="nav-item">
                                    <Link href={route('users.deleted')} className={`nav-link ${route().current('users.deleted') && 'active'}`}><span>Deleted users</span></Link>
                                </li>

                            }
                            {
                                auth.user.role == 'admin' &&
                                <li className="nav-item">
                                    <Link href={route('users.create')} className={`nav-link ${route().current('users.create') && 'active'}`}><span>Create user</span></Link>
                                </li>

                            }

                        </ul>
                    </li>
                    : ''
            }
            {
                auth.user.role == 'worker' || auth.user.role == 'admin'
                    ? <li className="nav-item">
                        <Link href="#categorySubmenu" className={`nav-link sidebar-dropdown ${route().current('categories.*') && 'active'}`} data-bs-toggle="collapse" aria-expanded="false"><i className="bi bi-list-ul"></i><span>Categories</span></Link>
                        <ul className="collapse list-unstyled" id="categorySubmenu">
                            <li className="nav-item">
                                <Link href={route('categories')} className={`nav-link ${route().current('categories') && 'active'}`}><span>Show categories</span></Link>
                            </li>
                            {
                                auth.user.role == 'admin'
                                    ? <li className="nav-item">
                                        <Link href={route('categories.create')} className={`nav-link ${route().current('categories.create') && 'active'}`}><span>Create category</span></Link>
                                    </li>
                                    : ''
                            }
                        </ul>
                    </li>
                    : ''
            }
            {
                auth.user.role == 'worker' || auth.user.role == 'admin'
                    ? <li className="nav-item">
                        <Link href={route('activity')} className={`nav-link ${route().current('activity') && 'active'}`}><i className="bi bi-activity"></i><span>Activity</span></Link>
                    </li>
                    : ''
            }
        </ul>
    )
}