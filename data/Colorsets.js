var id, c = {};
// Theme list
id = 'set1';
c[id] = {
    bg: 'E8DDCB',
    light: 'CDB380',
    lighter: 'E8DDCB',
    dark: '1b7574',
    darker: '031634'
};
c[id].header = '3A8F8E';
c[id].deadNode = {
    color: c[id].dark
};
c[id].theCircle = {
    color: c[id].darker
};
c[id].circles = {
    // color: c[id].light,
    borderWidth: '1',
    borderColor: '666'
};
// Color 2
id='set2';
c[id] = {
    bg: 'b0d2d3',
    dark: '415f79',
    darker: 'eb574d',
    border: '415f79',
    bw: 1,
};
c[id].header = c[id].border;
c[id].deadNode = {
    color: c[id].dark,
    borderWidth:0
};
c[id].theCircle = {
    color: c[id].darker,
    borderWidth:0
};
c[id].circles = {
    borderWidth: c[id].bw,
    borderColor: c[id].border
};
// Color 3 
// id='set3';
// c[id] = {
//     bg: 'ECD078',
//     dark: 'D95B43',
//     darker: '53777A',
//     border: '333',
//     bw: 1,
//     // bgImage: "url('../img/bg-y-noice.jpg')"
// };
// c[id].header = c[id].dark;
// c[id].deadNode = {
//     color: c[id].dark,
//     borderWidth:0
// };
// c[id].theCircle = {
//     color: c[id].darker,
//     borderWidth:0
// };
// c[id].circles = {
//     borderWidth: c[id].bw,
//     borderColor: c[id].border
// };
// Color 4 
id='set4';
c[id] = {
    bg: 'F9F2E7',
    dark: '8FBE00',
    darker: '00A8C6',
    border: 'aaa',
    bw: 1,
};
c[id].header = c[id].dark;
c[id].deadNode = {
    color: c[id].dark,
    borderWidth:0
};
c[id].theCircle = {
    color: c[id].darker,
    borderWidth:0
};
c[id].circles = {
    borderWidth: c[id].bw,
    borderColor: c[id].border
};
// Color 4 
id='set4';
c[id] = {
    bg: 'E4DED0',
    dark: '16a061',
    darker: 'E32F21',
    border: '555',
    bw: 1,
};
c[id].header = c[id].border;
c[id].deadNode = {
    color: c[id].dark,
    borderWidth:0
};
c[id].theCircle = {
    color: c[id].darker,
    borderWidth:0
};
c[id].circles = {
    borderWidth: c[id].bw,
    borderColor: c[id].border
};
// Color 5 
id='set5';
c[id] = {
    bg: '73C8A9',
    dark: 'BD5532',
    darker: '373B44',
    border: '373B44',
    bw: 1,
};
c[id].header = c[id].border;
c[id].deadNode = {
    color: c[id].dark,
    borderWidth:0
};
c[id].theCircle = {
    color: c[id].darker,
    borderWidth:0
};
c[id].circles = {
    borderWidth: c[id].bw,
    borderColor: c[id].border
};
// Testing 
id='test';
c[id] = {
    bg: '01a89e',
    dark: 'eee',
    darker: 'eb574d',
    border: '333',
    bw: 2.5,
};
c[id].header = c[id].border;
c[id].deadNode = {
    color: c[id].dark,
    borderWidth:0
};
c[id].theCircle = {
    color: c[id].darker,
    borderWidth:0
};
c[id].circles = {
    borderWidth: c[id].bw,
    borderColor: c[id].border
};


var ColorSet = c;
ColorSet.length = -1;
for (var i in ColorSet)
    if (i != 'length')
        ColorSet.length++;
