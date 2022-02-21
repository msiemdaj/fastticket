import { Inertia } from "@inertiajs/inertia";
import { Link, usePage, useForm } from "@inertiajs/inertia-react";
import React from "react"
import Swal from "sweetalert2";

import Dashboard from "../../Shared/Dashboard"


const Show = () => {
    const { ticket, auth, messages } = usePage().props;
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

    const { data, setData, post, processing, errors } = useForm({
        message: '',
    });

    const replySubmit = async (e) => {
        e.preventDefault();
        post(route('message.store', ticket.id), {
            preserveScroll: true,
            onSuccess: () => {
                Swal.fire("Success!", "Your reply has been successfully added to this ticket", "success");
                setData({ message: '' });
            },
        });
    }

    const deleteMessage = (id) => {
        Swal.fire({
            title: 'Are you sure you want to delete this message?',
            icon: 'error',
            showCancelButton: true,
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                Inertia.delete(route('message.delete', id))
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

            <h1 className="mt-4">Messages</h1>
            {
                messages.map((message, key) => (
                    <div className="card mt-2" key={key}>
                        <div className="card-body">
                            {
                                auth.user.role == 'admin' || (auth.user.role == 'worker' && auth.user.id == worker[0].id)
                                    ? <div>
                                        <button className="btn btn-outline-danger" onClick={() => deleteMessage(message.id)}>Delete message</button>
                                    </div>
                                    : ''
                            }
                            Reply by {auth.user.role == 'admin' || auth.user.role == 'worker'
                                ? <Link href={route('users.show', message.user.id)}>{message.user.first_name} {message.user.last_name}</Link>
                                : message.user.first_name + ' ' + message.user.last_name
                            } <span className="text-muted">at {message.created_at}</span>
                            <p>
                                {message.body}
                            </p>
                        </div>
                    </div>
                ))}
            <div className="card mt-4 p-4">
                <h2>Reply to this ticket</h2>
                <form onSubmit={replySubmit}>
                    <div className="input-group col-lg-6 mt-4">
                        <textarea onChange={e => setData('message', e.target.value)} value={data.message}
                            id="message" className={`form-control bg-light border-left-0 border-md ${errors.message ? 'is-invalid' : ''}`} placeholder="Message..." name="message" rows="4" />
                    </div>
                    {errors.message && <span className="mt-1 text-danger">{errors.message}</span>}

                    <div className="form-group col-lg-12 mx-auto mb-0 mt-4">
                        <button type="submit" className="btn btn-outline-primary btn-block py-2 font-weight-bold" disabled={processing}>Reply</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

Show.layout = page => <Dashboard children={page} />
export default Show