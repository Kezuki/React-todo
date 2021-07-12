import React from "react";

import "./ItemStatusFilter.css";

export default class ItemStatusFilter extends React.Component {
    buttons = [
        { name: "all", label: "All" },
        { name: "active", label: "Active" },
        { name: "done", label: "Done" },
    ];

    render() {
        const { filter } = this.props;

        const buttons = this.buttons.map(({ name, label }) => {
            const isActive = filter === name;

            return (
                <button
                    onClick={() => {
                        this.props.onFilterChange(name);
                    }}
                    type="button"
                    className={`btn  ${
                        isActive ? "btn-info " : "btn-outline-secondary"
                    }`}
                    key={name}
                >
                    {label}
                </button>
            );
        });

        return <div className="btn-group">{buttons}</div>;
    }
}
