import React, {Component, useEffect} from 'react';
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
import RecipeDetails from './RecipeDetails';
import queryString from 'query-string';


class Recipes extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: getLoggedInUser(),
            recipes: []
        };
    }

    // async componentDidMount() {
    //     console.log("Did Mount");
    //     // let query = queryString.parse(this.props.location.search);

    //   }

    componentWillMount() {
        console.log("Will mount")
        const url ='http://localhost:5000/api/recipes?size=12';
        axios.get(url).then(response => response.data)
        .then((data) => {
          this.setState({ recipes: data })
          console.log(this.state.recipes)
         })
      }
      
    render() {

        return (
            // <React.Fragment>
                <div className="container">
                    {/* preloader */}
                    {
                    this.props.loading && <Loader/>
                }

                    <Row>
                        <Col lg={12}>
                            <div className="page-title-box">

                                <h1 className="page-title">My Recipes</h1>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        {/* <Col lg={3}>
                            <Card>
                                <CardBody>
                                    Filter
                                </CardBody>
                            </Card>
                        </Col> */}
                        {this.state.recipes.map((recipe, index) => (

                        <Col lg={3} key={index}>
                            <CardDeck>

                                <Card className="gal-detail thumb card" height="60%">
                                    <CardImg alt="Card image cap" src={recipe.imageUrl} top width="100%"/>
                                    <CardBody>
                                        <p class="text-center"><small>{recipe.title}</small></p>                                        
                                        {/* <CardSubtitle>{recipe.servings}</CardSubtitle> */}
                                        {/* <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText> */}
                                        <Link to={{pathname:`/recipe/${recipe.spoon_id}`, state:{recipe:recipe}}}><Button color="secondary" className="btn-block" type="button">View Details</Button></Link>
                                       
                                    </CardBody>
                                </Card>
                                </CardDeck>
                        </Col>
                        ))
                        }
                    </Row>
                </div>
            
        )
    }
}



export default Recipes;
