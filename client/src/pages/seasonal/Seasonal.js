import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card, CardBody, CardTitle, Button, ListGroup, ListGroupItem, Input } from 'reactstrap';

import { getLoggedInUser } from '../../helpers/authUtils';
import Loader from '../../components/Loader';
import axios from 'axios';

class Favorites extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            ingredients: [],
            isAuthenticated: false,
            inventory: [],
            filtered: [],
            search: ''
        };
        this.removeIngredient.bind(this);
        this.handleChange.bind(this);
        this.addIngredient.bind(this);
        this.updateSearch.bind(this);
    }

    componentDidMount() {
        let token = window.localStorage.getItem('accessJWT')
        if (token) {
            console.log("2")

            // let userId = query.userId;
            // let token = query.token;
            // window.localStorage.setItem("accessJWT", token);
            console.log("3")
            const url = `/api/users/?token=${token}`;
            axios.get(url, { withCredentials: true }).then(response => response.data)
            .then((data) => {
                console.log(data)
                this.setState({ user: data, isAuthenticated: true })
                console.log(this.state.user)
                // this.props.history.push('/dashboard');
            })
        }

        const url1 ='/api/ingredients/';
        axios.get(url1, { withCredentials: true }).then(response => response.data)
        .then((data) => {
            console.log(data)
          this.setState({ ingredients: data })
         })

        const url2 = `/api/users/${token}/inventory`;
        axios.get(url2, { withCredentials: true }).then(response => response.data)
            .then((data) => {
            console.log(data)
            this.setState({ inventory: data })
        })
      }

    updateSearch(event) {
        this.setState({ search: event.target.value.substr(0, 20) });
    }
    
    addIngredient(ingredient) {
        let token = window.localStorage.getItem('accessJWT')
        const url = `/api/users/${token}/inventory`;
        const data = {
            ingredients: ingredient
        }
        axios.put(url, data, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json"
            }
        }).then(r => {
            let inventory = this.state.inventory;
            inventory.push(ingredient)
            this.setState({ inventory: inventory })
            console.log(r.status)
        })
        .catch(e => console.log(e));
    }

    removeIngredient(ingi_id) {
        let token = window.localStorage.getItem('accessJWT')
        const url = `/api/users/${token}/inventory/${ingi_id}`
        axios.delete(url, { withCredentials: true })
        .then(r => {
            
            let inventory = this.state.inventory;  
            const removeIndex = inventory.map(item => item.spoon_id).indexOf(ingi_id);
            inventory.splice(removeIndex, 1);
            this.setState({ inventory: inventory });
            console.log(r.status);
            console.log(this.state.inventory)
        })
        .catch(e => console.log(e))
    }

    handleChange(e) {
        console.log(this.state.ingredients);
        // console.log()
        if (e.target.value !== "") {
            this.state.ingredients.filter(item => {
                const lc = item.name.toLowerCase();
                const filter = e.target.value.toLowerCase();
                return lc.includes(filter);
            })
        }
    }

    // handleChange(e) {
    //     let currentList = this.state.ingredients;
    //     let newList = [];
        
    //     if (e.target.value !== "") {
    //         newList = currentList.filter(item => {
    //             const lc = item.name.toLowerCase();
    //             const filter = e.target.value.toLowerCase();
    //             // check to see if the current list item includes the search term
    //             // If it does, it will be added to newList. Using lowercase eliminates
    //             // issues with capitalization in search terms and search content
    //             return lc.includes(filter);
    //         });
    //     } else {
    //         // If the search bar is empty, set newList to original task list
    //         newList = this.state.ingredients;
    //     }
    //     // Set the filtered state based on what our rules added to newList
    //     this.setState({
    //         filtered: newList
    //     });
    // }

    

    render() {
        let filtered = this.state.ingredients.filter((ingredient) => {
            return ingredient.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
        }
        );

        return (
            <React.Fragment>
                <div className="">
                    { /* preloader */}
                    {this.props.loading && <Loader />}
                    <Row>
                        <Col>
                            <Row>
                                <Col>
                                    <div className="page-title-box">
                                        <h4 className="page-title">Ingredient Box</h4>
                                    </div>
                                </Col>
                                {/* <Col>
                                    <div className="page-title-box">
                                        <input type="text" className="input" onChange={(e) => this.updateSearch(e)} value={this.state.search} placeholder="Search..." />
                                    </div>
                                </Col> */}
                            </Row>
                            <Row>
                                <Input type="text" className="input" onChange={(e) => this.updateSearch(e)} value={this.state.search} placeholder="Search..." />
                                <div className="container">
                                    <ListGroup flush>
                                        {filtered.map((ingredient, index) => (
                                            <ListGroupItem>
                                                <strong>{ingredient.name}</strong>
                                                <span style={{float: "right"}}><Button size='sm' onClick={() => this.addIngredient(ingredient)}><i className="fa fa-plus" /></Button></span>
                                        {/* <Button size='sm' onClick={() => this.addIngredient(ingredient)}>Add to Fridge</Button> */}
                                            </ListGroupItem>
                                        ))}    
                                    </ListGroup>
                                </div>
                            </Row>
                        </Col>
                        <Col>
                            <Row>
                                <div className="page-title-box">
                                    <h4 className="page-title">My Fridge</h4>
                                </div>
                            </Row>
                            <ListGroup flush>
                                {this.state.inventory.map((ingredient, index) => (
                                    <ListGroupItem>
                                        <strong>{ingredient.name}</strong>
                                        <span style={{float: "right"}}><Button size='sm' onClick={() => this.removeIngredient(ingredient.spoon_id)}><i className="fa fa-trash-alt" /></Button></span>
                                    </ListGroupItem>
                                ))}
                            </ListGroup>
                        </Col>
                    </Row>
                </div>
            </React.Fragment>
        )
    }
}


export default connect()(Favorites);