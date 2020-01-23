import React from 'react';
import './register.scss';
import FormInput from '../form-input/form-input';
import CustomButton from '../custom-button/custom-button';
import { main_colors5 as mainColors } from '../../modules/main-colors';
import { registerUserToDB } from '../../modules/db-manager';
import { Link } from 'react-router-dom';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        const { password, confirmPassword, userName } = this.state;
        
        // TODO: More input checks (check official React ways)
        if (password !== confirmPassword) {
            alert("Passwords don't match!");
            return;
        }

        try {
            // Creating a new user in DB and returning his new id and name.
            // TODO: Uppon success, redirect user to the signin panel.
            // TODO: Uppon failure, present a specific error on screen.
            registerUserToDB(userName, password)
                .then(regUser => {
                    console.log('Successfuly registered:', regUser);
                })
                .catch(error => {
                    console.log("Register failed:", error);
                });

            this.setState({ userName: '', password: '', confirmPassword: '' });
        }
        catch (error) {
            console.error(error);
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
                        handleChange={this.handleChange}
                        label="User Name" />
                    <FormInput name="password" type="password"
                        value={this.state.password} required
                        handleChange={this.handleChange}
                        label="Password" />
                    <FormInput name="confirmPassword" type="password"
                        value={this.state.confirmPassword} required
                        handleChange={this.handleChange}
                        label="Confirm Password" />

                    <CustomButton className="submit-btn" type="submit"
                        bgColor={mainColors.c1}                     // Only HEX color
                        foreColor='white'
                        onClick={this.handleSubmit}>REGISTER</CustomButton>
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