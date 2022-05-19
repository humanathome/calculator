const equalsBtn = document.getElementById('equals');
const deleteBtn = document.getElementById('clear-entry');
const clearAllBtn = document.getElementById('clear-all');
const decimalSeparatorBtn = document.getElementById('decimal-separator');
const negativeNumBtn = document.getElementById('toggle-negative-number');

function toggleNegativeNumber() {
	if (operatorDisplay.innerText === '') {
		if (operand1.innerText.includes('-')) {
			operand1.innerText = operand1.innerText.substring(1);
		} else {
			operand1.innerText = '-' + operand1.innerText;
		}
	} else {
		if (operand2.innerText.includes('-')) {
			operand2.innerText = operand2.innerText.substring(1);
		} else {
			operand2.innerText = '-' + operand2.innerText;
		}
	}
}
negativeNumBtn.addEventListener('click', toggleNegativeNumber);

function addDecimalSeparator() {
	if (operatorDisplay.innerText === '') {
		if (operand1.innerText.includes('.')) return;
		operand1.innerText += '.'
	} else {
		if (operand2.innerText.includes('.')) return;
		operand2.innerText += '.';
	}
}

decimalSeparatorBtn.addEventListener('click', addDecimalSeparator);

const oldValuesContainer = document.getElementById('old-values-container');
const operatorDisplay = document.getElementById('operator-display');

let operand1 = document.getElementById('operand1');
let operand2 = document.getElementById('operand2');
let result = '';

// register operator on click
function registerOperator(e) {
	if (isNaN(operand1.innerText)) return;
	if (operatorDisplay.innerText !== '') operate();
	operatorDisplay.innerText = e.type === 'click' ? this.innerText : e.key;
}

document.querySelectorAll('.operation').forEach(btn => {
	btn.addEventListener('click', registerOperator);
});

// add event listeners to all the number buttons
function registerNumber(e) {
	if (isNaN(operand1.innerText) && operand1.innerText.length > 1) resetOperationValues();
	if (operatorDisplay.innerText === '') {
		operand1.innerText += e.target.innerText;
	} else {
		operand2.innerText += e.target.innerText;
	}
}

document.querySelectorAll('.number').forEach( num => {
	num.addEventListener('click', registerNumber);
});

// Add keyboard support
function keyboard(e) {
	if (isNaN(operand1.innerText)) resetOperationValues();
	
	if (e.key >= 0 && e.key <= 9) {
		if (operatorDisplay.innerText === '') {
			operand1.innerText += e.key;
		} else if (operatorDisplay.innerText !== '') {
			operand2.innerText += e.key;
		}
	}
	if (e.key === '.') addDecimalSeparator();
	if (e.key === '+' || e.key === '-' || e.key === '/' || e.key === '*') registerOperator(e);
	if (e.key === '=' || e.key === 'Enter') operate(e);
	if (e.key === 'Backspace') deleteNumber();
}
document.addEventListener('keydown', keyboard);

equalsBtn.addEventListener('click', operate);

// main function for operations
function operate(operator, firstNum, secondNum) {
	if (operand2.innerText === '') return
	operator = operatorDisplay.innerText;
	firstNum = Number(operand1.innerText);
	secondNum = Number(operand2.innerText);
	
	switch (operator) {
		case "+":
			result = Math.round((firstNum + secondNum) * 100) / 100;
			oldValuesContainer.textContent = `${firstNum} + ${secondNum} = `;
			break;
		case "-":
			result = Math.round((firstNum - secondNum) * 100) / 100;
			oldValuesContainer.textContent = `${firstNum} - ${secondNum} = `;
			break;
		case "*":
			result = Math.round((firstNum * secondNum) * 100) / 100;
			oldValuesContainer.textContent = `${firstNum} * ${secondNum} = `;
			break;
		case "/":
			if (secondNum === 0) {
				result = "Only Chuck Norris can divide by zero.";
				oldValuesContainer.textContent = `${firstNum} / ${secondNum} = `;
				prepareForNewOperation();
				return;
			}
			result = Math.round((firstNum / secondNum) * 100) / 100;
			oldValuesContainer.textContent = `${firstNum} / ${secondNum} = `;
			break;
	}
	prepareForNewOperation();
}

function prepareForNewOperation() {
	operand1.innerText = result;
	operatorDisplay.innerText = '';
	operand2.innerText = '';
}

// reset operands, operator and results
function resetOperationValues() {
	operand1.innerText = '';
	operatorDisplay.innerText = '';
	operand2.innerText = '';
	oldValuesContainer.innerText = '';
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
