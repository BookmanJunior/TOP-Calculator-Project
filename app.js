const display = document.getElementById("calculatorDisplay");
const calcDisplay = document.getElementById("currentCalculation");
const resultDisplay = document.getElementById("caclResult");
const functionButtons = document.getElementById("functionButtons");
const clearButton = document.getElementById("clear");
const numberButtons = Array.from(
  document.getElementsByClassName("number-button")
);
const operatorButtons = document.getElementById("operatorButtons");
const equalButton = document.getElementById("equalButton");

let num1;
let num2;
let operator;

numberButtons.forEach((button) =>
  button.addEventListener("click", displayNumber)
);
clearButton.addEventListener("click", clearInput);
operatorButtons.addEventListener("click", operatorOfChoice);

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
  if (operator) {
    num2 = parseInt(e.target.textContent);
    calcDisplay.textContent = num2;
  } else {
    num1 = parseInt(e.target.textContent);
    if (calcDisplay.textContent === "0") {
      calcDisplay.textContent = num1;
    } else {
      const number = document.createTextNode(num1);
      calcDisplay.appendChild(number);
      num1 = parseInt(
        document.getElementById("currentCalculation").textContent
      );
      console.log(num1);
    }
  }
}

function clearInput() {
  num1 = undefined;
  num2 = undefined;
  operator = undefined;
  calcDisplay.textContent = 0;
}

// Works
const operators = {
  "+": add,
  "-": subtract,
  X: multiply,
  "÷": divide,
};

function operatorOfChoice(e) {
  if (!operator) {
    if (e.target.id === "equalButton") {
    } else {
      operator = e.target.textContent;
    }
  }

  if (
    (operator === "÷" && typeof num1 === "number" && num2 === 0) ||
    (num1 === 0 && typeof num2 === "number")
  ) {
    calcDisplay.textContent = "OOPSIE";
  } else if (typeof num1 === "number" && typeof num2 === "number") {
    calculate();
  }
}

function calculate() {
  const result = operate(operators[operator], num1, num2);
  num1 = result;
  num2 = undefined;
  operator = undefined;
  calcDisplay.textContent = result;
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
