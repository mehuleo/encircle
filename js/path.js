console.debug("Path.js");

function GraphGenerator(Maze) {
    var node = [];
    var currentNode = getCenterNode(Maze.height, Maze.width, Maze.type);
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

    // getter setter functions
    this.getNodeRange = function() {
        return {
            minI: 0,
            maxI: Maze.height - 1,
            minJ: 0,
            maxJ: Maze.width - 1
        };
    };
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
    this.removeNodeBorder = function(i,j){
        // $("#node-" + i + "-" + j).css("border-width", "0px");
        $("#node-" + i + "-" + j).addClass("clear");
    };
    this.addNodeBorder = function(i,j){
        // $("#node-" + i + "-" + j).css("border-width", "1px");
        $("#node-" + i + "-" + j).removeClass("clear");
    };
    this.nodeToPixel = function(i, j) {
        var i=i, j=j;
        if(typeof i == "object" && i.i!=undefined  && i.j!=undefined){
            j = i.j; i = i.i;
        }
        var po = $("#bodyImitation").offset();
        po = Math.abs(po.top);
        console.log("--", +po);
        var o = $("#node-" + i + "-" + j).offset();
        return {
            x: parseInt(o.left),
            y: parseInt(+o.top + +po)
        };
    };
    this.getNodes = function() {
        return node;
    };

    // Logical functions
    this.kill = function(i, j) {
        var i=i, j=j;
        if(typeof i == "object" && i.i!=undefined  && i.j!=undefined){
            j = i.j; i = i.i;
        }
        try {
            if (i == currentNode.i && j == currentNode.j)
                return false;
            self = node[i][j];
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
            // console.debug("Killed ", i, " ", j);
            // $("#node-" + i + "-" + j).css("background", "#999");
            // $("#node-" + i + "-" + j).html("1");
            return true;
        } catch (e) {
            console.error("Graph.kill: No such node i:", i, ", j:", j, e.stack);
            return false;
        }
    };

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
                        // $("#node-" + nvi.i + "-" + nvi.j).html(nei.weight);
                        // $("#node-" + nvi.i + "-" + nvi.j).css("background", colors[nei.weight]);
                    }
                }
            }
            var timeTaken = new Date().getTime() - t1;
            console.debug("Finished!", "Time taken:", timeTaken);
            // alert("timeTaken " + timeTaken);
            // $("#node-" + currentNode.i + "-" + currentNode.j).css("background", "#55f");
        } catch (e) {
            console.error("-->", e.stack);
        }
    };

    this.shortestPath = function() {
        var paths = [];
        var range = this.getNodeRange();
        for (var j = range.minJ, i = range.minI; i <= range.maxI; i++)
            if (node[i][j].weight != 0)
                paths.push({
                    i: i,
                    j: j,
                    weight: +node[i][j].weight
                });
        for (var j = range.maxJ, i = range.minI; i <= range.maxI; i++)
            if (node[i][j].weight != 0)
                paths.push({
                    i: i,
                    j: j,
                    weight: +node[i][j].weight
                });
        for (var i = range.minI, j = range.minJ; j <= range.maxJ; j++)
            if (node[i][j].weight != 0)
                paths.push({
                    i: i,
                    j: j,
                    weight: +node[i][j].weight
                });
        for (var i = range.maxI, j = range.minJ; j <= range.maxJ; j++)
            if (node[i][j].weight != 0)
                paths.push({
                    i: i,
                    j: j,
                    weight: +node[i][j].weight
                });

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
        // console.debug("p--", JSON.stringify(paths, null, 2));
        return paths[r];
    };

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

    this.isLost = function(){
        var i = currentNode.i,
            j = currentNode.j,
            range = this.getNodeRange();
        if(range.minI == i || range.maxI == i
            || range.minJ == j || range.maxJ == j)
            return true;
        return false;
    };
    this.isWon = function(){
        var cn = node[currentNode.i][currentNode.j];
        if(!cn.neighbour || cn.neighbour.length <= 0)
            return true;
        return false;
    };

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

    // Private functions
    function getNeighbours(i, j, mazeType) {
        var n = [];
        if (mazeType == "haxagon")
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

    function getCenterNode(i, j, mazeType) {
        if (mazeType == "haxagon")
            return HaxCenter(i, j);
    }

}

var Graph = new GraphGenerator({
    type: "haxagon",
    width: mazeW,
    height: mazeH
});
var colors = lerpColors(new Color("#3ce73f"), new Color("#ff3e3e"), 15);
setTimeout(function() {
    // Graph.setDirections();
}, 1300);
