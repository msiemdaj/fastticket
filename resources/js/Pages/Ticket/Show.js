import { Link, usePage } from "@inertiajs/inertia-react";
import React from "react"

import Dashboard from "../../Shared/Dashboard"


const Show = () => {
    const { ticket, auth } = usePage().props;
    const { user, category } = ticket;

    return (
        <div>
            <div className="card mt-1">
                <div className="card-header">Ticket title</div>
                <div className="card-body">
                    {ticket.title}
                </div>
            </div>
            <div className="card mt-1">
                <div className="card-header">Ticket description</div>
                <div className="card-body">
                    {ticket.description}
                </div>
            </div>
            <div className="card mt-1">
                <div className="card-header">Category</div>
                <div className="card-body">
                    {category.name}
                </div>
            </div>
            <div className="card mt-1">
                <div className="card-header">Status</div>
                <div className="card-body">
                    {ticket.status}
                </div>
            </div>
            <div className="card mt-1">
                <div className="card-header">Priority</div>
                <div className="card-body">
                    {ticket.priority}
                </div>
            </div>
            <div className="card mt-1">
                <div className="card-header">Create date</div>
                <div className="card-body">
                    {ticket.created_at}
                </div>
            </div>
            <div className="card mt-1">
                <div className="card-header">Created by</div>
                <div className="card-body">
                    {auth.user.role == 'admin' || auth.user.role == 'worker' ?
                        <Link href={route('users.show', user.id)}>{user.first_name} {user.last_name}</Link>
                        : user.first_name + ' ' + user.last_name
                    }
                </div>
            </div>
            {ticket.attachments &&
                <div className="card mt-1">
                    <div className="card-header">attachments</div>
                    <div className="card-body">
                        <a href={route('attachment.download', ticket.id)} className="btn btn-secondary text-secondary bg-light me-1">Download</a>
                    </div>
                </div>
            }
            <Link href={route('ticket.edit', ticket.id)} as="button" type="button" className="btn btn-outline-primary mt-4">Edit ticket details</Link>
        </div>
    )
}

Show.layout = page => <Dashboard children={page} />
export default Show