var Game = new(function() {
    var gameStage = [stageZeroLevels], // EMBED:
        stage = 0,
        level = 0,
        levelInfo,
        currentScore = 297,
        gameOver = false,
        movesMade = 0,
        ticks = 0,
        timeLimit = 0,
        tickObj,
        mirror;
    // 
    this.init = function(info, debugging) {
        // EMBED:
        // stage = localStorage.getItem('stage') || 1;
        level = window.location.hash.substring(1, 2);
        levelInfo = info || gameStage[0][level];
        // console.debug('INFO: ',debugging, JSON.stringify(levelInfo));
        // set theme
        Theme.init('set6');
        // Theme.init('test');
        Maze.maze(levelInfo)
            .init();
        // Init Graph
        Graph.init()
            .setBorderNodes(levelInfo.border);
        // Update maze
        Maze.createMaze()
            .designMaze()
            .paintMaze()
            .setDead()
            .moveTheCircle()
            .repaintTheme();

        if (levelInfo.star && levelInfo.star.length > 0) {
            for (i in levelInfo.star) {
                var d = levelInfo.star[i].split(',');
                Maze.addStar(d[0], d[1]);
            }
        }
        if (debugging) return this;
        gameOver = false;
        gatheredStars = 0;
        Game.updateMove(true)
            .attachEvents()
            .resetStar()
            .setTick(true);
        Game.prepareSound();
        Game.showAd();
        return this;
    };
    // 
    this.start = function() {

    };
    // 
    this.pause = function() {

    };
    //
    this.over = function() {
        gameOver = true;
        setLostScore(stage, level);
        // Find escape direction
        var co = Graph.currentNode();
        var escapeD = "";
        if (co.j == 0) escapeD = "Left";
        else if (co.j == Maze.width - 1) escapeD = "Right";
        else if (co.i < Maze.heightHalf) escapeD = "Up";
        else if (co.i >= Maze.heightHalf) escapeD = "Down";

        if (Maze.mirrored && escapeD == "Left") escapeD = "Right";
        else if (Maze.mirrored && escapeD == "Right") escapeD = "Left";
        // console.debug('animSlow fadeOut'+escapeD);
        // escape circle
        Game.playSound('gameOver');
        $("#theCircle").addClass("animated animSlow fadeOut" + escapeD + "Big")
            .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                setTimeout(function() {
                    $("#theCircle").hide().removeClass("animated animSlow fadeOut" + escapeD + "Big");
                    Game.showDialog(1);
                }, 800);
            });
        // 
        return this;
    };
    //
    this.won = function() {
        gameOver = true;
        if (!levelInfo.star || levelInfo.star.length == 0)
            for (i = 0; i < 3; i++) this.addStar();
        setScore(stage, level, currentScore, gatheredStars);
        setTimeout(function() {
            Game.showDialog(0, currentScore, gatheredStars);
        }, 800);
        return this;
    };
    //
    this.stop = function() {

    };
    this.kill = function(i, j) {
        if (gameOver) return 0;
        if (Graph.isDead(i, j)) return 0;
        // Kill node
        if (!Graph.kill(i, j)) return 0;
        //async call
        setTimeout(this.makeMove, 0);
        Game.playSound('kill');
        Maze.paintDead(i, j);
        if ($('#node-' + i + '-' + j).hasClass('star')) {
            Maze.removeStar(i, j);
            Game.addStar();
        }
        this.updateMove();

        return this;
    };
    // 
    this.makeMove = function() {
        // Recalculate path
        Graph.setDirections();
        var n = Graph.shortestPath();
        if (n === false)
            return Game.won();
        // Get new pos towered shorted path obtained
        var newPos = Graph.pathToward(n.i, n.j);
        Graph.currentNode(newPos);
        // console.debug("newPos", newPos);
        // Game.playSound('move');
        Maze.moveTheCircle(newPos.i, newPos.j);
        if (Graph.isLost())
            return Game.over();
        return this;
    };
    // 
    this.updateMove = function(reset) {
        currentScore += 99;
        movesMade++;
        if (reset) {
            movesMade = 0;
            currentScore = 297;
        }
        this.updateHeader();
        return this;
    };
    this.updateHeader = function() {
        $('#moves').html(movesMade);
        $("#score").html(currentScore);
        if (timeLimit)
            $('#time').html(timeLimit - ticks);
        else $('#time').html(ticks);
    };
    // timer for scoring
    this.setTick = function(reset) {
        if (reset) {
            clearTimeout(tickObj);
            ticks = -1;
            timeLimit = 0;
            if (levelInfo.timeLimit)
                timeLimit = levelInfo.timeLimit;
        }
        ticks++;
        if (timeLimit && ticks > timeLimit) {
            Game.over();
        }
        currentScore -= 9;
        if (currentScore < 0) currentScore = 0;
        Game.updateHeader();
        if (gameOver) return;
        tickObj = setTimeout(Game.setTick, 1000);
    };
    // sets star in headre
    this.addStar = function() {
        currentScore += 299;
        gatheredStars++;
        $('#star' + gatheredStars).removeClass('star-empty impactIn')
            .css('background-image', "url('" + Theme.singleStarUrl + "')")
            .addClass('animated impactIn')
            .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                $(this).removeClass('impactIn')
            });
        return this;
    };
    this.resetStar = function() {
        for (i = 1; i < 4; i++)
            $('#star' + i).addClass('star-empty')
            .css('background-image', "url('" + Theme.emptySingleStarUrl + "')")
        return this;
    };
    // not being used
    this.reset = function(stage, level) {
        Maze.maze(gameStage[stage][level])
            .init();
        // Init Graph
        Graph.init();
        // Update maze
        Maze.createMaze()
            .designMaze()
            .paintMaze()
            .setDead()
            .moveTheCircle()
            .repaintTheme();
    };
    // Sound Controll
    var k, m, o, audio;
    this.prepareSound = function() {
        return; // EMBED
        // k = document.getElementById('kill'),
        // m = document.getElementById('move'),
        // o = document.getElementById('gameOver');

        // m = new Audio("sound/game-over-1.ogg");
        // o = new Audio("sound/water-drop-1-1.ogg");
        setTimeout(function() {
            var mediaObj = {
                android: {
                    'over': 'sound/game-over-1.ogg',
                    'kill': 'sound/water-drop-1-1.ogg'
                },
                ios: {
                    'over': 'sound/game-over-1.m4a',
                    'kill': 'sound/water-drop-1-1.m4a'
                }
            };
            var media = (/(android)/i.test(navigator.userAgent)) ? mediaObj.android : mediaObj.ios;

            if (window.plugins && window.plugins.LowLatencyAudio) {
                audio = window.plugins.LowLatencyAudio;

                // preload audio resource
                audio.preloadFX('kill', media['kill'], function(msg) {}, function(msg) {
                    console.log('error: ' + msg);
                });

                audio.preloadFX('over', media['over'], function(msg) {}, function(msg) {
                    console.log('error: ' + msg);
                });
            }
        }, 1300);

    };
    this.playSound = function(what) {
        return; // EMBED
        try {
            if (localStorage.getItem('volume') != '1')
                return;
            if (what == 'kill') {
                // k.play();
                // new Audio("sound/water-drop-1-1.ogg").play();
                audio.play('kill');
            } else if (what == 'move') {
                m.play();
            } else if (what == 'gameOver') {
                // o.play();
                // new Audio("sound/game-over-1.ogg").play();
                audio.play('over');
            }
        } catch (e) {
            console.error(e.stack);
        }
    };
    // add event listners
    this.attachEvents = function() {
        $(".circle").on("click", function(event) {
            event.preventDefault();
            event.stopPropagation();
            var id = event.target.id.split("-");
            Game.kill(id[1], id[2]);
        });
        return this;
    };
    // Show Dialog
    this.showDialog = function(isLost, scr, str) {
        var words_lost = ["Ack!", "Oops!", "Alas!", "Aw!", "Ow!", "Rats!"],
            sentence_lost = ["You were almost there.", "You lost it!", "You lost,<br>But you were close.",
                "You were so close.", "You lost it this time.", "You missed it by a bit!"
            ],
            words_win = ["Nice!", "Sweet!", "Superb!", "Brilliant", "Good!", "Terrific"],
            sentence_win = ["You won!", "You won!", "You did it!!",
                "You won!", "You did it!"
            ];

        if (isLost) {
            var msg = words_lost[getRandom(0, words_lost.length - 1)];
            msg += " " + sentence_lost[getRandom(0, sentence_lost.length - 1)];
            window.confirm(msg);
            console.log("confirmed!");
            this.handleReplay();
            // $('.popup .msg').html(msg);
            // $('.popup .stars').hide();
            // $('.popup .score').hide();
            // $('.popup .screenshot').hide();
            // $('.popup').addClass('popup-lost');
        } else {
            var msg = words_win[getRandom(0, words_win.length - 1)];
            msg += " " + sentence_win[getRandom(0, sentence_win.length - 1)];
            window.confirm(msg);
            console.log("confirmed!");
            this.handleReplay();
            // $('.popup .msg').html(msg);
            // $('.popup .score').show().html(scr || 0);
            // str = str || 0;
            // $('.popup .stars')
            //     .show()
            //     .removeClass('stars-0 stars-1 stars-2 stars-3')
            //     .addClass('stars-' + str);
            // $('.popup .screenshot').show();
            // $('.popup').removeClass('popup-lost');

        }
        // $('.popup-wrapper').show();
        // $('.popup').show().addClass('bounceInDown animated')
        //     .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
        //         $(this).removeClass('bounceInDown animated');
        //     });
    };
    // Event Handling
    this.handleBack = function() {
        // var s = localStorage.getItem('stage');
        // var l = localStorage.getItem('level');
        // if(l==1) s--;
        // else l--;
        // if(!s || !l){ s=1; l=1; }
        // localStorage.setItem('stage', s);
        // localStorage.setItem('level', l);
        Game.handleTakeScreenshot(1);
        // Game.init();
        var stage = localStorage.getItem("stage");
        if (stage > 0 && stage <= totStage)
            removeUI("level" + stage + ".html");
        else
            removeUI("stage.html");
    };
    this.handleReplay = function() {
        Game.handleTakeScreenshot(1);
        Game.init();
    };
    this.handleNext = function() {
        var s = localStorage.getItem('stage');
        var l = localStorage.getItem('level');
        if (!s || !l) {
            s = 1;
            l = 1;
        }
        if (l >= levelsInAStage) {
            s++;
            l = 1;
        } else l++;
        if (s > totStage || l > levelsInAStage) {
            s = 1;
            l = 1;
        }
        localStorage.setItem('stage', s);
        localStorage.setItem('level', l);
        Game.handleTakeScreenshot(1);
        Game.init();
    };
    this.handleTakeScreenshot = function(showAd) {
        var f = Math.floor(Math.random() * 1000);
        if (showAd && f % 2 == 0)
            Game.showBigAd();

        $('.popup-wrapper').hide();
        $('.popup').addClass('bounceOutDown animated')
            .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                $(this).hide().removeClass('bounceOutDown animated');
            });
    };

    // Ad
    this.showAd = function() {
        setTimeout(function() {
            try {
                initAd();
                createBannerAd();
            } catch (e) {}
        }, 500);
    };
    this.showBigAd = function() {
        setTimeout(function() {
            try {
                initAd();
                createInterstitialAd();
            } catch (e) {}
        }, 500);
    };

})();