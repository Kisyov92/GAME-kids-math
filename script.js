"use strict";

const containerEl = document.querySelector(".container");
const modalEl = document.querySelector(".modal");
const formEl = document.querySelector(".modal-form");
const highNumInputEl = document.querySelector(".high-num-input");
const backdropEl = document.querySelector(".backdrop");
const signsEl = document.querySelector(".signs");
const equationEl = document.querySelector(".equation");
const answersEl = document.querySelector(".answer-options");
const startMsg = document.querySelector(".starting-msg");
const firstNumEl = document.querySelector(".first-num");
const secondNumEl = document.querySelector(".second-num");
const answerEl = document.querySelector(".answer");
const highNumEl = document.querySelector(".high-num");
const signChangingEl = document.querySelector(".sign-changing");
const changeHighNumberEl = document.querySelector(".change-high-num");
const rightAnswerEl = document.querySelector(".answer--right");
const optionEl = document.querySelectorAll(".option");
const answerOptionsEl = document.querySelector(".answer-options");
const points = document.querySelector(".points");
let highestNum = 10,
  answer,
  firstNum,
  solveldEq = 0,
  secondNum = 1;

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  highestNum = +highNumInputEl.value;
  if (highestNum >= 3) {
    highNumEl.textContent = highestNum;

    modalEl.classList.add("hide");
    containerEl.classList.remove("hide");
  }
  highNumInputEl.value = "";
});

function createRandomNumBetween(num1, num2) {
  return Math.floor(Math.random() * (num2 - num1) + num1 + 1);
}

function createRandomAnswers() {
  let ansArr = [0, 0, 0, 0];
  let sign = signChangingEl.textContent;

  switch (sign) {
    case "+": {
      ansArr = ansArr.map(
        () => firstNum + Math.floor(Math.random() * (highestNum - firstNum) + 1)
      );
      break;
    }
    case "-": {
      ansArr = ansArr.map(
        () => firstNum - Math.floor(Math.random() * firstNum)
      );
      break;
    }
    case "x": {
      ansArr = ansArr.map(
        () => firstNum * Math.floor(Math.random() * (highestNum / firstNum))
      );
      break;
    }
    case "÷": {
      ansArr = ansArr.map(() => {
        let devidor = createRandomNumBetween(0, firstNum);
        let option = firstNum / devidor;
        while (!Number.isInteger(option)) {
          secondNum = createRandomNumBetween(0, firstNum);
          option = firstNum / secondNum;
        }
        return option;
      });
    }
  }

  const indexRight = Math.floor(Math.random() * 4);
  ansArr[indexRight] = answer;
  return ansArr;
}

function populateAnswers() {
  const randomAns = createRandomAnswers();
  optionEl.forEach((opt, i) => (opt.textContent = randomAns[i]));
}

function populateEquation() {
  firstNumEl.textContent = firstNum;
  secondNumEl.textContent = secondNum;
  answerEl.textContent = "?";
}

function createPlusEquation() {
  firstNum = createRandomNumBetween(0, highestNum - 1);
  let maxValueSecondNum = highestNum - firstNum;
  secondNum = Math.floor(Math.random() * maxValueSecondNum + 1);
  answer = firstNum + secondNum;

  populateEquation();
}

function createMinusEquation() {
  firstNum = createRandomNumBetween(0, highestNum);
  secondNum = Math.floor(Math.random() * firstNum);
  answer = firstNum - secondNum;

  populateEquation();
}

function helpingMultiplication() {
  firstNum = createRandomNumBetween(0, highestNum / 2);
  secondNum = Math.floor(Math.random() * (highestNum / firstNum));
  answer = firstNum * secondNum;
}

function createMultiplicationEquation() {
  helpingMultiplication();
  while (secondNum <= 1) helpingMultiplication();
  populateEquation();
}

function createDivisionEquation() {
  firstNum = createRandomNumBetween(0, highestNum);
  secondNum = createRandomNumBetween(0, firstNum);
  answer = firstNum / secondNum;
  while (!Number.isInteger(answer)) {
    secondNum = createRandomNumBetween(0, firstNum);
    answer = firstNum / secondNum;
  }

  populateEquation();
}

function newEquation() {
  let sign = signChangingEl.textContent;

  if (sign === "+") {
    createPlusEquation();
    populateAnswers();
  } else if (sign === "-") {
    createMinusEquation();
    populateAnswers();
  } else if (sign === "x") {
    createMultiplicationEquation();
    populateAnswers();
  } else if (sign === "÷") {
    createDivisionEquation();
    populateAnswers();
  }
}

signsEl.addEventListener("click", (e) => {
  const elClassListArr = [...e.target.classList];
  if (!elClassListArr.includes("sign")) return;

  startMsg.classList.add("hide");
  answersEl.classList.remove("hide");
  equationEl.classList.remove("hide");

  if (elClassListArr.includes("plus")) {
    signChangingEl.textContent = "+";
    createPlusEquation();
  }
  if (elClassListArr.includes("minus")) {
    signChangingEl.textContent = "-";
    createMinusEquation();
  }
  if (elClassListArr.includes("multiply")) {
    signChangingEl.textContent = "x";
    createMultiplicationEquation();
  }
  if (elClassListArr.includes("divide")) {
    signChangingEl.textContent = "÷";
    createDivisionEquation();
  }

  populateAnswers();
});

changeHighNumberEl.addEventListener("click", () => {
  modalEl.classList.remove("hide");
  highNumInputEl.focus();
});

backdropEl.addEventListener("click", () => {
  modalEl.classList.add("hide");
  containerEl.classList.remove("hide");
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    modalEl.classList.add("hide");
    containerEl.classList.remove("hide");
  }
});

answerOptionsEl.addEventListener("click", (e) => {
  if (![...e.target.classList].includes("option")) return;

  if (+e.target.textContent === answer) {
    solveldEq++;
    points.textContent = solveldEq;
    answerEl.textContent = answer.toLocaleString();
    answerEl.classList.add("right-answer");
    e.target.classList.add("right-answer");

    setTimeout(() => {
      answerEl.classList.remove("right-answer");
      e.target.classList.remove("right-answer");

      newEquation();
    }, 1000);
  } else {
    e.target.classList.add("wrong-answer");
    setTimeout(() => {
      e.target.classList.remove("wrong-answer");
    }, 1000);
  }
});
