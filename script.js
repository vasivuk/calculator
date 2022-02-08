const numbers = document.querySelectorAll('.number');
const screen = document.querySelector('.screen');
const equals = document.querySelector('.equals');
const operations = document.querySelectorAll('.operation');
const dot = document.querySelector('.dot');

let Expression = {};
let operationClicked = false;
let dotClicked = false;

//Clicking number
for(const number of numbers){
    number.addEventListener('click', () => {
        if(screen.textContent === '0' || operationClicked){
            screen.textContent = number.value;
            operationClicked = false;
        } else {
            screen.textContent += number.value;
        }
    })
}

//Clicking dot
dot.addEventListener('click', () => {
    if(!dotClicked){
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
        if(Expression.firstOperand != null) {
            Expression.firstOperand += parseFloat(screen.textContent);
            screen.textContent = Expression.firstOperand;
        } else {
            Expression.firstOperand = parseFloat(screen.textContent);
        }
        Expression.operation = operation.value;
        operationClicked = true;
        dotClicked = false;
    });
}

//Clicking equals
equals.addEventListener('click', () => {
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
    screen.textContent = 0;
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