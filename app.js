let num1;
let num2;
let result;
let operator;

const mainCalcDisplay = document.getElementById("mainDisplay");
const secondaryDisplay = document.getElementById("secondaryDisplay");
const operationsDisplay = document.getElementById("currentCalcDisplay");
const equalSign = document.getElementById("equalSign");
const functionButtons = document.getElementById("functionButtons");
const clearButton = document.getElementById("clear");
const percentageButton = document.getElementById("percentageButton");
const plusMinusButton = document.getElementById("plusMinusToggle");
const operandButtons = document.querySelectorAll(".operand-button");
const operatorButtons = document.getElementById("operatorButtons");
const equalButton = document.getElementById("equalButton");
const backSpaceButton = document.getElementById("delete");
const decimalBtn = document.getElementById("decimalButton");
const displayNum1 = document.querySelector(".num1");
const displayNum2 = document.querySelector(".num2");
const displayOperatorSign = document.querySelector(".operator-sign");
const displayResult = document.querySelector(".display-result");

operandButtons.forEach((button) => button.addEventListener("click", getNumber));
clearButton.addEventListener("click", reset);
operatorButtons.addEventListener("click", operatorOfChoice);
plusMinusButton.addEventListener("click", plusMinus);
percentageButton.addEventListener("click", displayPercentage);
equalButton.addEventListener("click", calculate);
backSpaceButton.addEventListener("click", undoNumber);
secondaryDisplay.addEventListener("transitionend", removeTransform);
mainCalcDisplay.addEventListener("animationend", removeAnimation);

// Main functions
function getNumber(e) {
  const numEntered = e.target.textContent;
  if (operator) {
    num2 = convertNumber(num2, numEntered, displayNum2);
  } else if (!operator) {
    result = undefined; // resets result of the previous calculation.
    displayResult.textContent = "";
    num1 = convertNumber(num1, numEntered, displayNum1);
  }
}

function operatorOfChoice(e) {
  if (
    e.target.type !== "submit" ||
    (!num1 && !num2 && !isRealNumber(result)) // Prevents choosing an operator if no number was entered
  ) {
  } else if (
    (num1 && num2) ||
    (result && num2) // Allows chain calculations
  ) {
    calculate();
    operator = e.target.textContent;
    displayOperatorSign.textContent = operator;
  } else {
    operator = e.target.textContent;
    displayOperatorSign.textContent = operator;
  }
  calculate();
}

function calculate() {
  checkDivisionByZero();
  if ((!num1 && !num2) || (!num2 && !result)) return;
  if (isRealNumber(result) && operator) {
    continueCalculation();
  } else {
    startNewCalculation();
  }
  secondaryDisplay.classList.add("update-calculation-animation");
  mainCalcDisplay.classList.add("result-update-animation");
  num1 = undefined;
  num2 = undefined;
  operator = undefined;
  result = preventOverflow(result);
  displayResult.textContent = result;
  resetPreviousCalculationDisplay();
}

function reset() {
  num1 = undefined;
  num2 = undefined;
  result = undefined;
  operator = undefined;
  operationsDisplay.textContent = 0;
  equalSign.textContent = "";
  decimalBtn.disabled = false;
  resetPreviousCalculationDisplay();
  displayNum1.textContent = 0;
  displayResult.textContent = "";
}

function plusMinus() {
  if (num1 && !num2) {
    num1 = -num1;
    displayNum1.textContent = num1;
  } else if (num2) {
    num2 = -num2;
    displayNum2.textContent = num2;
  } else if (result) {
    result = -result;
    displayResult.textContent = result;
  }
}

function displayPercentage() {
  if (num1 && !num2) {
    num1 = getPercentage(num1, displayNum1);
  } else if (num2) {
    num2 = getPercentage(num2, displayNum2);
  } else if (result) {
    result = getPercentage(result, displayResult);
  }
}

function undoNumber() {
  if (num1 && !num2 && !operator) {
    num1 = removeLastInput(num1, displayNum1);
  } else if (num2) {
    num2 = removeLastInput(num2, displayNum2);
  } else if (operator) {
    operator = removeLastInput(operator, displayOperatorSign);
  } else if (result) {
    result = removeLastInput(result, displayResult);
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
  return operation(parseFloat(num1), parseFloat(num2));
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

function convertNumber(num, input, displayNumber) {
  num += input;
  checkForDecimal(num);
  if (input === ".") {
    num = num.replace("undefined", 0);
  } else {
    num = num.replace("undefined", "");
  }
  displayNumber.textContent = num;
  return num;
}

function checkDivisionByZero() {
  if ((operator === "÷" && num1 && num2 === 0) || (result && num2 === 0)) {
    displayResult.textContent = "OOPS";
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

function removeLastInput(input, displayInput) {
  input = input.toString().slice(0, -1);
  if (!input) {
    input = "";
  }
  checkForDecimal(input);
  if (
    (!input && displayInput.classList.contains("num1")) ||
    (!input && displayInput.classList.contains("display-result"))
  ) {
    displayInput.textContent = 0;
  } else {
    displayInput.textContent = input;
  }
  return input;
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

function getPercentage(num, displayNumber) {
  num = num / 100;
  num = preventOverflow(num);
  checkForDecimal(num);
  displayNumber.textContent = num;
  return num;
}

function removeTransform(e) {
  if (e.propertyName !== "transform") return;
  this.classList.remove("update-calculation-animation");
}

function removeAnimation(AnimationEvent) {
  if (AnimationEvent.animationName !== "slide-to-top") return;
  this.classList.remove("result-update-animation");
}

function resetPreviousCalculationDisplay() {
  displayNum1.textContent = "";
  displayNum2.textContent = "";
  displayOperatorSign.textContent = "";
}
