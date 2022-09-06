const display = document.getElementById("calculatorDisplay");
const calcDisplay = document.getElementById("currentCalculation");
const resultDisplay = document.getElementById("caclResult");
const functionButtons = document.getElementById("functionButtons");
const clearButton = document.getElementById("clear");
const percentageButton = document.getElementById("percentageButton");
const numberButtons = Array.from(
  document.getElementsByClassName("number-button")
);
const operatorButtons = document.getElementById("operatorButtons");
const equalButton = document.getElementById("equalButton");

let num1;
let num2;
let result;
let operator;

numberButtons.forEach((button) =>
  button.addEventListener("click", displayNumber)
);
clearButton.addEventListener("click", clearInput);
operatorButtons.addEventListener("click", operatorOfChoice);
percentageButton.addEventListener("click", calculatePercentage);

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

function operate(operation, num1, num2) {
  return operation(num1, num2);
}

function displayNumber(e) {
  const numEntered = e.target.textContent;
  if (operator) {
    num2 = convertNumber(num2, numEntered);
  } else if (!operator) {
    result = undefined;
    num1 = convertNumber(num1, numEntered);
  } else {
    num2 = convertNumber(num2, numEntered);
  }
}

function convertNumber(num, input) {
  num += input;
  if (input === ".") {
    num = num.replace("undefined", "");
  } else {
    num = parseFloat(num.replace("undefined", ""));
  }
  calcDisplay.textContent = num;
  return num;
}

// Works
const operators = {
  "+": add,
  "-": subtract,
  X: multiply,
  "÷": divide,
};

function operatorOfChoice(e) {
  if (e.target.id === "equalButton" || e.target.type !== "submit") {
  } else {
    operator = e.target.textContent;
  }

  if (
    (typeof num1 === "number" && num2 === 0) ||
    (num1 === 0 && typeof num2 === "number") ||
    (typeof result === "number" && num2 === 0)
  ) {
    calcDisplay.textContent = "OOPS";
  } else if (
    (typeof num1 === "number" && typeof num2 === "number") ||
    (typeof result === "number" && typeof num2 === "number")
  ) {
    calculate();
  }
}

function calculate() {
  if (result && operator) {
    result = operate(operators[operator], result, num2);
  } else {
    result = operate(operators[operator], num1, num2);
    operator = undefined;
  }
  num1 = undefined;
  num2 = undefined;
  operator = undefined;
  calcDisplay.textContent = result;
}

function clearInput() {
  num1 = undefined;
  num2 = undefined;
  result = undefined;
  operator = undefined;
  calcDisplay.textContent = 0;
}

function calculatePercentage() {
  if (num1 && !num2) {
    num1 = num1 / 100;
    calcDisplay.textContent = num1;
  } else if (num2) {
    num2 = num2 / 100;
    calcDisplay.textContent = num2;
  } else {
    result = result / 100;
    calcDisplay.textContent = result;
  }
}

// Doesn't work
// function operatorOfChoice(e) {
//   operator = e.target.id;
//   console.log(operator);
// }

// function calculate() {
//   let result = operate(operator, num1, num2);
//   calcDisplay.textContent = result;
// }
