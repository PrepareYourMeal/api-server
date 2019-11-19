import React, {
    Component,
    useEffect,
    useState
} from "react";
import queryString from 'query-string';
import axios from 'axios';

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            isAuthenticated: false, 
          }
    }

    async componentWillMount() {
        console.log("1")
        let query = queryString.parse(this.props.location.search);
        if (query.token) {
            console.log("2")

            let userId = query.userId;
            let token = query.token;
            window.localStorage.setItem("accessJWT", token);
            console.log("3")

            const user = await axios.get(`/api/users/?token=${token}`, { withCredentials: true });
            console.log("4")
            console.log(user);
            this.setState({ user: user.data, isAuthenticated: true });
            // this.setState({ user: user, isAuthenticated: true, name: name });
            this.props.authenticateUser(user.data);
            console.log("5")

            this.props.history.push('/dashboard');

        }
    }

    render () {
        return (
            <div>
                <h1>Dashboard</h1>
            </div>

        );
    }
}

// const Dashboard = props => {
//     useEffect(() => {
//         effect
//         return () => {
//             cleanup
//         };
//     }, [input])
//     return (
//         <div>
//             <div>
//                 <h1>Dashboard</h1>
//                 <h1>Status: {props.isAuthenticated}</h1>
//             </div>
//         </div>
//     );
// };

// export default Dashboard;