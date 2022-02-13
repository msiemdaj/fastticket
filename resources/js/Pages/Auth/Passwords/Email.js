import React, { useState } from "react"
import { Inertia } from '@inertiajs/inertia'

const Email = () => {
    const [email, setEmail] = useState({ email: 'thisis@myemail.com' });

    const handleInput = (e) => {
        setEmail(e.target.value);
    }

    const formSubmit = async (e) => {
        e.preventDefault();
        Inertia.post(route('password.email'), email);
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">'Reset Password</div>

                        <div className="card-body">

                            <form onSubmit={formSubmit}>

                                <div className="form-group row">
                                    <label htmlFor="email" className="col-md-4 col-form-label text-md-right">'E-Mail Address</label>

                                    <div className="col-md-6">
                                        <input value={email.email} onChange={handleInput}
                                            id="email" type="email" className="form-control" name="email" required />

                                    </div>
                                </div>

                                <div className="form-group row mb-0">
                                    <div className="col-md-6 offset-md-4">
                                        <button type="submit" className="btn btn-primary">
                                            Send Password Reset Link
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

export default Email;