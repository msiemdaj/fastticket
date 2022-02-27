import React from "react"
import { Link } from '@inertiajs/inertia-react'
import { useForm } from '@inertiajs/inertia-react'

import Layout from "../../Shared/Layout"

const Login = () => {

    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    })

    const loginSubmit = async (e) => {
        e.preventDefault();
        post(route('login'));
    }

    return (
        <div className="row justify-content-center">
            <div className="col-xl-10 col-lg-12 col-md-9">
                <div className="card border-0 shadow-lg my-5">
                    <div className="card-body p-0">
                        <div className="row">
                            <div className="col-lg-6 d-lg-block bg-login-image"></div>
                            <div className="col-lg-6">
                                <div className="p-5">
                                    <div className="text-center">
                                        <h1 className="h2 mb-4 text-darkblue font-weight-bold text-uppercase">Login</h1>
                                    </div>

                                    <form onSubmit={loginSubmit}>
                                        <div className="mb-4">
                                            <label htmlFor="email" className="form-label font-weight-bold text-darkblue">Email address</label>
                                            <input onChange={e => setData('email', e.target.value)} value={data.email}
                                                type="email" id="email" name="email" className={`form-control bg-white border-left-0 border-md text-muted ${errors.email ? 'is-invalid' : ''}`} required />
                                        </div>

                                        <div className="mb-4">
                                            <label htmlFor="password" className="form-label font-weight-bold text-darkblue">Password</label>
                                            <input onChange={e => setData('password', e.target.value)} value={data.password}
                                                type="password" id="password" name="password" className={`form-control bg-white border-left-0 border-md text-muted ${errors.email ? 'is-invalid' : ''}`} required />
                                            {errors.email && <span className="mt-1 text-danger">{errors.email}</span>}
                                        </div>

                                        <div className="mb-4">
                                            <input checked={data.remember} onChange={e => setData('remember', e.target.checked)}
                                                className="form-check-input" type="checkbox" name="remember" id="remember" />

                                            <label className="form-check-label text-muted px-2" htmlFor="remember">
                                                Remember Me
                                            </label>
                                        </div>

                                        <button type="submit" className="btn btn-outline-darkblue btn-block py-2 px-4 font-weight-bold text-center w-100 mb-4" disabled={processing}>Login</button>

                                        <div className="text-center">
                                            <Link className="text-muted" href={route('password.request')}>Forgot Your Password?</Link>
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

Login.layout = page => <Layout children={page} />
export default Login