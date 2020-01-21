import React from 'react';
import './sign-in-page.scss';
import SignIn from '../../components/sign-in/sign-in';
import Register from '../../components/register/register';
// import BoxContainer from '../../components/box-container/box-container';

const SignInPage = () => {
    return (
        <div className="sign-in-page">
            <SignIn className="sign-in-stlye"></SignIn>
            <Register className="register-stlye"></Register>
        </div>
    );
}

export default SignInPage;