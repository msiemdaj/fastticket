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
        <div className="btn-group col-sm-6">
            <select onChange={handleChange} value={values.role}
                className="form-control bg-white" name="role">
                <option value="">Any</option>
                {
                    roles.map((role, key) => (
                        <option key={key}>{role}</option>
                    ))
                }
            </select>

            <input type="text" name="search" className="form-control bg-white" placeholder="Search" value={values.search} onChange={handleChange} autoComplete="off" />
        </div>
    )
}