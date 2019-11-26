import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card, CardBody, CardTitle, Button } from 'reactstrap';

import { getLoggedInUser } from '../../helpers/authUtils';
import Loader from '../../components/Loader';
import axios from 'axios';


class Favorites extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            ingredients: [],
            isAuthenticated: false
        };
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

        const url ='/api/ingredients/';
        axios.get(url, { withCredentials: true }).then(response => response.data)
        .then((data) => {
            console.log(data)
          this.setState({ ingredients: data })
          console.log(this.state.recipes)
         })
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
        }).then(r => console.log(r.status))
        .catch(e => console.log(e));
    }
    

    render() {

        return (
            <React.Fragment>
                <div className="">
                    { /* preloader */}
                    {this.props.loading && <Loader />}

                    <Row>
                        <Col lg={12}>
                            <div className="page-title-box">

                                <h4 className="page-title">Seasonal Favorites</h4>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        {this.state.ingredients.map((ingredient, index) => (
                            <Col lg={3} key={index}>
                            <Card>
                                <CardTitle>{ingredient.name}</CardTitle>
                                <Button onClick={() => this.addIngredient(ingredient)}>Add to Fridge</Button>
                            </Card>
                            </Col>
                        ))}
                    </Row>


                </div>
            </React.Fragment>
        )
    }
}


export default connect()(Favorites);