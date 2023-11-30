// Generate a random number between 1 and 100
const secretNumber = Math.floor(Math.random() * 100) + 1;

// Counter for the number of attempts
let attempts = 0;

function checkGuess() {
    // Get the user's guess from the input field and convert it to a number
    const userGuess = parseInt(document.getElementById('userGuess').value);

    // Increment the attempts counter
    attempts++;

    // Check if the guess is correct
    if (userGuess === secretNumber) {
        document.getElementById('result').innerHTML = `Congratulations! You guessed the number ${secretNumber} in ${attempts} attempts.`;
        document.getElementById('input-container').style.display = 'none';
    } else {
        // Provide feedback to the user
        const resultElement = document.getElementById('result');
        if (userGuess < secretNumber) {
            resultElement.innerHTML = 'Try a higher number!';
        } else {
            resultElement.innerHTML = 'Try a lower number!';
        }
    }
}
