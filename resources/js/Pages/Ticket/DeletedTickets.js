import React from "react"
import { usePage } from '@inertiajs/inertia-react';
import Swal from "sweetalert2";
import { Inertia } from "@inertiajs/inertia";

import Dashboard from "../../Shared/Dashboard"
import Pagination from "../../Shared/Pagination";
import FilterData from "../../Shared/FilterData";
import moment from "moment";

const DeletedTickets = () => {
    const { auth, tickets, categories, statuses, priorities } = usePage().props;
    const { links } = tickets;

    const rowClick = (e, id) => {
        let currentIndex = e.target.cellIndex;
        let dropdownIndex = document.getElementsByClassName('showmore.dropdown').cellIndex

        if (currentIndex !== dropdownIndex && currentIndex !== undefined) {
            Inertia.get(route('ticket.show', id));
        }
    }

    const restoreButton = async (id) => {
        Swal.fire({
            title: 'Are you sure you want to restore this ticket?',
            icon: 'warning',
            iconColor: '#d33',
            showCancelButton: true,
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
        }).then(async (result) => {
            if (result.isConfirmed) {
                Inertia.post(route('ticket.restore', id))
                Swal.fire(
                    'Restored!',
                    'Ticket has been succesfully restored',
                    'success'
                )
            }
        })
    }

    return (
        <div>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h2 text-darkblue font-weight-bold text-uppercase">Deleted tickets</h1>
            </div>

            <div className="row">
                <div className="col-xl-12 mb-4">
                    <div className="card shadow mb-4">
                        <div className="card-body p-4 table-responsive">
                            <FilterData categories={categories} statuses={statuses} priorities={priorities} />
                            <table className="table table-striped table-hover align-middle">
                                <thead className="font-weight-bold text-uppercase">
                                    <tr>
                                        <th scope="col">Title</th>
                                        <th scope="col">ID</th>
                                        <th scope="col">Category</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Priority</th>
                                        <th scope="col">Created at</th>
                                        <th scope="col">deleted at</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tickets.data != ''
                                        ? tickets.data.map((ticket, key) => (
                                            <tr role="button" key={key} onClick={(e) => rowClick(e, ticket.id)}>
                                                <td>{ticket.title}</td>
                                                <td>{ticket.ticket_id}</td>
                                                <td>{ticket.category != null && ticket.category.name}</td>
                                                <td>{ticket.status}</td>
                                                <td>{ticket.priority}</td>
                                                <td>{moment(ticket.created_at).format('D/MM/YYYY [at] H:mm')}</td>
                                                <td>{moment(ticket.deleted_at).format('D/MM/YYYY [at] H:mm')}</td>
                                                <td className="text-end show-more">
                                                    <div className="dropdown text-center">
                                                        <button className="btn" id="dropdownTable" data-bs-toggle="dropdown" aria-expanded="false">
                                                            <i className="bi bi-three-dots-vertical"></i>
                                                        </button>
                                                        <ul className="dropdown-menu dropdown-menu-right shadow" aria-labelledby="dropdownTable">
                                                            <li><button onClick={() => restoreButton(ticket.id)} className="dropdown-item">Restore ticket</button></li>
                                                        </ul>
                                                    </div>

                                                </td>
                                            </tr>
                                        ))
                                        : <tr>
                                            <td colSpan="8" className="text-center text-muted">We were unable to find users with these filters.</td>
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

DeletedTickets.layout = page => <Dashboard children={page} />
export default DeletedTickets