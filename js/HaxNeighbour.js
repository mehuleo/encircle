function HaxNeighbour(i, j) {
    var n = [];
    //Prev Row
    if (j % 2 == 0) {
        n.push({
            i: i - 1,
            j: j - 1
        });
        n.push({
            i: i - 1,
            j: j + 1
        });
    }
    n.push({
        i: i - 1,
        j: j
    });

    //Same Row
    n.push({
        i: i,
        j: j - 1
    });
    n.push({
        i: i,
        j: j + 1
    });

    //Next Row
    if (j % 2 != 0) {
        n.push({
            i: i + 1,
            j: j - 1
        });
        n.push({
            i: i + 1,
            j: j + 1
        });
    }
    n.push({
        i: i + 1,
        j: j
    });

    return n;
}

function HaxCenter(i,j){
    return {
        i: Math.ceil(i/2)-1,
        j:Math.ceil(j/2)-1
    };
}