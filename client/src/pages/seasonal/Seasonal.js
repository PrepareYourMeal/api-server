import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card, CardBody, CardTitle, Button } from 'reactstrap';
import '../../assets/home_page/css/style.css';
import '../../assets/home_page/css/colors/green.css';
import Loader from '../../components/Loader';
import axios from 'axios';
import food from '../../assets/images/food.png';
import Pagination from '../../components/Pagination';
import '../../assets/home_page/css/style.css';


class Seasonal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            ingredients: [],
            recipes: [],
            isAuthenticated: false,
            query: '',
            message: '',
            pageOfItems: [],
            allIngredients: []
        };

        this.onChangePage = this.onChangePage.bind(this);
        this.handleOnInputChange = this.handleOnInputChange.bind(this);
    }

    onChangePage(pageOfItems) {
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems });
    }

    handleOnInputChange = (event) => {
        let token = window.localStorage.getItem('accessJWT')

        const query = event.target.value;

        const url = `/api/users/${token}/inventory`;
        axios.get(url)
            .then(response => response.data)
            .then((data) => {
                console.log(data)
                var ingredients = data;

                const searchIngredients = ingredients.filter(function (item) {
                    return item.title.includes(query) || item.ingredients.includes(query);
                });

                if (!query) {
                    this.setState({ query, message: '', allIngredients: ingredients })
                } else {
                    this.setState({ query, message: '', allIngredients: searchIngredients });
                }
                console.log(this.state.allIngredients);
                this.props.history.push('/ingredients');
            })

    };

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

        const url ='/api/ingredients';
        axios.get(url, { withCredentials: true }).then(response => response.data)
        .then((data) => {
            console.log(data)
          this.setState({ allIngredients: data })
          console.log(this.state.allIngredients)
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

        const { query } = this.state;

        return (

            <React.Fragment>
                <div className="">
                    { /* preloader */}
                    {this.props.loading && <Loader />}

                    <Row>
                        <Col lg={12}>
                            <div className="page-title-box">

                                <h4 className="page-title">Ingredients</h4>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                    {this.state.pageOfItems.map((ingredient, index) => (
                            <div class="col-sm-2 col-md-2">
                            <div class="card-box widget-user">
                                <div>
                                    <div class="avatar-lg float-left mr-2">
                                        <img src={food} class="img-fluid rounded-circle" alt="user"/>
                                    </div>
                                    <div class="wid-u-info">
                                        <p class="text-muted mb-1 font-13 text-truncate">{ingredient.name}</p>
                                        <Button onClick={() => this.addIngredient(ingredient)}>Add</Button>
                                        </div>
                                </div>
                            </div>
                        </div>
                        ))}
                    </Row>
                </div>
                <Pagination items={this.state.allIngredients} onChangePage={this.onChangePage} />

            </React.Fragment>
        )
    }
}


export default connect()(Seasonal);