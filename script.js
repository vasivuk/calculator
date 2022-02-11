const numbers = document.querySelectorAll('.number');
const screen = document.querySelector('.screen');
const equals = document.querySelector('.equals');
const operations = document.querySelectorAll('.operation');
const dot = document.querySelector('.dot');
const del = document.querySelector('.del');

let Expression = {};
let operationClicked = false;
let dotClicked = false;
let currentOperation;

//Clicking number
for(const number of numbers){
    number.addEventListener('click', () => {
        if(currentOperation != null && currentOperation.classList.contains('clicked')){
            currentOperation.classList.remove('clicked');
        }
        if(screen.textContent === '0' || operationClicked){
            screen.textContent = number.value;
        } else {
            screen.textContent += number.value;
        }
        operationClicked = false;
    })
}
//Clicking del
del.addEventListener('click', () => {
    if(currentOperation != null && currentOperation.classList.contains('clicked')){
        currentOperation.classList.remove('clicked');
    }
    if(screen.textContent.length === 1){
        screen.textContent = 0;
    } else {
        if(screen.textContent.charAt(screen.textContent.length-1) === '.') {
            dotClicked = false;
        }
        screen.textContent = screen.textContent.substring(0, screen.textContent.length-1);
    }
})

//Clicking dot
dot.addEventListener('click', () => {
    if(!dotClicked){
        if(currentOperation != null && currentOperation.classList.contains('clicked')){
            currentOperation.classList.remove('clicked');
        }
        if(operationClicked){
            screen.textContent = '0'+dot.value;
            operationClicked = false;
            dotClicked = true;
        } else {
            screen.textContent += dot.value;
            dotClicked = true;
        }
    }
})


//Clicking operation
for(const operation of operations) {
    operation.addEventListener('click', () => {
        if(operationClicked){
            Expression.operation = operation.value;
            currentOperation.classList.remove('clicked');
        } else {
            if(Expression.hasOwnProperty('operation') && Expression.operation !== null){
                Expression.secondOperand = parseFloat(screen.textContent);
                Expression.firstOperand = operate(Expression.operation, Expression.firstOperand, Expression.secondOperand);
                Expression.secondOperand = null;
                screen.textContent = Expression.firstOperand;
                Expression.operation = operation.value;
            } else {
                Expression.firstOperand = parseFloat(screen.textContent);
                Expression.operation = operation.value;
            }
        }
        operationClicked = true;
        currentOperation = operation;
        currentOperation.classList.add('clicked');
    });
}

//Clicking equals
equals.addEventListener('click', () => {
    if(currentOperation != null && currentOperation.classList.contains('clicked')){
        currentOperation.classList.remove('clicked');
    }
    Expression.secondOperand = parseFloat(screen.textContent);
    if(!Expression.hasOwnProperty('operation')) {
        screen.textContent = "ERROR!";
        return;
    }
    let result = operate(Expression.operation, Expression.firstOperand, Expression.secondOperand);
    screen.textContent = result;
    operationClicked = true;
    dotClicked = false;
    Expression = {};
})

//Clicking clear
const clear = document.querySelector('#clear');
clear.addEventListener('click', () => {
    if(currentOperation != null && currentOperation.classList.contains('clicked')){
        currentOperation.classList.remove('clicked');
    }    screen.textContent = 0;
    dotClicked = false;
    operationClicked = false;
    Expression = {};
});

function add(num1, num2){
    return num1 + num2;
}

function subtract(num1, num2){
    return num1 - num2;
}

function multiply(num1, num2){
    return num1*num2;
}

function divide(num1, num2){
    if(num2 === 0){
        return "ERROR!";
    }
    return Math.round(num1/num2 *100000)/100000;
}

function mod(num1, num2){
    return num1 % num2;
}

function operate(operator, num1, num2){
    switch(operator){
        case '+': return add(num1, num2);
        case '-': return subtract(num1, num2);
        case '*': return multiply(num1, num2);
        case '/': return divide(num1, num2);
        case '%': return mod(num1, num2);
    }
}