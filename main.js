"use strict";
const numberButtons = document.querySelectorAll(".btn-num");
const operationButtons = document.querySelectorAll(".btn-operation");
const equalsButton = document.querySelector(".btn-equals");
const clearButton = document.querySelector(".btn-clear");
const clearEntryButton = document.querySelector(".btn-clearEntry");
const display = document.querySelector(".display-text");
let firstOperand = "";
let secondOperand = "";
let currentOperand = "first";
let operation = null;
function buildOperand(numFromButton) {
    if (!numFromButton)
        return;
    if (currentOperand === "first") {
        if (numFromButton === "." &&
            (Array(firstOperand).includes(".") || firstOperand === "")) {
            return;
        }
        firstOperand += numFromButton;
        display.textContent = firstOperand;
    }
    if (currentOperand === "second") {
        secondOperand += numFromButton;
        display.textContent = secondOperand;
    }
}
function selectOperation(operationFromButton) {
    if (firstOperand && !secondOperand) {
        operation = operationFromButton;
        currentOperand = "second";
    }
    if (firstOperand && secondOperand)
        evaluate();
}
let divideByZeroCount = 0;
function evaluate() {
    if (!firstOperand || !secondOperand)
        return;
    let divideByZeroResponses = [
        "undefined",
        "undefined",
        "that won't work",
        "you can't do that",
        "please stop...",
        "undefeenied",
        "...",
        "you're killing me",
        "no more",
        ":(",
        "i give up",
    ];
    switch (operation) {
        case "divide":
            firstOperand = String((+firstOperand / +secondOperand).toFixed(2));
            if (secondOperand === "0") {
                firstOperand = divideByZeroResponses[divideByZeroCount];
                divideByZeroResponses[divideByZeroCount + 1]
                    ? divideByZeroCount++
                    : (divideByZeroCount = 0);
                console.log(divideByZeroCount);
            }
            break;
        case "multiply":
            firstOperand = String((+firstOperand * +secondOperand).toFixed(2));
            break;
        case "add":
            firstOperand = String((+firstOperand + +secondOperand).toFixed(2));
            break;
        case "subtract":
            firstOperand = String((+firstOperand - +secondOperand).toFixed(2));
            break;
    }
    display.textContent = firstOperand;
    secondOperand = "";
}
function clear() {
    display.textContent = "";
    firstOperand = "";
    secondOperand = "";
    currentOperand = "first";
    operation = null;
}
function clearEntry() {
    currentOperand === "first" ? (firstOperand = "") : (secondOperand = "");
    display.textContent = "";
}
// EVENT LISTENERS //
numberButtons.forEach((numberButton) => {
    if (numberButton instanceof HTMLElement) {
        numberButton.addEventListener("click", () => buildOperand(numberButton.dataset["number"]));
    }
});
operationButtons.forEach((operationButton) => {
    if (operationButton instanceof HTMLElement) {
        operationButton.addEventListener("click", () => selectOperation(operationButton.dataset["operation"]));
    }
});
equalsButton.addEventListener("click", evaluate);
clearButton.addEventListener("click", clear);
clearEntryButton.addEventListener("click", clearEntry);
