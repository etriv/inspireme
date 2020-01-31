import React, { useState } from 'react';
import './upload.scss';
import FormInput from '../form-input/form-input';
import CustomButton from '../custom-button/custom-button';
import { mainColors5 as mainColors } from '../../modules/main-colors';
// import { checkUserSignInFromDB } from '../../modules/db-manager';
// import { Link } from 'react-router-dom';

export default function Upload(props) {
    const source = useFormInput('');
    const title = useFormInput('');
    const tags = useFormInput('');
    const [errSource, setErrSource] = useState('');
    const [errTitle, setErrTitle] = useState('');
    const [errTags, setErrTags] = useState('');
    const [serverError, setServerError] = useState('');
    const [fetching, setFetching] = useState(false);

    const containerClassNames = 'upload-area'
        + (props.className ? ' ' + props.className : '');

    return (
        <div className={containerClassNames}>
            <h3>Upload Inspiration</h3>
            <p>Share with the world something inspiring.</p>
            <form className="upload-form">
                <FormInput name="title" type="text" required
                        value={title.value} 
                        onChange={title.onChange}
                        label="Title"
                        errorMsg={errTitle}
                        autoComplete="off" />
                <FormInput name="source" type="text" required
                    value={source.value} 
                    onChange={source.onChange}
                    label="Source"
                    errorMsg={errSource}
                    autoComplete="off" />
                <FormInput name="tags" type="text" required
                    value={tags.value} 
                    onChange={tags.onChange}
                    label="Tags (separated by commas)"
                    errorMsg={errTags} 
                    autoComplete="off" />
                
                <div className="image-area" />

                <div className="server-error-container">
                    {serverError !== '' ?
                        <div className="server-error">{serverError}</div>
                        : null}
                </div>

                <CustomButton className="submit-btn" type="submit"
                    bgColor={mainColors.c1}                     // Only HEX color
                    foreColor='white'
                    onClick={() => alert('Uploading...')}
                    disabled={fetching}>
                    UPLOAD
                </CustomButton>
            </form>
        </div>
    );
}

function useFormInput(initialValue) {
    const [value, setValue] = useState(initialValue);

    function handleChange(e) {
        setValue(e.target.value);
    }

    return {
        value: value,
        onChange: handleChange
    };
}

/*
Fields:
- Source
- Title
- Tags
- Type (auto, derive from source)
- Image (auto fetch, with option to select out of a few known options
    [support: youtube, vimeo])
Additional auto-gen params:
- userId (have it)

*** Cute uploading cat...
*/