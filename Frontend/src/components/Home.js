import React, { Component } from "react";
import axios from "axios";

import config from "../ipConfig.json";
import Form from "./Form";
import MemeList from "./MemeList";
import Header from "./Header";
import Error from "./Error";
var a;
export default class Home extends Component {
    state = {
        memes: [],
        error: "",
    };
    handleSubmit = async (meme) => {
        let id = -1;

        await axios
            .post(`${config.backendIp}/memes`, meme)
            .then((res) => {
                console.log("Recieved data ", res.data);
                id = res.data.id;
            })
            .catch((err) => {
                this.handelError(err.response.status);
            });

        if (id === -1) return;
        await axios.get(`${config.backendIp}/memes/${id}`).then((res) => {
            this.setState({ memes: [res.data, ...this.state.memes] });
        });
    };
    handelError = (status) => {
        if (status === 404) {
            this.setState({ error: "Not found" });
        } else if (status === 409) {
            this.setState({ error: "Dublicate Meme" });
        } else if (status === 400) {
            this.setState({ error: "Bad request" });
        } else if (status === 415) {
            this.setState({ error: "UnSupported Media Query" });
        } else {
            this.setState({ error: "Something Bad Happend!" });
        }
        clearTimeout(a);
        a = setTimeout(() => {
            this.setState({ error: "" });
        }, 1000);
    };
    handleUpdate = async (meme) => {
        const newArr = [...this.state.memes];

        let pos = -1;
        for (let i = 0; i < newArr.length; i++) {
            if (newArr[i].id === meme.id) {
                pos = i;
                break;
            }
        }

        if (pos === -1) return;
        newArr[pos].name = meme.name;
        newArr[pos].url = meme.url;
        newArr[pos].caption = meme.caption;
        let updatedmeme = newArr[pos];
        console.log(updatedmeme);

        await axios
            .patch(`${config.backendIp}/memes/${updatedmeme.id}`, updatedmeme)
            .then((res) => {
                console.log("Updating In Frontend", res.data);
            });
        this.setState({ memes: newArr });
    };

    performAPICall = async () => {
        let memesData = [];
        await axios
            .get(`${config.backendIp}/memes`)
            .then((res) => {
                for (let i = 0; i < res.data.length; i++) {
                    memesData.push(res.data[i]);
                }
            })
            .then(() => {
                for (let i = 0; i < memesData.length; i++) {
                    this.setState({ memes: [...this.state.memes, memesData[i]] });
                }
            });
    };

    async componentDidMount() {
        await this.performAPICall();
    }
    render() {
        const { error } = this.state;
        return (
            <>
                <Header />
                {error && <Error message={this.state.error} />}
                <div className="main-section">
                    <Form onFormSubmit={this.handleSubmit} handelError={this.handelError} />
                    <div>
                        <MemeList memes={this.state.memes} onUpdate={this.handleUpdate} />
                    </div>
                </div>
            </>
        );
    }
}
