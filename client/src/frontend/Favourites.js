import React, { Component } from 'react';
import { getLoggedInUser } from '../helpers/authUtils';

class Favourites extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: props.isAuthenticated,
            recipes: [],
            user: getLoggedInUser()
        }
    }

    // componentDidMount() {
    //     const { favourites } = this.props.user;
    //     this.setState({recipes: favourites});
    // }
    render() {
        return (
            <div>
                <h1>Favourites</h1>
    <h2>{this.state.user}</h2>
            </div>
        )
    }
}

export default Favourites;

