import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card, CardBody } from 'reactstrap';
import {Link} from 'react-router-dom'
import { getLoggedInUser } from '../../helpers/authUtils';
import Loader from '../../components/Loader';
import axios from 'axios';
import {
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


class Favorites extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            favourites: []
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
            const url = `/api/users/${token}/favourites`;
            axios.get(url, { withCredentials: true }).then(response => response.data)
            .then((data) => {
                console.log(data)
                this.setState({ favourites: data })
                console.log(this.state.favourites)
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

    renderObj = () => { 
        Object.keys(this.state.user).map((obj, i) => {
        return (
            <div>
                {this.state.user[obj].name}
            </div>
      )})}

    render() {
        // let { favourites } = this.state.user;

        return (
            <React.Fragment>
                <div className="">
                    { /* preloader */}
                    {this.props.loading && <Loader />}

                    <Row>
                        <Col lg={12}>
                            <div className="page-title-box">

                                <h4 className="page-title">My Favorites</h4>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardBody>
                                   My Favorites
                        {this.state.favourites.map((recipe, index) => (
  
                          <Col lg={3} key={index}>
                              <CardDeck>
  
                                  <Card className="gal-detail thumb card" height="60%">
                                      <CardImg alt="Card image cap" src={recipe.imageUrl} top width="100%"/>
                                      <CardBody>
                                          <p className="text-center"><small>{recipe.title}</small></p>                                        
                                          {/* <CardSubtitle>{recipe.servings}</CardSubtitle> */}
                                          {/* <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText> */}
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


export default connect()(Favorites);