// JavaScript code
const canvas = document.getElementById('spaceCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size to cover the whole window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];
const colors = ['#ffffff', '#e0e0e0', '#b0b0b0', '#808080'];
let explosionStar = null;
let explosionStarted = false;

// Star class
class Star {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.size = 2;
        this.speedX = Math.random() * 0.4 - 0.2;
        this.speedY = Math.random() * 0.4 - 0.2;
        this.color = color || colors[Math.floor(Math.random() * colors.length)];
        this.explosion = false;
    }

    update() {
        if (this.explosion) {
            this.size += 0.2;
        } else {
            this.size += 0.1;
            this.x += this.speedX;
            this.y += this.speedY;
        }
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
}

function createStars() {
    // Create a new star every frame
    for (let i = 0; i < 2; i++) {
        stars.push(new Star(Math.random() * canvas.width, Math.random() * canvas.height));
    }

    // Remove stars that are too small or exploded
    for (let i = stars.length - 1; i >= 0; i--) {
        if (stars[i].size <= 0.2 || stars[i].explosion) {
            stars.splice(i, 1);
        }
    }
}

function startExplosion() {
    explosionStar = new Star(canvas.width / 2, canvas.height / 2, 'white');
    explosionStar.explosion = true;
    explosionStarted = true;
    stars.push(explosionStar);
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    createStars();

    for (const star of stars) {
        star.update();
        star.draw();
    }

    if (explosionStarted && explosionStar.size > canvas.width) {
        // Explosion completed, fill the page with white particles
        fillPage();
        explosionStar = null;
        explosionStarted = false;
    }

    requestAnimationFrame(animate);
}

function fillPage() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Resize canvas when the window is resized
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Start animation
animate();

// Start explosion after 5 seconds
setTimeout(startExplosion, 5000);
