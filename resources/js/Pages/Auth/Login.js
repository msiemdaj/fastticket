import React, { useState } from "react"
import { Inertia } from '@inertiajs/inertia'
import { Link } from '@inertiajs/inertia-react'

const Login = () => {

    const [loginInput, setLogin] = useState({
        email: '',
        password: '',
        remember: true,
    });

    const handleInput = (e) => {
        setLogin({
            ...loginInput, [e.target.name]: e.target.value
        });
    }

    const loginSubmit = async (e) => {
        e.preventDefault();
        Inertia.post(route('login'), loginInput);
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">'Login</div>

                        <div className="card-body">
                            <form onSubmit={loginSubmit}>
                                <div className="form-group row">
                                    <label htmlFor="email" className="col-md-4 col-form-label text-md-right">E-Mail Address</label>

                                    <div className="col-md-6">
                                        <input onChange={handleInput} value={loginInput.email}
                                            id="email" type="email" className="form-control" name="email" required />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="password" className="col-md-4 col-form-label text-md-right">Password</label>

                                    <div className="col-md-6">
                                        <input onChange={handleInput} value={loginInput.password}
                                            id="password" type="password" className="form-control" name="password" required />
                                    </div>
                                </div>


                                <div className="form-group row">
                                    <div className="col-md-6 offset-md-4">
                                        <div className="form-check">
                                            <input checked={loginInput.remember} onChange={() => setLogin({ ...loginInput, remember: !loginInput.remember })}
                                                className="form-check-input" type="checkbox" name="remember" id="remember" />

                                            <label className="form-check-label" htmlFor="remember">
                                                Remember Me
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group row mb-0">
                                    <div className="col-md-8 offset-md-4">
                                        <button type="submit" className="btn btn-primary">Login</button>

                                        <Link className="btn btn-link" href={route('password.request')}>Forgot Your Password?</Link>
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

export default Login