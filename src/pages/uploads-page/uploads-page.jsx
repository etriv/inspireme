import React from 'react';
import './uploads-page.scss';
import cat from '../../images/hanging-cat.png';

class UploadsPage extends React.Component {
    render() {
        return (
            <div className='uploads-page'>
                <img src={cat} alt="Cat" className="cat"/>
            </div>
        )
    }
}

export default UploadsPage;
/*
A very basic list of all the uploaded inspirations by the current user.
In each item/row: small image, title, type icon, date added, edit button.
Edit-interface is the same as upload, just with a different cat.

*** Cute uploading cat...
*/