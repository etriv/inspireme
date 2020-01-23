import React from 'react';
import './sign-in.scss';
import FormInput from '../form-input/form-input';
import CustomButton from '../custom-button/custom-button';
import {main_colors5 as mainColors} from '../../modules/main-colors';
import { checkUserSignInFromDB } from '../../modules/db-manager';

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: ''
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const { password, userName } = this.state;

        // TODO: Check if the form's input is OK to continue with.
        // (check official React ways)
        // if (false) {
        //     alert("Something is wrong with the form's input!");
        //     return;
        // }

        try {
            // Checking if user's credentials match.
            // TODO: Uppon success, direct user to the HomePage and update Navigation.
            // TODO: Uppon failure, present a specific error on screen.
            checkUserSignInFromDB(userName, password)
                .then(user => {
                    console.log('Successfuly signed-in:', user);
                    this.setState({userName: '', password: ''});
                    console.log(this.props);
                    this.props.onSuccessfulSignIn(user.id, user.name);
                })
                .catch(error => {
                    console.log("Sign-in failed:", error);
                });
            
            // TODO: Update app's signed in user state (affects Navigation).
            //this.props.loadUser(user)
            //this.props.onRouteChange('home'); 
        }
        catch (error) {
            console.error(error);
        }
    }

    handleChange = (event) => {
        const {name, value} = event.target;

        this.setState({[name]: value});
    }

    render() {
        const containerClassNames = 'sign-in-area'
            + (this.props.className ? ' ' + this.props.className : '');
        return (
            <div className={containerClassNames}>
                <h3>Sign in to an existing account</h3>
                <p>Sign in with your user name and password.</p>
                <form className="sign-in-form" onSubmit={this.handleSubmit}>
                    <FormInput name="userName" type="text"
                        value={this.state.userName} required
                        handleChange={this.handleChange}
                        label="User Name" />
                    <FormInput name="password" type="password"
                        value={this.state.password} required
                        handleChange={this.handleChange}
                        label="Password" />

                    <CustomButton className="submit-btn" type="submit"
                    bgColor={mainColors.c1}                     // Only HEX color
                    foreColor='white'
                    onClick={this.handleSubmit} >SIGN IN</CustomButton>
                </form>
            </div>
        );
    }
}

export default SignIn;