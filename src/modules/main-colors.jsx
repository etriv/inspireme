// A modile to keep the main colors of the app, and color functions

// https://colorhunt.co/palette/165669
const main_colors1 = {
    c1: '#d3f4ff',
    c2: '#b2dffb',
    c3: '#e7a4e4',
    c4: '#ffc55c'
};

// https://colorhunt.co/palette/163589
const main_colors2 = {
    c1: '#36b5b0',
    c2: '#9dd8c8',
    c3: '#f09595',
    c4: '#fcf5b0'
};

// https://colorhunt.co/palette/126547
const main_colors3 = {
    c1: '#00a8b5',  // aqua
    c2: '#774898',
    c3: '#e62a76',
    c4: '#fbb901'
};

// https://colorhunt.co/palette/168306
const main_colors4 = {
    c1: '#f0134d',
    c2: '#ff6f5e',
    c3: '#f5f0e3',
    c4: '#40bfc1',   // aqua
    c4_lighter: '#51c4c8'
};

// https://colorhunt.co/palette/144326
const main_colors5 = {
    c1: '#085f63',
    c2: '#49beb7',
    c3: '#facf5a',
    c4: '#ff5959'
};

// https://colorhunt.co/palette/167377
const main_colors6 = {
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

export {main_colors1, main_colors2, main_colors3, main_colors4, main_colors5, main_colors6, shadeHexColor, shadeRGBColor};