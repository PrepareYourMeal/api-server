import React, {Component, useState } from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import axios from 'axios';
import {
    Row,
    Col,
    Card,
    CardBody,
    CardImg,
    CardDeck,
    Button,
    TabContent, 
    TabPane,
    Nav, NavItem, NavLink, CardTitle, CardText
} from 'reactstrap';
import food from '../../assets/images/food.png';

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
                    console.log(this.state.planner)
                console.log(this.state)
                // this.props.history.push('/dashboard');
            })

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
                
            {this.state.monday.map((recipe, index) => (

            <div class="col-2">
                                <div class="text-center card-box">
                                <div class="text-cemter">
                                    <Link to={{pathname:`/recipe/?spoon_id=${recipe.spoon_id}`, state:{recipe:recipe}}}>
                                        <img src={food} alt="" width="100p" class="text-center"/>
                                    </Link>
                                </div>
                
                                <div class="recipe-box-content">

                                <p className="text-center">{recipe.title}</p>      

                                <Link  to={{pathname:`/recipe/?spoon_id=${recipe.spoon_id}`, state:{recipe:recipe}}}><Button color="secondary" className="btn-block" type="button">View Details</Button></Link>
                                  
                                </div>

                                </div>
                            </div>
                            ))
                            }
            </Row>

            <h4>Tuesday</h4>
            <Row className="bg-picture card-box">
            {this.state.tuesday.map((recipe, index) => (

            <div class="col-2">
                                <div class="text-center card-box">
                                <div class="text-cemter">
                                    <Link to={{pathname:`/recipe/?spoon_id=${recipe.spoon_id}`, state:{recipe:recipe}}}>
                                        <img src={food} alt="" width="100p" class="text-center"/>
                                    </Link>
                                </div>
                
                                <div class="recipe-box-content">

                                <p className="text-center">{recipe.title}</p>      

                                <Link  to={{pathname:`/recipe/?spoon_id=${recipe.spoon_id}`, state:{recipe:recipe}}}><Button color="secondary" className="btn-block" type="button">View Details</Button></Link>
                                  
                                </div>

                                </div>
                            </div>
                            ))
                            }
            </Row>

            <h4>Wednesday</h4>
            <Row className="bg-picture card-box">
            {this.state.wednesday.map((recipe, index) => (

            <div class="col-2">
                                <div class="text-center card-box">
                                <div class="text-cemter">
                                    <Link to={{pathname:`/recipe/?spoon_id=${recipe.spoon_id}`, state:{recipe:recipe}}}>
                                        <img src={food} alt="" width="100p" class="text-center"/>
                                    </Link>
                                </div>
                
                                <div class="recipe-box-content">

                                <p className="text-center">{recipe.title}</p>      

                                <Link  to={{pathname:`/recipe/?spoon_id=${recipe.spoon_id}`, state:{recipe:recipe}}}><Button color="secondary" className="btn-block" type="button">View Details</Button></Link>
                                  
                                </div>

                                </div>
                            </div>
                            ))
                            }
            </Row>

            <h4>Thursday</h4>
            <Row className="bg-picture card-box">
            {this.state.thursday.map((recipe, index) => (

            <div class="col-2">
                                <div class="text-center card-box">
                                <div class="text-cemter">
                                    <Link to={{pathname:`/recipe/?spoon_id=${recipe.spoon_id}`, state:{recipe:recipe}}}>
                                        <img src={food} alt="" width="100p" class="text-center"/>
                                    </Link>
                                </div>
                
                                <div class="recipe-box-content">

                                <p className="text-center">{recipe.title}</p>      

                                <Link  to={{pathname:`/recipe/?spoon_id=${recipe.spoon_id}`, state:{recipe:recipe}}}><Button color="secondary" className="btn-block" type="button">View Details</Button></Link>
                                  
                                </div>

                                </div>
                            </div>
                            ))
                            }
            </Row>

            <h4>Friday</h4>
            <Row className="bg-picture card-box">
            {this.state.friday.map((recipe, index) => (

            <div class="col-2">
                                <div class="text-center card-box">
                                <div class="text-cemter">
                                    <Link to={{pathname:`/recipe/?spoon_id=${recipe.spoon_id}`, state:{recipe:recipe}}}>
                                        <img src={food} alt="" width="100p" class="text-center"/>
                                    </Link>
                                </div>
                
                                <div class="recipe-box-content">

                                <p className="text-center">{recipe.title}</p>      

                                <Link  to={{pathname:`/recipe/?spoon_id=${recipe.spoon_id}`, state:{recipe:recipe}}}><Button color="secondary" className="btn-block" type="button">View Details</Button></Link>
                                  
                                </div>

                                </div>
                            </div>
                            ))
                            }
            </Row>
            
            <h4>Saturday</h4>
            <Row className="bg-picture card-box">
            {this.state.saturday.map((recipe, index) => (

            <div class="col-2">
                                <div class="text-center card-box">
                                <div class="text-cemter">
                                    <Link to={{pathname:`/recipe/?spoon_id=${recipe.spoon_id}`, state:{recipe:recipe}}}>
                                        <img src={food} alt="" width="100p" class="text-center"/>
                                    </Link>
                                </div>
                
                                <div class="recipe-box-content">

                                <p className="text-center">{recipe.title}</p>      

                                <Link  to={{pathname:`/recipe/?spoon_id=${recipe.spoon_id}`, state:{recipe:recipe}}}><Button color="secondary" className="btn-block" type="button">View Details</Button></Link>
                                  
                                </div>

                                </div>
                            </div>
                            ))
                            }
            </Row>
            
            <h4>Sunday</h4>
            <Row className="bg-picture card-box">
            {this.state.sunday.map((recipe, index) => (

            <div class="col-2">
                                <div class="text-center card-box">
                                <div class="text-cemter">
                                    <Link to={{pathname:`/recipe/?spoon_id=${recipe.spoon_id}`, state:{recipe:recipe}}}>
                                        <img src={food} alt="" width="100p" class="text-center"/>
                                    </Link>
                                </div>
                
                                <div class="recipe-box-content">

                                <p className="text-center">{recipe.title}</p>      

                                <Link  to={{pathname:`/recipe/?spoon_id=${recipe.spoon_id}`, state:{recipe:recipe}}}><Button color="secondary" className="btn-block" type="button">View Details</Button></Link>
                                  
                                </div>

                                </div>
                            </div>
                            ))
                            }
            </Row>
        </div>
        );

    }
}


export default connect()(Planner);