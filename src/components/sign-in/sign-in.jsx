import React from 'react';
import './sign-in.scss';
import FormInput from '../form-input/form-input';
import CustomButton from '../custom-button/custom-button';
import { mainColors5 as mainColors } from '../../modules/main-colors';
import { checkUserSignInFromDB } from '../../modules/server-manager';
import { Link } from 'react-router-dom';
import { onlyAlphaNum } from '../../modules/helpers';

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            fetching: false,
            errUserName: '',
            errPassword: '',
            serverError: ''
        }
    }

    checkInput = (userName, password) => {
        let goodCheck = true;

        // User Name checks
        if (userName.length < 2 || userName.length > 12) {
            this.setState({ errUserName: 'Should be between 2 and 12 charcters' });
            goodCheck = false;
        }
        else if (!onlyAlphaNum(userName)) {
            this.setState({ errUserName: 'Should contain only letters and numbers' });
            goodCheck = false;
        }
        else { this.setState({ errUserName: '' }); }

        // Passwords Checks
        if (password.length < 6 || password.length > 20) {
            this.setState({ errPassword: 'Should be between 6 and 20 charcters' });
            goodCheck = false;
        }
        else { this.setState({ errPassword: '' }); }

        return goodCheck;
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const { password, userName } = this.state;

        // If there's a problem with the input, don't fetch from server:
        // if (!this.checkInput(userName, password)) { return; }
        // TODO: comment-in the input check above when done developing.

        // Init server message
        this.setState({ serverError: '', fetching: true });

        try {
            checkUserSignInFromDB(userName, password)
                .then(user => {
                    console.log('Successfuly signed-in:', user);
                    this.props.onSuccessfulSignIn(user.id, user.name); 
                })
                .catch(error => {
                    console.log("Sign-in failed:", error);
                    this.setState({ serverError: error.message, fetching: false });
                });
        }
        catch (error) {
            console.error(error);
            this.setState({ fetching: false });
        }
    }

    handleChange = (event) => {
        const { name, value } = event.target;

        this.setState({ [name]: value });
    }

    render() {
        const containerClassNames = 'sign-in-area'
            + (this.props.className ? ' ' + this.props.className : '');
        return (
            <div className={containerClassNames}>
                <h3>Sign in</h3>
                <p>Sign in with your user name and password.</p>
                <form className="sign-in-form" onSubmit={this.handleSubmit}>
                    <FormInput name="userName" type="text"
                        value={this.state.userName} required
                        onChange={this.handleChange}
                        label="User Name"
                        errorMsg={this.state.errUserName}
                        autoComplete="off" />
                    <FormInput name="password" type="password"
                        value={this.state.password} required
                        onChange={this.handleChange}
                        label="Password"
                        errorMsg={this.state.errPassword}
                        autoComplete="off" />

                    <div className="server-error-container">
                        {this.state.serverError !== '' ?
                            <div className="server-error">{this.state.serverError}</div>
                            : null}
                    </div>

                    <CustomButton className="submit-btn" type="submit"
                        bgColor={mainColors.c1}                     // Only HEX color
                        foreColor='white'
                        onClick={this.handleSubmit}
                        disabled={this.state.fetching}>
                        SIGN IN
                    </CustomButton>
                    <p className="toggle-text">Don't have an account?&nbsp;
                        <Link to='/register'
                            className="link-text">
                            Register
                        </Link>
                    </p>
                </form>
            </div>
        );
    }
}

export default SignIn;