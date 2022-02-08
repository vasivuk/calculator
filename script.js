const numbers = document.querySelectorAll('.number');
const screen = document.querySelector('.screen');
const equals = document.querySelector('.equals');
const operations = document.querySelectorAll('.operation');

for(const number of numbers){
    number.addEventListener('click', () => {
        screen.textContent += number.value;
    })
}

let Expression = {};

//Clicking the operation
for(const operation of operations) {
    operation.addEventListener('click', () => {
        Expression.firstOperand = parseInt(screen.textContent);
        Expression.operation = operation.value;
        screen.textContent = '';
    });
}

equals.addEventListener('click', () => {
    Expression.secondOperand = parseInt(screen.textContent);
    let result = operate(Expression.operation, Expression.firstOperand, Expression.secondOperand);
    screen.textContent = result;
})

const clear = document.querySelector('#clear');
clear.addEventListener('click', () => screen.textContent = '');

// const Expression = {
//     firstOperand: null,
//     operation: null,
//     secondOperand: null
// }

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
    return Math.floor(num1/num2 *1000)/1000;
}

function operate(operator, num1, num2){
    switch(operator){
        case '+': return add(num1, num2);
        case '-': return subtract(num1, num2);
        case '*': return multiply(num1, num2);
        case '/': return divide(num1, num2);
    }
}