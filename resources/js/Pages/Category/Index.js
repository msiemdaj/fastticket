import React from "react"
import { Link, usePage } from '@inertiajs/inertia-react';
import Swal from "sweetalert2";
import { Inertia } from "@inertiajs/inertia";
import { PencilSquare, TrashFill } from 'react-bootstrap-icons';

import Dashboard from "../../Shared/Dashboard"
import Pagination from "../../Shared/Pagination";

const Category = () => {
    const { categories } = usePage().props;
    const { links } = categories;

    const deleteButton = (id) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Are you sure you want to delete this category?',
            text: "You won't be able to revert this action after confirmation",
            icon: 'warning',
            iconColor: '#d33',
            showCancelButton: true,
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                Inertia.delete(route('categories.destroy', id))
                swalWithBootstrapButtons.fire(
                    'Deleted!',
                    'Category has been deleted successfully',
                    'success'
                )
            }
        })
    }

    return (
        <div>
            <Link href={route('categories.create')} as="button" type="button" className="btn btn-outline-primary">Create new category</Link>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        categories.data.map((row, key) => (
                            <tr key={key}>
                                <td>{row.name}</td>
                                <td>{row.description}</td>
                                <td>
                                    <div className="btn-group">

                                        <Link href={route('categories.edit', row.id)} as="button" className="btn btn-light text-secondary bg-white me-1"><PencilSquare size="18" /></Link>
                                        <button onClick={() => deleteButton(row.id)} className="btn btn-light text-secondary bg-white"><TrashFill size="18" /></button>
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

Category.layout = page => <Dashboard children={page} />
export default Category