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
        //Disable user from beginning operand with decimal and adding multiple decimals to operand
        if (numFromButton === ".") {
            if (firstOperand.includes("."))
                return;
            if (firstOperand === "")
                firstOperand += "0";
        }
        //Limit operand length to 9 digits to prevent overflow
        if (firstOperand.length < 8) {
            firstOperand += numFromButton;
            display.textContent = firstOperand;
        }
    }
    if (currentOperand === "second") {
        if (numFromButton === ".") {
            if (secondOperand.includes("."))
                return;
            if (secondOperand === "")
                secondOperand += "0";
        }
        if (secondOperand.length < 8) {
            secondOperand += numFromButton;
            display.textContent = secondOperand;
        }
    }
}
function selectOperation(operationFromButton) {
    if (firstOperand && !secondOperand) {
        operation = operationFromButton;
        currentOperand = "second";
        setActiveOperationButton();
    }
    if (!firstOperand && display.textContent) {
        firstOperand = display.textContent;
        operation = operationFromButton;
        currentOperand = "second";
        setActiveOperationButton();
    }
    if (firstOperand && secondOperand) {
        evaluate();
        operation = operationFromButton;
        setActiveOperationButton();
    }
    function setActiveOperationButton() {
        operationButtons.forEach((button) => {
            if (button instanceof HTMLElement) {
                if (button.dataset["operation"] === operationFromButton) {
                    button.classList.add("btn-operation-current");
                }
                else {
                    button.classList.remove("btn-operation-current");
                }
            }
        });
    }
}
function clearActiveOperation() {
    operationButtons.forEach((button) => {
        if (button instanceof HTMLElement) {
            button.classList.remove("btn-operation-current");
        }
    });
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
        "defined",
        "just kidding... still undefined",
        "you're unforgiven",
        "unfortunate",
        "YOU UNDE-FOOL!",
        "UNDE-PLEASE STOP!",
        "I'm calculating your demise",
        "you're persistent, I'll give you that",
        "alright, pal...",
        "...",
        "you're killing me",
        "no more",
        ":(",
        "i give up",
        "this is it",
        "you're reaching the end",
        "i'm running out of messages for you",
        "take me home, country roads",
        "Goodbye.",
    ];
    switch (operation) {
        case "divide":
            if (secondOperand === "0") {
                firstOperand = divideByZeroResponses[divideByZeroCount];
                divideByZeroResponses[divideByZeroCount + 1]
                    ? divideByZeroCount++
                    : (divideByZeroCount = 0);
            }
            else {
                firstOperand = String(+firstOperand / +secondOperand);
            }
            break;
        case "multiply":
            firstOperand = String(+firstOperand * +secondOperand);
            break;
        case "add":
            firstOperand = String(+firstOperand + +secondOperand);
            break;
        case "subtract":
            firstOperand = String(+firstOperand - +secondOperand);
            break;
    }
    console.log(firstOperand);
    if (firstOperand.includes(".") && firstOperand.split(".")[1].length > 3) {
        let numberOperand = Number(firstOperand);
        firstOperand = numberOperand.toFixed(3);
    }
    //If result is larger than 8 digits, convert to scientific notation
    if (firstOperand.length > 8 && secondOperand != "0") {
        let numberOperand = Number(firstOperand);
        firstOperand = String(numberOperand.toExponential(2));
    }
    display.textContent = firstOperand;
    secondOperand = "";
    firstOperand = "";
    currentOperand = "first";
    operation = null;
    clearActiveOperation();
}
function clear() {
    display.textContent = "";
    firstOperand = "";
    secondOperand = "";
    currentOperand = "first";
    operation = null;
    clearActiveOperation();
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
