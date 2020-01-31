import React from 'react';
import './upload-page.scss';
import Upload from '../../components/upload/upload';
import cat from '../../images/cat-color2.png';
import vImg from '../../images/paw.png';

const UploadPage = (props) => {
    const success = false;
    // const success = this.props.signedInUser.id !== '';
    const signInClasses = '';
    // + (success ? ' faded-out' : '');

    return (
        <div className="upload-page">
            <div className="form-boxy">
                <Upload className={signInClasses} />
                {/* If successful sign-in, show msg: */}
                {success ? 
                    <div className="success-msg faded-in">
                        <img src={vImg} alt="Success" className="v-img"/>
                        <p>Succefuly uploaded inspiration!</p>
                        <p className="redirect-text">Upload another one</p>
                    </div>
                : null}
            </div>
            <img src={cat} alt="Cats" className="cat-boxy" />
        </div>
    );
}

export default UploadPage;
/*
Fields:
- Source
- Title
- Tags
- Type (auto, derive from source)
- Image (auto fetch, with option to overide)
Additional auto-gen params:
- userId (have it)

*** Cute uploading cat...
*/