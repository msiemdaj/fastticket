import React, { useState } from "react"
import { Inertia } from '@inertiajs/inertia'
import { Link } from '@inertiajs/inertia-react'

import Layout from "../../Shared/Layout"

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
        <div className="row py-5 mt-4 justify-content-center">
            <div className="col-md-5 pr-lg-5 mb-5 mb-md-0">
                <img src="https://bootstrapious.com/i/snippets/sn-registeration/illustration.svg" alt="" className="img-fluid mb-3 d-none d-md-block" />
            </div>

            <div className="col-md-7 col-lg-6 ml-auto">

                <div className="form-group col-lg-12 mx-auto d-flex align-items-center my-4 justify-content-center">
                    <span className="px-2 text-muted font-weight-bold text-muted"><h1>Login</h1></span>

                </div >

                <form onSubmit={loginSubmit}>
                    <div className="row">

                        <div className="input-group col-lg-6 mb-4">
                            <input onChange={handleInput} value={loginInput.email}
                                id="email" type="email" className="form-control bg-white border-left-0 border-md" placeholder="Email address" name="email" required />
                        </div>

                        <div className="input-group col-lg-6 mb-4">
                            <input onChange={handleInput} value={loginInput.password}
                                id="password" type="password" className="form-control bg-white border-left-0 border-md" placeholder="Password" name="password" required />
                        </div>

                        <div className="input-group col-lg-6 mb-4">
                            <input checked={loginInput.remember} onChange={() => setLogin({ ...loginInput, remember: !loginInput.remember })}
                                className="form-check-input" type="checkbox" name="remember" id="remember" />

                            <label className="form-check-label px-2" htmlFor="remember">
                                Remember Me
                            </label>
                        </div>

                        <div className="form-group col-lg-12 mx-auto mb-0">
                            <button type="submit" className="btn btn-primary btn-block py-2 font-weight-bold">Login</button>
                            <Link className="btn btn-link" href={route('password.request')}>Forgot Your Password?</Link>
                        </div>
                    </div>
                </form>
            </div >
        </div >
    )
}

Login.layout = page => <Layout children={page} />
export default Login