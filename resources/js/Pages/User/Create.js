import React from "react"
import { useForm, usePage } from '@inertiajs/inertia-react'
import Swal from "sweetalert2"

import Dashboard from "../../Shared/Dashboard"


const Create = () => {
    const { roles } = usePage().props;

    const { data, setData, post, processing, errors } = useForm({
        first_name: '',
        last_name: '',
        email: '',
        role: '',
        password: '',
        password_confirmation: '',
    })

    const createSubmit = async (e) => {
        e.preventDefault();
        post(route('users.store'), {
            preserveScroll: true,
            onSuccess: () => Swal.fire("Success!", "New user has been created", "success"),
        });
    }

    return (
        <div className="row py-5 mt-4 justify-content-center">
            <div className="col-md-7 col-lg-6 ml-auto">
                <div className="form-group col-lg-12 mx-auto d-flex align-items-center my-4 justify-content-center">
                    <span className="px-2 text-muted font-weight-bold text-muted"><h1>Create new user</h1></span>
                </div >

                <form onSubmit={createSubmit}>
                    <div className="row">

                        <div className="input-group col-lg-6 mt-4">
                            <input onChange={e => setData('first_name', e.target.value)} value={data.first_name}
                                id="first_name" type="text" className={`form-control bg-white border-left-0 border-md ${errors.first_name ? 'is-invalid' : ''}`} placeholder="First name" name="first_name" required />
                        </div>
                        {errors.first_name && <span className="mt-1 text-danger">{errors.first_name}</span>}

                        <div className="input-group col-lg-6 mt-4">
                            <input onChange={e => setData('last_name', e.target.value)} value={data.last_name}
                                id="last_name" type="text" className={`form-control bg-white border-left-0 border-md ${errors.last_name ? 'is-invalid' : ''}`} placeholder="Last name" name="last_name" required />
                        </div>
                        {errors.last_name && <span className="mt-1 text-danger">{errors.last_name}</span>}

                        <div className="input-group col-lg-6 mt-4">
                            <input onChange={e => setData('email', e.target.value)} value={data.email}
                                id="email" type="email" className={`form-control bg-white border-left-0 border-md ${errors.email ? 'is-invalid' : ''}`} placeholder="Email address" name="email" required />
                        </div>
                        {errors.email && <span className="mt-1 text-danger">{errors.email}</span>}

                        <div className="input-group col-lg-6 mt-4">
                            <select onChange={e => setData('role', e.target.value)} value={data.role}
                                className={`form-control bg-white border-left-0 border-md ${errors.role ? 'is-invalid' : ''}`} name="role" required>
                                {
                                    roles.map((role_name, key) => (
                                        <option key={key}>{role_name}</option>
                                    ))
                                }
                            </select>
                        </div>
                        {errors.role && <span className="mt-1 text-danger">{errors.role}</span>}

                        <div className="input-group col-lg-6 mt-4">
                            <input onChange={e => setData('password', e.target.value)} value={data.password}
                                id="password" type="password" className={`form-control bg-white border-left-0 border-md ${errors.password ? 'is-invalid' : ''}`} placeholder="Password" name="password" required />
                        </div>
                        {errors.password && <span className="mt-1 text-danger">{errors.password}</span>}

                        <div className="input-group col-lg-6 mt-4">
                            <input onChange={e => setData('password_confirmation', e.target.value)} value={data.password_confirmation}
                                id="password_confirmation" type="password" className={`form-control bg-white border-left-0 border-md ${errors.password_confirmation ? 'is-invalid' : ''}`} placeholder="Confirm password" name="password_confirmation" required />
                        </div>

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