import jwtDecode from 'jwt-decode';
import { Cookies } from "react-cookie";
import axios from 'axios';

// Check if user is authenticated
const isUserAuthenticated = () => {
    const user = getLoggedInUser();
    if (!user) {
        return false;
    }
    const decoded = jwtDecode(user.token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
        console.warn('access token expired');
        return false;
    }
    else {
        return true;
    }
}

const getLoggedInUser = () => {
    const token = localStorage.getItem("accessJWT");
    if (token) {
        const user = axios.get(`/api/users/?token=${token}`, { withCredentials: true });
        return user.data;
    } else {
        return null;
    }

    
    // const cookies = new Cookies(); 
    // const user = cookies.get("user");
    // return user ? (typeof(user) == 'object'? user: JSON.parse(user)) : null;
}

export { isUserAuthenticated, getLoggedInUser };