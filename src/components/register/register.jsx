import React from 'react';
import './register.scss';
import FormInput from '../form-input/form-input';
import CustomButton from '../custom-button/custom-button';
import { main_colors5 as mainColors } from '../../modules/main-colors';

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

        const { password, confirmPassword } = this.state;

        if (password !== confirmPassword) {
            alert("Passwords don't match!");
            return;
        }

        try {
            // Create new user in the DB and get back his user_id to the app.
            // This will be done with a function from props (App) that will
            // also update the currentUserId / currentUserName.
            // this.props.registerNewUserAndPassword(userName, password);
            //      this.props.loginUserAndPassword(userName, password);

            this.setState({ userName: '', password: '', confirmPassword: '' });
        }
        catch(error) {
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
                <h3>Register a new account</h3>
                <p>Register with a new user name and password.</p>
                <form className="register-form" onSubmit={this.handleSubmit}>
                    <FormInput name="userName" type="text"
                        value={this.state.userName} required
                        handleChange={this.handleChange}
                        label="User name" />
                    <FormInput name="password" type="password"
                        value={this.state.password} required
                        handleChange={this.handleChange}
                        label="Password" />
                    <FormInput name="confirmPassword" type="password"
                        value={this.state.confirmPassword} required
                        handleChange={this.handleChange}
                        label="Confirm password" />

                    <CustomButton className="submit-btn" type="submit"
                        bgColor={mainColors.c1}                     // Only HEX color
                        foreColor='white'
                        onClick={this.handleSubmit}>REGISTER</CustomButton>
                </form>
            </div>
        )
    }
}

export default Register;