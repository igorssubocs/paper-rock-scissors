import './style.scss';

const userScoreElement = document.getElementById('user-score');
const computerScoreElement = document.getElementById('computer-score');
const resultText = document.getElementById('result-text');
const choiceElements = document.querySelectorAll('.choice');
const historyList = document.getElementById('history-list');
const resetButton = document.getElementById('reset-button');

let userScore = 0;
let computerScore = 0;
let round = 0;
const choices = ['rock', 'paper', 'scissors'];


function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

function getWinner(userChoice, computerChoice) {
    if (userChoice === computerChoice) {
        return 'draw';
    }
    
    if (
        (userChoice === 'rock' && computerChoice === 'scissors') ||
        (userChoice === 'paper' && computerChoice === 'rock') ||
        (userChoice === 'scissors' && computerChoice === 'paper')
    ) {
        return 'user';
    }
    
    return 'computer';
}

function formatChoice(choice) {
    return choice.charAt(0).toUpperCase() + choice.slice(1);
}

function updateScore(winner) {
    if (winner === 'user') {
        userScore++;
        userScoreElement.textContent = userScore;
    } else if (winner === 'computer') {
        computerScore++;
        computerScoreElement.textContent = computerScore;
    }
}

function updateResult(userChoice, computerChoice, winner) {
    resultText.classList.remove('win', 'lose', 'draw');
    
    if (winner === 'user') {
        resultText.textContent = `You win! ${formatChoice(userChoice)} beats ${formatChoice(computerChoice)}`;
        resultText.classList.add('win');
    } else if (winner === 'computer') {
        resultText.textContent = `You lose! ${formatChoice(computerChoice)} beats ${formatChoice(userChoice)}`;
        resultText.classList.add('lose');
    } else {
        resultText.textContent = `It's a draw! Both chose ${formatChoice(userChoice)}`;
        resultText.classList.add('draw');
    }
}

function updateHistory(userChoice, computerChoice, winner) {
    round++;
    const historyItem = document.createElement('li');
    historyItem.classList.add(winner);
    
    const roundSpan = document.createElement('span');
    roundSpan.className = 'round';
    roundSpan.textContent = `Round ${round}:`;
    
    const detailsSpan = document.createElement('span');
    detailsSpan.textContent = `You: ${formatChoice(userChoice)} vs Computer: ${formatChoice(computerChoice)}`;
    
    historyItem.appendChild(roundSpan);
    historyItem.appendChild(detailsSpan);
    
    historyList.insertBefore(historyItem, historyList.firstChild);
}

function highlightChoices(userChoice, computerChoice) {
    choiceElements.forEach(choice => {
        choice.classList.remove('selected', 'computer-selected');
    });

    document.getElementById(userChoice).classList.add('selected');

    setTimeout(() => {
        document.getElementById(computerChoice).classList.add('computer-selected');
    }, 300);
}

function resetGame() {
    userScore = 0;
    computerScore = 0;
    round = 0;
    
    userScoreElement.textContent = '0';
    computerScoreElement.textContent = '0';
    resultText.textContent = 'Choose your weapon!';
    resultText.classList.remove('win', 'lose', 'draw');
    
    historyList.innerHTML = '';
    
    choiceElements.forEach(choice => {
        choice.classList.remove('selected', 'computer-selected');
    });
}

choiceElements.forEach(choice => {
    choice.addEventListener('click', function() {
        const userChoice = this.id;
        const computerChoice = getComputerChoice();
        const winner = getWinner(userChoice, computerChoice);
        
        highlightChoices(userChoice, computerChoice);
        updateScore(winner);
        updateResult(userChoice, computerChoice, winner);
        updateHistory(userChoice, computerChoice, winner);
    });
});

resetButton.addEventListener('click', resetGame);

resultText.textContent = 'Choose rock, paper, or scissors to start!';