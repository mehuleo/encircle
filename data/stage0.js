var stageZeroLevels = [{},
    // Level 1 - C
    {
        type: 'circle',
        width: 5,
        height: 5,
        invisible: ['0,0', '0,4', '4,0', '4,4', '4,1', '4,3'],
        dead: ['0,2', '0,1', '0,3', '1,0', '1,4', '2,0', '3,0', '3,4', '3,1', '3,3', '4,2'],
        border: ['0,2', '0,1', '0,3', '1,0', '1,4', '2,0', '2,4', '3,0', '3,4', '3,1', '3,3', '4,2'],
        randomKill: 0,
        star: []
    },
    // Level 2 - S
    {
        type: 'circle',
        width: 5,
        height: 5,
        invisible: ['0,0', '0,4', '4,0', '4,4', '4,1', '4,3'],
        dead: ['0,1', '0,3', '1,0', '1,4', '1,1', '2,3', '3,0', '3,4', '3,1', '3,3'],
        border: ['0,2', '0,1', '0,3', '1,0', '1,4', '2,0', '2,4', '3,0', '3,4', '3,1', '3,3', '4,2'],
        randomKill: 0,
        star: []
    },
    // Level 3 - C
    {
        type: 'circle',
        width: 5,
        height: 5,
        invisible: ['0,0', '0,4', '4,0', '4,1', '4,3', '4,4'],
        dead: ['1,0', '2,0', '3,0', '3,1', '4,2', '3,2', '2,1', '1,1', '1,2', '0,2', '2,4', '3,4'],
        border: ['0,2', '0,1', '0,3', '1,0', '1,4', '2,0', '2,4', '3,0', '3,4', '3,1', '3,3', '4,2'],
        randomKill: 0,
        star: []
    },
    // Level 4 
    {
        type: 'circle',
        width: 7,
        height: 7,
        invisible: ['0,0', '0,2', '0,4', '0,6', '0,1', '0,5', '1,0', '1,6', '6,0', '6,6', '6,1', '6,5'],
        border: ['0,3', '1,2', '1,4', '1,1', '1,5', '2,0', '2,6', '3,0', '3,6', '4,0', '4,6', '5,0', '5,6', '5,1', '5,5', '6,2', '6,4', '6,3'],
        dead: ['1,1', '2,0', '2,6', '3,0', '3,6', '4,0', '4,6', '5,0', '5,6', '5,5'],
        randomKill: 0,
        star: []
    },
    // Level 5
    {
        type: 'circle',
        width: 7,
        height: 7,
        invisible: ['0,0', '0,2', '0,4', '0,6', '0,1', '0,5', '1,0', '1,6', '6,0', '6,6', '6,1', '6,5'],
        border: ['0,3', '1,2', '1,4', '1,1', '1,5', '2,0', '2,6', '3,0', '3,6', '4,0', '4,6', '5,0', '5,6', '5,1', '5,5', '6,2', '6,4', '6,3'],
        dead: ['0,3', '3,0', '3,6', '4,0', '4,6', '6,3'],
        randomKill: 0,
        star: []
    },
    // Level 6
    {
        type: 'circle',
        width: 7,
        height: 7,
        invisible: ['0,0', '0,2', '0,4', '0,6', '0,1', '0,5', '1,0', '1,6', '6,0', '6,6', '6,1', '6,5'],
        border: ['0,3', '1,2', '1,4', '1,1', '1,5', '2,0', '2,6', '3,0', '3,6', '4,0', '4,6', '5,0', '5,6', '5,1', '5,5', '6,2', '6,4', '6,3'],
        dead: ['0,3', '1,2', '1,4', '6,2', '6,4', '6,3'],
        randomKill: 2,
        star: []
    },
    // Level 7
    {
        type: 'circle',
        width: 11,
        height: 11,
        invisible: ['0,0', '0,2', '0,4', '0,6', '0,8', '0,10', '0,1', '0,3', '0,7', '0,9', '1,0', '1,2', '1,8', '1,10', '1,1', '1,9', '2,0', '2,10', '9,0', '9,10', '9,1', '9,9', '10,0', '10,2', '10,8', '10,10', '10,1', '10,3', '10,7', '10,9'],
        border: ['0,5', '1,4', '1,6', '1,3', '1,7', '2,2', '2,8', '2,1', '2,9', '3,0', '3,10', '4,0', '4,10', '5,0', '5,10', '6,0', '6,10', '7,0', '7,10', '8,0', '8,10', '8,1', '8,9', '9,2', '9,8', '9,3', '9,7', '10,4', '10,6', '10,5'],
        dead: ['0,5', '3,0', '3,10', '8,0', '8,10', '10,5'],
        randomKill: 4,
        star: []
    },
    // Level 8
    {
        type: 'circle',
        width: 11,
        height: 11,
        invisible: ['0,0', '0,2', '0,4', '0,6', '0,8', '0,10', '0,1', '0,3', '0,7', '0,9', '1,0', '1,2', '1,8', '1,10', '1,1', '1,9', '2,0', '2,10', '9,0', '9,10', '9,1', '9,9', '10,0', '10,2', '10,8', '10,10', '10,1', '10,3', '10,7', '10,9'],
        border: ['0,5', '1,4', '1,6', '1,3', '1,7', '2,2', '2,8', '2,1', '2,9', '3,0', '3,10', '4,0', '4,10', '5,0', '5,10', '6,0', '6,10', '7,0', '7,10', '8,0', '8,10', '8,1', '8,9', '9,2', '9,8', '9,3', '9,7', '10,4', '10,6', '10,5'],
        dead: ['3,0', '3,10', '8,0', '8,10'],
        randomKill: 4,
        star: []
    },
    // Level 9
    {
        type: 'circle',
        width: 11,
        height: 11,
        invisible: ['0,0', '0,2', '0,4', '0,6', '0,8', '0,10', '0,1', '0,3', '0,7', '0,9', '1,0', '1,2', '1,8', '1,10', '1,1', '1,9', '2,0', '2,10', '9,0', '9,10', '9,1', '9,9', '10,0', '10,2', '10,8', '10,10', '10,1', '10,3', '10,7', '10,9'],
        border: ['0,5', '1,4', '1,6', '1,3', '1,7', '2,2', '2,8', '2,1', '2,9', '3,0', '3,10', '4,0', '4,10', '5,0', '5,10', '6,0', '6,10', '7,0', '7,10', '8,0', '8,10', '8,1', '8,9', '9,2', '9,8', '9,3', '9,7', '10,4', '10,6', '10,5'],
        dead: ['0,5', '3,10', '8,0'],
        randomKill: 2,
        star: []
    }
];