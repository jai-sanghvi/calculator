let firstNumber;
let secondNumber;
let operator;
let displayValue = '';

const buttonsContainer = document.querySelector('#buttons-container');
const displayContainer = document.querySelector('#display');

buttonsContainer.addEventListener('click', populateDisplay);
document.addEventListener('keydown', calculateThroughKeyboard);

function populateDisplay(e) {
  if (e.target.classList.contains('digits') && (typeof firstNumber !== 'number')) {
    if (displayValue === '0' && e.target.id === 'zero') {
      return;
    } else if (displayValue === '0' && e.target.id !== 'zero') {
      displayValue = e.target.textContent;
      displayContainer.textContent = displayValue;
    } else if (displayValue === '' && e.target.id === 'zero') {
      return;
    } else {
      displayValue += e.target.textContent;
      displayContainer.textContent = displayValue;
    }
  } else if (e.target.classList.contains('digits') && (typeof firstNumber === 'number')) {
    if (displayValue === '0' && e.target.id === 'zero') {
      return;
    } else if (displayValue === '0' && e.target.id !== 'zero') {
      displayValue = e.target.textContent;
      displayContainer.textContent = displayValue;
    } else {
      displayValue += e.target.textContent;
      displayContainer.textContent = displayValue;
    }
  } else if (e.target.classList.contains('operators')) {
    if ((typeof firstNumber === 'number') && displayValue && operator) {
      secondNumber = Number(displayValue);
      let result = operate(operator, firstNumber, secondNumber);
      firstNumber = result;
      secondNumber = null;
      displayValue = String(result);
      displayContainer.textContent = displayValue;
      operator = e.target.id;
      displayValue = '';
    } else if (typeof firstNumber === 'number' && displayValue && !operator) {
      firstNumber = Number(displayValue);
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
    if ((typeof firstNumber === 'number') && displayValue && operator) {
      secondNumber = Number(displayValue);
      let result = operate(operator, firstNumber, secondNumber);
      firstNumber = result;
      secondNumber = null;
      displayValue = String(result);
      displayContainer.textContent = displayValue;
      displayValue = '';
      operator = '';
    }
  } else if (e.target.id === 'clear') {
    firstNumber = null;
    secondNumber = null;
    displayValue = '0';
    displayContainer.textContent = displayValue;
    displayValue = '';
    operator = null;
  } else if (e.target.id === 'sign' && displayContainer.textContent !== '0' && displayContainer.textContent !== '') {
    if ((typeof firstNumber === 'number') && displayValue === '') {
      displayValue = String(-Number(displayContainer.textContent));
      displayContainer.textContent = displayValue;
      firstNumber = Number(displayValue);
      displayValue = '';
    } else {
      displayValue = String(-Number(displayContainer.textContent));
      displayContainer.textContent = displayValue;
    }
  } else if (e.target.id === 'backspace' && displayValue !== '0' && displayValue !== '') {
    displayValue = displayValue.slice(0, displayValue.length - 1);
    displayContainer.textContent = displayValue;
    if (displayValue === '') {
      displayValue = '0';
      displayContainer.textContent = displayValue;
    }
  } else if (e.target.id === 'point') {
    if ((typeof firstNumber === 'number') && displayValue === '') {
      displayValue = '0.';
      displayContainer.textContent = displayValue;
    } else if (displayContainer.textContent.includes('.')) {
      return;
    } else {
      displayValue = displayContainer.textContent.concat('.');
      displayContainer.textContent = displayValue;
    }
  } else if (e.target.id === 'percent' && (typeof firstNumber === 'number') && operator && displayValue) {
    displayValue = String(firstNumber * (Number(displayValue) / 100));
    displayContainer.textContent = displayValue;
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

function calculateThroughKeyboard(e) {
  switch (e.key) {
    case "0":
      document.querySelector('#zero').click();
      break;
    case "1":
      document.querySelector('#one').click();
      break;
    case "2":
      document.querySelector('#two').click();
      break;
    case "3":
      document.querySelector('#three').click();
      break;
    case "4":
      document.querySelector('#four').click();
      break;
    case "5":
      document.querySelector('#five').click();
      break;
    case "6":
      document.querySelector('#six').click();
      break;
    case "7":
      document.querySelector('#seven').click();
      break;
    case "8":
      document.querySelector('#eight').click();
      break;
    case "9":
      document.querySelector('#nine').click();
      break;
    case ".":
      document.querySelector('#point').click();
      break;
    case "+":
      document.querySelector('#addition').click();
      break;
    case "-":
      document.querySelector('#subtraction').click();
      break;
    case "*":
      document.querySelector('#multiplication').click();
      break;
    case "/":
      document.querySelector('#division').click();
      break;
    case "Backspace":
      document.querySelector('#backspace').click();
      break;
    case "Enter":
      document.querySelector('#equals').click();
      break;
    case "Delete":
      document.querySelector('#clear').click();
      break;
    case "F9":
      document.querySelector('#sign').click();
      break;
    case "%":
      document.querySelector('#percent').click();
      break;
  }
}