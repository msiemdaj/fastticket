import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/inertia-react";
import React, { useEffect, useRef, useState } from "react";
import pickBy from 'lodash/pickBy';

export default ({ categories, statuses, priorities }) => {
    const { filters } = usePage().props;

    const [values, setValues] = useState({
        status: filters.status || '',
        priority: filters.priority || '',
        search: filters.search || '',
        category: filters.category || '',
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
            <div className="col-xl-4 mb-4">
                <label htmlFor="category" className="form-label font-weight-bold text-darkblue ps-1 mb-0">Category</label>
                <select onChange={handleChange} value={values.category}
                    id="category" name="category" className="form-select bg-white border-left-0 border-md text-muted">
                    <option value="">Any</option>
                    {
                        categories.map((category, key) => (
                            <option key={key} value={category.id}>{category.name}</option>
                        ))
                    }
                </select>
            </div>

            <div className="col-xl-2 mb-4">
                <label htmlFor="status" className="form-label font-weight-bold text-darkblue ps-1 mb-0">Status</label>
                <select onChange={handleChange} value={values.status}
                    id="status" name="status" className="form-select bg-white border-left-0 border-md text-muted">
                    <option value="">All</option>
                    {
                        statuses.map((status, key) => (
                            <option key={key}>{status}</option>
                        ))
                    }
                </select>
            </div>

            <div className="col-xl-2 mb-4">
                <label htmlFor="priority" className="form-label font-weight-bold text-darkblue ps-1 mb-0">Priority</label>
                <select onChange={handleChange} value={values.priority}
                    id="priority" name="priority" className="form-select bg-white border-left-0 border-md text-muted">
                    <option value="">All</option>
                    {
                        priorities.map((priority, key) => (
                            <option key={key}>{priority}</option>
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