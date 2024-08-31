let firstNumber;
let secondNumber;
let operator;
let displayValue = '';

const buttonsContainer = document.querySelector('#buttons-container');
const displayContainer = document.querySelector('#display');

buttonsContainer.addEventListener('click', populateDisplay);

function populateDisplay(e) {
  if (e.target.classList.contains('digits') && (typeof firstNumber !== 'number')) {
    if (displayValue === '0' && e.target.id === '0') {
      return;
    } else if (displayValue === '' && e.target.id === '0') {
      return;
    } else {
      displayValue += e.target.id;
      displayContainer.textContent = displayValue;
    }
  } else if (e.target.classList.contains('digits') && (typeof firstNumber === 'number')) {
    displayValue += e.target.id;
    displayContainer.textContent = displayValue;
  } else if (e.target.classList.contains('operators')) {
    if ((typeof firstNumber === 'number') && displayValue) {
      secondNumber = Number(displayValue);
      let result = operate(operator, firstNumber, secondNumber);
      firstNumber = result;
      secondNumber = null;
      displayValue = String(result);
      displayContainer.textContent = displayValue;
      operator = e.target.id;
      displayValue = '';
    } else if (typeof firstNumber === 'number') {
      operator = e.target.id;
    } else {
      if (displayValue) {
        firstNumber = Number(displayValue);
        operator = e.target.id;
        displayValue = '';
      } else {
        firstNumber = 0;
        operator = e.target.id;
      }
    }
  } else if (e.target.id === 'equals') {
    if ((typeof firstNumber === 'number') && displayValue) {
      secondNumber = Number(displayValue);
      let result = operate(operator, firstNumber, secondNumber);
      firstNumber = result;
      secondNumber = null;
      displayValue = String(result);
      displayContainer.textContent = displayValue;
      displayValue = '';
    }
  } else if (e.target.id === 'clear') {
    firstNumber = null;
    secondNumber = null;
    displayValue = '0';
    displayContainer.textContent = displayValue;
    displayValue = '';
    operator = null;
  }
}

function operate(operator, num1, num2) {
  let result;
  switch (operator) {
    case "addition":
      result = add(num1, num2);
      break;
    case "subtraction":
      result = subtract(num1, num2);
      break;
    case "multiplication":
      result = multiply(num1, num2);
      break;
    case "division":
      result = divide(num1, num2);
      break;
  }
  return result;
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  return a / b;
}