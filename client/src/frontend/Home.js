import React, { Fragment, useEffect, Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../actions/profileActions';
import PropTypes from 'prop-types'
import { stat } from 'fs';
import Spinner from './spinner/Spinner';
import queryString from 'query-string';
import axios from 'axios';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            isAuthenticated: false,
        }
        console.log(props)
        console.log(props.children)
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
            this.props.authenticate(user.data);
            console.log("5")
            
            this.props.history.push('/home');
      
        }
    }

    render () {
        return (
            // <Fragment>
                <div className="container">
                    <div className="row">
                    <h1>Profile Home</h1>
                    {this.state.isAuthenticated ? <h1>{this.state.user.name}</h1>: <h1>Hello</h1>} 
                    </div>


        {/* <h1>{this.state.user.name}</h1> */}

                </div>

            // </Fragment>
        )
    }
}

// Home.propTypes = {
//     // user: React.PropTypes.object,
//     authenticate: React.PropTypes.func
// }

export default Home;

// const Home = ({ getCurrentProfile, auth: { user }, profile: { profile, loading } }) => {
//     useEffect(() => {
//         getCurrentProfile();
//     }, []);
//     return loading && profile == null ? <Spinner></Spinner> : <Fragment>
//         <h1 className="large text-primary">Home Page</h1>
//         <p className="lead">
//             Welcome { user && user.name }
//         </p>
//         {profile !== null ? <Fragment>
//             <p>You have not setup a profile, please add some info...</p>
//             <Link to='create-profile' className="btn btn-primary my-1">Create Profile</Link>
//         </Fragment> : <Fragment></Fragment>}
//     </Fragment>;
// };

// Home.propTypes = {
//     getCurrentProfile: PropTypes.func.isRequired,
//     auth: PropTypes.object.isRequired,
//     profile: PropTypes.object.isRequired
// };

// const mapStateToProps = state => ({
//     auth: state.auth,
//     profile: state.profile
// });

// export default connect(mapStateToProps, { getCurrentProfile })(Home);