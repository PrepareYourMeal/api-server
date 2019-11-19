import React, { Component } from "react";

export default class Home extends Component {
    constructor(props) {
        super(props);
    }
    render () {
        return (
            <div>
                <h1>HOME</h1>
                <h1>Status: {this.props.isAuthenticated}</h1>
            </div>

        );
    }
}