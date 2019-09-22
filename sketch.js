//variables
var cols, rows;
var cellSize = 10;
var current;

var stack = [];

//array for grid
var grid = [];


//setup function
function setup() {
    createCanvas(400, 400);                             //draw a canvas of x by y
    cols = floor(width / cellSize);                       //calculate the amount of culumns posible
    rows = floor(height / cellSize);                      //calculate the amount of rows posible
    //frameRate(5);                                       //set the framerate to 3 frames per second

    //create a grid and save the cell object in the grid array
    for (var x = 0; x < rows; x++) {
        for (var y = 0; y < cols; y++) {
            var cells = new cell(x, y);
            grid.push(cells);
        }
    }
    current = grid[0];                                  //set current grid on 0;
}

function draw() {
    background(51); 	                                //give the cell a background of 51;

    //show all the grid objects
    for (var i = 0; i < grid.length; i++) {
        grid[i].show();
    }

    //set this cell as visited;
    current.visited = true;
    current.highlight();

    //variable to save the random next location
    //STEP 1
    var next = current.checkNeighbors();
    if (next) {
        next.visited = true;

    //STEP 2
    stack.push(current);

    //STEP 3
    removeWalls(current, next);    

    //STEP 4
    current = next;
    } else if (stack.length > 0) {
        current = stack.pop();
    }
}

function index(i, j) {
    if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
        return -1;
    }
    else {
        return i * cols + j;
    }

}

function cell(i, j) {
    this.i = i;
    this.j = j;
    this.walls = [true, true, true, true];
    this.visited = false;

    this.checkNeighbors = function () {
        var neighbors = [];

        var top = grid[index(i, j - 1)];
        var right = grid[index(i + 1, j)];
        var bottom = grid[index(i, j + 1)];
        var left = grid[index(i - 1, j)];

        if (top && !top.visited) {
            neighbors.push(top);
            console.log("top is: ", top);
        }
        if (right && !right.visited) {
            neighbors.push(right);
            console.log("right is: ", right);
        }
        if (bottom && !bottom.visited) {
            neighbors.push(bottom);
            console.log("bottom is: ", bottom);
        }
        if (left && !left.visited) {
            neighbors.push(left);
            console.log("left is: ", left);
        }

        if (neighbors.length > 0) {
            var r = random(neighbors);
            return r;
        } else {
            return undefined;
        }
    }
    this.highlight = function () {
        var x = this.i * cellSize;
        var y = this.j * cellSize;
        noStroke();
        fill(0, 0, 255, 100);
        rect(x, y, cellSize, cellSize);
    }

    this.show = function () {
        var x = this.i * cellSize;
        var y = this.j * cellSize;
        stroke(255);
        if (this.walls[0]) {
            line(x, y, x + cellSize, y);
        }
        if (this.walls[1]) {
            line(x + cellSize, y, x + cellSize, y + cellSize);
        }
        if (this.walls[2]) {
            line(x + cellSize, y + cellSize, x, y + cellSize);
        }
        if (this.walls[3]) {
            line(x, y + cellSize, x, y);
        }

        if (this.visited) {
            noStroke();
            fill(255, 0, 255, 100);
            rect(x, y, cellSize, cellSize);
        }
    }
}

function removeWalls(a, b) {
    
    var x = a.i - b.i;
    if (x === 1) {
        a.walls[3] = false;
        b.walls[1] = false;
    } else if (x === -1) {
        a.walls[1] = false;
        b.walls[3] = false;
    }
    var y = a.j - b.j;
    if (y === 1) {
        a.walls[0] = false;
        b.walls[2] = false;
    } else if (y === -1) {
        a.walls[2] = false;
        b.walls[0] = false;
    }
}