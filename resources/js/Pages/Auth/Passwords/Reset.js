import React, { useState } from "react"
import { Inertia } from '@inertiajs/inertia'
import { usePage } from '@inertiajs/inertia-react'

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

        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Reset Password</div>

                        <div className="card-body">
                            <form onSubmit={formSubmit}>
                                <input type="hidden" name="token" value={token} />

                                <div className="form-group row">
                                    <label html="email" className="col-md-4 col-form-label text-md-right">E-Mail Address</label>

                                    <div className="col-md-6">
                                        <input onChange={handleInput} value={passwordInput.email}
                                            id="email" type="email" className="form-control" name="email" required />
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label htmlFor="password" className="col-md-4 col-form-label text-md-right">Password</label>

                                    <div className="col-md-6">
                                        <input onChange={handleInput} value={passwordInput.password}
                                            id="password" type="password" className="form-control" name="password" required />
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label htmlFor="password-confirm" className="col-md-4 col-form-label text-md-right">Confirm Password</label>

                                    <div className="col-md-6">
                                        <input onChange={handleInput} value={passwordInput.password_confirmation}
                                            id="password-confirm" type="password" className="form-control" name="password_confirmation" required />
                                    </div>
                                </div>

                                <div className="form-group row mb-0">
                                    <div className="col-md-6 offset-md-4">
                                        <button type="submit" className="btn btn-primary">
                                            Reset Password
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Reset;