const equalsBtn = document.getElementById('equals');
const deleteBtn = document.getElementById('clear-entry');
const clearAllBtn = document.getElementById('clear-all');
const decimalSeparatorBtn = document.getElementById('decimal-separator');

function addDecimalSeparator() {
	(operatorDisplay.innerText === '') ? operand1.innerText += '.' : operand2.innerText += '.';
	decimalSeparatorBtn.style.pointerEvents = 'none';
}

decimalSeparatorBtn.addEventListener('click', addDecimalSeparator);

const oldValuesContainer = document.getElementById('old-values-container');
const operatorDisplay = document.getElementById('operator-display');

let operand1 = document.getElementById('operand1');
let operand2 = document.getElementById('operand2');
let result = '';

// register operator on click
function registerOperator() {
	if (operatorDisplay.innerText !== '') operate();
	operatorDisplay.innerText = this.innerText;
	decimalSeparatorBtn.style.pointerEvents = 'all';
}

document.querySelectorAll('.operation').forEach(btn => {
	btn.addEventListener('click', registerOperator);
});

// add event listeners to all the number buttons
function registerNumber(e) {
	if (operatorDisplay.innerText === '') {
		operand1.innerText += e.target.innerText;
	} else {
		operand2.innerText += e.target.innerText;
	}
}

document.querySelectorAll('.number').forEach( num => {
	num.addEventListener('click', registerNumber);
});

equalsBtn.addEventListener('click', operate);

// main function for operations
function operate(operator, firstNum, secondNum) {
	if (operand2.innerText === '') return
	operator = operatorDisplay.innerText;
	firstNum = Number(operand1.innerText);
	secondNum = Number(operand2.innerText);
	
	switch (operator) {
		case "+":
			result = firstNum + secondNum;
			oldValuesContainer.textContent = `${firstNum} + ${secondNum} = `;
			break;
		case "-":
			result = firstNum - secondNum;
			oldValuesContainer.textContent = `${firstNum} - ${secondNum} = `;
			break;
		case "*":
			result = firstNum * secondNum;
			oldValuesContainer.textContent = `${firstNum} * ${secondNum} = `;
			break;
		case "/":
			result = firstNum / secondNum;
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
