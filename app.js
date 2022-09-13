const mainCalcDisplay = document.getElementById("calcResult");
const operationsDisplay = document.getElementById("currentCalcDisplay");
const equalSign = document.getElementById("equalSign");
const functionButtons = document.getElementById("functionButtons");
const clearButton = document.getElementById("clear");
const percentageButton = document.getElementById("percentageButton");
const plusMinusButton = document.getElementById("plusMinusToggle");
const numberButtons = Array.from(
  document.getElementsByClassName("number-button")
);
const operatorButtons = document.getElementById("operatorButtons");
const equalButton = document.getElementById("equalButton");
const backSpaceButton = document.getElementById("delete");
const decimalBtn = document.getElementById("decimalButton");

let num1;
let num2;
let result;
let operator;

numberButtons.forEach((button) =>
  button.addEventListener("click", displayNumber)
);
clearButton.addEventListener("click", clearInput);
operatorButtons.addEventListener("click", operatorOfChoice);
plusMinusButton.addEventListener("click", plusMinus);
percentageButton.addEventListener("click", calculatePercentage);
equalButton.addEventListener("click", calculate);
backSpaceButton.addEventListener("click", undoNumber);

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
  checkForDecimal(num);
  if (input === ".") {
    num = num.replace("undefined", 0);
  } else {
    num = parseFloat(num.replace("undefined", ""));
  }
  mainCalcDisplay.textContent = num;
  return num;
}

function checkForDecimal(num) {
  if (num.toString().includes(".")) {
    decimalBtn.disabled = true;
  } else {
    decimalBtn.disabled = false;
  }
}

// Works
const operators = {
  "+": add,
  "-": subtract,
  x: multiply,
  "÷": divide,
};

function operatorOfChoice(e) {
  if (
    e.target.type !== "submit" ||
    (typeof num1 !== "number" && !num2 && !result)
  ) {
  } else {
    operator = e.target.textContent;
  }
  calculate();
}

function calculate() {
  checkDivisionByZero();
  if (
    (typeof num1 === "number" && typeof num2 === "number") ||
    (typeof result === "number" && typeof num2 === "number")
  ) {
    if (result && operator) {
      result = operate(operators[operator], result, num2);
      // u00A0 adds space in template literal
      const prevCalc = document.createTextNode(`\u00A0${operator} ${num2}`);
      operationsDisplay.appendChild(prevCalc);
    } else {
      result = operate(operators[operator], num1, num2);
      operationsDisplay.textContent = `${num1} ${operator} ${num2}`;
      equalSign.appendChild(document.createTextNode("="));
      operator = undefined;
    }
    num1 = undefined;
    num2 = undefined;
    operator = undefined;
    result = Math.round(result * 100) / 100;
    mainCalcDisplay.textContent = result;
  }
}

function checkDivisionByZero() {
  if (
    (typeof num1 === "number" && num2 === 0) ||
    (typeof result === "number" && num2 === 0)
  ) {
    mainCalcDisplay.textContent = "OOPS";
    num1 = undefined;
    num2 = undefined;
    result = undefined;
    operator = undefined;
  }
}

function clearInput() {
  num1 = undefined;
  num2 = undefined;
  result = undefined;
  operator = undefined;
  mainCalcDisplay.textContent = 0;
  operationsDisplay.textContent = 0;
  equalSign.textContent = "";
  decimalBtn.disabled = false;
}

function plusMinus() {
  if (num1 && !num2) {
    num1 = -num1;
    mainCalcDisplay.textContent = num1;
  } else if (num2) {
    num2 = -num2;
    mainCalcDisplay.textContent = num2;
  } else if (result) {
    result = -result;
    mainCalcDisplay.textContent = result;
  }
}

function calculatePercentage() {
  if (num1 && !num2) {
    num1 = num1 / 100;
    mainCalcDisplay.textContent = num1;
  } else if (num2) {
    num2 = num2 / 100;
    mainCalcDisplay.textContent = num2;
  } else if (result) {
    result = result / 100;
    mainCalcDisplay.textContent = result;
  }
}

function undoNumber() {
  if (num1 && !num2) {
    num1 = removeLastDigit(num1);
  } else if (num2) {
    num2 = removeLastDigit(num2);
  } else if (result) {
    result = removeLastDigit(result);
  }
}

function removeLastDigit(num) {
  num = num.toString().slice(0, -1);
  if (!num) {
    num = 0;
  }
  if (!num.toString().includes(".")) {
    num = parseFloat(num);
  }
  checkForDecimal(num);
  mainCalcDisplay.textContent = num;
  return num;
}

// Doesn't work
// function operatorOfChoice(e) {
//   operator = e.target.id;
//   console.log(operator);
// }

// function calculate() {
//   let result = operate(operator, num1, num2);
//   mainCalcDisplay.textContent = result;
// }
