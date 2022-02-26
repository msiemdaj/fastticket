import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/inertia-react";
import React, { useEffect, useRef, useState } from "react";
import pickBy from 'lodash/pickBy';

export default ({ roles }) => {
    const { filters } = usePage().props;

    const [values, setValues] = useState({
        role: filters.role || '',
        search: filters.search || '',
    });

    function usePrevious(val) {
        const ref = useRef();
        useEffect(() => {
            ref.current = val;
        }, [val]);
        return ref.current;
    }

    const prevValues = usePrevious(values);

    useEffect(() => {
        if (prevValues) {
            const query = Object.keys(pickBy(values)).length
                ? pickBy(values)
                : '';
            Inertia.get(route(route().current()), query, {
                replace: true,
                preserveState: true
            });
        }
    }, [values]);

    function handleChange(e) {
        setValues(values => ({
            ...values,
            [e.target.name]: e.target.value
        }));
    }

    return (
        <div className="row">
            <div className="col-xl-2 mb-4">
                <label htmlFor="userRole" className="form-label font-weight-bold text-darkblue ps-1 mb-0">Role</label>
                <select onChange={handleChange} value={values.role}
                    id="userRole" name="role" className="form-select bg-white border-left-0 border-md text-muted">
                    <option value="">Any</option>
                    {
                        roles.map((role, key) => (
                            <option key={key}>{role}</option>
                        ))
                    }
                </select>
            </div>

            <div className="col-xl-4 mb-4">
                <label htmlFor="searchBar" className="form-label font-weight-bold text-darkblue ps-1 mb-0">Search</label>
                <input type="text" name="search" id="searchBar" className="form-control bg-white border-left-0 border-md text-muted" value={values.search} onChange={handleChange} autoComplete="off" />
            </div>
        </div>
    )
}