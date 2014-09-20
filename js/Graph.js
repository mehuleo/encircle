var Graph = new (function() {
    var node = [], currentNode, borderNodes;
    // 
    this.init = function(){
        currentNode = getCenterNode(Maze.height, Maze.width, Maze.type);
        for (var i = 0; i < Maze.height; i++) {
            node[i] = [];
            for (var j = 0; j < Maze.width; j++) {
                node[i][j] = {
                    neighbour: getNeighbours(i, j, Maze.type),
                    dead: false,
                    weight: 0
                };
            }
        }
        setDefaultBorderNodes();
        return this;
    };
    this.debugging = false;
    // 
    this.currentNode = function(i, j) {
        if (arguments.length > 0){
            var i=i, j=j;
            if(typeof i == "object" && i.i!=undefined  && i.j!=undefined){
                j = i.j; i = i.i;
            }
            // $("#node-"+currentNode.i+"-"+currentNode.j).css("background", "#BDE5E1");
            currentNode = {
                i: i,
                j: j
            };
        }
        else return currentNode;
    };
    // getter setter functions
    this.getNodeRange = function() {
        return {
            minI: 0,
            maxI: Maze.height - 1,
            minJ: 0,
            maxJ: Maze.width - 1
        };
    };
    // to get all node list for debugging
    this.getNodes = function() {
        return node;
    };
    this.isDead = function(i, j) {
        var i=i, j=j;
        // console.debug("Graph.kill ", i, j);
        if(typeof i == "object" && i.i!=undefined  && i.j!=undefined){
            j = i.j; i = i.i;
        }
        // if its current node it considered dead temporarily 
        if(i == currentNode.i && j == currentNode.j) return true;
        var n = node[i][j];
        return n && n.dead;
    };
    // kill node
    this.kill = function(i, j) {
        var i=i, j=j;
        // console.debug("Graph.kill ", i, j);
        if(typeof i == "object" && i.i!=undefined  && i.j!=undefined){
            j = i.j; i = i.i;
        }
        try {
            if (i == currentNode.i && j == currentNode.j)
                return false;
            self = node[i][j];
            if(self.dead) return false;
            self.dead = true;
            for (var ind in self.neighbour) {
                var nei = self.neighbour[ind];
                var n = node[nei.i][nei.j].neighbour;

                for (var d = n.length - 1; d >= 0; d--) {
                    if (n[d].i == i && n[d].j == j) {
                        // console.debug(i, j, n);
                        n.splice(d, 1);
                    }
                }
            }
            $("#node-" + i + "-" + j).addClass("dead");
            return true;
        } catch (e) {
            console.error("Graph.kill: No such node i:", i, ", j:", j, e.stack);
            return false;
        }
    };
    // calculate paths from current pos to all border nodes
    this.setDirections = function() {
        try {
            console.debug("Init setDirections()...");
            this.clearFrom().clearVisited().clearWeight();
            var t1 = new Date().getTime();
            var q = new Queue();
            q.push(currentNode);

            while (q.hasNext) {
                var cvi = q.pop(); //Current vertex id
                // console.debug("cvi", cvi);
                var C = node[cvi.i][cvi.j]; //Current Node
                if (C.visited) continue;
                else C.visited = true;

                for (var i in C.neighbour) {
                    var nvi = C.neighbour[i]; //Neighbour vertex id
                    // console.debug("nvi", nvi);
                    var nei = node[nvi.i][nvi.j];
                    q.push(nvi);
                    if (nei && !nei.weight || nei.weight > C.weight + 1) {
                        nei.weight = C.weight + 1;
                        nei.from = cvi;
                        if(this.debugging)
                            $("#node-" + nvi.i + "-" + nvi.j).html(nei.weight);
                    }
                }
            }
            var timeTaken = new Date().getTime() - t1;
            // console.debug("Finished!", "Time taken:", timeTaken);
        } catch (e) {
            console.error("-->", e.stack);
        }
    };

    this.shortestPath = function() {
        var paths = [];
        for(var n in borderNodes){
            var i = borderNodes[n].i,
                j = borderNodes[n].j;
            if (node[i][j].weight != 0)
                paths.push({
                    i: i,
                    j: j,
                    weight: +node[i][j].weight
                });
        }
        if(!paths || paths.length <= 0){
            console.debug("Game won!!");
            return false;
        }
        paths = paths.sort(function(a, b) {
            if (+a.weight == +b.weight)
                return 0;
            else return +a.weight > +b.weight ? 1 : -1;
        });

        var min = 0;
        if (paths.length > 0) min = paths[0].weight;

        for (var i = paths.length - 1; i >= 0; i--)
            if (paths[i].weight > min)
                paths.splice(i, 1);

        var r = getRandom(0, paths.length-1);
        return paths[r];
    };
    // climb to parent node sugin 'from' chain
    this.pathToward = function(i, j){
        var i=i, j=j;
        if(typeof i == "object" && i.i!=undefined  && i.j!=undefined){
            j = i.j; i = i.i;
        }
        while(1){
            var n = node[i][j];
            if(n && n.from){
                if(n.from.i == currentNode.i && n.from.j == currentNode.j)
                    return { i: i, j:j };
                else{
                    i = n.from.i;
                    j = n.from.j;
                }
            } else break;
        }
        return {};
    };
    // 
    this.isLost = function(){
        var i = currentNode.i,
            j = currentNode.j;
        for(var n in borderNodes){
            if(i == borderNodes[n].i && j == borderNodes[n].j)
                return true;
        }
        return false;
    };
    this.isWon = function(){
        var cn = node[currentNode.i][currentNode.j];
        if(!cn.neighbour || cn.neighbour.length <= 0)
            return true;
        return false;
    };
    // 
    this.clearVisited = function(){
        for(var i in node)
            for(var j in node[i])
                delete node[i][j].visited;
        return this;
    };
    this.clearFrom = function(){
        for(var i in node)
            for(var j in node[i])
                delete node[i][j].from;
        return this;
    };
    this.clearWeight = function(){
        for(var i in node)
            for(var j in node[i])
                node[i][j].weight = 0;
        return this;
    };
    // Manually set border nodes
    this.setBorderNodes = function(list){
        if(!list || list.length <= 0) return;
        borderNodes = [];
        for(var i in list){
            var d = list[i].split(',');
            borderNodes.push({
                i: d[0],
                j: d[1]
            });
        }
        return this;
    };
    // list of nodes on border of the graph
    function setDefaultBorderNodes(){
        var range = Graph.getNodeRange();
        borderNodes = [];
        for (var j = range.minJ, i = range.minI; i <= range.maxI; i++)
            borderNodes.push({i:i, j:j});
        for (var j = range.maxJ, i = range.minI; i <= range.maxI; i++)
            borderNodes.push({i:i, j:j});
        for (var i = range.minI, j = range.minJ; j <= range.maxJ; j++)
            borderNodes.push({i:i, j:j});
        for (var i = range.maxI, j = range.minJ; j <= range.maxJ; j++)
            borderNodes.push({i:i, j:j});
        return true;
    }
    // Private functions
    function getNeighbours(i, j, mazeType) {
        var n = [];
        if (mazeType == "circle")
            n = HaxNeighbour(i, j);
        // Remove negative nodes.
        var w = Maze.width - 1,
            h = Maze.height - 1;
        for (var d = n.length - 1; d >= 0; d--) {
            if (n[d].i < 0 || n[d].j < 0)
                n.splice(d, 1);
            else if (n[d].i > h || n[d].j > w)
                n.splice(d, 1);
        }
        return n;
    }
    // Current Node
    function getCenterNode(i, j, mazeType) {
        if (mazeType == "circle")
            return HaxCenter(i, j);
    }

})();


// 