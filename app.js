const timeRemaining = document.querySelector('#time-left');
const outcomeDisplay = document.querySelector('#result');
const startButton = document.querySelector('#start-button');
const squares = document.querySelectorAll('.grid div'); // selecting all the boxes and assigning under the const variable of squares
const logLeft = document.querySelectorAll('.log-left');
const logRight = document.querySelectorAll('.log-right');
const carLeft = document.querySelectorAll('.car-left');
const carRight = document.querySelectorAll('.car-right');
let timerId;
let outcomeTimer;
let currentTime = 11; // let the current time be 10 seconds, this is the time the frog has to reach the ending block
let currentIndex = 76;
const width = 9;

function moveFrog(e) {
    squares[currentIndex].classList.remove('frog');
    switch(e.key) {
    case 'ArrowLeft' :
        if(currentIndex % width != 0) currentIndex -= 1; // we don't want to let the frog go outside the box when we shift the green box to the left
        break;
    case 'ArrowRight' : 
        if(currentIndex % width < width - 1) currentIndex += 1;
        break;
    case 'ArrowUp' :
        if(currentIndex - width >= 0) currentIndex -= width;
        break;
    case 'ArrowDown' :
        if(currentIndex + width < width * width) currentIndex += width;
        break;
    /* Same applies to right arrow, up and down if we don't want the frog to reach out of bounds*/
    }

squares[currentIndex].classList.add('frog');
    
}

function autoMoveElements() {
    currentTime--; // the current time is initialized to 11, so once the game starts, a countdown occurs in the display
    timeRemaining.textContent = currentTime; // we display the time remaining on the webpage
    logLeft.forEach(logLeft => moveLogLeft(logLeft));
    logRight.forEach(logRight => moveLogRight(logRight));
    carLeft.forEach(carLeft => moveCarLeft(carLeft));
    carRight.forEach(carRight => moveCarRight(carRight));
}
autoMoveElements(); // calls the function

function outcome() {
    losingGame();
    winningGame();
}

function moveLogLeft(logLeft) {
switch(true) {
    case logLeft.classList.contains('l1'):
        logLeft.classList.remove('l1');
        logLeft.classList.add('l2');
        break;
    case logLeft.classList.contains('l2'):
        logLeft.classList.remove('l2');
        logLeft.classList.add('l3');
        break;
    case logLeft.classList.contains('l3'):
        logLeft.classList.remove('l3');
        logLeft.classList.add('l4');
        break;
    case logLeft.classList.contains('l4'):
        logLeft.classList.remove('l4');
        logLeft.classList.add('l5');
        break;
    case logLeft.classList.contains('l5'):
        logLeft.classList.remove('l5');
        logLeft.classList.add('l1');
        break;
}
}

function moveLogRight(logRight) {
    switch(true) {
        case logRight.classList.contains('l1'):
            logRight.classList.remove('l1');
            logRight.classList.add('l5');
            break;
        case logRight.classList.contains('l2'):
            logRight.classList.remove('l2');
            logRight.classList.add('l1');
            break;
        case logRight.classList.contains('l3'):
            logRight.classList.remove('l3');
            logRight.classList.add('l2');
            break;
        case logRight.classList.contains('l4'):
            logRight.classList.remove('l4');
            logRight.classList.add('l3');
            break;
        case logRight.classList.contains('l5'):
            logRight.classList.remove('l5');
            logRight.classList.add('l4');
            break;
    }
}

function moveCarLeft(carLeft) {
    switch(true) {
        case carLeft.classList.contains('c1'):
            carLeft.classList.remove('c1');
            carLeft.classList.add('c2');
            break;
        case carLeft.classList.contains('c2'):
            carLeft.classList.remove('c2');
            carLeft.classList.add('c3');
            break;
        case carLeft.classList.contains('c3'):
            carLeft.classList.remove('c3');
            carLeft.classList.add('c1');
            break;
    }
}

function moveCarRight(carRight) {
    switch(true) {
        case carRight.classList.contains('c1'):
            carRight.classList.remove('c1');
            carRight.classList.add('c3');
            break;
        case carRight.classList.contains('c2'):
            carRight.classList.remove('c2');
            carRight.classList.add('c1');
            break;
        case carRight.classList.contains('c3'):
            carRight.classList.remove('c3');
            carRight.classList.add('c2');
            break;
    }
}

function losingGame() {
    if(squares[currentIndex].classList.contains('c1') ||
    squares[currentIndex].classList.contains('l4') ||
    squares[currentIndex].classList.contains('l5') ||
    currentTime <= 0) { // if the green box crashes into the blue or black box,
        outcomeDisplay.textContent = 'You Lost!'; // we print to the computer saying the user has lost the game
        clearInterval(timerId);
        clearInterval(outcomeTimer);
        squares[currentIndex].classList.remove('frog');
        document.removeEventListener('keyup', moveFrog);
    }
}

function winningGame() {
    if(squares[currentIndex].classList.contains('ending-block')) { // if it has reached the ending-block(red box), then the user wins
        outcomeDisplay.textContent = "You Won!";
        clearInterval(timerId); // the timer gets cleared so we can play again.
        clearInterval(outcomeTimer);
        document.removeEventListener('keyup', moveFrog);
    }
}

startButton.addEventListener('click', () => {
    if(timerId) { // if the timer still exist
        clearInterval(timerId); // we can clear the time
        clearInterval(outcomeTimer);
        outcomeTimer = null; 
        timerId = null;
        document.removeEventListener('keyup', moveFrog);
    } else {
        timerId = setInterval(autoMoveElements, 1000); // else we set the interval
        outcomeTimer = setInterval(outcome, 5);
        document.addEventListener('keyup', moveFrog);
    }
})
