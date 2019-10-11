import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout } from "./layouts";

// Route Views
import Home from "./views/Home";
import UserProfile from "./views/UserProfile";
import AddNewRecipe from "./views/AddNewRecipe";
import Errors from "./views/Errors";
import Login from "./views/Login";
import Plans from "./views/Plans";
import Inventory from "./views/Inventory";
import Favorites from "./views/Favorites";
import Bob from "./views/Bob";

export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to="/home" />
  },
  {
    path: "/home",
    layout: DefaultLayout,
    component: Home
  },
  {
    path: "/user-profile",
    layout: DefaultLayout,
    component: UserProfile
  },
  {
    path: "/add-new-recipe",
    layout: DefaultLayout,
    component: AddNewRecipe
  },
  {
    path: "/errors",
    layout: DefaultLayout,
    component: Errors
  },
  {
    path: "/login",
    layout: DefaultLayout,
    component: Login
  },

  {
    path: "/plans",
    layout: DefaultLayout,
    component: Plans
  },
  {
    path: "/inventory",
    layout: DefaultLayout,
    component: Inventory
  },
  {
    path: "/favorites",
    layout: DefaultLayout,
    component: Plans
  },
  {
    path: "/bob",
    layout: DefaultLayout,
    component: Bob
  }
];
