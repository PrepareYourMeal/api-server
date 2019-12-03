import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom'

import { Container, Row, Col, Card, CardBody, Label, FormGroup, Button, Alert } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';

import logo from '../../assets/images/logos/Logo_v1.png';
import { loginUser } from '../../redux/actions';
import { isUserAuthenticated } from '../../helpers/authUtils';
import Loader from '../../components/Loader';

class Login extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        this.handleValidSubmit = this.handleValidSubmit.bind(this);
        this.state = {
            email: '',
            password: ''
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    componentDidMount() {
        this._isMounted = true;
        document.body.classList.add('authentication-bg');
    }

    componentWillUnmount() {
        this._isMounted = false;
        document.body.classList.remove('authentication-bg');
    }

    handleValidSubmit = (event, values) => {
        this.props.loginUser(values.email, values.password, this.props.history);
    }

    renderRedirectToRoot = () => {
        const isAuthTokenValid = isUserAuthenticated();
        if (isAuthTokenValid) {
            return <Redirect to='/' />
        }
    }

    render() {
        const isAuthTokenValid = isUserAuthenticated();
        return (
            <React.Fragment>

                {this.renderRedirectToRoot()}

                {(this._isMounted || !isAuthTokenValid) && <React.Fragment>

                    <div className="account-pages mt-5 mb-5">
                        <Container>
                            <Row className="justify-content-center">
                                <Col md={8} lg={6} xl={5} >
                                    <div className="text-center">
                                        <Link to="/"> 
                                        { /* logo */}
                                            <span><img src={logo} alt="" height="40" /></span>  
                                            <p></p>
                                        </Link>
                                    </div>
                                    <Card>
                                        <CardBody className="p-4 position-relative">
                                            { /* preloader */}
                                            {this.props.loading && <Loader />}

                                            <div className="text-center mb-4">
                                                <h4 className="text-uppercase mt-0">Sign In</h4>
                                            </div>

                                            {this.props.error && <Alert color="danger" isOpen={this.props.error ? true : false}>
                                                <div>{this.props.error}</div>
                                            </Alert>}
                                            <div class="text-center">
                                            <Button>
                                                <a href="/auth/google" class="button">
                                                    <div>
                                                        <span class="svgIcon t-popup-svg">
                                                        <svg
                                                            class="svgIcon-use"
                                                            width="25"
                                                            height="37"
                                                            viewBox="0 0 25 25"
                                                        >
                                                            <g fill="none" fill-rule="evenodd">
                                                            <path
                                                                d="M20.66 12.693c0-.603-.054-1.182-.155-1.738H12.5v3.287h4.575a3.91 3.91 0 0 1-1.697 2.566v2.133h2.747c1.608-1.48 2.535-3.65 2.535-6.24z"
                                                                fill="#4285F4"
                                                            />
                                                            <path
                                                                d="M12.5 21c2.295 0 4.22-.76 5.625-2.06l-2.747-2.132c-.76.51-1.734.81-2.878.81-2.214 0-4.088-1.494-4.756-3.503h-2.84v2.202A8.498 8.498 0 0 0 12.5 21z"
                                                                fill="#34A853"
                                                            />
                                                            <path
                                                                d="M7.744 14.115c-.17-.51-.267-1.055-.267-1.615s.097-1.105.267-1.615V8.683h-2.84A8.488 8.488 0 0 0 4 12.5c0 1.372.328 2.67.904 3.817l2.84-2.202z"
                                                                fill="#FBBC05"
                                                            />
                                                            <path
                                                                d="M12.5 7.38c1.248 0 2.368.43 3.25 1.272l2.437-2.438C16.715 4.842 14.79 4 12.5 4a8.497 8.497 0 0 0-7.596 4.683l2.84 2.202c.668-2.01 2.542-3.504 4.756-3.504z"
                                                                fill="#EA4335"
                                                            />
                                                            </g>
                                                        </svg>
                                                        </span>
                                                        <span class="button-label">Sign in with Google</span>
                                                    </div>
                                                </a>
                                            </Button>
                                            
                                            </div>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>

                            <Row className="mt-1">
                                <Col className="col-12 text-center">
                                    <p><Link to="/forget-password" className="text-light ml-1"><i className="fa fa-lock mr-1"></i>Forgot your password?</Link></p>
                                    <p className="text-light">Don't have an account? <Link to="/register" className="text-light ml-1"><b>Register</b></Link></p>
                                </Col>
                            </Row>

                        </Container>
                    </div>
                </React.Fragment>}
            </React.Fragment>
        )
    }
}


const mapStateToProps = (state) => {
    const { user, loading, error } = state.Auth;
    return { user, loading, error };
};

export default connect(mapStateToProps, { loginUser })(Login);