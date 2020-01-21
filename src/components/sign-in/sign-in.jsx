import React from 'react';
import './sign-in.scss';
import FormInput from '../form-input/form-input';
import CustomButton from '../custom-button/custom-button';
import {main_colors5 as mainColors} from '../../modules/main-colors';

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

        this.setState({userName: '', password: ''});
    }

    handleChange = (event) => {
        const {name, value} = event.target;

        this.setState({[name]: value});
    }

    render() {
        return (
            <div className="sign-in-area">
                <h3>I already have an account</h3>
                <p>Sign in with your user name and password.</p>
                <form className="sign-in-form" onSubmit={this.handleSubmit}>
                    <FormInput name="userName" type="text"
                        value={this.state.userName} required
                        handleChange={this.handleChange}
                        label="User name" />
                    <FormInput name="password" type="password"
                        value={this.state.password} required
                        handleChange={this.handleChange}
                        label="Password" />

                    <CustomButton className="submit-btn" type="submit"
                    bgColor={mainColors.c4}                     // Only HEX color
                    foreColor='white'
                    onClick={this.handleSubmit} >SIGN IN</CustomButton>
                </form>
            </div>
        );
    }
}

export default SignIn;