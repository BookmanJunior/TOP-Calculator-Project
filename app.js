const display = document.getElementById("calculatorDisplay");
const calcDisplay = document.getElementById("currentCalculation");
const resultDisplay = document.getElementById("caclResult");
const functionButtons = document.getElementById("functionButtons");
const numberButtons = Array.from(
  document.getElementsByClassName("number-button")
);
const operatorButtons = Array.from(
  document.getElementsByClassName("operator-button")
);

let num1 = 0;
let num2 = 0;

// numberButtons.addEventListener("click", displayNumber);
numberButtons.forEach((button) =>
  button.addEventListener("click", displayNumber)
);
functionButtons.addEventListener("click", performFunction);

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

function operate(operator, num1, num2) {
  return operator(num1, num2);
}

function displayNumber(e) {
  num1 = parseInt(e.target.textContent);
  if (calcDisplay.textContent === "0") {
    calcDisplay.textContent = num1;
  } else {
    number = document.createTextNode(num1);
    calcDisplay.appendChild(number);
  }
}

function performFunction(e) {
  if (e.target.id === "clear") {
    calcDisplay.textContent = 0;
  }
}
