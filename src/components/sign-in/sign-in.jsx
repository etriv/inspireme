import React from 'react';
import './sign-in.scss';
//import styled from 'styled-components';
//import {main_colors5 as main_colors, shadeHexColor} from '../../modules/main-colors';

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user_name: '',
            password: ''
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();

        this.setState({name: '', password: ''});
    }

    handleChange = (event) => {
        const {name, value} = event.target;

        this.setState({[name]: value});
    }

    render() {
        return (
            <div className="sign-in">
                <h3>I already have an account</h3>
                <p>Sign in with your user name and password</p>
                <form onSubmit={this.handleSubmit}>
                    <input name="user_name" type="text"
                        value={this.state.name} required
                        onChange={this.handleChange} />
                    <label>User name</label>
                    <input name="password" type="password"
                        value={this.state.password} required
                        onChange={this.handleChange} />
                    <label>Password</label>

                    <input type="submit" value="Submit Form" />
                </form>
            </div>
        );
    }
}

export default SignIn;