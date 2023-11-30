document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
  
    const circle = document.createElement('div');
    circle.className = 'circle';
  
    const color = getRandomColor();
  
    circle.style.backgroundColor = color;
  
    circle.style.transform = `translate(${mouseX - 25}px, ${mouseY - 25}px)`;
  
    document.body.appendChild(circle);
  });
  
  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  