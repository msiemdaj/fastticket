import React from 'react'
import { Link, usePage } from '@inertiajs/inertia-react';
import { Download } from 'react-bootstrap-icons';

import Dashboard from '../../Shared/Dashboard';
import Pagination from '../../Shared/Pagination';

function Tickets() {
    const { tickets } = usePage().props;
    const { links } = tickets;

    return (
        <div>
            <h1>All tickets</h1>
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

Tickets.layout = page => <Dashboard children={page} />
export default Tickets;