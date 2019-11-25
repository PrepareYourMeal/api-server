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
    Button
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
            sunday: []
        };
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

        return (
            <React.Fragment>
                <div className="">
                    { /* preloader */}
                    {this.props.loading && <Loader />}

                    <Row>
                        <Col lg={12}>
                            <div className="page-title-box">

                                <h4 className="page-title">Planner</h4>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardBody>
                                   Monday
                                    {this.state.monday.map((recipe, index) => (
  
                                    <Col lg={3} key={index}>
                                    <CardDeck>
                                    <Card className="gal-detail thumb card" height="60%">
                                        <CardImg alt="Card image cap" src={recipe.imageUrl} top width="100%"/>
                                        <CardBody>
                                            <p className="text-center"><small>{recipe.title}</small></p>                                        
                                            <Link to={{pathname:`/recipe/${recipe.spoon_id}`, state:{recipe:recipe}}}><Button color="secondary" className="btn-block" type="button">View Details</Button></Link>
                                        </CardBody>
                                    </Card>
                                  </CardDeck>
                          </Col>
                          ))
                          }
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                    
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardBody>
                                   Tuesday
                                    {this.state.tuesday.map((recipe, index) => (
  
                                    <Col lg={3} key={index}>
                                    <CardDeck>
                                    <Card className="gal-detail thumb card" height="60%">
                                        <CardImg alt="Card image cap" src={recipe.imageUrl} top width="100%"/>
                                        <CardBody>
                                            <p className="text-center"><small>{recipe.title}</small></p>                                        
                                            <Link to={{pathname:`/recipe/${recipe.spoon_id}`, state:{recipe:recipe}}}><Button color="secondary" className="btn-block" type="button">View Details</Button></Link>
                                        </CardBody>
                                    </Card>
                                  </CardDeck>
                          </Col>
                          ))
                          }
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                    
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardBody>
                                   Wednesday
                                    {this.state.wednesday.map((recipe, index) => (
  
                                    <Col lg={3} key={index}>
                                    <CardDeck>
                                    <Card className="gal-detail thumb card" height="60%">
                                        <CardImg alt="Card image cap" src={recipe.imageUrl} top width="100%"/>
                                        <CardBody>
                                            <p className="text-center"><small>{recipe.title}</small></p>                                        
                                            <Link to={{pathname:`/recipe/${recipe.spoon_id}`, state:{recipe:recipe}}}><Button color="secondary" className="btn-block" type="button">View Details</Button></Link>
                                        </CardBody>
                                    </Card>
                                  </CardDeck>
                          </Col>
                          ))
                          }
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                    
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardBody>
                                   Thursday
                                    {this.state.thursday.map((recipe, index) => (
  
                                    <Col lg={3} key={index}>
                                    <CardDeck>
                                    <Card className="gal-detail thumb card" height="60%">
                                        <CardImg alt="Card image cap" src={recipe.imageUrl} top width="100%"/>
                                        <CardBody>
                                            <p className="text-center"><small>{recipe.title}</small></p>                                        
                                            <Link to={{pathname:`/recipe/${recipe.spoon_id}`, state:{recipe:recipe}}}><Button color="secondary" className="btn-block" type="button">View Details</Button></Link>
                                        </CardBody>
                                    </Card>
                                  </CardDeck>
                          </Col>
                          ))
                          }
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                    
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardBody>
                                   Friday
                                    {this.state.friday.map((recipe, index) => (
  
                                    <Col lg={3} key={index}>
                                    <CardDeck>
                                    <Card className="gal-detail thumb card" height="60%">
                                        <CardImg alt="Card image cap" src={recipe.imageUrl} top width="100%"/>
                                        <CardBody>
                                            <p className="text-center"><small>{recipe.title}</small></p>                                        
                                            <Link to={{pathname:`/recipe/${recipe.spoon_id}`, state:{recipe:recipe}}}><Button color="secondary" className="btn-block" type="button">View Details</Button></Link>
                                        </CardBody>
                                    </Card>
                                  </CardDeck>
                          </Col>
                          ))
                          }
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardBody>
                                   Saturday
                                    {this.state.saturday.map((recipe, index) => (
  
                                    <Col lg={3} key={index}>
                                    <CardDeck>
                                    <Card className="gal-detail thumb card" height="60%">
                                        <CardImg alt="Card image cap" src={recipe.imageUrl} top width="100%"/>
                                        <CardBody>
                                            <p className="text-center"><small>{recipe.title}</small></p>                                        
                                            <Link to={{pathname:`/recipe/${recipe.spoon_id}`, state:{recipe:recipe}}}><Button color="secondary" className="btn-block" type="button">View Details</Button></Link>
                                        </CardBody>
                                    </Card>
                                  </CardDeck>
                          </Col>
                          ))
                          }
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardBody>
                                   Sunday
                                    {this.state.sunday.map((recipe, index) => (
  
                                    <Col lg={3} key={index}>
                                    <CardDeck>
                                    <Card className="gal-detail thumb card" height="60%">
                                        <CardImg alt="Card image cap" src={recipe.imageUrl} top width="100%"/>
                                        <CardBody>
                                            <p className="text-center"><small>{recipe.title}</small></p>                                        
                                            <Link to={{pathname:`/recipe/${recipe.spoon_id}`, state:{recipe:recipe}}}><Button color="secondary" className="btn-block" type="button">View Details</Button></Link>
                                        </CardBody>
                                    </Card>
                                  </CardDeck>
                          </Col>
                          ))
                          }
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </React.Fragment>
        )
    }
}


export default connect()(Planner);