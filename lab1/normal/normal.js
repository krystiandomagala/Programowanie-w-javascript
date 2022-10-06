const addInputBtn = document.querySelector("#add-input");
const leftSideInputContainer = document.querySelector(
  "#left-side-input-container"
);
const inputElement = document.querySelector(".input-group");
const inputElements = document.querySelectorAll(".input-group");

addInputBtn.addEventListener("click", () => {
  let additionalInput = inputElement.cloneNode(true);

  additionalInput.childNodes[1].value = "0";

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("btn");
  deleteBtn.classList.add("btn-outline-danger");
  deleteBtn.classList.add("input-delete-btn");
  deleteBtn.innerHTML = "x";

  additionalInput.appendChild(deleteBtn);
  leftSideInputContainer.insertBefore(additionalInput, addInputBtn);
  calc();
});

document.addEventListener("click", (e) => {
  if (e.target.matches(".input-delete-btn")) {
    e.target.parentNode.remove();
    calc();
  }
});

document.addEventListener("input", () => {
  calc();
});

function calc() {
  let inputValues = document.querySelectorAll(`input[type="number"]`);

  sum(inputValues);
  avg(inputValues);
  min(inputValues);
  max(inputValues);
}

function sum(inputValues) {
  let sum = 0;
  for (let index = 0; index < inputValues.length; index++)
    sum += parseInt(inputValues[index].value);
  document.querySelector(".sum").innerHTML = sum;
}
function avg(inputValues) {
  let sum = 0;
  for (let index = 0; index < inputValues.length; index++)
    sum += parseInt(inputValues[index].value);
  document.querySelector(".avg").innerHTML = (sum / inputValues.length).toFixed(
    2
  );
}
function min(inputValues) {
  let newValue = [];
  for (let index = 0; index < inputValues.length; index++)
    newValue[index] = parseInt(inputValues[index].value);
  document.querySelector(".min").innerHTML = Math.min(...newValue);
}
function max(inputValues) {
  let newValue = [];
  for (let index = 0; index < inputValues.length; index++)
    newValue[index] = parseInt(inputValues[index].value);
  document.querySelector(".max").innerHTML = Math.max(...newValue);
}
