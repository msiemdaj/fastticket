import { Inertia } from "@inertiajs/inertia";
import { Link, usePage } from "@inertiajs/inertia-react";
import React from "react"
import Swal from "sweetalert2";

import Dashboard from "../../Shared/Dashboard"


const Show = () => {
    const { ticket, auth } = usePage().props;
    const { user, worker, category } = ticket;

    const openTicket = () => {
        Swal.fire({
            title: 'Are you sure you want to open this ticket?',
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                Inertia.get(route('ticket.open', ticket.id))
                Swal.fire({
                    title: 'Success!',
                    icon: 'success',
                }
                )
            }
        })
    }

    const closeTicket = () => {
        Swal.fire({
            title: 'Are you sure you want to close this ticket?',
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                Inertia.get(route('ticket.close', ticket.id))
                Swal.fire({
                    title: 'Success!',
                    icon: 'success',
                }
                )
            }
        })
    }

    return (
        <div>
            <div className="btn-group col-12 mb-4">
                <button className="btn btn-outline-secondary" onClick={openTicket}>Open this ticket</button>
                <Link href={route('ticket.edit', ticket.id)} as="button" type="button" className="btn btn-outline-primary">Edit ticket details</Link>
            </div>
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
                        <Link href={route('users.show', user[0].id)}>{user[0].first_name} {user[0].last_name}</Link>
                        : user[0].first_name + ' ' + user[0].last_name
                    }
                </div>
            </div>
            {worker[0] &&
                <div className="card mt-1">
                    <div className="card-header">Opened by</div>
                    <div className="card-body">
                        {auth.user.role == 'admin' || auth.user.role == 'worker' ?
                            <Link href={route('users.show', worker[0].id)}>{worker[0].first_name} {worker[0].last_name}</Link>
                            : worker[0].first_name + ' ' + worker[0].last_name
                        }
                    </div>
                </div>
            }
            {ticket.attachments &&
                <div className="card mt-1">
                    <div className="card-header">attachments</div>
                    <div className="card-body">
                        <a href={route('attachment.download', ticket.id)} className="btn btn-secondary text-secondary bg-light me-1">Download</a>
                    </div>
                </div>
            }
        </div>
    )
}

Show.layout = page => <Dashboard children={page} />
export default Show