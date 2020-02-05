import React, { useState } from 'react';
import './upload-page.scss';
import Upload from '../../components/upload/upload';
import cat from '../../images/cat-color2.png';
import vImg from '../../images/paw.png';
import { Redirect } from 'react-router-dom';

const UploadPage = (props) => {
    const [success, setSuccess] = useState(false);
    const [uploadClasses, setUploadClasses] = useState('');

    function handleSuccessfulUpload() {
        setSuccess(true);
        setUploadClasses('faded-out');
    }

    function resetForm() {
        setSuccess(false);
        setUploadClasses('');
    }

    return (props.signedInUser.id !== '' ?
        <div className="upload-page">
            <div className="form-boxy">
                <Upload
                    className={uploadClasses}
                    signedInUser={props.signedInUser}
                    handleSuccessfulUpload={handleSuccessfulUpload} />
                {/* If successful sign-in, show msg: */}
                {success ?
                    <div className="success-msg faded-in">
                        <img src={vImg} alt="Success" className="v-img" />
                        <p>Succefully uploaded inspiration!</p>
                        <span className="link-text" onClick={resetForm}>
                            Upload more
                        </span>
                    </div>
                    : null}
            </div>
            <img src={cat} alt="Cats" className="cat-boxy" />
        </div>
        : <Redirect to="/sign-in" />
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