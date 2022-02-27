import React from "react"
import { useForm, usePage } from '@inertiajs/inertia-react'
import Swal from "sweetalert2"

import Dashboard from "../../Shared/Dashboard"


const Create = () => {
    const { categories, priorities } = usePage().props;
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        category: '',
        priority: priorities[0] || '',
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
        <div className="row">
            <h1 className="h2 mb-4 text-darkblue font-weight-bold text-uppercase">Create ticket</h1>
            <div className="col-xl-8 mb-4">
                <div className="card shadow mb-4">
                    <div className="card-header p-4">
                        <h6 className="m-0 font-weight-bold text-darkblue">Send us a detailed message with a description of a problem you have</h6>
                    </div>
                    <div className="card-body p-4">
                        <p className="mb-4">Please describe the issue precisely, the more descriptive you will be the more it will help us to resolve your problem. You also have possibility to add files or photos to the ticket, we are highly encourage you to do that if you feel like it may help to fix the problem.</p>

                        <form onSubmit={createSubmit}>

                            <div className="mb-4">
                                <label htmlFor="ticketTitle" className="form-label font-weight-bold text-darkblue required">Ticket title</label>
                                <input onChange={e => setData('title', e.target.value)} value={data.title}
                                    type="text" id="ticketTitle" name="title" className={`form-control bg-white border-left-0 border-md text-muted ${errors.title ? 'is-invalid' : ''}`} />

                                {errors.title && <span className="mt-1 text-danger">{errors.title}</span>}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="ticketCategory" className="form-label font-weight-bold text-darkblue required">Category</label>
                                <select onChange={e => setData('category', e.target.value)} value={data.category}
                                    id="ticketCategory" name="category" className={`form-select bg-white border-left-0 border-md text-muted ${errors.category ? 'is-invalid' : ''}`}>
                                    <option>-</option>
                                    {
                                        categories.map((category, key) => (
                                            <option key={key} value={category.id}>{category.name}</option>
                                        ))
                                    }
                                </select>
                                {errors.category && <span className="mt-1 text-danger">{errors.category}</span>}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="ticketPriority" className="form-label font-weight-bold text-darkblue required">Priority</label>
                                <select onChange={e => setData('priority', e.target.value)} value={data.priority}
                                    id="ticketPriority" name="priority" className={`form-select bg-white border-left-0 border-md text-muted ${errors.priority ? 'is-invalid' : ''}`}>
                                    {
                                        priorities.map((priority, key) => (
                                            <option key={key}>{priority}</option>
                                        ))
                                    }
                                </select>
                                {errors.priority && <span className="mt-1 text-danger">{errors.priority}</span>}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="ticketDescription" className="form-label font-weight-bold text-darkblue required">Description</label>
                                <textarea onChange={e => setData('description', e.target.value)} value={data.description}
                                    id="ticketDescription" name="description" rows="3" className={`form-control bg-white border-left-0 border-md text-muted ${errors.description ? 'is-invalid' : ''}`} required />

                                {errors.description && <span className="mt-1 text-danger">{errors.description}</span>}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="ticketAttachments" className="form-label font-weight-bold text-darkblue">Attach files</label>
                                <input onChange={e => setData('attachments', Array.from(e.target.files))}
                                    type="file" id="ticketAttachments" name="attachments[]" className={`form-control bg-white border-left-0 border-md text-muted ${errors.attachments ? 'is-invalid' : ''}`}
                                    data-show-upload="false" data-show-caption="true" multiple />

                                {errors.attachments && <span className="mt-1 text-danger">{errors.attachments}</span>}
                            </div>

                            <button type="submit" className="btn btn-outline-darkblue btn-block py-2 px-4 font-weight-bold text-center" disabled={processing}>Create</button>

                        </form>
                    </div>
                </div>
            </div>
        </div >
    )
}

Create.layout = page => <Dashboard children={page} />
export default Create