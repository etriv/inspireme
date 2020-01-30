// A modile to keep the main colors of the app, and color functions

// https://colorhunt.co/palette/165669
const mainColors1 = {
    c1: '#d3f4ff',
    c2: '#b2dffb',
    c3: '#e7a4e4',
    c4: '#ffc55c'
};

// https://colorhunt.co/palette/163589
const mainColors2 = {
    c1: '#36b5b0',
    c2: '#9dd8c8',
    c3: '#f09595',
    c4: '#fcf5b0'
};

// https://colorhunt.co/palette/126547
const mainColors3 = {
    c1: '#00a8b5',  // aqua
    c2: '#774898',
    c3: '#e62a76',
    c4: '#fbb901'
};

// https://colorhunt.co/palette/168306
const mainColors4 = {
    c1: '#f0134d',
    c2: '#ff6f5e',
    c3: '#f5f0e3',
    c4: '#40bfc1',   // aqua
    c4Lighter: '#51c4c8'
};

// https://colorhunt.co/palette/144326
const mainColors5 = {
    c1: '#085f63',
    c2: '#49beb7',
    c3: '#facf5a',
    c4: '#ff5959'
};

// https://colorhunt.co/palette/167377
const mainColors6 = {
    c1: '#f0cf85',
    c2: '#e7f0c3',
    c3: '#a4d4ae',
    c4: '#32afa9'
};


function shadeHexColor(color, percent) {
    var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=(f>>8)&0x00FF,B=f&0x0000FF;
    return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
}

function shadeRGBColor(color, percent) {
    var f=color.split(","),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=parseInt(f[0].slice(4)),G=parseInt(f[1]),B=parseInt(f[2]);
    return "rgb("+(Math.round((t-R)*p)+R)+","+(Math.round((t-G)*p)+G)+","+(Math.round((t-B)*p)+B)+")";
}

export {mainColors1, mainColors2, mainColors3, mainColors4, mainColors5, mainColors6, shadeHexColor, shadeRGBColor};