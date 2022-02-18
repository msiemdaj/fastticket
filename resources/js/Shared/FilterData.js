import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/inertia-react";
import React, { useEffect, useRef, useState } from "react";
import pickBy from 'lodash/pickBy';

export default () => {
    const { filters } = usePage().props;

    const [values, setValues] = useState({
        status: filters.status || '',
        priority: filters.priority || '',
    });
    console.log(values)

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
                : { remember: 'forget' };
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
        <div className="btn-group">
            <select name="status" className="form-control col-sm-2 bg-white" value={values.status} onChange={handleChange}>
                <option value="">All</option>
                <option value="pending">Pending</option>
                <option value="open">Open</option>
                <option value="closed">Closed</option>
            </select>

            <select name="priority" className="form-control col-sm-2 bg-white" value={values.priority} onChange={handleChange}>
                <option value="">All</option>
                <option value="unassigned">Unassigned</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
            </select>
        </div>
    )
}