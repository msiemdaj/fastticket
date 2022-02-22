import React from 'react'
import { Link, usePage } from '@inertiajs/inertia-react'
import { Bell } from 'react-bootstrap-icons'

export default () => {

    const { notifications } = usePage().props

    return (
        <div>
            <li className="nav-item dropdown">
                <button type="button" className="btn btn-light nav-link" id="navbarDropdownMenuLink" data-bs-toggle="dropdown">
                    <Bell size="24" />
                    {notifications.unread != '' &&
                        <span className="position-absolute top-0 start-50 badge rounded-pill bg-danger">
                            {notifications.unread}
                        </span>
                    }
                </button>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    {
                        notifications.data != ''
                            ?
                            notifications.data.map((notification, key) => (
                                <Link as="li" href={route('notifications.read', notification.id)} key={key} className={`dropdown-item border-bottom ${notification.read_at == null && 'bg-light'}`} >
                                    <p className={`${notification.read_at == null && 'fw-bold'}`}>{notification.data.message}</p>
                                    {notification.created_at}
                                </Link>
                            ))
                            : <li className='dropdown-item'>You have no notifications</li>
                    }
                    <li className='btn-group w-100'>
                        <Link className={`btn btn-outline-secondary ${notifications.unread == '' && 'disabled'}`} as="button" href={route('notifications.readall')} >Mark all as readed</Link>
                        <Link className={`btn btn-outline-danger ${notifications.data == '' && 'disabled'}`} as="button" href={route('notifications.deleteall')} >Delete all</Link>
                    </li>
                </ul>
            </li>
        </div >
    )
}