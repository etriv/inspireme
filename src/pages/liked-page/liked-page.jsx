import React from 'react';
import './liked-page.scss';
import GetInspirations from '../get-inspirations/get-inspirations';

class LikedPage extends React.Component {
    // Use generic GetInspirations
    
    render() {
        return (
            <GetInspirations {...this.props} />
        )
    }
}

export default LikedPage;
/*
This page is very similar to GetInspirations page.
Should improve GetInspirations to be a bit generic:
with options for small search area, and fast inspirations fetching.

*/