// TODO: make the selections fade out after 5 or so
// TODO: make spock only visible randomly! 


const selectionButtons = document.querySelectorAll('[data-selection]');
// spock = where data-selection === spock
// const spockButton = document.querySelectorAll
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
    })
})


function makeSelection(selection){
    const computerSelection = randomSelection();
    const userWins = isWinner(selection, computerSelection);
    const computerWins = isWinner(computerSelection, selection);
    addSelectionResult(computerSelection, computerWins);
    addSelectionResult(selection, userWins);
    if (computerWins) incrementScore(computerScoreSpan)
    else if (userWins) incrementScore(userScoreSpan)
// for debugging 
// console.log('User: ',selection, 'Computer: ',computerSelection,'\n','user wins? ', userWins, 'computer wins? ',computerWins);
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
// function showSpock() {
//  if (Math.floor(Math.random() * 4)) !== 4
//      spockButton.classList.add('secret')
// }

function incrementScore(scoreSpan) {
    scoreSpan.innerText = parseInt(scoreSpan.innerText) +1
}