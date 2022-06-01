const equalsBtn = document.getElementById('equals');
const deleteBtn = document.getElementById('clear-entry');
const clearAllBtn = document.getElementById('clear-all');
const decimalSeparatorBtn = document.getElementById('decimal-separator');
const negativeNumBtn = document.getElementById('toggle-negative-number');

const oldValuesDisplay = document.getElementById('old-values-display');
const operatorDisplay = document.getElementById('operator-display');

const operand1 = document.getElementById('operand1');
const operand2 = document.getElementById('operand2');
let result = '';

// event listeners
document.querySelectorAll('.number').forEach( num => {
	num.addEventListener('click', registerNumber);
});

document.querySelectorAll('.operator').forEach(btn => {
	btn.addEventListener('click', registerOperator);
});

negativeNumBtn.addEventListener('click', toggleNegativeNumber);
decimalSeparatorBtn.addEventListener('click', addDecimalSeparator);
deleteBtn.addEventListener('click', deleteNumber);
equalsBtn.addEventListener('click', operate);
clearAllBtn.addEventListener('click', resetAllValues);
document.addEventListener('keydown', registerKeyboardInput);

// input functions
function registerNumber(e) {
	if (operand1.innerText === '0') operand1.innerText = '';
	if (operatorDisplay.innerText === '') {
		operand1.innerText += e.target.innerText;
	} else {
		operand2.innerText += e.target.innerText;
	}
	e.target.blur();
}

function registerOperator(e) {
	if (operatorDisplay.innerText === '/' && Math.abs(operand2.innerText) === 0) {
		resetAllValues();
		alert("Only Chuck Norris can divide by zero.");
		e.target.blur();
		return;
	}
	if (operatorDisplay.innerText !== '')  operate();
	operatorDisplay.innerText = e.type === 'click' ? this.innerText : e.key;
	e.target.blur();
}

function deleteNumber() {
	if (operand1.innerText === '0') {
		this.blur()
		return;
	}
	if (operatorDisplay.innerText === '') {
		operand1.innerText = operand1.innerText.slice(0, -1);
		if (operand1.innerText.length === 0) operand1.innerText = '0';
	} else {
		operand2.innerText = operand2.innerText.slice(0, -1);
	}
	this.blur();
}

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
	this.blur();
}

function addDecimalSeparator() {
	if (operatorDisplay.innerText === '') {
		if (operand1.innerText.includes('.')) return;
		if (operand1.innerText === '') operand1.innerText += '0';
		operand1.innerText += '.'
	} else {
		if (operand2.innerText.includes('.')) return;
		if (operand2.innerText === '') operand2.innerText += '0';
		operand2.innerText += '.';
	}
	this.blur();
}

function registerKeyboardInput(e) {
	if (operand1.innerText === '0') operand1.innerText = '';
	if (e.key >= 0 && e.key <= 9) {
		if (operatorDisplay.innerText === '') {
			operand1.innerText += e.key;
		} else if (operatorDisplay.innerText !== '') {
			operand2.innerText += e.key;
		}
	}
	if (e.key === '.') addDecimalSeparator();
	if (e.key === '+' || e.key === '-' || e.key === '/' || e.key === '*') registerOperator(e);
	if (e.key === '=' || e.key === 'Enter') operate();
	if (e.key === 'Backspace') deleteNumber();
}

// main function for math operations
function operate(operator, firstNum, secondNum) {
	this.blur();
	if (operand2.innerText === '') return;
	operator = operatorDisplay.innerText;
	firstNum = Number(operand1.innerText);
	secondNum = Number(operand2.innerText);
	
	switch (operator) {
		case "+":
			result = Math.round((firstNum + secondNum) * 100) / 100;
			oldValuesDisplay.textContent = `${firstNum} + ${secondNum} = `;
			break;
		case "-":
			result = Math.round((firstNum - secondNum) * 100) / 100;
			oldValuesDisplay.textContent = `${firstNum} - ${secondNum} = `;
			break;
		case "*":
			result = Math.round((firstNum * secondNum) * 100) / 100;
			oldValuesDisplay.textContent = `${firstNum} * ${secondNum} = `;
			break;
		case "/":
			if (Math.abs(operand2.innerText) === 0) {
				resetAllValues();
				alert("Only Chuck Norris can divide by zero.");
				return;
			}
			result = Math.round((firstNum / secondNum) * 100) / 100;
			oldValuesDisplay.textContent = `${firstNum} / ${secondNum} = `;
			break;
	}
	prepareForNewOperation();
}

function prepareForNewOperation() {
	operand1.innerText = result;
	operatorDisplay.innerText = '';
	operand2.innerText = '';
}

function resetAllValues() {
	operand1.innerText = '0';
	operatorDisplay.innerText = '';
	operand2.innerText = '';
	oldValuesDisplay.innerText = '';
	this.blur();
}
