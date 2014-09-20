if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (function() {
        return window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback, element) {
            window.setTimeout(callback, 1000 / 60);
        };
    })();
}

function getRandom(min, max) {
    if(min==max) return min;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Color scale

function lerp(a, b, fac) {
    var ret = [];

    for (var i = 0; i < Math.min(a.length, b.length); i++) {
        ret[i] = a[i] * (1 - fac) + b[i] * fac;
    }
    var c = new Color();
    c.setRGB(ret[0], ret[1], ret[2]);
    c = "#" + c.toString();
    // console.log(c);
    return c;
}

function lerpColors(a, b, n) {
    var ret = [];
    for (var i = 0; i < n; i++) {
        var fac = i / (n - 1);
        ret.push(lerp(a.toRGBArray(), b.toRGBArray(), fac));
    }
    return ret;
}

function o2UrlParams(obj) {
    var str = ""
    for (var i in obj) {
        //For creating checkbox/array params
        if (i.indexOf("[]") >= 0) {
            if (typeof obj[i] == "object") {
                for (var ind in obj[i])
                    str += "&" + i + "=" + obj[i][ind];
            } else
                str += "&" + i + "=" + obj[i];

        } else //Normal params
            str += "&" + i + "=" + obj[i];
    }
    return str;
}


var Util = {
    getRandom: getRandom,
    o2UrlParams: o2UrlParams
};


// 