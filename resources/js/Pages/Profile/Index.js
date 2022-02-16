import React, { useState } from 'react'
import { useForm, usePage } from '@inertiajs/inertia-react'
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
            <div className="row py-5 mt-4 justify-content-center">
                <div className="col-md-4 pr-lg-5 mb-5 mb-md-0">
                    <img src="https://bootstrapious.com/i/snippets/sn-registeration/illustration.svg" alt="" className="img-fluid mb-3 d-none d-md-block" />
                </div>

                <div className="col-md-8 col-lg-6 ml-auto">
                    <div className="form-group col-lg-12 mx-auto d-flex align-items-center my-4 justify-content-center">
                        <span className="px-2 text-muted font-weight-bold text-muted"><h1>Update profile details</h1></span>
                    </div >

                    <form onSubmit={detailsSubmit}>
                        <div className="row">

                            <div className="input-group col-lg-6">
                                <input onChange={e => setDetails({ ...details, [e.target.name]: e.target.value })} value={details.first_name}
                                    id="first_name" type="text" className={`form-control bg-white border-left-0 border-md ${errors.first_name ? 'is-invalid' : ''}`} placeholder="First name" name="first_name" />
                            </div>
                            {errors.first_name && <span className="mt-1 text-danger">{errors.first_name}</span>}

                            <div className="input-group mt-4 col-lg-6">
                                <input onChange={e => setDetails({ ...details, [e.target.name]: e.target.value })} value={details.last_name}
                                    id="last_name" type="text" className={`form-control bg-white border-left-0 border-md ${errors.last_name ? 'is-invalid' : ''}`} placeholder="Last name" name="last_name" />
                            </div>
                            {errors.last_name && <span className="mt-1 text-danger">{errors.last_name}</span>}

                            <div className="form-group col-lg-12 mx-auto mb-0 mt-4">
                                <button type="submit" className="btn btn-primary btn-block py-2 font-weight-bold">Update</button>
                            </div>
                        </div>
                    </form>
                </div >
            </div >

            <div className="row py-5 mt-4 justify-content-center">
                <div className="col-md-8 col-lg-6 ml-auto">
                    <div className="form-group col-lg-12 mx-auto d-flex align-items-center my-4 justify-content-center">
                        <span className="px-2 text-muted font-weight-bold text-muted"><h1>Change password</h1></span>
                    </div >

                    <form onSubmit={passwordSubmit}>
                        <div className="row">

                            <div className="input-group col-lg-6">
                                <input onChange={e => setPassword({ ...password, [e.target.name]: e.target.value })} value={password.current_password}
                                    id="current_password" type="password" className={`form-control bg-white border-left-0 border-md ${errors.current_password ? 'is-invalid' : ''}`} placeholder="Current password" name="current_password" required />
                            </div>
                            {errors.current_password && <span className="mt-1 text-danger">{errors.current_password}</span>}

                            <div className="input-group col-lg-6 mt-4">
                                <input onChange={e => setPassword({ ...password, [e.target.name]: e.target.value })} value={password.password}
                                    id="password" type="password" className={`form-control bg-white border-left-0 border-md ${errors.password ? 'is-invalid' : ''}`} placeholder="New password" name="password" required />
                            </div>
                            {errors.password && <span className="mt-1 text-danger">{errors.password}</span>}

                            <div className="input-group col-lg-6 mt-4">
                                <input onChange={e => setPassword({ ...password, [e.target.name]: e.target.value })} value={password.password_confirmation}
                                    id="password_confirmation" type="password" className={`form-control bg-white border-left-0 border-md ${errors.password_confirmation ? 'is-invalid' : ''}`} placeholder="Confirm password" name="password_confirmation" required />
                            </div>
                            {errors.password_confirmation && <span className="mt-1 text-danger">{errors.password_confirmation}</span>}

                            <div className="form-group col-lg-12 mx-auto mb-0 mt-4">
                                <button type="submit" className="btn btn-primary btn-block py-2 font-weight-bold">Confirm</button>
                            </div>
                        </div>
                    </form>
                </div >
                <div className="col-md-4 pr-lg-5 mb-5 mb-md-0">
                    <img src="https://bootstrapious.com/i/snippets/sn-registeration/illustration.svg" alt="" className="img-fluid mb-3 d-none d-md-block" />
                </div>
            </div >
        </div>
    )
}

Profile.layout = page => <Dashboard children={page} />
export default Profile;