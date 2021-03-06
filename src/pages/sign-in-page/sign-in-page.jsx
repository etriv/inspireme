import React from 'react';
import './sign-in-page.scss';
import SignIn from '../../components/sign-in/sign-in';
import cat from '../../images/kitty.png';
import { withRouter } from 'react-router-dom';
import vImg from '../../images/paw.png';
// import BoxContainer from '../../components/box-container/box-container';

class SignInPage extends React.Component {

    onSuccessfulSignIn = (userId, userName) => {
        // Update App with new user.
        this.props.updateSignedInUser(userId, userName);
    }

    componentDidUpdate() {
        if (this.props.signedInUser.id !== '') {
            setTimeout(() => {
                // Redirect to '/' after ~1s of showing the success msg.
                this.props.history.push('/');
            }, 1500); 
        }
    }
    
    render() {
        const success = this.props.signedInUser.id !== '';
        const signInClasses = ''
        + (success ? ' faded-out' : '');
        return (
            <div className="sign-in-page">
                <div className="form-boxy">
                    <SignIn className={signInClasses}
                        onSuccessfulSignIn={this.onSuccessfulSignIn}
                        toggleDisplay={this.toggleDisplay} />
                    {/* If successful sign-in, show msg: */}
                    {success ? 
                        <div className="success-msg faded-in">
                            <img src={vImg} alt="Success" className="v-img"/>
                            <p>Welcome {this.props.signedInUser.name}!</p>
                            {/* <p className="redirect-text">Redirecting...</p> */}
                        </div>
                    : null}
                </div>
                <img src={cat} alt="Cats" className="cat-boxy" />
            </div>
        );
    }
}

export default withRouter(SignInPage);