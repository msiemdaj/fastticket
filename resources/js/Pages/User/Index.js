import React from "react"
import { Link, usePage } from '@inertiajs/inertia-react';
import Swal from "sweetalert2";
import { Inertia } from "@inertiajs/inertia";

import Dashboard from "../../Shared/Dashboard"
import Pagination from "../../Shared/Pagination";
import FilterDataUsers from "../../Shared/FilterDataUsers";

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

    const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: true,
        confirmButtonText: "Restore this user",
        timer: 6000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    });

    const deleteButton = async (id, email) => {
        Swal.fire({
            title: 'Are you sure you want to delete this user?',
            text: "You won't be able to revert this action after confirmation",
            icon: 'warning',
            iconColor: '#d33',
            showCancelButton: true,
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
            reverseButtons: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                await Swal.fire({
                    title: 'Please type users email address to confirm',
                    input: 'email',
                    inputLabel: email,
                    inputValidator: (value) => {
                        if (!value || value != email) {
                            return 'Please enter correct email address'
                        }
                    },
                    focusConfirm: false,
                    showCancelButton: true,
                    confirmButtonText: 'Confirm',
                    cancelButtonText: 'Cancel',
                    reverseButtons: true,
                }).then((res) => {
                    if (res.isConfirmed) {
                        Inertia.delete(route('users.destroy', id))
                        Toast.fire(
                            'Deleted!',
                            'User has been deleted successfully',
                            'success'
                        ).then((toastres) => {
                            if (toastres.isConfirmed) {
                                Inertia.post(route('users.restore', id))
                            }
                        })
                    }
                })
            }
        })
    }

    return (
        <div>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h2 text-darkblue font-weight-bold text-uppercase">All users</h1>
                {
                    auth.user.role == 'admin'
                    && <Link href={route('users.create')} as="button" type="button" className="btn btn-outline-darkblue btn-block py-2 px-4 font-weight-bold text-center">Create new user</Link>
                }
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
                                        <th scope="col" className="col-1 text-center">Verified</th>
                                        <th scope="col">Email address</th>
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
                                                <td className="col-1 text-center">
                                                    {
                                                        user.email_verified_at != null
                                                            ? <i className="bi bi-check-lg text-success"></i>
                                                            : <i className="bi bi-x-lg text-danger"></i>
                                                    }
                                                </td>
                                                <td>{user.email}</td>

                                                <td className="text-end show-more">
                                                    {
                                                        auth.user.role == 'admin'
                                                        && <div className="dropdown text-center">
                                                            <button className="btn" id="dropdownTable" data-bs-toggle="dropdown" aria-expanded="false">
                                                                <i className="bi bi-three-dots-vertical"></i>
                                                            </button>
                                                            <ul className="dropdown-menu dropdown-menu-right shadow" aria-labelledby="dropdownTable">
                                                                <li><Link href={route('users.edit', user.id)} as="button" className="dropdown-item"><i className="bi bi-pencil-square align-middle me-2"></i>Edit</Link></li>
                                                                <li><button onClick={() => deleteButton(user.id, user.email)} className={`dropdown-item ${user.email == auth.user.email && 'disabled'}`}><i className="bi bi-trash-fill align-middle me-2"></i>Delete</button></li>
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