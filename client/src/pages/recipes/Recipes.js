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


import Pagination from '../../components/Pagination';
import {getLoggedInUser} from '../../helpers/authUtils';
import Loader from '../../components/Loader';
import '../../assets/home_page/css/style.css';
import '../../assets/home_page/css/colors/green.css';

class Recipes extends Component {

    constructor(props) {
        super(props);


        this.state = {
            user: {},
            query: '',
            message: '',
            allRecipes: [],
            pageOfItems: [],
            isAuthenticated: false
        };

        this.onChangePage = this.onChangePage.bind(this);
        this.handleOnInputChange = this.handleOnInputChange.bind(this);
    }

    onChangePage(pageOfItems) {
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems });
    }


    handleOnInputChange = ( event ) => {
        const query = event.target.value;

        const url = "/api/recipes"
        axios.get(url)
            .then(response => response.data)
            .then((data) => {
            console.log(data)
            var recipes = data;
            
            const searchRecipe = recipes.filter(function (item) {
            return item.title.includes(query) || item.ingredients.includes(query);
            });

        if ( ! query ) {
            this.setState({ query, message: '', allRecipes: recipes })
        } else {
            this.setState( { query, message: '', allRecipes: searchRecipe });
        }
        console.log(this.state.allRecipes);
        this.props.history.push('/recipes');
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

        // const url =`https://stove-and-oven-stagging.herokuapp.com/api/recipes?size=${size}&pageNo=${pageNo}`;

        const url = '/api/recipes';
        axios.get(url).then(response => response.data)
        .then((data) => {
            console.log(data)
            this.setState({ allRecipes: data })
            console.log(this.state.allRecipes)
            // this.props.history.push('/recipes');

        })
        
    }

    
    render() {

        const { query } = this.state;

        return (
            <React.Fragment>
           <div className="">
           <div class="row">
                    <div class="col">
                    <div className="page-title-box">
                        <h1 className="page-title">My Recipes</h1>
                    </div>
                    <input 
                      type="text" 
                      className="form-control" 
                      name="query"
                      value={ query }
                      id="search-input"
                      placeholder="Search..."
                      onChange={this.handleOnInputChange}
                      />
                    </div>
                </div>
  
                <div class="isotope">
            <div class="row">
            {this.state.pageOfItems.map((recipe, index) => (

                <div class="col-3">
                    <div class="card">
                    <div class="thumbnail-holder">
                        <Link to={{pathname:`/recipe/?spoon_id=${recipe.spoon_id}`, state:{recipe:recipe}}}>
                            <img src={recipe.imageUrl} alt="" />
                            <div class="hover-cover"></div>
                            <div class="hover-icon">View Recipe</div>
                        </Link>
                    </div>
    
                    <div class="recipe-box-content">
                        <h3><Link to={{pathname:`/recipe/?spoon_id=${recipe.spoon_id}`, state:{recipe:recipe}}}>{ recipe.title.length < 20 ? `${recipe.title}` : `${recipe.title.substring(0, 25)}...` }</Link></h3>
    
                        <div class="rating five-stars">
                            <div class="star-rating"></div>
                            <div class="star-bg"></div>
                        </div>

                        <div class="recipe-meta"><i class="fa fa-user"></i>{recipe.servings}   servings</div>
                        <div class="recipe-meta"><i class="fa fa-clock-o"></i>{recipe.readyInMinutes}  min</div>
    
                        <div className="margin-bottom-40"></div>

                    </div>
                    </div>
                </div>

             
            ))
        }  
        </div>
        <Pagination items={this.state.allRecipes} onChangePage={this.onChangePage} />

        </div>

              
                  </div>
              </React.Fragment>
 
        )

    }
}

export default connect()(Recipes);
