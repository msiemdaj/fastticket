import React from "react"
import { Link, usePage } from '@inertiajs/inertia-react';
import Swal from "sweetalert2";
import { Inertia } from "@inertiajs/inertia";

import Dashboard from "../../Shared/Dashboard"
import Pagination from "../../Shared/Pagination";
import FilterDataUsers from "../../Shared/FilterDataUsers";
import moment from "moment";

const User = () => {
    const { auth, users, roles } = usePage().props;
    const { links } = users;

    const rowClick = (e, id) => {
        let currentIndex = e.target.cellIndex;
        let dropdownIndex = document.getElementsByClassName('showmore.dropdown').cellIndex

        if (currentIndex !== dropdownIndex && currentIndex !== undefined) {
            Inertia.get(route('users.show', id));
        }
    }

    const restoreButton = async (id) => {
        Swal.fire({
            title: 'Are you sure you want to restore this user?',
            icon: 'warning',
            iconColor: '#d33',
            showCancelButton: true,
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
            reverseButtons: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                Inertia.post(route('users.restore', id))
                Swal.fire(
                    'Restored!',
                    'User has been successfulyl restored',
                    'success'
                )
            }
        })
    }

    return (
        <div>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h2 text-darkblue font-weight-bold text-uppercase">Deleted users</h1>
            </div>

            <div className="row">
                <div className="col-xl-12 mb-4">
                    <div className="card shadow mb-4">
                        <div className="card-body p-4 table-responsive">
                            <FilterDataUsers roles={roles} />
                            <table className="table table-striped table-hover align-middle">
                                <thead className="font-weight-bold text-uppercase">
                                    <tr>
                                        <th scope="col">First name</th>
                                        <th scope="col">Last name</th>
                                        <th scope="col" className="col-1 text-center">Role</th>
                                        <th scope="col">Email address</th>
                                        <th scope="col">Created at</th>
                                        <th scope="col">Deleted at</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.data != ''
                                        ? users.data.map((user, key) => (
                                            <tr role="button" key={key} onClick={(e) => rowClick(e, user.id)}>
                                                <td>{user.first_name}</td>
                                                <td>{user.last_name}</td>
                                                <td className="col-1 text-center">{user.role}</td>
                                                <td>{user.email}</td>
                                                <td>{moment(user.created_at).format('D/MM/YYYY [at] H:mm')}</td>
                                                <td>{moment(user.deleted_at).format('D/MM/YYYY [at] H:mm')}</td>

                                                <td className="text-end show-more">
                                                    {
                                                        auth.user.role == 'admin'
                                                        && <div className="dropdown text-center">
                                                            <button className="btn" id="dropdownTable" data-bs-toggle="dropdown" aria-expanded="false">
                                                                <i className="bi bi-three-dots-vertical"></i>
                                                            </button>
                                                            <ul className="dropdown-menu dropdown-menu-right shadow" aria-labelledby="dropdownTable">
                                                                <li><button onClick={() => restoreButton(user.id)} className="dropdown-item">Restore user</button></li>
                                                            </ul>
                                                        </div>
                                                    }
                                                </td>
                                            </tr>
                                        ))
                                        : <tr>
                                            <td colSpan="6" className="text-center text-muted">We were unable to find users with these filters.</td>
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

User.layout = page => <Dashboard children={page} />
export default User