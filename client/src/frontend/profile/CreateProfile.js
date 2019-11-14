import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
// import { setAlert } from '../../actions/alert';
import { createProfile } from '../../actions/profileActions';
import PropTypes from 'prop-types';
import axios from 'axios'
import queryString from "query-string";
import setAuthToken from '../../utils/setAuthToken';

class CreateProfile extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          userId: null,
          tags: ''
      };
    }
  
    async componentDidMount() {
      
      let query = queryString.parse(this.props.location.search);
      if (query.token) {
        window.localStorage.setItem("jwt", query.token);
        setAuthToken(query.token)
        this.state.userId = query.id;

        const url = 'http://localhost:5000/'

        // this.props.history.push("/profile");
        // await this.props.setCurrentUser();
      }
      
      // if (!this.props.auth.isAuthenticated) {
      //   this.props.history.push("/");
      // }
    }

    onChange(e) {
        this.setState({ tags: e.target.value });
    }

    async onSubmit(e) {
        e.preventDefault();
        const url = '/api/profile';
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem("jwt")
            }
        }
    
        const body = JSON.stringify({
            tags: this.state.tags
        });

        try {
            const res = await axios.post('/api/profile', body, config);
            console.log(res.data);

        } catch (err) {
            console.log(`Error: ${err}`)
        }
    }

    render() {
        return (
            <Fragment>
            <h1 className="large text-primary">Tags</h1>
            <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
            <form className="form" onSubmit={e => this.onSubmit(e)}>
                <div className="form-group">
                    <input
                    type="text"
                    placeholder="Tags"
                    name="tags"
                    value={this.state.tags}
                    onChange={e => this.onChange(e)}
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Tags" />
            </form>
        </Fragment>
        )

    }
  }

export default CreateProfile;
// const CreateProfile = ({ createProfile, isAuthenticated }) => {
//     // async componentDidMount() {
    
//     //     let query = queryString.parse(this.props.location.search);
//     //     if (query.token) {
//     //       window.localStorage.setItem("jwt", query.token);
//     //       await this.props.loadUser();
//     //       // this.props.history.push("/profile");
//     //       // await this.props.setCurrentUser();
//     //     }
//     // }
    
//     const [formData, setFormData] = useState({
//         tags: '',
//     });

//     const { tags } = formData;

//     const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

//     const onSubmit = async e => {
//         e.preventDefault();
//         createProfile(tags);
//         // if (password !== password2) {
//         //     setAlert('Passwords do not match', 'danger');
//         // } else {
//         //     register({
//         //         name,
//         //         email,
//         //         password
//         //     });
//         // }


//     };

//     // if (isAuthenticated) {
//     //     return <Redirect to='/dashboard' />
//     // }

//     return (
//         <Fragment>
//             <h1 className="large text-primary">Tags</h1>
//             <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
//             <form className="form" onSubmit={e => onSubmit(e)}>
//                 <div className="form-group">
//                     <input
//                     type="text"
//                     placeholder="Tags"
//                     name="tags"
//                     value={tags}
//                     onChange={e => onChange(e)}
//                     />
//                 </div>
//                 <input type="submit" className="btn btn-primary" value="Tags" />
//             </form>
//         </Fragment>
//     );
// };

// CreateProfile.propTypes = {
//     // setAlert: PropTypes.func.isRequired,
//     createProfile: PropTypes.func.isRequired,
//     isAuthenticated: PropTypes.bool
// }

// const mapStateToProps = state => ({
//     isAuthenticated: state.auth.isAuthenticated
// });

// export default connect(mapStateToProps, { createProfile })(CreateProfile);





// import React from "react";
// import { connect } from "react-redux";
// import queryString from "query-string";
// import { setCurrentUser } from "../../actions/authActions";





// const mapStateToProps = state => ({
//   auth: state.auth
// });

// export default connect(
//   mapStateToProps,
//   { setCurrentUser }
// )(Profile);