const equalsBtn = document.getElementById('equals');
const deleteBtn = document.getElementById('clear-entry');
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
	if (operatorDisplay.innerText === '') {
		operand1.innerText += e.target.innerText;
	} else {
		operand2.innerText += e.target.innerText;
	}
}

equalsBtn.addEventListener('click', operate);

// main function for operations
function operate(operator, firstNum, secondNum) {
	operator = operatorDisplay.innerText;
	firstNum = Number(operand1.innerText);
	secondNum = Number(operand2.innerText);
	switch (operator) {
		case "+":
			resultDisplay.innerText = add(firstNum, secondNum);
			resetOperationValues();
			break;
		case "-":
			resultDisplay.innerText = subtract(firstNum, secondNum);
			resetOperationValues();
			break;
		case "*":
			resultDisplay.innerText = multiply(firstNum, secondNum);
			resetOperationValues();
			break;
		case "/":
			resultDisplay.innerText = divide(firstNum, secondNum);
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
	operatorDisplay.innerText = '';
	operand1.innerText = '';
	operand2.innerText = '';
}

function resetResult() {
	resultDisplay.innerText = '';
}

clearAllBtn.addEventListener('click', resetOperationValues);
clearAllBtn.addEventListener('click', resetResult);

// 'delete' button functionality
function deleteNumber() {
	if (operatorDisplay.innerText === '') {
		operand1.innerText = operand1.innerText.substring(0, operand1.innerText.length-1);
	} else {
		operand2.innerText = operand2.innerText.substring(0, operand2.innerText.length-1);
	}
}

deleteBtn.addEventListener('click', deleteNumber);
