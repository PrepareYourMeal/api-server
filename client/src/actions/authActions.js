import axios from "axios";

import { USER_LOADED, LOADING_FAILED, LOGOUT, LOGIN_SUCCESS, LOGIN_FAIL } from "./types";
import setAuthToken from '../utils/setAuthToken';

export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get('/auth/current_user');
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: LOADING_FAILED
    });
  }
}

export const logout = () => async dispatch => {
  await axios.get('/auth/logout');
  dispatch({
      type: LOGOUT
  });
}

export const googleLogin = () => async dispatch => {
  try {
    await axios.get('/auth/google');
    dispatch({
      type: LOGIN_SUCCESS
    });
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL
    });
  }
}
// export const setCurrentUser = () => dispatch => {
//   axios
//     .get("/auth/current_user")
//     .then(res => {
//       this.setState({ profile: res.data });
//       console.log(res.data);
//       dispatch({
//         type: SET_CURRENT_USER,
//         payload: res.data
//       });
//     })
//     .catch(err => {
//       console.log(err.response);
//     });
// };

// export const getCurrentUser = () => dispatch => {
//     axios.get("")
// }