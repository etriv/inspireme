import React from 'react';
import './sign-in-page.scss';
import SignIn from '../../components/sign-in/sign-in';
import cat from '../../images/kitty.png';
// import BoxContainer from '../../components/box-container/box-container';

class SignInPage extends React.Component {
    render() {
        return (
            <div className="sign-in-page">
                <SignIn className="form-boxy"
                    onSuccessfulSignIn={this.props.onSuccessfulSignIn}
                    toggleDisplay={this.toggleDisplay} />
                <img src={cat} alt="Cats" className="cat-boxy" />
            </div>
        );
    }
}

export default SignInPage;