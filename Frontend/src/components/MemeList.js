import React, { Component } from "react";
import Meme from "./Meme";

export default class MemeList extends Component {
    render() {
        const memes = this.props.memes.map((todo, index) => {
            return (
                <li key={todo.id}>
                    <Meme
                        content={todo}
                        key={todo.id}
                        id={todo.id}
                        onUpdate={this.props.onUpdate}
                    />
                </li>
            );
        });

        return (
            <div className="list-wrapper">
                <ul>{memes}</ul>
            </div>
        );
    }
}
