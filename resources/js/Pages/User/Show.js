import { Inertia } from "@inertiajs/inertia";
import { Link, usePage } from "@inertiajs/inertia-react";
import moment from "moment";
import React from "react"

import Dashboard from "../../Shared/Dashboard"
import Pagination from "../../Shared/Pagination";


const Show = () => {
    const { user, tickets, auth } = usePage().props;
    const { links } = tickets;

    const rowClick = (e, id) => {
        let currentIndex = e.target.cellIndex;
        let dropdownIndex = document.getElementsByClassName('showmore.dropdown').cellIndex

        if (currentIndex !== dropdownIndex && currentIndex !== undefined) {
            Inertia.get(route('ticket.show', id));
        }
    }

    return (
        <div>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h2 text-darkblue font-weight-bold text-uppercase">{user.first_name} {user.last_name}</h1>
            </div>


            <div className="row">
                <div className="col-xl-4 mb-4">
                    <div className="card shadow mb-4">
                        <div className={`card-body p-4 ${user.deleted_at != null && 'bg-deleted'}`}>
                            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                <h1 className="h4 text-darkblue font-weight-bold text-uppercase">User details</h1>
                                {auth.user.role == 'admin' ? <Link href={route('users.edit', user.id)} as="button" type="button" className="btn btn-outline-darkblue btn-block py-2 px-4 font-weight-bold text-center"><i className="bi bi-pencil me-2"></i>Edit user details</Link> : ''}
                            </div>

                            <div>
                                <span className="text-darkblue font-weight-bold">User name</span>
                                <p className="text-muted">{user.first_name} {user.last_name}</p>
                            </div>

                            <div>
                                <span className="text-darkblue font-weight-bold">Emai laddress</span>
                                <p className="text-muted">{user.email}</p>
                            </div>

                            <div>
                                <span className="text-darkblue font-weight-bold">User role</span>
                                <p className="text-muted">{user.role}</p>
                            </div>

                            <div>
                                <span className="text-darkblue font-weight-bold">Registration date</span>
                                <p className="text-muted">{moment(user.created_at).format('Do MMMM YYYY [at] H:mm')}</p>
                            </div>

                            <div>
                                <span className="text-darkblue font-weight-bold">Verified</span>
                                <p className="text-muted mb-0">
                                    {
                                        user.email_verified_at != null
                                            ? <i className="bi bi-check-lg text-success"></i>
                                            : <i className="bi bi-x-lg text-danger"></i>
                                    }
                                </p>
                            </div>

                            {
                                user.email_verified_at != null
                                    ? <div className="mt-3">
                                        <span className="text-darkblue font-weight-bold">Email verification date</span>
                                        <p className="text-muted mb-0">{moment(user.email_verified_at).format('Do MMMM YYYY [at] H:mm')}</p>
                                    </div>
                                    : ''
                            }
                            {
                                user.deleted_at != null
                                    ? <div className="mt-3">
                                        <span className="text-darkblue font-weight-bold">User is deleted</span>
                                        <p className="text-muted"><i className="bi bi-check-lg text-success"></i></p>

                                        <span className="text-darkblue font-weight-bold">Deleted date</span>
                                        <p className="text-muted mb-0">{moment(user.deleted_at).format('Do MMMM YYYY [at] H:mm')}</p>
                                    </div>
                                    : ''
                            }
                        </div>
                    </div>
                </div>
                <div className="col-xl-8 mb-4">
                    <div className="card shadow mb-4">
                        <div className="card-body p-4 table-responsive">
                            <h1 className="h4 text-darkblue font-weight-bold text-uppercase mb-4">User tickets</h1>
                            <table className="table table-striped table-hover align-middle">
                                <thead className="font-weight-bold text-uppercase">
                                    <tr>
                                        <th scope="col">Title</th>
                                        <th scope="col">ID</th>
                                        <th scope="col">Category</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Priority</th>
                                        <th scope="col">Created at</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tickets.data != ''
                                        ? tickets.data.map((ticket, key) => (
                                            <tr role="button" key={key} onClick={(e) => rowClick(e, ticket.id)}>
                                                <td>{ticket.title}</td>
                                                <td className="col-2">{ticket.ticket_id}</td>
                                                <td>{ticket.category != null && ticket.category.name}</td>
                                                <td>{ticket.status}</td>
                                                <td>{ticket.priority}</td>
                                                <td>{moment(ticket.created_at).format('D/MM/YYYY [at] H:mm')}</td>
                                                <td className="text-end show-more">
                                                    {ticket.attachments &&
                                                        <div className="dropdown text-center">
                                                            <button className="btn" id="dropdownTable" data-bs-toggle="dropdown" aria-expanded="false">
                                                                <i className="bi bi-three-dots-vertical"></i>
                                                            </button>
                                                            <ul className="dropdown-menu dropdown-menu-right shadow" aria-labelledby="dropdownTable">
                                                                <a href={route('attachment.download', ticket.id)} className="dropdown-item"><i className="bi bi-download align-middle me-2"></i>Download attachment</a>
                                                            </ul>
                                                        </div>
                                                    }
                                                </td>
                                            </tr>
                                        ))
                                        : <tr>
                                            <td colSpan="7" className="text-center text-muted">This user does not have any tickets.</td>
                                        </tr>
                                    }
                                </tbody>
                            </table>
                            <Pagination links={links} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

Show.layout = page => <Dashboard children={page} />
export default Show