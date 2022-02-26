import React from 'react';
import { Link } from '@inertiajs/inertia-react';

export default ({ links = [] }) => {
    if (links.length === 3) return null;
    return (
        <ul className="pagination d-flex flex-wrap justify-content-center">
            {links.map(({ active, label, url }) => {
                return url === null ? (
                    <li key={label} className="page-item disabled">
                        <span className="page-link" dangerouslySetInnerHTML={{ __html: label }} />
                    </li>
                ) : (
                    <li key={label} className={`page-item ${active ? 'active' : ''}`}>
                        <Link href={url} className="text-decoration-none">
                            <span className="page-link" dangerouslySetInnerHTML={{ __html: label }}></span>
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
};