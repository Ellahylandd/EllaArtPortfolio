let ball;

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    spawnBall();
}

function draw() {
    background(255);

    // Update and display the ball
    ball.update();
    ball.display();

    // Check if the ball needs to be reset
    if (ball.needsReset()) {
        spawnBall();
    }
}

function spawnBall() {
    ball = new BouncingBall();
}

class BouncingBall {
    constructor() {
        this.radius = 10;
        this.position = createVector(0, 0, 0);
        this.speed = createVector(random(2, 5), random(2, 5), 0);
        this.color = [random(255), random(255), random(255)];
        this.expansionRate = 1;
    }

    update() {
        // Update ball position
        this.position.add(this.speed);

        // Bounce off the canvas boundaries
        if (this.position.x - this.radius < -width / 2 || this.position.x + this.radius > width / 2) {
            this.speed.x = random(-5, 5);
        }

        if (this.position.y - this.radius < -height / 2 || this.position.y + this.radius > height / 2) {
            this.speed.y = random(-5, 5);
        }

        // Expand the ball
        this.radius += this.expansionRate;

        // Ensure the ball doesn't become too big
        this.radius = constrain(this.radius, 10, min(windowWidth, windowHeight) / 2);
    }

    display() {
        // Draw the wireframe sphere
        stroke(this.color[0], this.color[1], this.color[2], 150);
        noFill();
        push();
        translate(this.position.x, this.position.y, this.position.z);
        sphere(this.radius, 24, 16);
        pop();
    }

    needsReset() {
        // Check if the ball needs to be reset (e.g., became very large)
        return this.radius >= min(windowWidth, windowHeight) / 2;
    }
}
