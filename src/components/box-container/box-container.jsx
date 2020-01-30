import styled from 'styled-components';
import {mainColors5 as mainColors} from '../../modules/main-colors';
import bgImage from '../../images/watercolour3.jpg';

const BoxContainer = styled.div`
    background-image: url(${bgImage});
    background-size: cover;
    background-position: center center;
    background-color: ${mainColors.c2};
    background-repeat: no-repeat;
    height: 100%;
    border-radius: 30px;
    width: 100%;
    margin: auto;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
`;

export default BoxContainer;