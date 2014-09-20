var Maze = new(function() {
    var mazeObj, mazeElem, theCircle;

    this.init = function(){
    	mazeElem = $("#mazeParent").css('width', '100%');
    	theCircle = $("#theCircle");
    	mazeElem.html('');
        this.isMirrored = false;
    	return this;
    };
    // sets maze object i.e. type
    this.maze = function(_) {
        if (arguments.length > 0){
            mazeObj = _;
	    	// Set maze property
	    	this.width = mazeObj.width;
	    	this.height = mazeObj.height;
            this.heightHalf = Math.floor(mazeObj.height/2);
	    	this.type = mazeObj.type;
	    }
        else return mazeObj;
        return this;
    };
    // draws maze
    this.createMaze = function() {
    	var w = mazeObj.width,
    		h = mazeObj.height,
    		row = h*2,
    		col1 = Math.ceil(w/2),
    		col2 = Math.floor(w/2);

        for (var i = 0; i < row; i++)
            mazeElem.append("<div class='maze-row'></div>");
        i=-1;
        $(".maze-row").each(function(ind,o) {
        	var col = col2, j = 1;
            if(ind%2==0){
            	i++;
            	col = col1;
            	j = 0;
            }
            for (var c=0; c < col; c++, j += 2)
                $(this).append("<span class='circle' id='node-" + i + "-" + j + "'><span></span></span>")
        });
        // Find ofset of last circle, jqMobi sucks
        var rl = $(".maze-row").length -1;
        var posRight, posBottom;
        $(".maze-row").each(function(i,o){
        	if(i!=0 && i!=rl) return;
        	var l = $(this).children('.circle').length -1;
        	$(this).children('.circle').each(function(ci,o){
	        	if(i==0 && ci==l) posRight = $(this).offset();
	        	if(i==rl && ci==l) posBottom = $(this).offset();
	        });
        });
        mazeElem.css('width', posRight.right+'px');
        mazeElem.css('height', posBottom.bottom+'px');
        var mt = 0;
        var h = $("#bodyImitation").height();
        mt = Math.floor( (h-posBottom.bottom) /2) - 0;
        mazeElem.css('margin', mt+'px auto');
        // Set The Circle
        $("#theCircle").css('top','0').css('left','0').show();
        return this;
    };
    // sets invisible node for maze design
    this.designMaze = function() {
        var hid = mazeObj.invisible;
        for (var i in hid) {
            var d = hid[i].split(',');
            if(Graph.kill(d[0], d[1])){
            	$("#node-"+d[0]+'-'+d[1]).css('visibility', 'hidden');
				this.paintDead(d[0], d[1]);
			}
        }
        return this;
    };
    //  paints maze, taking color from theme.
    this.paintMaze = function(){
    	$('body').css('background-color', '#'+Theme.backGround);
    	var c = Theme.getCircles();
    	$('.circle').css('background-color', '#'+c.color)
    		.css('border', c.borderWidth+'px solid #'+c.borderColor);
    	c = Theme.getTheCircle();
    	$('#theCircle').css('background-color', '#'+c.color)
            .css('border', c.borderWidth+'px solid #'+c.borderColor);;

    	return this;
    };
    // kills node based on predefined list in current mazeObj
    this.setDead = function(){
    	var dead = mazeObj.dead;
    	for (var i in dead) {
            var d = dead[i].split(',');
            if(Graph.kill(d[0], d[1]))
            	this.paintDead(d[0], d[1]);
        }
        // kill random circles
        var stared = mazeObj.star || [];
        if(mazeObj.randomKill){
        	var killed = [];
        	while (1) {
		        if (killed.length > mazeObj.randomKill) break;
		        var i = getRandom(0, mazeObj.height-1);
		        var j = getRandom(0, mazeObj.width-1);
                var killable = true;
                // dont kill already dead
		        for (var ind in killed)
		            if (killed[ind].i == i && killed[ind].j == j) killable = false;
                // dont kill stared nodes
                for(var ind in stared){
                    if(stared[ind] == i+','+j) killable = false;
                }
		        if (killable && Graph.kill(i, j)){
		            killed.push({ i: i, j: j });
		        	this.paintDead(i,j);
		        }
		    }
        }
    	return this;
    };
    // sets color for dead node
    this.paintDead = function(i,j){
    	c = Theme.getDead();
		$('#node-'+i+'-'+j).css('background-color', '#'+c.color)
            .css('border', c.borderWidth+'px solid #'+c.borderColor);
    	$('#node-'+i+'-'+j).addClass('dead');
        // Add wave effect
        $('#node-'+i+'-'+j+' span').addClass('animated circleBlock')
        .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend'
        , function() {
            $(this).removeClass('animated circleBlock');
        });
    	return this;
    };
    // set position and style for theCircle or
    // move circle position,
    this.moveTheCircle = function(i,j){
    	var i=i, j=j;
    	if(arguments.length <= 0){
    		var n = Graph.currentNode();
    		i=n.i;
    		j=n.j
    	}
    	/* TODO: can do lots of things
    		get instruction from theme class
    		decrease size and move and increae size and
    		cubic bezier anim etc.
    	*/
    	var o = $('#node-'+i+'-'+j).offset();
        var gt = -$('#bodyImitation').offset().top + o.top;
        var gl = -$('#bodyImitation').offset().left + o.left;
        // theCircle.css('width', '40px');
        // theCircle.css('height', '40px');
        theCircle.addClass('circleMove')
        .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend'
        ,function(){
            theCircle.removeClass('circleMove');
        });
        theCircle.css('-webkit-transform', 'translate3d('+gl+'px, '+gt+'px ,0)');
        // theCircle.css('width', '30px');
        // theCircle.css('height', '30px');
        this.painTheCircle();

        return this;
    };
    // 
    this.painTheCircle = function(){
        var c = Theme.getTheCircle();
        $('#theCircle').css('opacity', '1');
    	$('#theCircle').css('background-color', '#'+c.color);
    	return this;
    };
    // Add star 
    this.addStar = function(i,j){
        $('#node-'+i+'-'+j).addClass('star').css('background-image', "url('"+Theme.singleStarUrl+"')");
        return this;
    };
    // Add star 
    this.removeStar = function(i,j){
        $('#node-'+i+'-'+j).removeClass('star').css('background-image', 'none');
        return this;
    };
    // don't use this
    this.repaintTheme = function(){
        $('body').css('background-color', '#'+Theme.backGround);
        if(Theme.backgroundImage)
            $('body').css('background-image', Theme.backgroundImage);
        $('.header').css('color', Theme.headerColor);

    	var c = Theme.getTheCircle();
    	$('#theCircle').css('background-color', '#'+c.color);
    	// Fill Circles
        c = Theme.getCircles();
        var cl = c.color ? '#'+c.color : 'transparent';
		$('.circle').css('background-color', cl)
		.css('border', c.borderWidth+'px solid #'+c.borderColor);
    	// Fill dead nodes
        c = Theme.getDead();
		$('.dead').css('background-color', '#'+c.color)
		.css('border', c.borderWidth+'px solid #'+c.borderColor);

    	return this;
    };
    // Flip maze 180 along y axes
    this.flip = function(){
        mazeElem.toggleClass('mazeFlip');
        this.isMirrored = mazeElem.hasClass('mazeFlip');
        return this;
    };

})();


//
