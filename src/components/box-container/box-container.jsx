import styled from 'styled-components';
import {main_colors5 as main_colors} from '../../modules/main-colors';
import bg_image from '../../images/watercolour3.jpg';

const BoxContainer = styled.div`
    background-image: url(${bg_image});
    background-size: cover;
    background-position: center center;
    background-color: ${main_colors.c2};
    background-repeat: no-repeat;
    height: 100%;
    border-radius: 30px;
    width: 100%;
    margin: auto;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
`;

export default BoxContainer;