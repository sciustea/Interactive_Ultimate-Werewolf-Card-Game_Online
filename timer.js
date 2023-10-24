// Set the initial timer minutes to 1
let timerMinutes = 1;

// Calculate the total remaining time in seconds
let remainingTime = timerMinutes * 60;

// Initialize a variable to store the timer interval
let timerInterval;

// Initialize a flag to indicate if the timer is counting down
let countingDown = false;

// Initialize a flag to indicate if the game has started
let startGameBool = false;

// Function to update the timer display and handle timer completion
function timerFunc() {
    // Calculate minutes and seconds from remainingTime
    let minutes = Math.floor(remainingTime / 60);
    let seconds = remainingTime % 60;

    // Update the timer display
    document.getElementById("timer-el").innerHTML = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    // Check if the timer has finished
    if (remainingTime == 0) {
        // Clear the timer interval
        clearInterval(timerInterval);

        // Reset timer minutes and flags
        timerMinutes = 1;
        countingDown = false;
        remainingTime = timerMinutes * 60;

        // Reset button labels and enable timer adjustment buttons
        document.getElementById("start-btn").innerHTML = "START";
        document.getElementById("timer-el").innerHTML = timerMinutes;
        document.getElementById("increase-timer-btn").disabled = false;
        document.getElementById("decrease-timer-btn").disabled = false;
    } else {
        // Decrement the remaining time
        remainingTime--;
    }
}

// Function to display a temporary message
function displayTempMessage(message) {
    // Create a temporary message div
    var tempDiv = document.createElement('div');
    tempDiv.textContent = message;
    tempDiv.style.cssText = 'position: centerd; top 50%; color: darkred; font-family:Segoe UI;';
    tempDiv.style.fontSize = '50px';

    // Append the div to the document body
    document.body.appendChild(tempDiv);

    // Disable the start button temporarily
    var myButton = document.getElementById('start-btn');
    myButton.disabled = true;

    // Enable the start button and remove the message div after a delay
    setTimeout(function () {
        myButton.disabled = false;
    }, 1200);
    setTimeout(function () {
        tempDiv.parentNode.removeChild(tempDiv);
    }, 1200);
}

// Event listener for the start button
document.getElementById("start-btn").addEventListener("click", function () {
    if (selectedCardsAmount < 5) {
        // Display a message if there are not enough players
        displayTempMessage('Not Enough Players');
    } else {
        startGameBool = true;
        // Disable timer adjustment buttons
        document.getElementById("increase-timer-btn").disabled = true;
        document.getElementById("decrease-timer-btn").disabled = true;

        if (!countingDown) {
            // Start the timer and update button label
            timerInterval = setInterval(timerFunc, 500);
            document.getElementById("start-btn").innerHTML = "PAUSE";
            countingDown = true;
        } else if (countingDown) {
            // Pause the timer and update button label
            clearInterval(timerInterval);
            document.getElementById("start-btn").innerHTML = "RESUME";
            countingDown = false;
        }

        // Hide cards and adjust the images container display
        let allCards = document.querySelectorAll(".card-class");
        allCards.forEach((card, index) => {
            if (!imageStates[index]) {
                card.style.opacity = 0;
                card.style.border = "none";
                card.style.display = "none";
            }
        });
        document.getElementsByClassName("images-container").style.display = "flex";
        document.getElementsByClassName("images-container").style.justifyContent = "center";
    }
});

// Event listener for the end round button
document.getElementById("end-round-btn").addEventListener("click", function () {
    // Reset timer and game state
    countingDown = false;
    startGameBool = false;
    clearInterval(timerInterval);
    document.getElementById("timer-el").innerHTML = timerMinutes;
    document.getElementById("start-btn").innerHTML = "START";
    document.getElementById("increase-timer-btn").disabled = false;
    document.getElementById("decrease-timer-btn").disabled = false;

    // Restore card visibility and adjust the images container display
    let allCards = document.querySelectorAll(".card-class");
    allCards.forEach((card, index) => {
        if (!imageStates[index]) {
            card.style.opacity = 0.55;
            card.style.border = "2px solid black";
            card.style.display = "initial";
        } else if (imageStates[index] == true) {
            card.style.opacity = 1;
            card.style.border = "2px solid white";
            card.style.display = "initial";
        }
    });

    document.getElementsByClassName("images-container").style.display = "flex";
    document.getElementsByClassName("images-container").style.justifyContent = "center";
});

// Event listener for increasing the timer
document.getElementById("increase-timer-btn").addEventListener("click", function () {
    if (timerMinutes < 10)
        timerMinutes++;
    document.getElementById("timer-el").innerHTML = timerMinutes;
    remainingTime = timerMinutes * 60;
});

// Event listener for decreasing the timer
document.getElementById("decrease-timer-btn").addEventListener("click", function () {
    if (timerMinutes > 1)
        timerMinutes--;
    document.getElementById("timer-el").innerHTML = timerMinutes;
    remainingTime = timerMinutes * 60;
});
