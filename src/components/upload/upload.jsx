import React, { useState } from 'react';
import './upload.scss';
import FormInput from '../form-input/form-input';
import CustomButton from '../custom-button/custom-button';
import { mainColors5 as mainColors } from '../../modules/main-colors';
import { parseVideoURL, getVimeoThumbnail, getYouTubeThumbnail, onlyAlphaNum, isURL } from '../../modules/helpers';
import lamp from '../../images/lamp4.png';
import { uploadInspirationToDB, checkContentType } from '../../modules/server-manager';
// import { Link } from 'react-router-dom';

export default function Upload(props) {
    const source = useFormInput('');
    const title = useFormInput('');
    const tags = useFormInput('');
    const [mediaType, setMediaType] = useState('');
    const [errSource, setErrSource] = useState('');
    const [errTitle, setErrTitle] = useState('');
    const [errTags, setErrTags] = useState('');
    const [serverError, setServerError] = useState('');
    const [fetching, setFetching] = useState(false);
    const [thumbnailURL, setThumbnailURL] = useState('');

    function updateThumbnailBySource() {
        setErrSource('');

        if (isURL(source.value)) {
            getThumbnailFromURL(source.value)
                .then(tempThumb => {
                    return setThumbnailURL(tempThumb)
                })
                .catch(() => {
                    setThumbnailURL(lamp)
                });
        }
        else {
            setErrSource('Should be a valid URL');
        }
    }

    async function getThumbnailFromURL(url) {
        let tempThumb = lamp;
        setMediaType('page');
        const resourceCheck = await checkContentType(url);

        // If url returned 404, the resource doesn't exist
        if (resourceCheck.status === 404) { return lamp; }

        if (resourceCheck.contentType.includes('image')) {
            tempThumb = url;
            setMediaType('image');
        }
        else {
            const video = parseVideoURL(url);
            if (video.type !== '') {
                setMediaType('video');
                if (video.type === 'youtube') {
                    tempThumb = getYouTubeThumbnail(video.id);
                    const youtubeCheck = await checkContentType(tempThumb);
                    tempThumb = (youtubeCheck.status === 200) ? tempThumb : lamp;
                }
                else if (video.type === 'vimeo') {
                    await getVimeoThumbnail(video.id)
                        .then(vimeoThumb => {
                            tempThumb = vimeoThumb;
                        })
                        .catch(error => {
                            // Leave tempThumb as is.
                        });
                }
            }
        }

        return tempThumb;
    }

    function checkInput(formTitle, formSourceURL, formTags) {
        let goodCheck = true;

        // Title checks
        if (formTitle.length < 1 || formTitle.length > 30) {
            setErrTitle('Should be between 1 and 30 charcters');
            goodCheck = false;
        }
        else if (!onlyAlphaNum(formTitle, [' ', '!', '.', ','])) {
            setErrTitle('Should contain only letters and numbers');
            goodCheck = false;
        }
        else { setErrTitle(''); }

        // Tags Checks
        if (formTags.length < 1 || formTags.length > 30) {
            setErrTags('Should be between 1 and 30 charcters');
            goodCheck = false;
        }
        else if (!onlyAlphaNum(formTags, [',', ' '])) {
            setErrTags('Should contain only letters, numbers and commas');
            goodCheck = false;
        }
        else { setErrTags(''); }

        // Source check
        if (formSourceURL.length < 1) {
            setErrSource('Should not be empty');
            goodCheck = false;
        }
        else if (!isURL(formSourceURL)) {
            setErrSource('Should be a valid URL');
            goodCheck = false;
        }
        else { setErrSource(''); }

        return goodCheck;
    }

    function resetFormFields() {
        source.setValue('');
        title.setValue('');
        tags.setValue('');
        setThumbnailURL('');
        setMediaType('');
        setFetching(false);
    }

    function handleSubmit(event) {
        event.preventDefault();

        // Init server message
        setServerError('');

        // If there's a problem with the input, don't fetch from server:
        if (!checkInput(title.value, source.value, tags.value)) { return; }

        setFetching(true);

        const parsedTags = tags.value.split(' ').join('').toLowerCase();

        try {
            uploadInspirationToDB(title.value, source.value, parsedTags, thumbnailURL, mediaType, props.signedInUser.id)
                .then(entry => {
                    console.log('Successfuly uploaded inspiration:', entry);
                    props.handleSuccessfulUpload();
                    setTimeout(() => {
                        resetFormFields();
                    }, 500);
                })
                .catch(error => {
                    console.error("Upload failed:", error);
                    setServerError(error.message);
                    setFetching(false);
                });
        }
        catch (error) {
            console.error(error);
            setFetching(false);
        }
    }

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
                    autoComplete="off"
                    onBlur={() => updateThumbnailBySource()} />
                <FormInput name="tags" type="text" required
                    value={tags.value}
                    onChange={tags.onChange}
                    label="Tags (separated by commas)"
                    errorMsg={errTags}
                    autoComplete="off" />

                <div className="image-area" style={{ backgroundImage: `url(${thumbnailURL})` }} />

                <div className="server-error-container">
                    {serverError !== '' ?
                        <div className="server-error">{serverError}</div>
                        : null}
                </div>

                <CustomButton className="submit-btn" type="submit"
                    bgColor={mainColors.c1}                     // Only HEX color
                    foreColor='white'
                    onClick={(event) => handleSubmit(event)}
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
        onChange: handleChange,
        setValue: setValue
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