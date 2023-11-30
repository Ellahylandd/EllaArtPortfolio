const canvas = document.getElementById('trippyCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let isCalm = false; // Flag to indicate if the animation is calm

const particles = [];

// Function to generate random color
function randomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Function to create a particle
function createParticle() {
    const particle = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 5 + 2,
        speedX: Math.random() * 3 - 1.5,
        speedY: Math.random() * 3 - 1.5,
        color: randomColor(),
    };
    particles.push(particle);
}

// Function to draw the particles
function drawParticles() {
    for (const particle of particles) {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
    }
}

// Function to update particle positions
function updateParticles() {
    for (const particle of particles) {
        if (!isCalm) {
            // If not calm, update particle positions as before
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            if (particle.size > 0.2) particle.size -= 0.1;
        } else {
            // If calm, slow down particle movement
            particle.x += particle.speedX * 0.2;
            particle.y += particle.speedY * 0.2;
        }
    }

    particles.forEach((particle, index) => {
        if (particle.size <= 0.2) {
            particles.splice(index, 1);
        }
    });

    while (particles.length < 100) {
        createParticle();
    }
}

// Function to draw the trippy background
function drawBackground() {
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);

    // Adjust gradient colors based on calm state
    if (!isCalm) {
        gradient.addColorStop(0, randomColor());
        gradient.addColorStop(0.5, randomColor());
        gradient.addColorStop(1, randomColor());
    } else {
        gradient.addColorStop(0, '#FFFFFF'); // Calmer colors, e.g., white
        gradient.addColorStop(0.5, '#E0E0E0');
        gradient.addColorStop(1, '#CCCCCC');
    }

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Function to make the animation calm after 5 seconds
function calmDown() {
    setTimeout(() => {
        isCalm = true;
    }, 5000);
}

// Function to draw the trippy pattern
function draw() {
    drawBackground();

    drawParticles();
    updateParticles();

    requestAnimationFrame(draw);
}

// Adjust canvas size on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Create initial particles
for (let i = 0; i < 100; i++) {
    createParticle();
}

// Start the animation
draw();

// Calm down the animation after 5 seconds
calmDown();
