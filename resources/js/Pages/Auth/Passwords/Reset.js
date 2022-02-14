import React, { useState } from "react"
import { Inertia } from '@inertiajs/inertia'
import { usePage } from '@inertiajs/inertia-react'

import Layout from "../../../Shared/Layout"

const Reset = () => {

    const { request } = usePage().props
    const token = window.location.pathname.replace('/reset-password/', '');

    const [passwordInput, setPassword] = useState({
        email: request.email,
        password: '',
        password_confirmation: '',
        token: token,
    });

    const handleInput = (e) => {
        setPassword({
            ...passwordInput, [e.target.name]: e.target.value
        });
    }

    const formSubmit = async (e) => {
        e.preventDefault();
        Inertia.post(route('password.update'), passwordInput);
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
                        <div className="input-group col-lg-6 mb-4">
                            <input onChange={handleInput} value={passwordInput.email}
                                id="email" type="email" className="form-control bg-white border-left-0 border-md" placeholder="Email address" name="email" required />
                        </div>

                        <div className="input-group col-lg-6 mb-4">
                            <input onChange={handleInput} value={passwordInput.password}
                                id="password" type="password" className="form-control bg-white border-left-0 border-md" placeholder="New password" name="password" required />
                        </div>

                        <div className="input-group col-lg-6 mb-4">
                            <input onChange={handleInput} value={passwordInput.password_confirmation}
                                id="password_confirm" type="password" className="form-control bg-white border-left-0 border-md" placeholder="Confirm password" name="password_confirmation" required />
                        </div>

                        <div className="form-group col-lg-12 mx-auto mb-0">
                            <button type="submit" className="btn btn-primary btn-block py-2 font-weight-bold">Reset Password</button>
                        </div>
                    </div>
                </form>
            </div >
        </div >
    )
}

Reset.layout = page => <Layout children={page} />
export default Reset;