const container = document.getElementById('keyboard');
const display = document.getElementById('display');

function add(a , b){
    return a + b;
}

function subtract(a, b){
    return a - b;
}

function product(a, b){
    return a * b;
}

function division(a, b){
    if(b === 0){
        return 'ERROR'
    }
    else{
        return a / b;
    }
}

function operate(operator, num1, num2){
    switch(operator){
        case "+": return add(num1, num2);
        break;
        case "-": return subtract(num1, num2);
        break;
        case "*": return product(num1, num2);
        break;
        case "/": return division(num1, num2);
    }
}

let displayValue = 0; 
let firstOperand = null;
let firstOperator = null;
let secondOperand = null;
let secondOperator = null;

display.textContent = displayValue;

function createKeyboard(container){

    const cellSize = `calc(100% / ${4})`;

    const cell = document.createElement('button');
    cell.setAttribute('class', 'square');
    cell.style.width = cellSize;
    cell.style.height = cellSize;
    cell.textContent = 'C';
    cell.addEventListener('click', () => select(cell.textContent));
    
    container.appendChild(cell);

    for (let i = 0; i < 10; i++){

        const cell = document.createElement('button');
        cell.setAttribute('class', 'square');
        cell.style.width = cellSize;
        cell.style.height = cellSize;
        cell.textContent = i;
        cell.addEventListener('click', () => select(cell.textContent));
        
        container.appendChild(cell);
        
    }

    const specialChars = ['+', '-', '*', '/', '.', 'DEL','=']
    specialChars.forEach(function (element){
        const cell = document.createElement('button');
        cell.setAttribute('class', 'square');
        cell.style.width = cellSize;
        cell.style.height = cellSize;
        cell.textContent = element;
        cell.addEventListener('click', () => select(cell.textContent));

        container.appendChild(cell);
    })

}

function select(value){
    if (value === '='){
        equalsTo();
    }
    else if (value === "C") {
        clearAll();
    }
    else if (value === '0') {
        addToDisplay('0')
    }
    else if (value === '1') {
        addToDisplay('1')
    }
    else if (value === '2') {
        addToDisplay('2')
    }
    else if (value === '3') {
        addToDisplay('3')
    }
    else if (value === '4') {
        addToDisplay('4')
    }
    else if (value === '5') {
        addToDisplay('5')
    }
    else if (value === '6') {
        addToDisplay('6')
    }
    else if (value === '7') {
        addToDisplay('7')
    }
    else if (value === '8') {
        addToDisplay('8')
    }
    else if (value === '9') {
        addToDisplay('9')
    }
    else if (value === '+') {
        setOperator('+')
    }
    else if (value === '-') {
        setOperator('-')
    } 
    else if (value === '*') {
        setOperator('*')
    }
    else if (value === '/') {
        setOperator('/')
    }
    else if (value === 'DEL') {
        removeFromDisplay();
    }
    else if (value === '.'){
        addToDisplay('.')
    }

    if(!isNaN(Number(value)) || value === 'DEL' || value === '.')
        display.textContent = showDisplay(displayValue);
}

function addToDisplay(number) {
    
    if(displayValue != 'ERROR'){
        if(number === "."){
            if(!itsDecimal(displayValue)){
                displayValue += number;
            }
        }else{
            if(firstOperand === null){
                if(displayValue === "0" || displayValue === 0){
                    displayValue = number;
                }else{
                    displayValue += number;
                }
            }else{
                if(displayValue == firstOperand || displayValue === "0" || displayValue === 0){
                    displayValue = number;
                }else{
                    displayValue += number;
                }
            }
        }
    }

}

function removeFromDisplay(){
    if(displayValue != 'ERROR'){
        let newValue = String(displayValue);
        if(newValue.length === 1){
            displayValue = "0";
        }else{
            displayValue = newValue.slice(0, (newValue.length - 1));
        }
    }
}

function setOperator(operator){
    if(displayValue != 'ERROR'){
        if(firstOperator === null){
            firstOperand = Number(displayValue);
            firstOperator = operator;
        }else if(secondOperator === null){
            secondOperand = Number(displayValue);
            secondOperator = operator;
            firstOperand = operate(firstOperator, firstOperand, secondOperand);
            displayValue = firstOperand;
            display.textContent = showDisplay(displayValue);
        }else {
            secondOperand = Number(displayValue);
            firstOperator = operator;
            firstOperand = operate(secondOperator, firstOperand, secondOperand);
            secondOperator = null;
            displayValue = firstOperand;
            display.textContent = showDisplay(displayValue);
        }
    }
}

function equalsTo() {
    if(displayValue != 'ERROR'){
        if(secondOperator != null){
            secondOperand = Number(displayValue);
            displayValue = operate(secondOperator, firstOperand, secondOperand);
            display.textContent = showDisplay(displayValue);
            firstOperand = displayValue;
            firstOperator = null;
            secondOperand = null;
            secondOperator = null;
        }else if(firstOperator != null){
            secondOperand = Number(displayValue);
            displayValue = operate(firstOperator, firstOperand, secondOperand);
            display.textContent = showDisplay(displayValue);
            firstOperand = displayValue;
            firstOperator = null;
            secondOperand = null;
            secondOperator = null;
        }
    }
}

function clearAll(){
    displayValue = 0;
    firstOperand = null;
    firstOperator = null;
    secondOperand = null;
    secondOperator = null;
    display.textContent = showDisplay(displayValue);
}

function showDisplay(value){
    value = String(value);
    if(value.length > 9){
        value = value.slice(0, 9);
    }
    return value;
}

function itsDecimal(value){
    let result = String(value).indexOf(".");
    if(result === -1){
        return false;
    }else{
        return true;
    }
}

createKeyboard(container)
