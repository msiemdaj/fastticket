import React from "react"
import { Link, usePage } from '@inertiajs/inertia-react';
import Swal from "sweetalert2";
import { Inertia } from "@inertiajs/inertia";

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
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h2 text-darkblue font-weight-bold text-uppercase">All categories</h1>
                <Link href={route('categories.create')} as="button" type="button" className="btn btn-outline-darkblue btn-block py-2 px-4 font-weight-bold text-center">Create new category</Link>
            </div>

            <div className="row">
                <div className="col-xl-12 mb-4">
                    <div className="card shadow mb-4">
                        <div className="card-body p-4">
                            <table className="table table-striped table-hover align-middle">
                                <thead className="font-weight-bold text-uppercase">
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Description</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories.data != ''
                                        ? categories.data.map((row, key) => (
                                            <tr key={key}>
                                                <td>{row.name}</td>
                                                <td>{row.description}</td>
                                                <td className="text-end show-more">
                                                    <div className="dropdown">
                                                        <button className="btn" type="button" id="dropdownTable" data-bs-toggle="dropdown" aria-expanded="false">
                                                            <i className="bi bi-three-dots-vertical"></i>
                                                        </button>
                                                        <ul className="dropdown-menu dropdown-menu-right shadow" aria-labelledby="dropdownTable">
                                                            <li><Link href={route('categories.edit', row.id)} as="button" className="dropdown-item"><i className="bi bi-pencil-square align-middle me-2"></i>Edit</Link></li>
                                                            <li><button onClick={() => deleteButton(row.id)} className="dropdown-item"><i className="bi bi-trash-fill align-middle me-2"></i>Delete</button></li>
                                                        </ul>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                        : <tr>
                                            <td colSpan="3" className="text-center text-muted">No categories have been created yet.</td>
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

Category.layout = page => <Dashboard children={page} />
export default Category