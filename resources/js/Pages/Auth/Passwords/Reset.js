import React from "react"
import { usePage, useForm, Link } from '@inertiajs/inertia-react'
import Swal from "sweetalert2"

import Layout from "../../../Shared/Layout"

const Reset = () => {

    const { request } = usePage().props
    const token = window.location.pathname.replace('/reset-password/', '');

    const { data, setData, post, processing, errors } = useForm({
        email: request.email,
        password: '',
        password_confirmation: '',
        token: token,
    })

    const formSubmit = async (e) => {
        e.preventDefault();

        post(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => Swal.fire("Success!", "Password has been changed successfully", "success"),
        });
    }

    return (
        <div className="row justify-content-center">
            <div className="col-xl-10 col-lg-12 col-md-9">
                <div className="card border-0 shadow-lg my-5">
                    <div className="card-body p-0">
                        <div className="row">
                            <div className="col-lg-6 d-lg-block bg-reset-image"></div>
                            <div className="col-lg-6">
                                <div className="p-5">
                                    <div className="text-center">
                                        <h1 className="h2 mb-4 text-darkblue font-weight-bold text-uppercase">Reset Password</h1>
                                        <p className="text-muted mb-4">Please fill in the fields below and confirm in order to set a new password.</p>
                                    </div>

                                    <form onSubmit={formSubmit}>
                                        <input type="hidden" name="token" value={token} />
                                        <div className="mb-4">
                                            <label htmlFor="email" className="form-label font-weight-bold text-darkblue">Email address</label>
                                            <input onChange={e => setData('email', e.target.value)} value={data.email}
                                                type="email" id="email" name="email" className={`form-control bg-white border-left-0 border-md text-muted ${errors.email ? 'is-invalid' : ''}`} required />
                                            {errors.email && <span className="mt-1 text-danger">{errors.email}</span>}
                                        </div>

                                        <div className="mb-4">
                                            <label htmlFor="password" className="form-label font-weight-bold text-darkblue">New password</label>
                                            <input onChange={e => setData('password', e.target.value)} value={data.password}
                                                type="password" id="password" name="password" className={`form-control bg-white border-left-0 border-md text-muted ${errors.password ? 'is-invalid' : ''}`} required />
                                            {errors.password && <span className="mt-1 text-danger">{errors.password}</span>}
                                        </div>

                                        <div className="mb-4">
                                            <label htmlFor="password_confirmation" className="form-label font-weight-bold text-darkblue">Confirm password</label>
                                            <input onChange={e => setData('password_confirmation', e.target.value)} value={data.password_confirmation}
                                                type="password" id="password_confirmation" name="password_confirmation" className={`form-control bg-white border-left-0 border-md text-muted ${errors.password ? 'is-invalid' : ''}`} required />
                                        </div>

                                        <button type="submit" className="btn btn-outline-darkblue btn-block py-2 px-4 font-weight-bold text-center w-100 mb-4" disabled={processing}>Reset Password</button>

                                        <div className="text-center">
                                            <Link className="text-muted" href={route('login')}>Already have an account? Sign in!</Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

Reset.layout = page => <Layout children={page} />
export default Reset;