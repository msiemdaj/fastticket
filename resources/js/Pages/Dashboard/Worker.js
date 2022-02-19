import { Link, usePage } from "@inertiajs/inertia-react"
import React from "react"
import { Download } from "react-bootstrap-icons";

import Dashboard from "../../Shared/Dashboard"
import FilterData from "../../Shared/FilterData";
import Pagination from "../../Shared/Pagination";

const WorkerPage = () => {
    const { newtickets } = usePage().props;
    const { links } = newtickets;

    return (
        <div>
            <div className="card">
                <div className="card-body">
                    <h1>New tickets last 48h</h1>
                    <FilterData />
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Title</th>
                                <th scope="col">Description</th>
                                <th scope="col">Category</th>
                                <th scope="col">Status</th>
                                <th scope="col">Priority</th>
                                <th scope="col">Created at</th>
                                <th scope="col">Attachments</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                newtickets.data.map((row, key) => (
                                    <tr key={key}>
                                        <td><Link href={route('ticket.show', row.id)}>{row.title}</Link></td>
                                        <td>{row.description}</td>
                                        <td>{row.category.name}</td>
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
            </div>
            <div className="card col-6">
                <div className="card-body">
                    <h1>My tickets</h1>
                </div>
            </div>
        </div>
    )
}

WorkerPage.layout = page => <Dashboard children={page} />
export default WorkerPage