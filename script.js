const numbers = document.querySelectorAll('.number');
const screen = document.querySelector('.screen');
const equals = document.querySelector('.equals');
const operations = document.querySelectorAll('.operation');

let Expression = {};
let operationClicked = false;

//Clicking number
for(const number of numbers){
    number.addEventListener('click', () => {
        if(screen.textContent == 0 || operationClicked){
            screen.textContent = number.value;
            operationClicked = false;
        } else {
            screen.textContent += number.value;
        }
    })
}

//Clicking operation
for(const operation of operations) {
    operation.addEventListener('click', () => {
        if(Expression.firstOperand != null) {
            Expression.firstOperand += parseInt(screen.textContent);
            screen.textContent = Expression.firstOperand;
        } else {
            Expression.firstOperand = parseInt(screen.textContent);
        }
        Expression.operation = operation.value;
        operationClicked = true;
    });
}

//Clicking equals
equals.addEventListener('click', () => {
    Expression.secondOperand = parseInt(screen.textContent);
    let result = operate(Expression.operation, Expression.firstOperand, Expression.secondOperand);
    screen.textContent = result;
    operationClicked = true;
    Expression = {};
})

//Clicking clear
const clear = document.querySelector('#clear');
clear.addEventListener('click', () => {
    screen.textContent = '0'
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