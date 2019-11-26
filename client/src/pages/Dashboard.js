import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card, CardBody, CardTitle, Button } from 'reactstrap';

import { getLoggedInUser } from '../helpers/authUtils';
import Loader from '../components/Loader';
import queryString from 'query-string';
import axios from 'axios';


class DefaultDashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            inventory: []
        };
        this.removeIngredient.bind(this);
    }

    componentDidMount() {
        let query = queryString.parse(this.props.location.search);
        if (query.token) {
            console.log("2")

            let userId = query.userId;
            let token = query.token;
            window.localStorage.setItem("accessJWT", token);
            console.log("3")
            const url = `/api/users/?token=${token}`;
            axios.get(url, { withCredentials: true }).then(response => response.data)
            .then((data) => {
                console.log(data)
                this.setState({ user: data })
                console.log(this.state.user)
                this.props.history.push('/dashboard');
            })
        }
        
        console.log(document.cookie);
        console.log("1")
        let token = window.localStorage.getItem('accessJWT')
        if (token) {
            console.log("2")

            // let userId = query.userId;
            // let token = query.token;
            // window.localStorage.setItem("accessJWT", token);
            console.log("3")
            const url = `/api/users/${token}/inventory`;
            axios.get(url, { withCredentials: true }).then(response => response.data)
            .then((data) => {
                console.log(data)
                this.setState({ inventory: data })
            })
        }
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
    

    render() {
        // let { name, inventory } = this.state.user

        return (
            <React.Fragment>
                <div className="">
                    { /* preloader */}
                    {this.props.loading && <Loader />}

                    <Row>
                        <Col lg={12}>
                            <div className="page-title-box">

                                <h4 className="page-title">My Refrigerator</h4>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardBody>
                                    Whats in your fridge?
                                </CardBody>
                            </Card>
                            {this.state.inventory.map((ingredients, index) => (
                            <Card>
                            <Col lg={3} key={index}>
                            <Card>
                                <CardTitle>{ingredients.name}</CardTitle>
                                <Button onClick={() => this.removeIngredient(ingredients.spoon_id)}>Remove from Fridge</Button>
                            </Card>
                            </Col>
                            </Card>
                            ))}

                        </Col>
                    </Row>
                </div>
            </React.Fragment>
        )
    }
}


export default connect()(DefaultDashboard);