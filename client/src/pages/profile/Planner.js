import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import axios from 'axios';
import {
    Row,
    Col,
    Card,
    CardBody,
    CardImg,
    CardText,
    CardTitle,
    CardDeck,
    Collapse, 
    CardHeader,
    CardFooter,
    CardSubtitle,
    Button,
    ListGroup,
    ListGroupItem,
    UncontrolledButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';

import {getLoggedInUser} from '../../helpers/authUtils';
import Loader from '../../components/Loader';


class Planner extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            monday: [],
            tuesday: [],
            wednesday: [],
            thursday: [],
            friday: [],
            saturday: [],
            sunday: [],
            grocery: []
        };

        this.removeMonday.bind(this);
        this.removeTuesday.bind(this);
        this.removeWednesday.bind(this);
        this.removeThursday.bind(this);
        this.removeFriday.bind(this);
        this.removeSaturday.bind(this);
        this.removeSunday.bind(this);
        this.getGrocery.bind(this);
    }

    componentDidMount() {
        
        console.log(document.cookie);
        console.log("1")
        // let query = queryString.parse(this.props.location.search);
        let token = window.localStorage.getItem('accessJWT')
        if (token) {
            console.log("2")

            // let userId = query.userId;
            // let token = query.token;
            // window.localStorage.setItem("accessJWT", token);
            console.log("3")
            const url = `/api/users/${token}/planner`;
            axios.get(url, { withCredentials: true }).then(response => response.data)
            .then((data) => {
                console.log(data)
                this.setState({
                    monday: data.monday,
                    tuesday: data.tuesday,
                    wednesday: data.wednesday,
                    thursday: data.thursday,
                    friday: data.friday,
                    saturday: data.saturday,
                    sunday: data.sunday
                    })
                console.log(this.state)
                // this.props.history.push('/dashboard');
            })
        }
    }

    removeMonday(rec_id) {
        let token = window.localStorage.getItem('accessJWT');
        const url = `/api/users/${token}/planner/monday/${rec_id}`;
        axios.delete(url, { withCredentials: true })
        .then(r => {
            let monday = this.state.monday;
            const removeIndex = monday.map(item => item.spoon_id).indexOf(rec_id);
            monday.splice(removeIndex, 1);
            this.setState({ monday: monday });
            console.log(r.status);
            console.log(this.state.monday)
        })
        .catch(e => console.log(e))
    }

    removeTuesday(rec_id) {
        let token = window.localStorage.getItem('accessJWT');
        const url = `/api/users/${token}/planner/tuesday/${rec_id}`;
        axios.delete(url, { withCredentials: true })
        .then(r => {
            let tuesday = this.state.tuesday;
            const removeIndex = tuesday.map(item => item.spoon_id).indexOf(rec_id);
            tuesday.splice(removeIndex, 1);
            this.setState({ tuesday: tuesday });
            console.log(r.status);
            console.log(this.state.tuesday)
        })
        .catch(e => console.log(e))
    }

    removeWednesday(rec_id) {
        let token = window.localStorage.getItem('accessJWT');
        const url = `/api/users/${token}/planner/wednesday/${rec_id}`;
        axios.delete(url, { withCredentials: true })
        .then(r => {
            let wednesday = this.state.wednesday;
            const removeIndex = wednesday.map(item => item.spoon_id).indexOf(rec_id);
            wednesday.splice(removeIndex, 1);
            this.setState({ wednesday: wednesday });
            console.log(r.status);
            console.log(this.state.wednesday)
        })
        .catch(e => console.log(e))
    }

    removeThursday(rec_id) {
        let token = window.localStorage.getItem('accessJWT');
        const url = `/api/users/${token}/planner/thursday/${rec_id}`;
        axios.delete(url, { withCredentials: true })
        .then(r => {
            let thursday = this.state.thursday;
            const removeIndex = thursday.map(item => item.spoon_id).indexOf(rec_id);
            thursday.splice(removeIndex, 1);
            this.setState({ thursday: thursday });
            console.log(r.status);
            console.log(this.state.thursday)
        })
        .catch(e => console.log(e))
    }

    removeFriday(rec_id) {
        let token = window.localStorage.getItem('accessJWT');
        const url = `/api/users/${token}/planner/friday/${rec_id}`;
        axios.delete(url, { withCredentials: true })
        .then(r => {
            let friday = this.state.friday;
            const removeIndex = friday.map(item => item.spoon_id).indexOf(rec_id);
            friday.splice(removeIndex, 1);
            this.setState({ friday: friday });
            console.log(r.status);
            console.log(this.state.friday)
        })
        .catch(e => console.log(e))
    }

    removeSaturday(rec_id) {
        let token = window.localStorage.getItem('accessJWT');
        const url = `/api/users/${token}/planner/saturday/${rec_id}`;
        axios.delete(url, { withCredentials: true })
        .then(r => {
            let saturday = this.state.saturday;
            const removeIndex = saturday.map(item => item.spoon_id).indexOf(rec_id);
            saturday.splice(removeIndex, 1);
            this.setState({ saturday: saturday });
            console.log(r.status);
            console.log(this.state.saturday)
        })
        .catch(e => console.log(e))
    }

    removeSunday(rec_id) {
        let token = window.localStorage.getItem('accessJWT');
        const url = `/api/users/${token}/planner/sunday/${rec_id}`;
        axios.delete(url, { withCredentials: true })
        .then(r => {
            let sunday = this.state.sunday;
            const removeIndex = sunday.map(item => item.spoon_id).indexOf(rec_id);
            sunday.splice(removeIndex, 1);
            this.setState({ sunday: sunday });
            console.log(r.status);
            console.log(this.state.sunday)
        })
        .catch(e => console.log(e))
    }

    getGrocery() {
        let token = window.localStorage.getItem('accessJWT');
        const url = `/api/users/${token}/planner/grocery`;
        axios.get(url, { withCredentials: true })
        .then(response => response.data)
        .then((data) => {
            console.log(data)
            this.setState({ grocery: data })
            console.log(this.state.grocery)
        })
        
    }

    render() {

        return (
            <div className="">
            { /* preloader */}
            {this.props.loading && <Loader />}

                <Row>
                    <Col lg={12}>
                        <div className="page-title-box">

                            <h3 className="page-title">Planner</h3>
                        </div>
                    </Col>
                </Row>
          
                <h4>Monday</h4>
                <Row className="bg-picture card-box">
                <CardDeck>
                {this.state.monday.map((recipe, index) => (
                    <Col>
                        <Card key={index}>
                            <CardImg top width="100%" src={recipe.imageUrl} />
                            <CardBody>
                                <CardTitle><h4><Link to={{pathname:`/recipe/?spoon_id=${recipe.spoon_id}`, state:{recipe:recipe}}}>{ recipe.title.length < 20 ? `${recipe.title}` : `${recipe.title.substring(0, 25)}...` }</Link></h4></CardTitle>
                                <span style={{float: "right"}}><Button size='sm' onClick={() => this.removeMonday(recipe.spoon_id)}><i className="fa fa-trash-alt" /></Button></span>
                            </CardBody>
                        </Card>
                    </Col>
                ))}
                </CardDeck>
                </Row>

                <h4>Tuesday</h4>
                <Row className="bg-picture card-box">
                <CardDeck>
                {this.state.tuesday.map((recipe, index) => (
                    <Col>
                        <Card key={index}>
                            <CardImg top width="100%" src={recipe.imageUrl} />
                            <CardBody>
                                <CardTitle><h4><Link to={{pathname:`/recipe/?spoon_id=${recipe.spoon_id}`, state:{recipe:recipe}}}>{ recipe.title.length < 20 ? `${recipe.title}` : `${recipe.title.substring(0, 25)}...` }</Link></h4></CardTitle>
                                <span style={{float: "right"}}><Button size='sm' onClick={() => this.removeTuesday(recipe.spoon_id)}><i className="fa fa-trash-alt" /></Button></span>
                            </CardBody>
                        </Card>
                    </Col>
                ))}
                </CardDeck>
                </Row>

                <h4>Wednesday</h4>
                <Row className="bg-picture card-box">
                <CardDeck>
                {this.state.wednesday.map((recipe, index) => (
                    <Col>
                        <Card key={index}>
                            <CardImg top width="100%" src={recipe.imageUrl} />
                            <CardBody>
                                <CardTitle><h4><Link to={{pathname:`/recipe/?spoon_id=${recipe.spoon_id}`, state:{recipe:recipe}}}>{ recipe.title.length < 20 ? `${recipe.title}` : `${recipe.title.substring(0, 25)}...` }</Link></h4></CardTitle>
                                <span style={{float: "right"}}><Button size='sm' onClick={() => this.removeWednesday(recipe.spoon_id)}><i className="fa fa-trash-alt" /></Button></span>
                            </CardBody>
                        </Card>
                    </Col>
                ))}
                </CardDeck>
                </Row>

                <h4>Thursday</h4>
                <Row className="bg-picture card-box">
                <CardDeck>
                {this.state.thursday.map((recipe, index) => (
                    <Col>
                        <Card key={index}>
                            <CardImg top width="100%" src={recipe.imageUrl} />
                            <CardBody>
                                <CardTitle><h4><Link to={{pathname:`/recipe/?spoon_id=${recipe.spoon_id}`, state:{recipe:recipe}}}>{ recipe.title.length < 20 ? `${recipe.title}` : `${recipe.title.substring(0, 25)}...` }</Link></h4></CardTitle>
                                <span style={{float: "right"}}><Button size='sm' onClick={() => this.removeThursday(recipe.spoon_id)}><i className="fa fa-trash-alt" /></Button></span>
                            </CardBody>
                        </Card>
                    </Col>
                ))}
                </CardDeck>
                </Row>

                <h4>Friday</h4>
                <Row className="bg-picture card-box">
                <CardDeck>
                {this.state.friday.map((recipe, index) => (
                    <Col>
                        <Card key={index}>
                            <CardImg top width="100%" src={recipe.imageUrl} />
                            <CardBody>
                                <CardTitle><h4><Link to={{pathname:`/recipe/?spoon_id=${recipe.spoon_id}`, state:{recipe:recipe}}}>{ recipe.title.length < 20 ? `${recipe.title}` : `${recipe.title.substring(0, 25)}...` }</Link></h4></CardTitle>
                                <span style={{float: "right"}}><Button size='sm' onClick={() => this.removeFriday(recipe.spoon_id)}><i className="fa fa-trash-alt" /></Button></span>
                            </CardBody>
                        </Card>
                    </Col>
                ))}
                </CardDeck>
                </Row>
            
                <h4>Saturday</h4>
                <Row className="bg-picture card-box">
                <CardDeck>
                {this.state.saturday.map((recipe, index) => (
                    <Col>
                        <Card key={index}>
                            <CardImg top width="100%" src={recipe.imageUrl} />
                            <CardBody>
                                <CardTitle><h4><Link to={{pathname:`/recipe/?spoon_id=${recipe.spoon_id}`, state:{recipe:recipe}}}>{ recipe.title.length < 20 ? `${recipe.title}` : `${recipe.title.substring(0, 25)}...` }</Link></h4></CardTitle>
                                <span style={{float: "right"}}><Button size='sm' onClick={() => this.removeSaturday(recipe.spoon_id)}><i className="fa fa-trash-alt" /></Button></span>
                            </CardBody>
                        </Card>
                    </Col>
                ))}
                </CardDeck>
                </Row>
            
                <h4>Sunday</h4>
                <Row className="bg-picture card-box">
                <CardDeck>
                {this.state.sunday.map((recipe, index) => (
                    <Col>
                        <Card key={index}>
                            <CardImg top width="100%" src={recipe.imageUrl} />
                            <CardBody>
                                <CardTitle><h4><Link to={{pathname:`/recipe/?spoon_id=${recipe.spoon_id}`, state:{recipe:recipe}}}>{ recipe.title.length < 20 ? `${recipe.title}` : `${recipe.title.substring(0, 25)}...` }</Link></h4></CardTitle>
                                <span style={{float: "right"}}><Button size='sm' onClick={() => this.removeSunday(recipe.spoon_id)}><i className="fa fa-trash-alt" /></Button></span>
                            </CardBody>
                        </Card>
                    </Col>
                ))}
                </CardDeck>
                </Row>
            </div>
        )
    }
}


export default connect()(Planner);