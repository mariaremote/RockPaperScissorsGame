// DECLARATIONS

const selectionButtons = document.querySelectorAll('[data-selection]');
const spockButton = document.getElementById('spock');
const history = document.querySelector('[data-history]');
const computerScore = document.querySelector('[data-computer-score]');
const userScore = document.querySelector('[data-user-score]');
const maxHistoryRows = 5;
const SELECTIONS = [
    {
        name: 'rock',
        emoji: '✊',
        beats: ['scissors']
    },
    {
        name: 'paper',
        emoji: '🤚',
        beats: ['rock']
    },
    {
        name: 'scissors',
        emoji: '✌',
        beats: ['paper']
    },
    {
        name: 'spock',
        emoji: '🖖',
        beats: ['scissors', 'rock', 'paper']
    }
];

// MAIN FLOW onclick

selectionButtons.forEach((selectionButton) => {
    selectionButton.addEventListener('click', () => {
        const selectionName = selectionButton.dataset.selection;
        const userSelection = SELECTIONS.find((option) => option.name === selectionName);
        determineWinner(userSelection);
        showSpock();
        cleanUpBottom();
    });
});

spockButton.addEventListener('click', hideSpock);

// FUNCTIONALITIES

function getComputerSelection() {
    const randomIndex = Math.floor(Math.random() * SELECTIONS.length);
    return SELECTIONS[randomIndex];
}

function determineWinner(userSelection) {
    const computerSelection = getComputerSelection();
    const userWins = checksIfHandWins(userSelection, computerSelection); // returns true or false
    const computerWins = checksIfHandWins(computerSelection, userSelection); // returns false or true
    addSelectionResult(computerSelection, computerWins);
    addSelectionResult(userSelection, userWins);
    if (computerWins) incrementScore(computerScore);
    else if (userWins) incrementScore(userScore);
}
// same random probability for the user, when random number is 4, the spock button is shown
function showSpock() {
    const randomness = Math.ceil(Math.random() * 4);
    if (randomness === 4) {
        spockButton.classList.remove('secret');
    }
}

function hideSpock() {
    spockButton.classList.add('secret');
}

function checksIfHandWins(handOne, handTwo) {
    return handOne.beats.includes(handTwo.name);
}

function addSelectionResult(chosenHand, winnerOfRound) {
    const div = document.createElement('div');
    div.innerText = chosenHand.emoji;
    div.classList.add('result-selection');
    if (winnerOfRound) div.classList.add('winner');
    history.firstChild ? history.firstChild.before(div) : history.appendChild(div);
    // finalColumn.after(div);
}

function incrementScore(scoreSpan) {
    scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1;
}

function cleanUpBottom() {
    const historyRemovalIndex = maxHistoryRows * 2;
    history.removeChild(history.children[historyRemovalIndex]);
    history.removeChild(history.children[historyRemovalIndex]);
}
