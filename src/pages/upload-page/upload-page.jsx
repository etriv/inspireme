import React from 'react';
import './upload-page.scss';

class UploadPage extends React.Component {
    render() {
        return (
            <div>
                Upload Panel
            </div>
        )
    }
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