import React from 'react'
import { Link, usePage } from '@inertiajs/inertia-react'

export default () => {

    const { notifications } = usePage().props

    return (

        <li className="nav-item dropdown mx-1">
            <a role="button" type="button" className="nav-link" id="notificationsDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="bi bi-bell-fill"></i>
                {notifications.unread != '' &&
                    <span className="badge badge-danger badge-counter">
                        {notifications.unread}
                    </span>
                }
            </a>
            <div className="dropdown-list dropdown-menu dropdown-menu-right shadow" aria-labelledby="notificationsDropdown">
                <h6 className="dropdown-header">Notifications</h6>
                <div className="notifications-group">
                    {
                        notifications.data != ''
                            ?
                            notifications.data.map((notification, key) => (
                                <Link href={route('notifications.read', notification.id)} key={key} className="dropdown-item d-flex align-items-center">
                                    <div>
                                        <div className="small text-gray-500">{notification.created_at}</div>
                                        <span className={`${notification.read_at == null && 'font-weight-bold'}`}>{notification.data.message}</span>
                                    </div>
                                </Link>
                            ))
                            : <span className='dropdown-item text-center disabled py-4'>You have no notifications</span>
                    }
                </div>
                <div className="btn-group w-100">
                    <Link className={`dropdown-item text-center small text-gray-500 ${notifications.unread == '' && 'disabled'}`} as="button" href={route('notifications.readall')} >Mark all as readed</Link>
                    <Link className={`dropdown-item text-center small text-gray-500 ${notifications.data == '' && 'disabled'}`} as="button" href={route('notifications.deleteall')} >Delete all</Link>
                </div>
            </div>
        </li>
    )
}