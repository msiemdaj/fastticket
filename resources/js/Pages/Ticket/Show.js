import { Inertia } from "@inertiajs/inertia";
import { Link, usePage, useForm } from "@inertiajs/inertia-react";
import React from "react"
import Swal from "sweetalert2";

import Dashboard from "../../Shared/Dashboard"


const Show = () => {
    const { ticket, auth, messages } = usePage().props;
    const { user, worker, closed_by, category } = ticket;

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

    const closeTicket = (id, completed) => {
        Swal.fire({
            title: 'Are you sure you want to close this ticket?',
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                Inertia.get(route('ticket.close', { id, completed }))
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
        if (ticket.status != 'Open') {
            Swal.fire("Error!", "To send a reply ticket must be open", "error");
        } else {
            post(route('message.store', ticket.id), {
                preserveScroll: true,
                onSuccess: () => {
                    Swal.fire("Success!", "Your reply has been successfully added to this ticket", "success");
                    setData({ message: '' });
                },
            });
        }
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
            <h1 className="h2 text-darkblue font-weight-bold text-uppercase mb-4">Ticket preview</h1>

            <div className="row">
                <div className="col-xl-8 mb-4">
                    <div className="card shadow mb-4">
                        <div className={`card-body p-4 ${ticket.status == 'Completed' && 'bg-completed'}`}>
                            <div className="d-sm-flex align-items-center justify-content-between mb-2">
                                <h1 className="h4 text-darkblue font-weight-bold">{ticket.title}</h1>
                                {

                                    ticket.status != 'Open'
                                        ? auth.user.role == 'admin' || auth.user.role == 'worker'
                                            ? <button className="btn btn-outline-darkblue btn-block py-2 px-4 font-weight-bold text-center" onClick={openTicket}>Open this ticket</button>
                                            : ''
                                        : auth.user.role == 'admin'
                                            || (auth.user.role == 'worker' && worker[0].id == auth.user.id)
                                            || user[0].id == auth.user.id
                                            ? <div className="dropdown">
                                                <button className="btn btn-outline-darkblue btn-block py-2 px-4 font-weight-bold text-center dropdown-toggle" id="dropdownClose" data-bs-toggle="dropdown" aria-expanded="false">Close this ticket</button>
                                                <ul className="dropdown-menu dropdown-menu-right shadow" aria-labelledby="dropdownTable">
                                                    <li><button onClick={() => closeTicket(ticket.id, false)} className="dropdown-item">Close ticket</button></li>
                                                    <li><button onClick={() => closeTicket(ticket.id, true)} className="dropdown-item">Close and mark as completed</button></li>
                                                </ul>
                                            </div>
                                            : ''
                                }
                            </div>

                            <div className="text-muted">
                                <span>Sent by </span>
                                <span>
                                    {
                                        auth.user.role == 'admin' || auth.user.role == 'worker' ?
                                            <Link href={route('users.show', user[0].id)}>{user[0].first_name} {user[0].last_name}</Link>
                                            : user[0].first_name + ' ' + user[0].last_name
                                    }
                                </span>
                            </div>

                            <div className="text-muted">
                                <span>at {ticket.created_at}</span>
                            </div>

                            <div className="my-4">
                                <p className="text-darkblue">{ticket.description}</p>
                            </div>
                        </div>
                    </div>

                    {
                        messages.map((message, key) => (
                            <div key={key} className="card shadow mb-4">
                                <div className="card-body p-4">
                                    <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                        <div className="text-muted">
                                            <span>Reply by </span>
                                            <span>
                                                {
                                                    auth.user.role == 'admin' || auth.user.role == 'worker'
                                                        ? <Link href={route('users.show', message.user.id)}>{message.user.first_name} {message.user.last_name}</Link>
                                                        : message.user.first_name + ' ' + message.user.last_name
                                                }
                                            </span>
                                            <div className="text-muted">
                                                <span>at {message.created_at}</span>
                                            </div>
                                        </div>

                                        {
                                            auth.user.role == 'admin' || (auth.user.role == 'worker' && auth.user.id == message.user.id)
                                                ? <div className="dropdown text-center show-more">
                                                    <button className="btn" id="dropdownTable" data-bs-toggle="dropdown" aria-expanded="false">
                                                        <i className="bi bi-three-dots-vertical"></i>
                                                    </button>
                                                    <ul className="dropdown-menu dropdown-menu-right shadow" aria-labelledby="dropdownTable">
                                                        <li><button onClick={() => deleteMessage(message.id)} className="dropdown-item"><i className="bi bi-trash-fill align-middle me-2"></i>Delete</button></li>
                                                    </ul>
                                                </div>
                                                : ''
                                        }
                                    </div>
                                    <p className="text-darkblue">
                                        {message.body}
                                    </p>
                                </div>
                            </div>
                        ))
                    }

                    <div className="card shadow mb-4">
                        <div className="card-body p-4">
                            <h1 className="h4 text-darkblue font-weight-bold text-uppercase mb-4">Reply to this message</h1>

                            <form onSubmit={replySubmit}>
                                <div className="mb-4">
                                    <label htmlFor="message" className="form-label font-weight-bold text-darkblue">Message</label>
                                    <textarea onChange={e => setData('message', e.target.value)} value={data.message}
                                        id="message" name="message" rows="4" className={`form-control border-left-0 border-md text-muted ${errors.message ? 'is-invalid' : ''}`} />

                                    {errors.message && <span className="mt-1 text-danger">{errors.message}</span>}
                                </div>

                                <button type="submit" className={`btn btn-outline-darkblue btn-block py-2 px-4 font-weight-bold text-center ${ticket.status != 'Open' && 'disabled'}`} disabled={processing}><i className="bi bi-send me-2 align-middle"></i>Reply</button>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="col-xl-4 mb-4">

                    {ticket.attachments &&
                        <div className="card shadow mb-4">
                            <div className="card-body p-4">
                                <h1 className="h4 text-darkblue font-weight-bold text-uppercase mb-4">Attachments</h1>
                                <a href={route('attachment.download', ticket.id)} className="btn btn-outline-darkblue btn-block py-2 px-4 font-weight-bold text-center"><i className="bi bi-download me-2 align-middle"></i>Download</a>
                            </div>
                        </div>
                    }



                    <div className="card shadow mb-4">
                        <div className="card-body p-4">
                            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                <h1 className="h4 text-darkblue font-weight-bold text-uppercase">Ticket details</h1>
                                {auth.user.role == 'admin' || auth.user.role == 'worker'
                                    ? <Link href={route('ticket.edit', ticket.id)} as="button" type="button" className="btn btn-outline-darkblue btn-block py-2 px-4 font-weight-bold text-center"><i className="bi bi-pencil me-2"></i>Edit ticket details</Link> : ''}
                            </div>

                            <div>
                                <span className="text-darkblue font-weight-bold">Title</span>
                                <p className="text-muted">{ticket.title}</p>
                            </div>

                            <div>
                                <span className="text-darkblue font-weight-bold">Category</span>
                                <p className="text-muted">{category != null && category.name}</p>
                            </div>

                            <div>
                                <span className="text-darkblue font-weight-bold">Status</span>
                                <p className="text-muted">{ticket.status}</p>
                            </div>

                            <div>
                                <span className="text-darkblue font-weight-bold">Priority</span>
                                <p className="text-muted">{ticket.priority}</p>
                            </div>

                            <div>
                                <span className="text-darkblue font-weight-bold">Created at</span>
                                <p className="text-muted">{ticket.created_at}</p>
                            </div>

                            <div>
                                <span className="text-darkblue font-weight-bold">Updated at</span>
                                <p className="text-muted">{ticket.updated_at}</p>
                            </div>

                            <div>
                                <span className="text-darkblue font-weight-bold">Created by</span>
                                <p className="text-muted">
                                    {
                                        auth.user.role == 'admin' || auth.user.role == 'worker' ?
                                            <Link href={route('users.show', user[0].id)}>{user[0].first_name} {user[0].last_name}</Link>
                                            : user[0].first_name + ' ' + user[0].last_name
                                    }
                                </p>
                            </div>

                            {worker[0] &&
                                <div>
                                    <span className="text-darkblue font-weight-bold">Opened by</span>
                                    <p className="text-muted">
                                        {
                                            auth.user.role == 'admin' || auth.user.role == 'worker' ?
                                                <Link href={route('users.show', worker[0].id)}>{worker[0].first_name} {worker[0].last_name}</Link>
                                                : worker[0].first_name + ' ' + worker[0].last_name
                                        }
                                    </p>
                                </div>
                            }

                            {closed_by[0] &&
                                <div>
                                    <span className="text-darkblue font-weight-bold">Closed by</span>
                                    <p className="text-muted">
                                        {
                                            auth.user.role == 'admin' || auth.user.role == 'worker' ?
                                                <Link href={route('users.show', closed_by[0].id)}>{closed_by[0].first_name} {closed_by[0].last_name}</Link>
                                                : closed_by[0].first_name + ' ' + closed_by[0].last_name
                                        }
                                    </p>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

Show.layout = page => <Dashboard children={page} />
export default Show