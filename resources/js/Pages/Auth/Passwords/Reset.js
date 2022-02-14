import React from "react"
import { usePage, useForm } from '@inertiajs/inertia-react'
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
        <div className="row py-5 mt-4 justify-content-center">
            <div className="col-md-5 pr-lg-5 mb-5 mb-md-0">
                <img src="https://bootstrapious.com/i/snippets/sn-registeration/illustration.svg" alt="" className="img-fluid mb-3 d-none d-md-block" />
            </div>

            <div className="col-md-7 col-lg-6 ml-auto">

                <div className="form-group col-lg-12 mx-auto d-flex align-items-center my-4 justify-content-center">
                    <span className="px-2 text-muted font-weight-bold text-muted"><h1>Reset Password</h1></span>

                </div >

                <form onSubmit={formSubmit}>
                    <input type="hidden" name="token" value={token} />
                    <div className="row">
                        <div className="input-group col-lg-6">
                            <input onChange={e => setData('email', e.target.value)} value={data.email}
                                id="email" type="email" className={`form-control bg-white border-left-0 border-md ${errors.email ? 'is-invalid' : ''}`} placeholder="Email address" name="email" required />
                        </div>
                        {errors.email && <span className="mt-1 text-danger">{errors.email}</span>}

                        <div className="input-group col-lg-6 mt-4">
                            <input onChange={e => setData('password', e.target.value)} value={data.password}
                                id="password" type="password" className={`form-control bg-white border-left-0 border-md ${errors.password ? 'is-invalid' : ''}`} placeholder="New password" name="password" required />
                        </div>
                        {errors.password && <span className="mt-1 text-danger">{errors.password}</span>}

                        <div className="input-group col-lg-6 mt-4">
                            <input onChange={e => setData('password_confirmation', e.target.value)} value={data.password_confirmation}
                                id="password_confirm" type="password" className={`form-control bg-white border-left-0 border-md ${errors.password ? 'is-invalid' : ''}`} placeholder="Confirm password" name="password_confirmation" required />
                        </div>

                        <div className="form-group col-lg-12 mx-auto mb-0 mt-4">
                            <button type="submit" className="btn btn-primary btn-block py-2 font-weight-bold" disabled={processing}>Reset Password</button>
                        </div>
                    </div>
                </form>
            </div >
        </div >
    )
}

Reset.layout = page => <Layout children={page} />
export default Reset;