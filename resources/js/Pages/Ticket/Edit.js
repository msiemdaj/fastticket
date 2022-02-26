import { Inertia } from "@inertiajs/inertia";
import { useForm, usePage } from "@inertiajs/inertia-react";
import React from "react"
import Swal from "sweetalert2";

import Dashboard from "../../Shared/Dashboard"


const Edit = () => {
    const { ticket, categories, priorities } = usePage().props;

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
                // Inertia.get(route('ticket.close', ticket.id))
                Swal.fire({
                    title: 'Success!',
                    icon: 'success',
                }
                )
            }
        })
    }

    const { data, setData, put, processing, errors } = useForm({
        title: ticket.title,
        description: ticket.description,
        category: ticket.category_id,
        priority: ticket.priority,
    });

    const createSubmit = async (e) => {
        e.preventDefault();
        put(route('ticket.update', ticket.id), {
            preserveScroll: true,
            onSuccess: () => {
                Swal.fire("Success!", "Your ticket has been created and is awaiting resolution", "success");
            },
        });
    }
    return (
        <div className="row">
            <h1 className="h2 mb-4 text-darkblue font-weight-bold text-uppercase">Edit ticket</h1>
            <div className="col-xl-8 mb-4">
                <div className="card shadow mb-4">

                    <div className="card-body p-4">
                        <div className="d-sm-flex align-items-center justify-content-between mb-2">
                            <h1 className="h4 text-darkblue font-weight-bold text-uppercase">Change fields below to edit this ticket</h1>
                            {
                                ticket.status != 'Open'
                                    ? <button className="btn btn-outline-darkblue btn-block py-2 px-4 font-weight-bold text-center" onClick={openTicket}>Open this ticket</button>
                                    : <button className="btn btn-outline-success btn-block py-2 px-4 font-weight-bold text-center" onClick={closeTicket}>Close this ticket</button>
                            }
                        </div>

                        <form onSubmit={createSubmit}>
                            <div className="mb-4">
                                <label htmlFor="ticketTitle" className="form-label font-weight-bold text-darkblue required">Ticket title</label>
                                <input onChange={e => setData('title', e.target.value)} value={data.title}
                                    type="text" id="ticketTitle" name="title" className={`form-control bg-white border-left-0 border-md text-muted ${errors.title ? 'is-invalid' : ''}`} />

                                {errors.title && <span className="mt-1 text-danger">{errors.title}</span>}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="ticketCategory" className="form-label font-weight-bold text-darkblue required">Category</label>
                                <select onChange={e => setData('category', e.target.value)} value={data.category}
                                    id="ticketCategory" name="category" className={`form-select bg-white border-left-0 border-md text-muted ${errors.category ? 'is-invalid' : ''}`}>
                                    <option>-</option>
                                    {
                                        categories.map((category, key) => (
                                            <option key={key} value={category.id}>{category.name}</option>
                                        ))
                                    }
                                </select>
                                {errors.category && <span className="mt-1 text-danger">{errors.category}</span>}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="ticketPriority" className="form-label font-weight-bold text-darkblue required">Priority</label>
                                <select onChange={e => setData('priority', e.target.value)} value={data.priority}
                                    id="ticketPriority" name="priority" className={`form-select bg-white border-left-0 border-md text-muted ${errors.priority ? 'is-invalid' : ''}`}>
                                    {
                                        priorities.map((priority, key) => (
                                            <option key={key}>{priority}</option>
                                        ))
                                    }
                                </select>
                                {errors.priority && <span className="mt-1 text-danger">{errors.priority}</span>}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="ticketDescription" className="form-label font-weight-bold text-darkblue required">Description</label>
                                <textarea onChange={e => setData('description', e.target.value)} value={data.description}
                                    id="ticketDescription" name="description" rows="3" className={`form-control bg-white border-left-0 border-md text-muted ${errors.description ? 'is-invalid' : ''}`} required />

                                {errors.description && <span className="mt-1 text-danger">{errors.description}</span>}
                            </div>

                            <button type="submit" className="btn btn-outline-darkblue btn-block py-2 px-4 font-weight-bold text-center" disabled={processing}>Update</button>

                        </form>
                    </div>
                </div>
            </div>
        </div >
    )
}

Edit.layout = page => <Dashboard children={page} />
export default Edit