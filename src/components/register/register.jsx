import React from 'react';
import './register.scss';
import FormInput from '../form-input/form-input';
import CustomButton from '../custom-button/custom-button';
import { mainColors5 as mainColors } from '../../modules/main-colors';
import { registerUserToDB } from '../../modules/server-manager';
import { Link } from 'react-router-dom';
import { onlyAlphaNum } from '../../modules/helpers';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            confirmPassword: '',
            fetching: false,
            errUserName: '',
            errPassword: '',
            errConfirmPassword: '',
            serverError: ''
        }
    }

    checkInput = (userName, password, confirmPassword) => {
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
        else if (!onlyAlphaNum(password)) {
            this.setState({ errPassword: 'Should contain only letters and numbers' });
            goodCheck = false;
        }
        else { this.setState({ errPassword: '' }); }

        // Password Confirm check
        if (password !== confirmPassword) {
            this.setState({ errConfirmPassword: "Passwords don't match" });
            goodCheck = false;
        }
        else { this.setState({ errConfirmPassword: "" }); }

        return goodCheck;
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        const { password, confirmPassword, userName } = this.state;

        // Init server message
        this.setState({ serverError: '' });

        // If there's a problem with the input, don't fetch from server
        if (!this.checkInput(userName, password, confirmPassword)) { return; }

        this.setState({ fetching: true });

        try {
            // Creating a new user in DB and returning his new id and name.
            // TODO: Uppon success, redirect user to the signin panel.
            // TODO: Uppon failure, present a specific error on screen.
            // TODO: Add "fetching" animation.
            registerUserToDB(userName, password)
                .then(regUser => {
                    console.log('Successfuly registered:', regUser);
                    this.props.handleSuccess();
                    // this.setState({ userName: '', password: '', confirmPassword: '' });
                })
                .catch(error => {
                    console.log("Register failed:", error);
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
        const containerClassNames = 'register-area'
            + (this.props.className ? ' ' + this.props.className : '');
        return (
            <div className={containerClassNames}>
                <h3>Register</h3>
                <p>Register with a new user name and password.</p>
                <form className="register-form" onSubmit={this.handleSubmit}>
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
                    <FormInput name="confirmPassword" type="password"
                        value={this.state.confirmPassword} required
                        onChange={this.handleChange}
                        label="Confirm Password"
                        errorMsg={this.state.errConfirmPassword}
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
                        REGISTER
                    </CustomButton>
                    <p className="toggle-text">Already have an account?&nbsp;
                            <Link to='/sign-in'
                            className="link-text">
                            Sign-in
                            </Link>
                    </p>
                </form>
            </div>
        )
    }
}

export default Register;