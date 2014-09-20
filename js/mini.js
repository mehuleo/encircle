var uiAnim = ["bounceInRight", "zoomIn", "bounceInDown", "fadeInDown", "swing", "pulse"];
var levelsInAStage = 9,
    totStage = 4;

function removeUI(url, back) {
    var mazeAnim = "bounceOutLeft"; //zoomInDown bounceInDown fadeInDown
    $('#bodyImitation').addClass(mazeAnim + ' animated')
        .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            try {
                if (location.href.indexOf("play") > 0)
                    createInterstitialAd();
            } catch (e) {}
            // change url
            if(back) history.back();
            else location.href = url;
        });
}
function setLostScore(stage, level){
    var scoreData = JSON.parse(localStorage.getItem('scoreData'));
    scoreData = scoreData instanceof Object ? scoreData : {};
    if(!scoreData[stage]) scoreData[stage] = {};
    if(!scoreData[stage][level]) scoreData[stage][level] = {};
    var d = scoreData[stage][level];
    d.played = d.played ? ++d.played : 1;
    d.cleared = false;

    // localStorage.setItem('scoreData', (JSON.stringify(scoreData)));
    // console.debug(JSON.stringify(scoreData, null, 4));
}
function setScore(stage, level, score, stars){
    // Store it
    var scoreData = JSON.parse(localStorage.getItem('scoreData'));
    scoreData = scoreData instanceof Object ? scoreData : {};
    if(!scoreData[stage]) scoreData[stage] = {};
    if(!scoreData[stage][level]) scoreData[stage][level] = {};
    var d = scoreData[stage][level];
    if(!d.star || d.star < stars)
        d.star = gatheredStars;
    if(!d.score || d.score < score)
        d.score = score;
    d.played = d.played ? +d.played++ : 1;
    d.cleared = true;

    localStorage.setItem('scoreData', (JSON.stringify(scoreData)));
    // console.debug(JSON.stringify(scoreData, null, 4));
    return 1;
}

function setLevelScore(stage){
    var scoreData = JSON.parse(localStorage.getItem('scoreData'));
    scoreData = scoreData instanceof Object ? scoreData : {};
    if(!scoreData[stage]) scoreData[stage] = {};
    
    var d = scoreData[stage],
    score = 0,
    starSum = 0,
    played = 0;;
    $('.level-box').each(function(i,o){
        if(d[i+1]){
            var s = d[i+1].star || 0;
            $(this).addClass("stars stars-"+s);
            played += d[i+1].cleared? 1:0;
            starSum += s;
            score += d[i+1].score ? d[i+1].score : 0;
        } else{
            $(this).addClass("stars stars-0");
        }
    });
    $('#score').html(score);
    $('#played').html(played);
    $('#star').addClass('stars-'+Math.ceil(starSum/levelsInAStage));
};

function setStageScore(){
    var scoreData = JSON.parse(localStorage.getItem('scoreData'));
    scoreData = scoreData instanceof Object ? scoreData : {};
    var stg = scoreData;

    var totScore = 0, totStars=0;
    for(var i in stg){
        var d = stg[i];
        var stageScore = 0, stageStars=0, levelsComplete=0;
        for(var l in d){
            var lvl = d[l];
            if(lvl.score)
                stageScore += lvl.score;
            if(lvl.star)
                stageStars += lvl.star;
            if(lvl.cleared)
                levelsComplete++;
        }
        totScore += stageScore;
        totStars += stageStars;
        $('#s'+i+' .highScore').html(stageScore);
        $('#s'+i+' .stars').removeClass('stars-0')
            .addClass('stars-'+Math.ceil(stageStars/levelsInAStage));
        $('#s'+i+' .levelCompleted').html(levelsComplete);
    }

    $('#overAll .highScore').html(totScore);
    $('#overAll .stars').addClass('stars-'+Math.ceil(totStars/(levelsInAStage*totStage)));
    // $('#overAll .stageCompleted').html(totScore);
}

function initUI(){
    // set Zoom 
    if(document.documentElement.clientWidth > 800) {
        document
        .querySelector("meta[name=viewport]")
        .setAttribute('content', 'initial-scale=1.7', 'maximum-scale=1');
    } else if(document.documentElement.clientWidth > 600) {
        document
        .querySelector("meta[name=viewport]")
        .setAttribute('content', 'initial-scale=1.5', 'maximum-scale=1');
    } else if (document.documentElement.clientWidth > 400) {
        document
        .querySelector("meta[name=viewport]")
        .setAttribute('content', 'initial-scale=1.2', 'maximum-scale=1');
    }
}

function setHeight(){
    return false; // Only for app
    var h = $('body').height();
    $('body').css('height', (h-50)+'px');
    $('#bodyImitation').css('height', h+'px');

    // Wait for admobPlugin to load
    setTimeout(function(){
        try{
            initAd();
            createBannerAd();
        } catch(e){ }
    },1300);
}

// Cordova functions

document.addEventListener("backbutton", function(){
    if(location.href.indexOf('game')>0){
        removeUI('level.html');
    } else if(location.href.indexOf('level')>0){
        removeUI('stage.html');
    } else if(location.href.indexOf('stage')>0){
        removeUI('index.html');
    } else {
        exitApp();
        return false;
    }
}, false);

// Register for device events
document.addEventListener("pause", function(){
    sendStats("pause");
}, false);
document.addEventListener("resume", function(){
    sendStats("resume");
}, false);

// Other Functions
function exitApp(){
    try {
        navigator.app.exitApp();
        sendStats("exit");
    } catch (e) {}
}

function sendStats(status) {
    try {
        var apiStats = "http://thecirclesapp.com/stats/encircleStats.php"
        var params = {
            uid: localStorage.getItem("uid"),
            status: status||"undefined",
            time: new Date().getTime(),
            storage: JSON.stringify(localStorage),
            device: ''
        };

        if (window && window.device)
            params.device = JSON.stringify(window.device);

        var request = new XMLHttpRequest();
        request.onerror = function(e) {};
        request.open("POST", apiStats, true);
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        request.onreadystatechange = function() {
            if (request.readyState == 4) {}
        }
        request.send(o2UrlParams(params));
    } catch (e) {
    }
}
// iOS7 fix
function hideStatusBar(){
    try{
        if(StatusBar && StatusBar.hide)
            StatusBar.hide();
    }catch(e){}
}


// utill
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
function getRandom(min, max) {
    if(min==max) return min;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 
