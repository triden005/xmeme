import React, { Component } from "react";

export default class Error extends Component {
    state = {
        message: this.props.message,
        hidden: 1,
    };

    render() {
        return <div className="errorwrapper">{this.state.message}</div>;
    }
}
