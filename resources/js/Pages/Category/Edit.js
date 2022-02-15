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

    const loginSubmit = async (e) => {
        e.preventDefault();
        put(route('categories.update', category.id), {
            preserveScroll: true,
            onSuccess: () => Swal.fire("Success!", "Category has been successfully edited", "success"),
        });
    }

    return (
        <div className="row py-5 mt-4 justify-content-center">
            <div className="col-md-7 col-lg-6 ml-auto">
                <div className="form-group col-lg-12 mx-auto d-flex align-items-center my-4 justify-content-center">
                    <span className="px-2 text-muted font-weight-bold text-muted"><h1>Edit category</h1></span>
                </div >

                <form onSubmit={loginSubmit}>
                    <div className="row">

                        <div className="input-group col-lg-6">
                            <input onChange={e => setData('name', e.target.value)} value={data.name}
                                id="name" type="text" className={`form-control bg-white border-left-0 border-md ${errors.name ? 'is-invalid' : ''}`} placeholder="Category name" name="name" />
                        </div>
                        {errors.name && <span className="mt-1 text-danger">{errors.name}</span>}

                        <div className="input-group col-lg-6 mt-4">
                            <textarea onChange={e => setData('description', e.target.value)} value={data.description}
                                id="description" type="password" className={`form-control bg-white border-left-0 border-md ${errors.description ? 'is-invalid' : ''}`} placeholder="Description..." name="description" rows="3" />
                        </div>
                        {errors.description && <span className="mt-1 text-danger">{errors.description}</span>}

                        <div className="form-group col-lg-12 mx-auto mb-0 mt-4">
                            <button type="submit" className="btn btn-outline-primary btn-block py-2 font-weight-bold" disabled={processing}>Update</button>
                        </div>
                    </div>
                </form>
            </div >
            <div className="col-md-5 pr-lg-5 mb-5 mb-md-0">
                <img src="https://bootstrapious.com/i/snippets/sn-registeration/illustration.svg" alt="" className="img-fluid mb-3 d-none d-md-block" />
            </div>
        </div >
    )
}

Edit.layout = page => <Dashboard children={page} />
export default Edit