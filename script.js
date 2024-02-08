// DECLARATIONS

const selectionButtons = document.querySelectorAll('[data-selection]');
const spockButton = document.getElementById('spock');
const finalColumn = document.querySelector('[data-final-column]');
const computerScoreSpan = document.querySelector('[data-computer-score]');
const userScoreSpan = document.querySelector('[data-user-score]');
const SELECTIONS = [
    {
        name: 'rock',
        emoji: '✊',
        beats: ['scissors'],


    },
    {
        name: 'paper',
        emoji: '🤚',
        beats: ['rock'],
    },
    {
        name: 'scissors',
        emoji: '✌',
        beats: ['paper'],
    },
    {
        name: 'spock',
        emoji: '🖖',
        beats: ['scissors', 'rock', 'paper'],
    },
];
const history = document.querySelector('.results');


// MAIN FLOW

selectionButtons.forEach((selectionButton) => {
    selectionButton.addEventListener('click', (event) => {
        const selectionName = selectionButton.dataset.selection;
        const selection = SELECTIONS.find(
            (selection) => selection.name === selectionName,
        );
        makeSelection(selection);
        showSpock();
        // cleanUpBottom(); // not working yet
    });
});

spockButton.addEventListener('click', hideSpock);

// FUNCTIONALITIES

// Computer Selection
function randomSelection() {
    const randomIndex = Math.floor(Math.random() * SELECTIONS.length);
    return SELECTIONS[randomIndex];
}

// User Selection
function makeSelection(selection) {
    const computerSelection = randomSelection();
    const userWins = isWinner(selection, computerSelection);
    const computerWins = isWinner(computerSelection, selection);
    addSelectionResult(computerSelection, computerWins);
    addSelectionResult(selection, userWins);
    if (computerWins) incrementScore(computerScoreSpan);
    else if (userWins) incrementScore(userScoreSpan);
}
// same random probability for the user, when random number is 4, the spock button is shown
function showSpock() {
    const randomness = Math.ceil(Math.random() * 4);
    console.log(randomness);
    if (randomness === 4) {
        spockButton.classList.remove('secret');
    }
}

// Winner Determination and Display
function isWinner(selection, opponentSelection) {
    return selection.beats.includes(opponentSelection.name);
}
function addSelectionResult(selection, isWinner) {
    const div = document.createElement('div');
    div.innerText = selection.emoji;
    div.classList.add('result-selection');
    if (isWinner) div.classList.add('winner');
    // finalColumn.after(div);
    history.appendChild(div);
}

// other general display Functionalities
function hideSpock() {
    spockButton.classList.add('secret');
}
function incrementScore(scoreSpan) {
    scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1;
}

// not working yet
// function cleanUpBottom(){
// history.removeChild([history.children[9],history.children[10]])
// history.removeChild(history.children[12])
// }
