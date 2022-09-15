let num1;
let num2;
let result;
let operator;

const mainCalcDisplay = document.getElementById("calcResult");
const operationsDisplay = document.getElementById("currentCalcDisplay");
const equalSign = document.getElementById("equalSign");
const functionButtons = document.getElementById("functionButtons");
const clearButton = document.getElementById("clear");
const percentageButton = document.getElementById("percentageButton");
const plusMinusButton = document.getElementById("plusMinusToggle");
const numberButtons = Array.from(
  document.getElementsByClassName("operand-button")
);
const operatorButtons = document.getElementById("operatorButtons");
const equalButton = document.getElementById("equalButton");
const backSpaceButton = document.getElementById("delete");
const decimalBtn = document.getElementById("decimalButton");

numberButtons.forEach((button) =>
  button.addEventListener("click", displayNumber)
);
clearButton.addEventListener("click", clearInput);
operatorButtons.addEventListener("click", operatorOfChoice);
plusMinusButton.addEventListener("click", plusMinus);
percentageButton.addEventListener("click", displayPercentage);
equalButton.addEventListener("click", calculate);
backSpaceButton.addEventListener("click", undoNumber);

// Main functions
function displayNumber(e) {
  const numEntered = e.target.textContent;
  if (operator) {
    num2 = convertNumber(num2, numEntered);
  } else if (!operator) {
    result = undefined; // resets result of the previous calculation.
    num1 = convertNumber(num1, numEntered);
  }
}

function operatorOfChoice(e) {
  if (
    e.target.type !== "submit" ||
    (!isRealNumber(num1) && !isRealNumber(num2) && !isRealNumber(result)) // Prevents choosing an operator if no number was entered
  ) {
  } else if (
    (isRealNumber(num1) && isRealNumber(num2)) ||
    (isRealNumber(result) && isRealNumber(num2)) // Allows chain calculations
  ) {
    calculate();
    operator = e.target.textContent;
  } else {
    operator = e.target.textContent;
  }
  calculate();
}

function calculate() {
  checkDivisionByZero();
  if (
    (isRealNumber(num1) && isRealNumber(num2)) ||
    (isRealNumber(result) && isRealNumber(num2))
  ) {
    if (isRealNumber(result) && operator) {
      continueCalculation();
    } else {
      startNewCalculation();
    }
    num1 = undefined;
    num2 = undefined;
    operator = undefined;
    result = preventOverflow(result);
    mainCalcDisplay.textContent = result;
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

function displayPercentage() {
  if (num1 && !num2) {
    num1 = getPercentage(num1);
  } else if (num2) {
    num2 = getPercentage(num2);
  } else if (result) {
    result = getPercentage(result);
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

// Helper functions
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

const operators = {
  "+": add,
  "-": subtract,
  x: multiply,
  "÷": divide,
};

function isRealNumber(num) {
  return typeof num === "number";
}

function checkForDecimal(num) {
  if (num.toString().includes(".")) {
    decimalBtn.disabled = true;
  } else {
    decimalBtn.disabled = false;
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

function checkDivisionByZero() {
  if (
    (operator === "÷" && isRealNumber(num1) && num2 === 0) ||
    (isRealNumber(result) && num2 === 0)
  ) {
    mainCalcDisplay.textContent = "OOPS";
    num1 = undefined;
    num2 = undefined;
    result = undefined;
    operator = undefined;
  }
}

function continueCalculation() {
  result = operate(operators[operator], result, num2);
  // u00A0 adds space in template literal
  const prevCalc = document.createTextNode(`\u00A0${operator} ${num2}`);
  operationsDisplay.appendChild(prevCalc);
}

function startNewCalculation() {
  result = operate(operators[operator], num1, num2);
  operationsDisplay.textContent = `${num1} ${operator} ${num2}`;
  equalSign.textContent = "=";
  operator = undefined;
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

function preventOverflow(num) {
  if (
    num.toString().length >= 6 &&
    !Number.isInteger(num) &&
    isRealNumber(num)
  ) {
    return parseFloat(num.toFixed(4));
  } else {
    return num;
  }
}

function getPercentage(num) {
  num = num / 100;
  num = preventOverflow(num);
  checkForDecimal(num);
  mainCalcDisplay.textContent = num;
  return num;
}
