const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];
const particles = [];
const maxStars = 30;

document.addEventListener('mousemove', movePlayer);

function movePlayer(e) {
  player.x = e.clientX - player.width / 2;
  player.y = e.clientY - player.height / 2;
}

const player = {
  x: canvas.width / 2 - 25,
  y: canvas.height / 2 - 25,
  width: 50,
  height: 50,
  color: '#ffcc00',
};

function createStar() {
  const star = {
    x: Math.random() * canvas.width,
    y: 0,
    size: Math.random() * 5 + 1,
    speed: Math.random() * 3 + 1,
    color: '#ffffff',
  };

  stars.push(star);
}

function drawStars() {
  for (let i = 0; i < stars.length; i++) {
    const star = stars[i];
    ctx.fillStyle = star.color;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function updateStars() {
  for (let i = 0; i < stars.length; i++) {
    const star = stars[i];

    if (star.y > canvas.height) {
      stars.splice(i, 1);
      i--;
    } else {
      star.y += star.speed;
    }
  }

  if (stars.length < maxStars && Math.random() < 0.05) {
    createStar();
  }
}

function drawPlayer() {
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawParticles() {
  for (let i = 0; i < particles.length; i++) {
    const particle = particles[i];
    ctx.fillStyle = particle.color;
    ctx.fillRect(particle.x, particle.y, particle.size, particle.size);
  }
}

function updateParticles() {
  for (let i = 0; i < particles.length; i++) {
    const particle = particles[i];

    if (particle.alpha <= 0) {
      particles.splice(i, 1);
      i--;
    } else {
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      particle.alpha -= 0.02;
    }
  }
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawStars();
  updateStars();

  drawPlayer();

  drawParticles();
  updateParticles();

  requestAnimationFrame(gameLoop);
}

canvas.addEventListener('click', () => {
  for (let i = 0; i < stars.length; i++) {
    const star = stars[i];
    if (
      player.x < star.x + star.size &&
      player.x + player.width > star.x &&
      player.y < star.y + star.size &&
      player.y + player.height > star.y
    ) {
      // Catch the star
      stars.splice(i, 1);
      i--;

      // Burst the star into particles
      for (let j = 0; j < 5; j++) {
        particles.push({
          x: star.x,
          y: star.y,
          size: Math.random() * 5 + 1,
          color: getRandomColor(),
          speedX: Math.random() * 5 - 2.5,
          speedY: Math.random() * 5 - 2.5,
          alpha: 1,
        });
      }
    }
  }
});

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

gameLoop();
