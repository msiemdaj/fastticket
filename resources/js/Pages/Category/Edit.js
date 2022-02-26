import React from "react"
import { usePage, useForm } from '@inertiajs/inertia-react';
import Swal from "sweetalert2";

import Dashboard from "../../Shared/Dashboard"


const Edit = () => {
    const { category } = usePage().props;

    const { data, setData, put, processing, errors } = useForm({
        name: category.name,
        description: category.description,
    })

    const editSubmit = async (e) => {
        e.preventDefault();
        put(route('categories.update', category.id), {
            preserveScroll: true,
            onSuccess: () => Swal.fire("Success!", "Category has been successfully edited", "success"),
        });
    }

    return (
        <div className="row">
            <h1 className="h2 mb-4 text-darkblue font-weight-bold text-uppercase">Edit category</h1>
            <div className="col-xl-8 mb-4">
                <div className="card shadow mb-4">
                    <div className="card-header p-4">
                        <h6 className="m-0 font-weight-bold text-darkblue">Edit details of this category</h6>
                    </div>
                    <div className="card-body p-4">
                        <p className="mb-4">Make some changes in current form and confirm your operation to change details of this specific category.</p>

                        <form onSubmit={editSubmit}>

                            <div className="mb-4">
                                <label htmlFor="categoryName" className="form-label font-weight-bold text-darkblue required">Category name</label>
                                <input onChange={e => setData('name', e.target.value)} value={data.name}
                                    type="text" id="categoryName" name="name" className={`form-control bg-white border-left-0 border-md text-muted ${errors.name ? 'is-invalid' : ''}`} />

                                {errors.name && <span className="mt-1 text-danger">{errors.name}</span>}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="categoryDescription" className="form-label font-weight-bold text-darkblue">Category name</label>
                                <textarea onChange={e => setData('description', e.target.value)} value={data.description}
                                    id="categoryDescription" name="description" rows="4" className={`form-control bg-white border-left-0 border-md text-muted ${errors.description ? 'is-invalid' : ''}`} />

                                {errors.description && <span className="mt-1 text-danger">{errors.description}</span>}
                            </div>

                            <button type="submit" className="btn btn-outline-darkblue btn-block py-2 px-4 font-weight-bold text-center" disabled={processing}>Update</button>

                        </form>
                    </div>
                </div>
            </div>
        </div >
    )
}

Edit.layout = page => <Dashboard children={page} />
export default Edit