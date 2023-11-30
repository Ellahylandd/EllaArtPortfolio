document.addEventListener("DOMContentLoaded", function() {
    document.body.addEventListener("click", function(event) {
        createSquare(event.clientX, event.clientY);
    });

    function createSquare(x, y) {
        const square = document.createElement("div");
        square.className = "square";
        square.style.left = x - 25 + "px"; // Adjust the position to center the square at the clicked point
        square.style.top = y - 25 + "px";
        document.body.appendChild(square);

        // Remove the square after a certain duration (e.g., 2 seconds)
        setTimeout(function() {
            document.body.removeChild(square);
        }, 2000);
    }
});
