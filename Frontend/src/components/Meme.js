import React, { Component } from "react";

export default class Meme extends Component {
    state = {
        id: "",
        name: "",
        url: "",
        caption: "",
        mode: "view",
    };

    handleInputChange = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    handleSave = (event) => {
        event.preventDefault();
        if (this.state.url === "" && this.state.caption === "") return;
        this.props.onUpdate(this.state);
        this.setState({
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            mode: "view",
        });
    };

    handleEdit = () => {
        this.setState({ mode: "edit" });
    };

    renderInputField() {
        if (this.state.mode === "view") {
            return <div></div>;
        } else {
            return (
                <form style={{ display: "block", maxWidth: "600px" }} onSubmit={this.handleSave}>
                    <div className="input-container">
                        <div>
                            <label htmlFor="url">Url</label>
                        </div>
                        <input
                            name="url"
                            className="input-text"
                            value={this.state.url}
                            onChange={this.handleInputChange}
                            type="url"
                        />
                    </div>
                    <div className="input-container">
                        <div>
                            <label htmlFor="eventname">Caption</label>
                        </div>
                        <input
                            type="text"
                            className="input-text"
                            name="caption"
                            value={this.state.caption}
                            onChange={this.handleInputChange}
                        />
                    </div>
                </form>
            );
        }
    }

    renderButton() {
        if (this.state.mode === "view") {
            return (
                <button className="secondary-button" onClick={this.handleEdit}>
                    Edit
                </button>
            );
        } else {
            return (
                <button className="secondary-button" onClick={this.handleSave}>
                    Save
                </button>
            );
        }
    }

    componentDidMount() {
        this.setState({
            id: this.props.content.id,
            name: this.props.content.name,
            url: this.props.content.url,
            caption: this.props.content.caption,
        });
    }

    render() {
        const { name, url, caption } = this.state;

        return (
            <div className="list-item">
                <div className="card">
                    <p className="card-title">{caption}</p>

                    {this.state.mode === "view" && (
                        <>
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
                                        e.target.src = "https://picsum.photos/300";
                                    }}
                                />
                            </div>
                        </>
                    )}

                    <div>{this.renderInputField()}</div>

                    <div style={{ display: "inline-flex" }}>
                        <div>{this.renderButton()}</div>
                    </div>
                </div>
            </div>
        );
    }
}
