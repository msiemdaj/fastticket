import React, { useState } from 'react'
import { usePage } from '@inertiajs/inertia-react'
import Swal from 'sweetalert2';

import Dashboard from '../../Shared/Dashboard';
import { Inertia } from '@inertiajs/inertia';

function Profile() {
    const { auth, errors } = usePage().props

    const [details, setDetails] = useState({
        first_name: auth.user.first_name,
        last_name: auth.user.last_name,
    })

    const initialPassword = {
        current_password: '',
        password: '',
        password_confirmation: '',
    }

    const [password, setPassword] = useState(initialPassword)

    const detailsSubmit = async (e) => {
        e.preventDefault();
        Inertia.put(route('profile.update.details'), details, {
            preserveScroll: true,
            onSuccess: () => Swal.fire("Success!", "Profile information has been updated successfully", "success"),
        })
    }

    const passwordSubmit = async (e) => {
        e.preventDefault();
        Inertia.put(route('profile.update.password'), password, {
            preserveScroll: true,
            onSuccess: () => {
                Swal.fire("Success!", "Your password has been changed successfully", "success")
                setPassword(initialPassword)
            },
        })
    }

    return (
        <div>
            <div className="row">
                <h1 className="h2 mb-4 text-darkblue font-weight-bold text-uppercase">User profile</h1>
                <div className="col-xl-8 mb-4">
                    <div className="card shadow mb-4">
                        <div className="card-header p-4">
                            <h6 className="m-0 font-weight-bold text-darkblue">Edit details of your profile</h6>
                        </div>
                        <div className="card-body p-4">
                            <p className="mb-4">Edit values in the fields below and confirm the form to change your personal details.</p>

                            <form onSubmit={detailsSubmit}>

                                <div className="mb-4">
                                    <label htmlFor="firstname" className="form-label font-weight-bold text-darkblue">First name</label>
                                    <input onChange={e => setDetails({ ...details, [e.target.name]: e.target.value })} value={details.first_name}
                                        type="text" id="firstname" name="first_name" className={`form-control bg-white border-left-0 border-md text-muted ${errors.first_name ? 'is-invalid' : ''}`} />

                                    {errors.first_name && <span className="mt-1 text-danger">{errors.first_name}</span>}
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="lastname" className="form-label font-weight-bold text-darkblue">Last name</label>
                                    <input onChange={e => setDetails({ ...details, [e.target.name]: e.target.value })} value={details.last_name}
                                        type="text" id="lastname" name="last_name" className={`form-control bg-white border-left-0 border-md text-muted ${errors.last_name ? 'is-invalid' : ''}`} />

                                    {errors.last_name && <span className="mt-1 text-danger">{errors.last_name}</span>}
                                </div>

                                <button type="submit" className="btn btn-outline-darkblue btn-block py-2 px-4 font-weight-bold text-center">Update</button>

                            </form>
                        </div>
                    </div>
                </div>
            </div >

            <div className="row">
                <div className="col-xl-8 mb-4">
                    <div className="card shadow mb-4">
                        <div className="card-header p-4">
                            <h6 className="m-0 font-weight-bold text-darkblue">Change password</h6>
                        </div>
                        <div className="card-body p-4">
                            <p className="mb-4">Fill in all fiels in order to change your current password.</p>

                            <form onSubmit={passwordSubmit}>

                                <div className="mb-4">
                                    <label htmlFor="currentPassword" className="form-label font-weight-bold text-darkblue">Current password</label>
                                    <input onChange={e => setPassword({ ...password, [e.target.name]: e.target.value })} value={password.current_password}
                                        type="password" id="currentPassword" name="current_password" className={`form-control bg-white border-left-0 border-md text-muted ${errors.current_password ? 'is-invalid' : ''}`} required />

                                    {errors.current_password && <span className="mt-1 text-danger">{errors.current_password}</span>}
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="newPassword" className="form-label font-weight-bold text-darkblue">New password</label>
                                    <input onChange={e => setPassword({ ...password, [e.target.name]: e.target.value })} value={password.password}
                                        type="password" id="newPassword" name="password" className={`form-control bg-white border-left-0 border-md text-muted ${errors.password ? 'is-invalid' : ''}`} required />

                                    {errors.password && <span className="mt-1 text-danger">{errors.password}</span>}
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="confirmPassword" className="form-label font-weight-bold text-darkblue">Confirm password</label>
                                    <input onChange={e => setPassword({ ...password, [e.target.name]: e.target.value })} value={password.password_confirmation}
                                        type="password" id="confirmPassword" name="password_confirmation" className={`form-control bg-white border-left-0 border-md text-muted ${errors.password_confirmation ? 'is-invalid' : ''}`} required />

                                    {errors.password_confirmation && <span className="mt-1 text-danger">{errors.password_confirmation}</span>}
                                </div>

                                <button type="submit" className="btn btn-outline-darkblue btn-block py-2 px-4 font-weight-bold text-center">Confirm</button>

                            </form>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}

Profile.layout = page => <Dashboard children={page} />
export default Profile;