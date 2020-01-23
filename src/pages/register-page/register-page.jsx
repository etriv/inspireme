import React from 'react';
import './register-page.scss';
import Register from '../../components/register/register';
import cat from '../../images/bobtail.png';
// import BoxContainer from '../../components/box-container/box-container';

class RegisterPage extends React.Component {
    state = {
        displaySignIn: true
    }

    toggleDisplay = () => {
        this.setState({displaySignIn: !this.state.displaySignIn});
    }

    render() {
        return (
            <div className="register-page">
                <img src={cat} alt="Cat" className="cat-boxy" />
                <Register className="form-boxy"/>
            </div>
        );
    }
}

export default RegisterPage;