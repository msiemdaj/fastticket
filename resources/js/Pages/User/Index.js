import React from "react"
import { Link, usePage } from '@inertiajs/inertia-react';
import Swal from "sweetalert2";
import { Inertia } from "@inertiajs/inertia";
import { PencilSquare, TrashFill } from 'react-bootstrap-icons';

import Dashboard from "../../Shared/Dashboard"
import Pagination from "../../Shared/Pagination";

const User = () => {
    const { users } = usePage().props;
    const { links } = users;

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
                        Swal.fire(
                            'Deleted!',
                            'User has been deleted successfully',
                            'success'
                        )
                    }
                })
            }
        })
    }

    return (
        <div>
            <Link href={route('users.create')} as="button" type="button" className="btn btn-outline-primary">Create new user</Link>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">First name</th>
                        <th scope="col">Last name</th>
                        <th scope="col">Role</th>
                        <th scope="col">Email address</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.data.map((row, key) => (
                            <tr key={key}>
                                <td>{row.first_name}</td>
                                <td>{row.last_name}</td>
                                <td>{row.role}</td>
                                <td>{row.email}</td>
                                <td>
                                    <div className="btn-group">
                                        <Link href={route('users.edit', row.id)} as="button" className="btn btn-light text-secondary bg-white me-1"><PencilSquare size="18" /></Link>
                                        <button onClick={() => deleteButton(row.id, row.email)} className="btn btn-light text-secondary bg-white"><TrashFill size="18" /></button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <Pagination links={links} />
        </div>
    )
}

User.layout = page => <Dashboard children={page} />
export default User