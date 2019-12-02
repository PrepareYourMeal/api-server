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
import food from '../../assets/images/food.png';


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
                this.setState({ favourites: data })
                console.log(this.state.favourites)
                // this.props.history.push('/dashboard');
            })

        }
    }

    removeFavourite(rec_id) {
        let token = window.localStorage.getItem('accessJWT')
        const url = `/api/users/${token}/favourites/${rec_id}`
        axios.delete(url, { withCredentials: true })
        .then(r => {
            let favourites = this.state.favourites;  
            const removeIndex = favourites.map(item => item.spoon_id).indexOf(rec_id);
            favourites.splice(removeIndex, 1);
            this.setState({ favourites: favourites });
            console.log(r.status);
            console.log(this.state.favourites)
        })
        .catch(e => console.log(e))
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

                        {this.state.favourites.map((recipe, index) => (
                              <div class="col-sm-2 col-md-2">
                              <div class="card-box widget-user">
                                  <div>
                                      <div class="avatar-lg float-left mr-2">
                                          <img src={food} class="img-fluid rounded-circle" alt="user"/>
                                      </div>
                                      <div class="wid-u-info">
                                          <p class="text-muted mb-1 font-13 text-truncate">{recipe.title}</p>
                                          <div class="button-list">
                                          <Link  to={{pathname:`/recipe/?spoon_id=${recipe.spoon_id}`, state:{recipe:recipe}}}><Button><i class="far fa-eye"></i></Button></Link>
                                          <Button onClick={() => this.removeFavourite(recipe.spoon_id)}><i class="fas fa-trash-alt"></i></Button>
                                        </div>
                                          </div>
                                  </div>
                              </div>
                              </div>
                          ))
                          }
                    </Row>
                </div>
            </React.Fragment>
        )
    }
}


export default connect()(Favorites);