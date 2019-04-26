const grid_num = 10;
let nodes = [];
let grid;

function setup() {
  createCanvas(640, 640);
  frameRate(3);
  reset();
}

function draw() {
  background(0);
  grid.display();
  for (let i = 0; i < nodes.length; i++) {
    nodes[i].move();
    nodes[i].display();
  }

  for (let i = 0; i < nodes.length; i++) {
    for (let j = 0; j < nodes.length; j++) {
      if (i == j) {
        continue
      }
      nodes[i].infect(nodes[j]);
    }
  }
}

function reset() {
  grid = new Grid(grid_num);
  for (let i = 0; i < 10; i++) {
    let color;
    if (i < 3) {
      color = "red";
    } else {
      color = "blue"
    }
    nodes[i] = new Node(i, i, 30, color);
  }
}

class Grid {
  constructor(grid_num) {
    this.num = grid_num;
  }

  display() {
    stroke(0);
    let l = height / this.num;
    for (let i = 0; i < this.num; i++) {
      stroke(127);
      line(0, l * i, width, l * i);
      line(l * i, 0, l * i, height);
    }
  }
}

class Node {
  constructor(x, y, r, c) {
    this.pos = createVector(x, y);
    this.vec = createVector(0, 0);
    this.r = r;
    this.color = color(c);
  }

  move() {
    this.vec.x = Math.floor(Math.random() * 4) - 2;
    this.vec.y = Math.floor(Math.random() * 4) - 2;
    this.pos.add(this.vec);
    this.move_check();
  }

  move_check() {
    if (this.pos.x < 0) {
      this.pos.x = grid_num - 1;
    } 
    if (this.pos.x > grid_num) {
      this.pos.x = 0
    }
    if (this.pos.y < 0) {
      this.pos.y = grid_num - 1;
    }
    if (this.pos.y > grid_num){
      this.pos.y = 0;
    }
  }

  infect(node) {
    if (this.pos.equals(node.pos)) {
      this.color = "red";
    }
  }

  display() {
    stroke(0);
    strokeWeight(2);
    fill(this.color);

    let x = this.pos.x * width / grid_num + width / grid_num * 0.5;
    let y = this.pos.y * height / grid_num + height / grid_num * 0.5;
    ellipse(x, y, this.r, this.r);
  }
}
