import React from 'react';
import './sign-out-page.scss';
import cat from '../../images/cat-hug.png';

const SignOutPage = (props) => {
    props.handleSignOut();
    return (
        <div className="sign-out-page">
            <h2>See you soon, {props.prevUserName}!</h2>
            <img src={cat} alt="Cat" className="cat" />
        </div>
    );
}

export default SignOutPage;