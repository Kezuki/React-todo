import React from "react";

import "../ItemAddForm/ItemAddForm.css";

export default class ItemAddForm extends React.Component {
    state = {
        label: "",
    };

    onLabelChange = (e) => {
        this.setState({
            label: e.target.value,
        });
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onAdd(this.state.label);
        this.setState({
            label: "",
        });
    };

    render() {
        return (
            <form onSubmit={this.onSubmit} className="item-add-form">
                <input
                    type="text"
                    onChange={this.onLabelChange}
                    className="form-control"
                    placeholder="What need to be done?"
                    value={this.state.label}
                />

                <button className="btn btn-outline-secondary">Add Item</button>
            </form>
        );
    }
}
