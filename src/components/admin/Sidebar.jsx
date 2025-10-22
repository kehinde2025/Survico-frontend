import React from 'react'

export default function Sidebar() {
    return (
        <div>
            <NavLink to="/admin/tasks" className="...">
                <FaTasks /> Tasks
            </NavLink>

        </div>
    )
}
