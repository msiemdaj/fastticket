import React from "react"
import { useForm, usePage } from '@inertiajs/inertia-react'
import Swal from "sweetalert2"

import Dashboard from "../../Shared/Dashboard"


const Create = () => {
    const { categories } = usePage().props;

    const { data, setData, post, processing, errors } = useForm({
        title: '',
        category: '',
        description: '',
        attachments: [],
    });

    const createSubmit = async (e) => {
        e.preventDefault();
        post(route('ticket.create'), {
            preserveScroll: true,
            onSuccess: () => {
                Swal.fire("Success!", "Your ticket has been created and is awaiting resolution", "success");
            },
        });
    }

    return (
        <div className="row py-5 mt-4 justify-content-center">
            <div className="col-md-7 col-lg-6 ml-auto">
                <div className="form-group col-lg-12 mx-auto d-flex align-items-center my-4 justify-content-center">
                    <span className="px-2 text-muted font-weight-bold text-muted"><h1>Create ticket</h1></span>
                </div >

                <form onSubmit={createSubmit}>
                    <div className="row">

                        <div className="input-group col-lg-6">
                            <input onChange={e => setData('title', e.target.value)} value={data.title}
                                id="title" type="text" className={`form-control bg-white border-left-0 border-md ${errors.title ? 'is-invalid' : ''}`} placeholder="Title" name="title" />
                        </div>
                        {errors.title && <span className="mt-1 text-danger">{errors.title}</span>}

                        <div className="input-group col-lg-6 mt-4">
                            <select onChange={e => setData('category', e.target.value)} value={data.category}
                                className={`form-control bg-white border-left-0 border-md ${errors.category ? 'is-invalid' : ''}`} name="category" required>
                                <option>-</option>
                                {
                                    categories.map((category, key) => (
                                        <option key={key} value={category.id}>{category.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                        {errors.category && <span className="mt-1 text-danger">{errors.category}</span>}

                        <div className="input-group col-lg-6 mt-4">
                            <textarea onChange={e => setData('description', e.target.value)} value={data.description}
                                id="description" className={`form-control bg-white border-left-0 border-md ${errors.description ? 'is-invalid' : ''}`} placeholder="Description..." name="description" rows="3" />
                        </div>
                        {errors.description && <span className="mt-1 text-danger">{errors.description}</span>}

                        <div className="input-group col-lg-6 mt-4">
                            <input onChange={e => setData('attachments', Array.from(e.target.files))}
                                id="attachments" name="attachments[]" type="file" className={`form-control bg-white border-left-0 border-md ${errors.attachments ? 'is-invalid' : ''}`}
                                data-show-upload="false" data-show-caption="true" multiple />
                        </div>
                        {errors.attachments && <span className="mt-1 text-danger">{errors.attachments}</span>}

                        <div className="form-group col-lg-12 mx-auto mb-0 mt-4">
                            <button type="submit" className="btn btn-outline-primary btn-block py-2 font-weight-bold" disabled={processing}>Create</button>
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

Create.layout = page => <Dashboard children={page} />
export default Create