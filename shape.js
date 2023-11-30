const gridElement = document.getElementById('grid');

// Placeholder images (replace with your images)
const imagePaths = [
  'https://via.placeholder.com/50/FF0000/FFFFFF/?text=1',
  'https://via.placeholder.com/50/00FF00/FFFFFF/?text=2',
  // ... add more image paths
];

// Create the grid
for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 10; j++) {
    const square = document.createElement('div');
    square.className = 'square';
    square.dataset.index = i * 10 + j;
    square.addEventListener('click', flipSquare);
    gridElement.appendChild(square);
  }
}

function flipSquare() {
  const square = this;
  const index = square.dataset.index;

  if (square.classList.contains('flipped')) {
    square.classList.remove('flipped');
    square.style.transform = 'rotateY(0deg)';
  } else {
    square.classList.add('flipped');
    square.style.transform = 'rotateY(180deg)';
    square.innerHTML = `<img src="${imagePaths[index % imagePaths.length]}" alt="Image">`;
  }
}
