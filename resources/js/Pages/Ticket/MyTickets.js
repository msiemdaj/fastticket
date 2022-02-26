import { Link, usePage } from "@inertiajs/inertia-react";
import React from "react"

import Dashboard from "../../Shared/Dashboard"
import FilterData from "../../Shared/FilterData";
import Pagination from "../../Shared/Pagination";


const MyTickets = () => {
    const { tickets, categories, statuses, priorities } = usePage().props;
    const { links } = tickets;

    return (
        <div className="row">
            <h1 className="h2 text-darkblue font-weight-bold text-uppercase">My tickets</h1>
            <div className="col-xl-12 mb-4">
                <div className="card shadow mb-4">
                    <div className="card-body p-4 table-responsive">
                        <FilterData categories={categories} statuses={statuses} priorities={priorities} />
                        <table className="table table-striped table-hover align-middle">
                            <thead className="font-weight-bold text-uppercase">
                                <tr>
                                    <th scope="col">Title</th>
                                    <th scope="col">Category</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Priority</th>
                                    <th scope="col">Created at</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {tickets.data != ''
                                    ? tickets.data.map((row, key) => (
                                        <tr role="button" key={key}>
                                            <td><Link href={route('ticket.show', row.id)}>{row.title}</Link></td>
                                            <td>{row.category.name}</td>
                                            <td>{row.status}</td>
                                            <td>{row.priority}</td>
                                            <td>{row.created_at}</td>
                                            <td className="text-end show-more">
                                                {row.attachments &&
                                                    <div className="dropdown text-center">
                                                        <button className="btn" id="dropdownTable" data-bs-toggle="dropdown" aria-expanded="false">
                                                            <i className="bi bi-three-dots-vertical"></i>
                                                        </button>
                                                        <ul className="dropdown-menu dropdown-menu-right shadow" aria-labelledby="dropdownTable">
                                                            <a href={route('attachment.download', row.id)} className="dropdown-item"><i className="bi bi-download align-middle me-2"></i>Download attachment</a>
                                                        </ul>
                                                    </div>
                                                }
                                            </td>
                                        </tr>
                                    ))
                                    : <tr>
                                        <td colSpan="6" className="text-center text-muted">We were unable to find tickets with these filters.</td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                        <Pagination links={links} />
                    </div>
                </div>
            </div>
        </div>
    )
}

MyTickets.layout = page => <Dashboard children={page} />
export default MyTickets