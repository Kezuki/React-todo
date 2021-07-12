import React from "react";

import "../SearchPanel/SearchPanel.css";

export default class SearchPanel extends React.Component {
    onChange = (e) => {
        this.props.updateSearchText(e.target.value);
    };

    render() {
        return <input onChange={this.onChange} placeholder="search" />;
    }
}
