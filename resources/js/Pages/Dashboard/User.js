import { Inertia } from "@inertiajs/inertia"
import { Link, usePage } from "@inertiajs/inertia-react"
import moment from "moment"
import React from "react"

import Dashboard from "../../Shared/Dashboard"
import FilterData from "../../Shared/FilterData"
import Pagination from "../../Shared/Pagination"

const UserPage = () => {
    const { tickets, categories, statuses, priorities } = usePage().props;
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
                <h1 className="h2 text-darkblue font-weight-bold text-uppercase">Dashboard</h1>
                <Link href={route('ticket.create')} as="button" type="button" className="btn btn-outline-darkblue btn-block py-2 px-4 font-weight-bold text-center">Create new ticket</Link>
            </div>

            <div className="row">
                <div className="col-xl-12 mb-4">
                    <div className="card shadow mb-4">
                        <div className="card-body p-4 table-responsive">
                            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                <h1 className="h4 text-darkblue font-weight-bold text-uppercase">List of tickets submitted by you</h1>
                            </div>

                            <FilterData categories={categories} statuses={statuses} priorities={priorities} />
                            <table className="table table-striped table-hover align-middle">
                                <thead className="font-weight-bold text-uppercase">
                                    <tr>
                                        <th scope="col">Title</th>
                                        <th scope="col">Category</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Priority</th>
                                        <th scope="col">Created at</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tickets.data != ''
                                        ? tickets.data.map((ticket, key) => (
                                            <tr role="button" key={key} onClick={(e) => rowClick(e, ticket.id)}>
                                                <td>{ticket.title}</td>
                                                <td>{ticket.category != null && ticket.category.name}</td>
                                                <td>{ticket.status}</td>
                                                <td>{ticket.priority}</td>
                                                <td>{moment(ticket.created_at).format('D/MM/YYYY [at] H:mm')}</td>
                                            </tr>
                                        ))
                                        : <tr>
                                            <td colSpan="5" className="text-center text-muted">We were unable to find tickets with these filters.</td>
                                        </tr>
                                    }
                                </tbody>
                            </table>
                            <Pagination links={links} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-xl-6 mb-4">
                    <div className="card shadow mb-4">
                        <div className="card-body p-4 table-responsive">
                            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                <h1 className="h4 text-darkblue font-weight-bold text-uppercase">History</h1>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

UserPage.layout = page => <Dashboard children={page} />
export default UserPage