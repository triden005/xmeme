import React, { Component } from "react";

import noimage from "./no-image.jpg";

export default class Form extends Component {
    state = {
        name: "",
        caption: "",
        url: "",
        small: -1,
    };

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.name === "" || this.state.caption === "" || this.state.url === "") {
            this.props.handelError(400);
            return;
        }

        this.props.onFormSubmit(this.state);
        this.setState({
            name: "",
            caption: "",
            url: "",
            small: 1,
        });
    };
    onClose = (e) => {
        e.preventDefault();
        this.setState({
            name: "",
            caption: "",
            url: "",
            small: -this.state.small,
        });
        document.querySelector("form").reset();
    };
    handleInputChange = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value,
        });
    };
    render() {
        const { name, caption, url, small } = this.state;
        return (
            <div className="expandable" mode={small}>
                <center>
                    <p className="card-title" onClick={this.onClose} style={{ cursor: "pointer" }}>
                        <i className="fas fa-plus" /> ADD MEME
                    </p>
                </center>

                <form onSubmit={this.handleSubmit} style={{ display: "block" }}>
                    <div className="displayflex">
                        <div style={{ width: "600px" }}>
                            <div style={{ maxWidth: "600px" }}>
                                <div className="input-container">
                                    <input
                                        type="text"
                                        className="input-text"
                                        placeholder="Enter Creator"
                                        name="name"
                                        value={name}
                                        onChange={this.handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="input-container">
                                    <input
                                        type="Url"
                                        placeholder="The image url"
                                        className="input-text"
                                        name="url"
                                        value={url}
                                        onChange={this.handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="input-container">
                                    <input
                                        type="text"
                                        placeholder="The image Caption"
                                        className="input-text"
                                        name="caption"
                                        value={caption}
                                        onChange={this.handleInputChange}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="showcard" hidn={caption ? "-1" : "1"}>
                            <center style={{ lineHeight: "1.5" }}>Preview</center>
                            <div className="list-item">
                                <div className="card">
                                    <p className="card-title">{caption}</p>

                                    <p className="card-caption">
                                        By -<em>{name}</em>
                                    </p>
                                    <div className="card-image">
                                        <img
                                            src={url}
                                            alt="Loading..."
                                            style={{ width: "100%" }}
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = `${noimage}`;
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{ margin: "25px 0px 0px" }}>
                        <button className="primary-button">Add</button>
                        <button className="secondary-button" onClick={this.onClose}>
                            Close
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}
