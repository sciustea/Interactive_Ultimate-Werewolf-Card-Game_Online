// Initialize variables to track the selection state of cards
let wolfcard1 = false;
let wolfcard2 = false;
let seer = false;
let robber = false;
let villager1 = false;
let villager2 = false;
var selectedCardsAmount = 0;

// Selecting and Unselecting Cards
// Create an array to track the selection state of each card
let imageStates = [wolfcard1, wolfcard2, seer, robber, villager1, villager2];

let cards = document.querySelectorAll(".card-class");

cards.forEach((image, index) => {
    image.addEventListener('click', function() {
        // Check if the game has not started before toggling card opacity
        if (startGameBool == false)
            toggleOpacity(image, index);
    });
});

// Function to toggle the opacity and selection state of a card
function toggleOpacity(element, index) {
    if (element.style.opacity == '1') {
        element.style.opacity = '0.55';
        element.style.border = '2px solid black';
        imageStates[index] = false;
        selectedCardsAmount--;
    } else {
        element.style.opacity = '1';
        element.style.border = "2px solid white";
        imageStates[index] = true;
        selectedCardsAmount++;
    }
}
//
