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

        <div className="row">
            <h1 className="h2 mb-4 text-darkblue font-weight-bold text-uppercase">Create new user</h1>
            <div className="col-xl-8 mb-4">
                <div className="card shadow mb-4">
                    <div className="card-header p-4">
                        <h6 className="m-0 font-weight-bold text-darkblue">Create a new account for the user</h6>
                    </div>
                    <div className="card-body p-4">
                        <p className="mb-4">Fill up required fielnd in the form in order to make new user. Any newly created account will have to change its password on the first login attempt. Role defines specific permissions and access to a user.</p>

                        <form onSubmit={createSubmit}>

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

                            <div className="mb-4">
                                <label htmlFor="userPassword" className="form-label font-weight-bold text-darkblue required">Password</label>
                                <input onChange={e => setData('password', e.target.value)} value={data.password}
                                    type="password" id="userPassword" name="password" className={`form-control bg-white border-left-0 border-md text-muted ${errors.password ? 'is-invalid' : ''}`} required />

                                {errors.password && <span className="mt-1 text-danger">{errors.password}</span>}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="userPasswordConfirmation" className="form-label font-weight-bold text-darkblue required">Confirm password</label>
                                <input onChange={e => setData('password_confirmation', e.target.value)} value={data.password_confirmation}
                                    type="password" id="userPasswordConfirmation" name="password_confirmation" className={`form-control bg-white border-left-0 border-md text-muted ${errors.password_confirmation ? 'is-invalid' : ''}`} required />

                                {errors.password_confirmation && <span className="mt-1 text-danger">{errors.password_confirmation}</span>}
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