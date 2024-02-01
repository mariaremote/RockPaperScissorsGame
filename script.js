// TODO: make the selections fade out after 5 or so

const selectionButtons = document.querySelectorAll('[data-selection]');
const spockButton = document.getElementById('spock')
const finalColumn = document.querySelector('[data-final-column]');
const computerScoreSpan = document.querySelector('[data-computer-score]')
const userScoreSpan = document.querySelector('[data-user-score]')
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
        beats: ['scissors','rock','paper']
    }
]

selectionButtons.forEach(selectionButton => {
    selectionButton.addEventListener('click', event => {
        const selectionName = selectionButton.dataset.selection;
        const selection = SELECTIONS.find(selection => selection.name === selectionName)
        makeSelection(selection);
        showSpock();
    })
})

spockButton.addEventListener('click',hideSpock)

function makeSelection(selection){
    const computerSelection = randomSelection();
    const userWins = isWinner(selection, computerSelection);
    const computerWins = isWinner(computerSelection, selection);
    addSelectionResult(computerSelection, computerWins);
    addSelectionResult(selection, userWins);
    if (computerWins) incrementScore(computerScoreSpan)
    else if (userWins) incrementScore(userScoreSpan)
}

function randomSelection() {
    const randomIndex = Math.floor(Math.random() * SELECTIONS.length);
    return SELECTIONS[randomIndex];
}

function isWinner(selection, opponentSelection) {
    return selection.beats.includes(opponentSelection.name);
}

function addSelectionResult(selection, isWinner) {
    const div = document.createElement('div')
    div.innerText = selection.emoji
    div.classList.add('result-selection')
    if (isWinner) div.classList.add('winner')
    finalColumn.after(div);
}

// same random probability for the user, when random number is 4, the spock button is shown
function showSpock() {
    let randomness = Math.ceil(Math.random() * 4);
    console.log(randomness)
    if (randomness === 4) {
    spockButton.classList.remove('secret')}
}

function hideSpock(){
    spockButton.classList.add('secret')
}

function incrementScore(scoreSpan) {
    scoreSpan.innerText = parseInt(scoreSpan.innerText) +1
}