const equalsBtn = document.getElementById('equals');
const deleteBtn = document.getElementById('clear-entry');
const clearAllBtn = document.getElementById('clear-all');

const operatorDisplay = document.getElementById('current-operator-display');
const equalsSignDisplay = document.getElementById('equals-sign-display');
const resultDisplay = document.getElementById('result-display');

const operand1Old = document.getElementById('operand1-old');
const operatorDisplayOld = document.getElementById('operator-display-old');
const operand2Old = document.getElementById('operand2-old');

let operand1 = document.getElementById('operand1');
let operand2 = document.getElementById('operand2');

// register operator on click
function registerOperator() {
	if (operatorDisplay.innerText !== '') operate();
	operatorDisplay.innerText = this.innerText;
	
}

document.querySelectorAll('.operation').forEach(btn => {
	btn.addEventListener('click', registerOperator);
});

// add event listeners to all the number buttons
document.querySelectorAll('.number').forEach( num => {
	num.addEventListener('click', registerNumber);
});

function registerNumber(e) {
	if (operatorDisplay.innerText === '') {
		operand1.innerText += e.target.innerText;
	} else {
		operand2.innerText += e.target.innerText;
	}
}

equalsBtn.addEventListener('click', operate);

// main function for operations
function operate(operator, firstNum, secondNum) {
	if (operand2.innerText === '') return
	operator = operatorDisplay.innerText;
	firstNum = Number(operand1.innerText);
	secondNum = Number(operand2.innerText);
	
	switch (operator) {
		case "+":
			equalsSignDisplay.innerText = "=";
			resultDisplay.innerText = add(firstNum, secondNum);
			break;
		case "-":
			equalsSignDisplay.innerText = "=";
			resultDisplay.innerText = subtract(firstNum, secondNum);
			break;
		case "*":
			equalsSignDisplay.innerText = "=";
			resultDisplay.innerText = multiply(firstNum, secondNum);
			break;
		case "/":
			equalsSignDisplay.innerText = "=";
			resultDisplay.innerText = divide(firstNum, secondNum);
			break;
	}
	prepareForNewOperation();
}

function prepareForNewOperation() {
	operand1Old.innerText = operand1.innerText;
	operatorDisplayOld.innerText = operatorDisplay.innerText;
	operand2Old.innerText = operand2.innerText;
	operand1.innerText = resultDisplay.innerText;
	operand2.innerText = '';
	operatorDisplay.innerText = '';
}

function add(num1, num2) {
	return num1 + num2;
}

function subtract(num1, num2) {
	return num1 - num2;
}

function multiply(num1, num2) {
	return num1 * num2;
}

function divide(num1, num2) {
	return num1 / num2;
}

// reset operands, operator and results
function resetOperationValues() {
	operatorDisplay.innerText = '';
	operatorDisplayOld.innerText = '';
	operand1.innerText = '';
	operand2.innerText = '';
	operand1Old.innerText = '';
	operand2Old.innerText = '';
	resultDisplay.innerText = '';
	equalsSignDisplay.innerText = '';
}

clearAllBtn.addEventListener('click', resetOperationValues);

// 'delete' button functionality
function deleteNumber() {
	if (operatorDisplay.innerText === '') {
		operand1.innerText = operand1.innerText.substring(0, operand1.innerText.length-1);
	} else {
		operand2.innerText = operand2.innerText.substring(0, operand2.innerText.length-1);
	}
}

deleteBtn.addEventListener('click', deleteNumber);
