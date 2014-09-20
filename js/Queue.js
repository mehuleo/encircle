function Queue() {
	var q = [];

	this.push = function(o){
		q.push(o);
		this.reset();
		return true;
	};

	this.pop = function(){
		if(this.isEmpty) return false;
		var val = q.splice(0,1);
		if(val instanceof Array)
			val = val[0];
		this.reset();
		return val;
	};

	this.isEmpty = true;
	this.hasNext = false;
	this.reset = function(){
		this.isEmpty = q.length == 0;
		this.hasNext = q.length > 0;
	};
	this.all = function(){
		return q;
	};
}