const display = document.getElementById("calculatorDisplay");
const calcDisplay = document.getElementById("currentCalculation");
const resultDisplay = document.getElementById("caclResult");
const functionButtons = document.getElementById("functionButtons");
const clearButton = document.getElementById("clear");
const percentageButton = document.getElementById("percentageButton");
const plusMinusBtn = document.getElementById("plusMinusToggle");
const numberButtons = Array.from(
  document.getElementsByClassName("number-button")
);
const operatorButtons = document.getElementById("operatorButtons");
const equalButton = document.getElementById("equalButton");
const backSpaceButton = document.getElementById("delete");

let num1;
let num2;
let result;
let operator;

numberButtons.forEach((button) =>
  button.addEventListener("click", displayNumber)
);
clearButton.addEventListener("click", clearInput);
operatorButtons.addEventListener("click", operatorOfChoice);
plusMinusBtn.addEventListener("click", plusMinus);
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
  x: multiply,
  "÷": divide,
};

function operatorOfChoice(e) {
  if (e.target.type !== "submit" || (!num1 && !num2 && !result)) {
  } else {
    operator = e.target.textContent;
  }
  calculate();
}

function calculate() {
  if (
    (typeof num1 === "number" && typeof num2 === "number") ||
    (typeof result === "number" && typeof num2 === "number")
  ) {
    if (
      (typeof num1 === "number" && num2 === 0) ||
      (num1 === 0 && typeof num2 === "number") ||
      (typeof result === "number" && num2 === 0)
    ) {
      calcDisplay.textContent = "OOPS";
      num1 = undefined;
      num2 = undefined;
      result = undefined;
      operator = undefined;
      return;
    }
    if (result && operator) {
      result = operate(operators[operator], result, num2);
      // u00A0 adds space in template literal
      const prevCalc = document.createTextNode(`\u00A0${operator} ${num2}`);
      resultDisplay.appendChild(prevCalc);
    } else {
      result = operate(operators[operator], num1, num2);
      resultDisplay.textContent = `${num1} ${operator} ${num2}`;
      operator = undefined;
    }
    num1 = undefined;
    num2 = undefined;
    operator = undefined;
    calcDisplay.textContent = result;
  }
}

function clearInput() {
  num1 = undefined;
  num2 = undefined;
  result = undefined;
  operator = undefined;
  calcDisplay.textContent = 0;
  resultDisplay.textContent = 0;
}

function plusMinus() {
  if (num1 && !num2) {
    num1 = -num1;
    calcDisplay.textContent = num1;
  } else if (num2) {
    num2 = -num2;
    calcDisplay.textContent = num2;
  } else if (result) {
    result = -result;
    calcDisplay.textContent = result;
  }
}

function calculatePercentage() {
  if (num1 && !num2) {
    num1 = num1 / 100;
    calcDisplay.textContent = num1;
  } else if (num2) {
    num2 = num2 / 100;
    calcDisplay.textContent = num2;
  } else if (result) {
    result = result / 100;
    calcDisplay.textContent = result;
  }
}

function undoNumber() {
  if (num1 && !num2) {
    removeLastDigit(num1);
  } else if (num2) {
    removeLastDigit(num2);
  } else if (result) {
    removeLastDigit(result);
  }
}

function removeLastDigit(num) {
  num = parseFloat(num.toString().slice(0, -1));
  if (num.toString() === "NaN") {
    num = 0;
  }
  calcDisplay.textContent = num;
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
