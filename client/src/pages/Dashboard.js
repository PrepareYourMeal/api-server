import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card, CardBody } from 'reactstrap';

import { getLoggedInUser } from '../helpers/authUtils';
import Loader from '../components/Loader';
import queryString from 'query-string';
import axios from 'axios';


class DefaultDashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {}
        };
    }

    componentDidMount() {
        
        console.log(document.cookie);
        console.log("1")
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
                this.setState({ user: data })
                console.log(this.state.user)
                // this.props.history.push('/dashboard');
            })
        }
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
            // const user = await axios.get(`/api/users/?token=${token}`, { withCredentials: true });
            // console.log("4")
            // console.log(user);
            // this.setState({ user: user.data });
            // console.log(this.state);
            // this.setState({ user: user, isAuthenticated: true, name: name });
            // this.props.authenticateUser(user.data);
            // console.log("5")

            

        }
    }
    

    render() {
        let { name } = this.state.user

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
                                    {name}
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </React.Fragment>
        )
    }
}


export default connect()(DefaultDashboard);