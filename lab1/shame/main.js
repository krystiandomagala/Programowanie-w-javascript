
const przeliczBtn = document.querySelector("#count");
const sumResult = document.querySelector("#sumResult");
const avgResult = document.querySelector("#avgResult");
const minResult = document.querySelector("#minResult");
const maxResult = document.querySelector("#maxResult");
const inputArray = document.querySelectorAll(".calc");

console.log(inputArray)

przeliczBtn.addEventListener('click', ()=>{
    let inputValues = [];

    for (let index = 0; index < inputArray.length; index++) 
        inputValues[index] = parseInt(inputArray[index].value);

    console.log(inputValues)

    sumResult.value = sum(inputValues);
    avgResult.value = avg(inputValues);
    minResult.value = Math.min(...inputValues);
    maxResult.value = Math.max(...inputValues);
})

function sum(inputValues){
    let sum = 0;
    inputValues.forEach(element => {
        sum += parseInt(element);
    });
    return sum;
}
function avg(inputValues){
    let sum = 0;
    inputValues.forEach(element => {
        sum += parseInt(element);
    });

    let avg = sum/inputValues.length;
    return avg;
}
