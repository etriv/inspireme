import React from 'react';
import './about-page.scss';
import cat from '../../images/cat-color2.png';

const AboutPage = () => {
    return (
        <div className="about-page">
            {/* <h3>ABOUT PAGE</h3> */}
            <img src={cat} alt="Cat" className="cat"/>
        </div>
    );
}

export default AboutPage;