import React, { useState } from "react"
import { usePage, useForm } from '@inertiajs/inertia-react';
import { Inertia } from "@inertiajs/inertia";
import Swal from "sweetalert2";
import axios from "axios";

import Dashboard from "../../Shared/Dashboard"


const Edit = () => {
    const { user, roles } = usePage().props;
    const [buttonDisabled, setButton] = useState(false)

    const { data, setData, put, processing, errors } = useForm({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role,
    })

    const editSubmit = async (e) => {
        e.preventDefault();
        put(route('users.update', user.id), {
            preserveScroll: true,
            onSuccess: () => Swal.fire("Success!", "User details has been successfully edited", "success"),
        });
    }

    const resetSubmit = async () => {
        setButton(true)
        await axios.post(route('users.password.reset', user.id)).then(() => {
            Swal.fire("Success!", "Password reset link has been sent to users email", "success")
        }).catch(() => {
            Swal.fire("Error!", "We couldn't send you password reset link", "error")
        });
        setButton(false)
    }

    return (
        <div>
            <div className="row py-5 mt-4 justify-content-center">
                <div className="col-md-7 col-lg-6 ml-auto">
                    <div className="form-group col-lg-12 mx-auto d-flex align-items-center my-4 justify-content-center">
                        <span className="px-2 text-muted font-weight-bold text-muted"><h1>Edit user details</h1></span>
                    </div >

                    <form onSubmit={editSubmit}>
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

            <div className="row py-5 mt-4 justify-content-center">
                <div className="col-md-4 pr-lg-5 mb-5 mb-md-0">
                    <img src="https://bootstrapious.com/i/snippets/sn-registeration/illustration.svg" alt="" className="img-fluid mb-3 d-none d-md-block" />
                </div>

                <div className="col-md-8 col-lg-6 ml-auto">
                    <div className="form-group col-lg-12 mx-auto d-flex align-items-center my-4 justify-content-center">
                        <span className="px-2 text-muted font-weight-bold text-muted"><h1>Reset users password</h1></span>
                    </div >
                    <div className="row">
                        <button onClick={resetSubmit} disabled={buttonDisabled} className="btn btn-outline-primary btn-block py-2 font-weight-bold text-center">Send password reset link</button>
                    </div>
                </div >
            </div >
        </div>
    )
}

Edit.layout = page => <Dashboard children={page} />
export default Edit