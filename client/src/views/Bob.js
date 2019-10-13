import React from "react";
import Component from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "shards-react";
import axios from 'axios';
axios.defaults.headers.common['x-auth-token'] = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWRhMGRkMDUxODg4NjE5MTFlYWIwOGE2In0sImlhdCI6MTU3MDgzNDE4NCwiZXhwIjoxNTcwODM3Nzg0fQ.O83edsrNGc_DdS-VqbhpZ-RXcTWgaZJhIdntQZJ0K-U`;
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

class Bob extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = {
      x: 0,
      y: 0,
      ingredients: [],
      kind: '',
      infos: '',
      json: [
        {"_id": "5d993814ff7c033bc819be4b", "name": "Black Pepper","spoon_id": "1024","__v": 0},
        {"_id": "5d993814ff7c033bc819be4b", "name": "White Pepper","spoon_id": "1025","__v": 0}
      ]

    };

  }

  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  componentDidMount() {
    this.getDataFromDb();
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 1000);
      this.setState({ intervalIsSet: interval });
    }
  }

  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }

  getDataFromDb = () => {
     axios.get('http://localhost:5000/api/ingredients')

     .then(response => {
       this.infos = response.data;
       console.log(this.infos);
     })
     .catch(error => console.log(error));
 };

  render() {
    const { ingredients } = this.state;
    return (
      <div style={{ height: '100%' }} onMouseMove={this.handleMouseMove}>
        {/*}
        <h1>Move the mouse around!</h1>
        <p>The current mouse position is ({this.state.x}, {this.state.y})</p>
        */}

        <ul>
        {/*TESTING LIST*/}

        {/*
        {this.state.json.map(ingredient => <li>{ingredient._id}</li>)}
        {console.log(this.state.ingredients)}

         */}
        </ul>

        <h1>
        Ingredients available to be added into Refrigerator:
        </h1>

        <ul>


          {this.state.json.length <= 0
            ? 'No Ingredients in Database'
            : this.state.json.map((dat) => (
                <li style={{ padding: '10px' }} key={dat._id}>
                  <span style={{ color: 'gray' }}> Name: </span> {dat.name} <br/>
                  <span style={{ color: 'gray' }}> Spoonacular ID: </span> {dat.spoon_id}
                </li>
              ))}
        </ul>
      </div>


    );


  }


}

export default Bob;
