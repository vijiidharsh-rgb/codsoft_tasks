let expression = "";
let lastAnswer = 0;
let angleMode = "DEG";

const expressionDisplay = document.getElementById("expression");
const resultDisplay = document.getElementById("result");
const angleButton = document.getElementById("angleMode");
const historyContainer = document.getElementById("history");



function appendValue(value) {
    expression += value;

    updateDisplay();
}


function appendFunction(value) {
    expression += value;

    updateDisplay();
}


function updateDisplay() {
    expressionDisplay.textContent =
        expression || "0";
}



function clearCalculator() {

    expression = "";

    expressionDisplay.textContent = "0";
    resultDisplay.textContent = "0";
}


function deleteLast() {

    expression = expression.slice(0, -1);

    updateDisplay();
}



function toggleAngleMode() {

    if (angleMode === "DEG") {
        angleMode = "RAD";
    } else {
        angleMode = "DEG";
    }

    angleButton.textContent = angleMode;
}



function useAnswer() {

    expression += lastAnswer;

    updateDisplay();
}



function factorial(n) {

    if (n < 0 || !Number.isInteger(n)) {
        throw new Error("Invalid factorial");
    }

    if (n === 0 || n === 1) {
        return 1;
    }

    let result = 1;

    for (let i = 2; i <= n; i++) {
        result *= i;
    }

    return result;
}



function sin(x) {

    if (angleMode === "DEG") {
        return Math.sin(x * Math.PI / 180);
    }

    return Math.sin(x);
}


function cos(x) {

    if (angleMode === "DEG") {
        return Math.cos(x * Math.PI / 180);
    }

    return Math.cos(x);
}


function tan(x) {

    if (angleMode === "DEG") {
        return Math.tan(x * Math.PI / 180);
    }

    return Math.tan(x);
}




function asin(x) {

    let result = Math.asin(x);

    if (angleMode === "DEG") {
        return result * 180 / Math.PI;
    }

    return result;
}


function acos(x) {

    let result = Math.acos(x);

    if (angleMode === "DEG") {
        return result * 180 / Math.PI;
    }

    return result;
}


function atan(x) {

    let result = Math.atan(x);

    if (angleMode === "DEG") {
        return result * 180 / Math.PI;
    }

    return result;
}



function log(x) {
    return Math.log10(x);
}


function ln(x) {
    return Math.log(x);
}



function sqrt(x) {
    return Math.sqrt(x);
}



function prepareExpression(exp) {

    exp = exp
        .replace(/π/g, "Math.PI")
        .replace(/\be\b/g, "Math.E")

        .replace(/\^/g, "**")

        .replace(/(\d+(?:\.\d+)?)%/g, "($1/100)");

    return exp;
}



function calculate() {

    if (!expression) {
        return;
    }

    try {

        let originalExpression = expression;

        let prepared = prepareExpression(expression);

        let result = Function(
            "sin",
            "cos",
            "tan",
            "asin",
            "acos",
            "atan",
            "log",
            "ln",
            "sqrt",
            "factorial",
            `"use strict"; return (${prepared});`
        )(
            sin,
            cos,
            tan,
            asin,
            acos,
            atan,
            log,
            ln,
            sqrt,
            factorial
        );

        if (!Number.isFinite(result)) {
            throw new Error("Invalid result");
        }

        result = formatResult(result);

        resultDisplay.textContent = result;

        lastAnswer = Number(result);

        addHistory(originalExpression, result);

    } catch (error) {

        resultDisplay.textContent = "Error";
    }
}


function formatResult(value) {

    if (Number.isInteger(value)) {
        return value.toString();
    }

    return Number(value.toFixed(10)).toString();
}



function addHistory(exp, result) {

    const item = document.createElement("div");

    item.className = "history-item";

    item.innerHTML = `
        <div class="history-expression">
            ${escapeHTML(exp)}
        </div>

        <div class="history-result">
            = ${escapeHTML(result)}
        </div>
    `;

    item.onclick = function () {

        expression = result;

        updateDisplay();
    };

    historyContainer.prepend(item);
}



function clearHistory() {

    historyContainer.innerHTML = "";
}


function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}



document.addEventListener("keydown", function(event) {

    const key = event.key;

    if (
        /[0-9+\-*/().^%]/.test(key)
    ) {

        expression += key;

        updateDisplay();
    }

    else if (key === "Enter") {

        calculate();
    }

    else if (key === "Backspace") {

        deleteLast();
    }

    else if (key === "Escape") {

        clearCalculator();
    }

});
