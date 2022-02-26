import React from "react"
import { useForm } from '@inertiajs/inertia-react'
import Swal from "sweetalert2"

import Dashboard from "../../Shared/Dashboard"


const Create = () => {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
    })

    const createSubmit = async (e) => {
        e.preventDefault();
        post(route('categories.store'), {
            preserveScroll: true,
            onSuccess: () => Swal.fire("Success!", "New category has been created", "success"),
        });
    }

    return (
        <div className="row">
            <h1 className="h2 mb-4 text-darkblue font-weight-bold text-uppercase">Create category</h1>
            <div className="col-xl-8 mb-4">
                <div className="card shadow mb-4">
                    <div className="card-header p-4">
                        <h6 className="m-0 font-weight-bold text-darkblue">Add categories to your system for better management of the tickets</h6>
                    </div>
                    <div className="card-body p-4">
                        <p className="mb-4">You will be able to delete or edit added categories at any time in the future. Enter name and optional description in order to create new category.</p>

                        <form onSubmit={createSubmit}>

                            <div className="mb-4">
                                <label htmlFor="categoryName" className="form-label font-weight-bold text-darkblue required">Category name</label>
                                <input onChange={e => setData('name', e.target.value)} value={data.name}
                                    type="text" id="categoryName" name="name" className={`form-control bg-white border-left-0 border-md text-muted ${errors.name ? 'is-invalid' : ''}`} />

                                {errors.name && <span className="mt-1 text-danger">{errors.name}</span>}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="categoryDescription" className="form-label font-weight-bold text-darkblue">Description</label>
                                <textarea onChange={e => setData('description', e.target.value)} value={data.description}
                                    id="categoryDescription" name="description" rows="4" className={`form-control bg-white border-left-0 border-md text-muted ${errors.description ? 'is-invalid' : ''}`} />

                                {errors.description && <span className="mt-1 text-danger">{errors.description}</span>}
                            </div>

                            <button type="submit" className="btn btn-outline-darkblue btn-block py-2 px-4 font-weight-bold text-center" disabled={processing}>Create</button>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

Create.layout = page => <Dashboard children={page} />
export default Create