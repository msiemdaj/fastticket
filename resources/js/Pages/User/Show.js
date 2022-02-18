import { Link, usePage } from "@inertiajs/inertia-react";
import React from "react"
import { Download } from "react-bootstrap-icons";

import Dashboard from "../../Shared/Dashboard"
import Pagination from "../../Shared/Pagination";


const Show = () => {
    const { user, tickets, auth } = usePage().props;
    const { links } = tickets;

    return (

        <div>
            <div className="card mt-1">
                <div className="card-body">
                    {user.first_name} {user.last_name}
                </div>
            </div>
            <div className="card mt-1">
                <div className="card-body">
                    {user.email}
                </div>
            </div>
            <div className="card mt-1">
                <div className="card-body">
                    {user.role}
                </div>
            </div>
            <div className="card mt-1">
                <div className="card-body">
                    {user.created_at}
                </div>
            </div>
            {auth.user.role == 'admin' ? <Link href={route('users.edit', user.id)} as="button" type="button" className="btn btn-outline-primary mt-4">Edit user details</Link> : ''}

            <h3 className="mt-4">{user.first_name} {user.last_name} tickets</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Description</th>
                        <th scope="col">Status</th>
                        <th scope="col">Priority</th>
                        <th scope="col">Created at</th>
                        <th scope="col">Attachments</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tickets.data.map((row, key) => (
                            <tr key={key}>
                                <td><Link href={route('ticket.show', row.id)}>{row.title}</Link></td>
                                <td>{row.description}</td>
                                <td>{row.status}</td>
                                <td>{row.priority}</td>
                                <td>{row.created_at}</td>
                                <td>
                                    {row.attachments && <a href={route('attachment.download', row.id)} className="btn btn-light text-secondary bg-white me-1"><Download size="18" /></a>}
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <Pagination links={links} />
        </div>
    )
}

Show.layout = page => <Dashboard children={page} />
export default Show