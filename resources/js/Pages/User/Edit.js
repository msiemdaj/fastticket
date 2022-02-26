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
            <div className="row">
                <h1 className="h2 mb-4 text-darkblue font-weight-bold text-uppercase">Edit this user</h1>
                <div className="col-xl-8 mb-4">
                    <div className="card shadow mb-4">
                        <div className="card-header p-4">
                            <h6 className="m-0 font-weight-bold text-darkblue">Edit details of {data.first_name} {data.last_name}</h6>
                        </div>
                        <div className="card-body p-4">
                            <p className="mb-4">Make some changes in the fields below and confirm form to change details of this specific user.</p>

                            <form onSubmit={editSubmit}>

                                <div className="mb-4">
                                    <label htmlFor="firstname" className="form-label font-weight-bold text-darkblue required">First name</label>
                                    <input onChange={e => setData('first_name', e.target.value)} value={data.first_name}
                                        type="text" id="firstname" name="first_name" className={`form-control bg-white border-left-0 border-md text-muted ${errors.first_name ? 'is-invalid' : ''}`} required />

                                    {errors.first_name && <span className="mt-1 text-danger">{errors.first_name}</span>}
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="lastname" className="form-label font-weight-bold text-darkblue required">Last name</label>
                                    <input onChange={e => setData('last_name', e.target.value)} value={data.last_name}
                                        type="text" id="lastname" name="last_name" className={`form-control bg-white border-left-0 border-md text-muted ${errors.last_name ? 'is-invalid' : ''}`} required />

                                    {errors.last_name && <span className="mt-1 text-danger">{errors.last_name}</span>}
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="userEmail" className="form-label font-weight-bold text-darkblue required">Email address</label>
                                    <input onChange={e => setData('email', e.target.value)} value={data.email}
                                        type="email" id="userEmail" name="email" className={`form-control bg-white border-left-0 border-md text-muted ${errors.email ? 'is-invalid' : ''}`} required />

                                    {errors.email && <span className="mt-1 text-danger">{errors.email}</span>}
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="userRole" className="form-label font-weight-bold text-darkblue required">User role</label>
                                    <select onChange={e => setData('role', e.target.value)} value={data.role}
                                        id="userRole" name="role" className={`form-select bg-white border-left-0 border-md text-muted ${errors.role ? 'is-invalid' : ''}`} required >
                                        {
                                            roles.map((role_name, key) => (
                                                <option key={key}>{role_name}</option>
                                            ))
                                        }
                                    </select>
                                    {errors.role && <span className="mt-1 text-danger">{errors.role}</span>}
                                </div>

                                <button type="submit" className="btn btn-outline-darkblue btn-block py-2 px-4 font-weight-bold text-center" disabled={processing}>Update</button>

                            </form>
                        </div>
                    </div>
                </div>
            </div >

            <div className="row">
                <div className="col-xl-8 mb-4">
                    <div className="card shadow mb-4">
                        <div className="card-header p-4">
                            <h6 className="m-0 font-weight-bold text-darkblue">Reset users password</h6>
                        </div>
                        <div className="card-body p-4">
                            <p className="mb-4">Click button below if you need to reset users password. We will send him an email with a link to reset and and set a new password.</p>

                            <button onClick={resetSubmit} disabled={buttonDisabled} className="btn btn-outline-darkblue btn-block py-2 px-4 font-weight-bold text-center">Send password reset link</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

Edit.layout = page => <Dashboard children={page} />
export default Edit