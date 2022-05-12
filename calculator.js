const equalsBtn = document.getElementById('equals');
const clearAllBtn = document.getElementById('clear-all');
const resultDisplay = document.getElementById('result-display');
const operatorDisplay = document.getElementById('operator-display');

let operand1 = document.getElementById('operand1');
let operand2 = document.getElementById('operand2');

// register operator on click
function registerOperator() {
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
	if (operatorDisplay.textContent === '') {
		operand1.textContent += e.target.textContent;
	} else {
		operand2.textContent += e.target.textContent;
	}
}

equalsBtn.addEventListener('click', operate);

// main function for operations
function operate(operator, firstNum, secondNum) {
	operator = operatorDisplay.textContent;
	firstNum = Number(operand1.textContent);
	secondNum = Number(operand2.textContent);
	switch (operator) {
		case "+":
			resultDisplay.textContent = add(firstNum, secondNum);
			resetOperationValues();
			break;
		case "-":
			resultDisplay.textContent = subtract(firstNum, secondNum);
			resetOperationValues();
			break;
		case "*":
			resultDisplay.textContent = multiply(firstNum, secondNum);
			resetOperationValues();
			break;
		case "/":
			resultDisplay.textContent = divide(firstNum, secondNum);
			resetOperationValues();
			break;
	}
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
	operatorDisplay.textContent = '';
	operand1.textContent = '';
	operand2.textContent = '';
}

function resetResult() {
	resultDisplay.textContent = '';
}

clearAllBtn.addEventListener('click', resetOperationValues);
clearAllBtn.addEventListener('click', resetResult);
