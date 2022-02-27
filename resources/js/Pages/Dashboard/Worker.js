import { Link, usePage } from "@inertiajs/inertia-react"
import React from "react"

import Dashboard from "../../Shared/Dashboard"
import FilterData from "../../Shared/FilterData";
import Pagination from "../../Shared/Pagination";

const WorkerPage = () => {
    const { newtickets, categories, mytickets, statuses, priorities } = usePage().props;
    const { links } = newtickets;

    return (
        <div>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h2 text-darkblue font-weight-bold text-uppercase">Dashboard</h1>
            </div>

            <div className="row">
                <div className="col-xl-12 mb-4">
                    <div className="card shadow mb-4">
                        <div className="card-body p-4 table-responsive">
                            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                <h1 className="h4 text-darkblue font-weight-bold text-uppercase">Tickets created in last 48 hours</h1>
                                <Link href={route('ticket.all')} as="button" type="button" className="btn btn-outline-darkblue btn-block py-2 px-4 font-weight-bold text-center">Show all tickets</Link>
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
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {newtickets.data != ''
                                        ? newtickets.data.map((row, key) => (
                                            <tr role="button" key={key}>
                                                <td><Link href={route('ticket.show', row.id)}>{row.title}</Link></td>
                                                <td>{row.category != null && row.category.name}</td>
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

            <div className="row">
                <div className="col-xl-6 mb-4">
                    <div className="card shadow mb-4">
                        <div className="card-body p-4 table-responsive">
                            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                <h1 className="h4 text-darkblue font-weight-bold text-uppercase">Latest tickets opened by me</h1>
                                <Link href={route('ticket.mytickets')} as="button" type="button" className="btn btn-outline-darkblue btn-block py-2 px-4 font-weight-bold text-center">Show all my tickets</Link>
                            </div>

                            <table className="table table-striped table-hover align-middle">
                                <thead className="font-weight-bold text-uppercase">
                                    <tr>
                                        <th scope="col">Title</th>
                                        <th scope="col">Category</th>
                                        <th scope="col">Priority</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mytickets != ''
                                        ? mytickets.map((tckt, key) => (
                                            <tr role="button" key={key}>
                                                <td><Link href={route('ticket.show', tckt.id)}>{tckt.title}</Link></td>
                                                <td>{tckt.category != null && tckt.category.name}</td>
                                                <td>{tckt.priority}</td>
                                            </tr>
                                        ))
                                        : <tr>
                                            <td colSpan="3" className="text-center text-muted">Currently you don't have any opened tickets.</td>
                                        </tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="col-xl-6 mb-4">
                    <div className="card shadow mb-4">
                        <div className="card-body p-4">
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

WorkerPage.layout = page => <Dashboard children={page} />
export default WorkerPage