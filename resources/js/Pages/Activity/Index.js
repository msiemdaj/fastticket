import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/inertia-react";
import moment from "moment";
import React from "react"

import Dashboard from "../../Shared/Dashboard"
import Pagination from "../../Shared/Pagination";


const Activity = () => {
    const { activity } = usePage().props;
    const { links } = activity;

    const rowClick = (e, id) => {
        let currentIndex = e.target.cellIndex;

        if (currentIndex !== undefined) {
            Inertia.get(route('ticket.show', id));
        }
    }

    return (
        <div className="row">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h2 text-darkblue font-weight-bold text-uppercase">Activity log</h1>
            </div>

            <div className="col-xl-12 mb-4">
                <div className="card shadow mb-4">
                    <div className="card-body p-4 table-responsive">
                        <table className="table table-striped table-hover align-middle">
                            <thead className="font-weight-bold text-uppercase">
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Created at</th>
                                </tr>
                            </thead>
                            <tbody>
                                {activity.data != ''
                                    ? activity.data.map((log, key) => (
                                        <tr role="button" key={key} onClick={(e) => rowClick(e, log.subject_id)}>
                                            <td>{log.description}</td>
                                            <td>{moment(log.created_at).format('D/MM/YYYY [at] H:mm')}</td>
                                        </tr>
                                    ))
                                    : <tr>
                                        <td colSpan="2" className="text-center text-muted">There is no activity so far</td>
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

Activity.layout = page => <Dashboard children={page} />
export default Activity