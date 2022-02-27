import React from "react"
import Swal from "sweetalert2";
import { Link, useForm } from '@inertiajs/inertia-react'


import Layout from "../../../Shared/Layout";

const Email = () => {

    const { data, setData, post, processing, errors } = useForm({
        email: '',
    })

    const formSubmit = async (e) => {
        e.preventDefault();

        post(route('password.email'), {
            preserveScroll: true,
            onSuccess: () => Swal.fire("Success!", "An email with password reset has been sent", "success"),
        });
    }

    return (
        <div className="row justify-content-center">
            <div className="col-xl-10 col-lg-12 col-md-9">
                <div className="card border-0 shadow-lg my-5">
                    <div className="card-body p-0">
                        <div className="row">
                            <div className="col-lg-6 d-lg-block bg-email-image"></div>
                            <div className="col-lg-6">
                                <div className="p-5">
                                    <div className="text-center">
                                        <h1 className="h2 mb-4 text-darkblue font-weight-bold text-uppercase">Reset Password</h1>
                                        <p className="text-muted mb-4">Please enter correct email address in order to reset your password. We will send you a message with a link to reset your password and set new one.</p>
                                    </div>

                                    <form onSubmit={formSubmit}>
                                        <div className="mb-4">
                                            <label htmlFor="email" className="form-label font-weight-bold text-darkblue">Email address</label>
                                            <input onChange={e => setData('email', e.target.value)} value={data.email}
                                                type="email" id="email" name="email" className={`form-control bg-white border-left-0 border-md text-muted ${errors.email ? 'is-invalid' : ''}`} required />
                                            {errors.email && <span className="mt-1 text-danger">{errors.email}</span>}
                                        </div>

                                        <button type="submit" className="btn btn-outline-darkblue btn-block py-2 px-4 font-weight-bold text-center w-100 mb-4" disabled={processing}>Send Password Reset Link</button>

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
        </div >
    )
}

Email.layout = page => <Layout children={page} />
export default Email;