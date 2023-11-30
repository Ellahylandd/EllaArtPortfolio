const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');

let isDrawing = false;
let currentColor = getRandomColor();

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

document.addEventListener('mousedown', startDrawing);
document.addEventListener('mouseup', stopDrawing);
document.addEventListener('mousemove', draw);

function startDrawing(e) {
  isDrawing = true;
  draw(e); // Draw the initial point
}

function stopDrawing() {
  isDrawing = false;
  currentColor = getRandomColor(); // Change color for the next line
}

function draw(e) {
  if (!isDrawing) return;

  ctx.beginPath();
  ctx.lineWidth = 5;
  ctx.lineCap = 'round';
  ctx.strokeStyle = currentColor;

  ctx.moveTo(e.clientX, e.clientY);
  ctx.lineTo(e.clientX, e.clientY);
  ctx.stroke();
}

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Resize canvas when the window is resized
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas on resize
});
