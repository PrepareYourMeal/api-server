import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { UncontrolledButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle, Button } from 'reactstrap';
import axios from 'axios';

import '../../assets/home_page/css/style.css';
import '../../assets/home_page/css/colors/green.css';
import { getLoggedInUser } from '../../helpers/authUtils';
import Loader from '../../components/Loader';
import Lottie from "react-lottie";

import * as animationDataA from '../../assets/json/TwitterHeart.json';

class RecipeDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: getLoggedInUser(),
      activeFirstTab: "1",
      activeRecipe: []
    };
  }

  addFavourite(recipe) {
    let token = window.localStorage.getItem('accessJWT')
    const url = `/api/users/${token}/favourites`;
    const data = {
        recipe: recipe
    }
    axios.put(url, data, {
        withCredentials: true,
        headers: {
            "Content-Type": "application/json"
        }
    }).then(r => console.log(r.status))
        .catch(e => console.log(e));
}

addMonday(recipe) {
    let token = window.localStorage.getItem('accessJWT')
    const url = `/api/users/${token}/planner/monday`;
    const data = {
        recipe: recipe
    }
    axios.put(url, data, {
        withCredentials: true,
        headers: {
            "Content-Type": "application/json"
        }
    }).then(r => console.log(r.status))
        .catch(e => console.log(e));
}

addTuesday(recipe) {
    let token = window.localStorage.getItem('accessJWT')
    const url = `/api/users/${token}/planner/tuesday`;
    const data = {
        recipe: recipe
    }
    axios.put(url, data, {
        withCredentials: true,
        headers: {
            "Content-Type": "application/json"
        }
    }).then(r => console.log(r.status))
        .catch(e => console.log(e));
}

addWednesday(recipe) {
    let token = window.localStorage.getItem('accessJWT')
    const url = `/api/users/${token}/planner/wednesday`;
    const data = {
        recipe: recipe
    }
    axios.put(url, data, {
        withCredentials: true,
        headers: {
            "Content-Type": "application/json"
        }
    }).then(r => console.log(r.status))
        .catch(e => console.log(e));
}

addThursday(recipe) {
    let token = window.localStorage.getItem('accessJWT')
    const url = `/api/users/${token}/planner/thursday`;
    const data = {
        recipe: recipe
    }
    axios.put(url, data, {
        withCredentials: true,
        headers: {
            "Content-Type": "application/json"
        }
    }).then(r => console.log(r.status))
        .catch(e => console.log(e));
}

addFriday(recipe) {
    let token = window.localStorage.getItem('accessJWT')
    const url = `/api/users/${token}/planner/friday`;
    const data = {
        recipe: recipe
    }
    axios.put(url, data, {
        withCredentials: true,
        headers: {
            "Content-Type": "application/json"
        }
    }).then(r => console.log(r.status))
        .catch(e => console.log(e));
}

addSaturday(recipe) {
    let token = window.localStorage.getItem('accessJWT')
    const url = `/api/users/${token}/planner/saturday`;
    const data = {
        recipe: recipe
    }
    axios.put(url, data, {
        withCredentials: true,
        headers: {
            "Content-Type": "application/json"
        }
    }).then(r => console.log(r.status))
        .catch(e => console.log(e));
}

addSunday(recipe) {
    let token = window.localStorage.getItem('accessJWT')
    const url = `/api/users/${token}/planner/sunday`;
    const data = {
        recipe: recipe
    }
    axios.put(url, data, {
        withCredentials: true,
        headers: {
            "Content-Type": "application/json"
        }
    }).then(r => console.log(r.status))
        .catch(e => console.log(e));
}

  componentDidMount = () => {
    // let query = queryString.parse(this.props.location.search);
    // console.log(query)
    // const url =`/api/recipe/?spoon_id=${query.spoon_id}`;
    // axios.get(url).then(response => response.data)
    // .then((data) => {
    //   console.log(data)
    //  })
    // console.log(this.props.location.pathname.split("/")[2])
    // console.log(this.props.location.state)

    this.setState({ activeRecipe: this.props.location.state })
    console.log(this.state)
    // setTimeout(() => {
    //     console.log(this.state.activeRecipe.recipe.title)
    // }, 200);

  }



  render() {

    return (

      <React.Fragment>

        {this.props.loading && <Loader />}

        <div className="container" itemScope>
          {/* Recipe */}

          <div className="twelve columns">

            <div className="alignment">

              {/* Header */}
              <section className="recipe-header">
                <div className="margin-top-100" />

                <div className="title-alignment">


                  <h2>{this.state.activeRecipe.recipe ? this.state.activeRecipe.recipe.title : "Title"}</h2>
                  <div className="rating five-stars">
                    <div className="star-rating" />
                    <div className="star-bg" />
                  </div>
                  <span>
                    <a href="#reviews">(4 reviews)</a>
                  </span>
                </div>
              </section>
              {/* Slider */}
              <div>
                <img
                  itemProp="image"
                  className="rsImg"
                  src={this.state.activeRecipe.recipe ? this.state.activeRecipe.recipe.imageUrl : "imageUrl"}
                  alt="image and caption"
                />

              </div>
              {/* Details */}
              <section className="recipe-details" itemProp="nutrition">
                <ul>
                  <li>
                    Serves: <strong itemProp="recipeYield"> {this.state.activeRecipe.recipe ? this.state.activeRecipe.recipe.servings : "servings"} people</strong>
                  </li>
                  <li>
                    Prep Time: <strong itemProp="prepTime"> {this.state.activeRecipe.recipe ? this.state.activeRecipe.recipe.readyInMinutes : "readyInMinutes"} mins</strong>
                  </li>
                  <li>
                    Cooking Time: <strong itemProp="cookTime">{this.state.activeRecipe.recipe ? this.state.activeRecipe.recipe.preparationMinutes : "preparationMinutes"} mins</strong>
                  </li>
                  <li>
                      <Button onClick={() => this.addFavourite(this.state.activeRecipe.recipe)}>
                      <i class="far fa-heart"></i>
                      </Button>
                  </li>
                  <li>
                    <UncontrolledButtonDropdown>
                      <DropdownToggle caret>
                        Add to Meal Plan
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem onClick={() => this.addMonday(this.state.activeRecipe.recipe)}>Monday</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem onClick={() => this.addTuesday(this.state.activeRecipe.recipe)}>Tuesday</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem onClick={() => this.addWednesday(this.state.activeRecipe.recipe)}>Wednesday</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem onClick={() => this.addThursday(this.state.activeRecipe.recipe)}>Thursday</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem onClick={() => this.addFriday(this.state.activeRecipe.recipe)}>Friday</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem onClick={() => this.addSaturday(this.state.activeRecipe.recipe)}>Saturday</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem onClick={() => this.addSunday(this.state.activeRecipe.recipe)}>Sunday</DropdownItem>
                      </DropdownMenu>
                    </UncontrolledButtonDropdown>

                  </li>
                  {/* <li>
                      Calories: <strong itemProp="calories">632 kcal</strong>
                    </li> */}
                </ul>

                <a href="javascript:window.print()" className="print">
                  <i className="fa fa-print" /> Print
                  </a>
                <div className="clearfix" />
              </section>
              <div className="margin-bottom-40"></div>

              <h3>Ingredients</h3>

              <ul className="ingredients">
                {
                  this.state.activeRecipe.recipe ? this.state.activeRecipe.recipe.ingredients.map((item) => {
                    return (
                      <li key={item._id}>

                        <input id="check" type="checkbox" name="check" value="check" />
                        <label itemProp="ingredients" htmlFor="check">
                          {item.quantity} {item.unit} {item.name}
                        </label>
                      </li>
                    )
                  }) : ""
                }
              </ul>


              {/* Directions */}
              <h3>Directions</h3>
              <ol className="directions" itemProp="recipeInstructions">
                {
                  this.state.activeRecipe.recipe ? this.state.activeRecipe.recipe.instructions.map((item) => {
                    return (
                      <li>

                        {item}
                      </li>
                    )
                  }) : ""
                }

              </ol>

              <div className="clearfix" />

              <div className="margin-bottom-40" />


              <div className="clearfix" />
              <div className="margin-top-15" />
            </div>
          </div>

        </div>
      </React.Fragment>
    );
  }
}


export default connect()(RecipeDetails);
