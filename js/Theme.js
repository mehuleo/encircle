var Theme = new (function(){
	this.colorset = {};

	this.init = function(id){
		if(!!id){
			this.colorset = ColorSet[id];
		} else {
			var ind = Util.getRandom(0, ColorSet.length);
			console.debug("ColorSet ", ind+1);
			for(var c in ColorSet)
				if(ind--==0)
					this.colorset = ColorSet[c];
		}
		this.setProperty();
		return this;
	};
	this.setProperty = function(){
		// fixed prperties
		this.headerColor = this.colorset.header;
		this.backGround = this.colorset.bg;
		this.backgroundImage = this.colorset.bgImage;

		this.singleStarUrl = 'img/star-s-y.png';
		if(this.colorset.singleStarUrl)
			this.singleStarUrl = this.colorset.singleStarUrl;

		this.emptySingleStarUrl = 'img/star-o-w-1.png';
		if(this.colorset.emptySingleStarUrl)
			this.emptySingleStarUrl = this.colorset.emptySingleStarUrl;
	};
	this.getBg = function(){
		return this.colorset.bg;
	};
	this.getDead = function(){
		if(!this.colorset.deadNode.borderColor)
		this.colorset.deadNode.borderColor = this.colorset.deadNode.color;
		return this.colorset.deadNode;
	};
	this.getTheCircle = function(){
		if(!this.colorset.deadNode.borderColor)
			this.colorset.deadNode.borderColor = this.colorset.deadNode.color;
		return this.colorset.theCircle;
	};
	this.getCircles = function(){
		return this.colorset.circles;
	};
	
})();