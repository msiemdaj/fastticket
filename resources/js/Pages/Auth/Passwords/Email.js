import React, { useState } from "react"
import { Inertia } from '@inertiajs/inertia'

import Layout from "../../../Shared/Layout";

const Email = () => {
    const [email, setEmail] = useState({ email: '' });

    const handleInput = (e) => {
        setEmail({ email: e.target.value });
    }

    const formSubmit = async (e) => {
        e.preventDefault();
        Inertia.post(route('password.email'), email);
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
                    <div className="row">

                        <div className="input-group col-lg-6 mb-4">
                            <input onChange={handleInput} value={email.email}
                                id="email" type="email" className="form-control bg-white border-left-0 border-md" placeholder="Email address" name="email" required />
                        </div>

                        <div className="form-group col-lg-12 mx-auto mb-0">
                            <button type="submit" className="btn btn-primary btn-block py-2 font-weight-bold">Send Password Reset Link</button>
                        </div>
                    </div>
                </form>
            </div >
        </div >
    )
}

Email.layout = page => <Layout children={page} />
export default Email;