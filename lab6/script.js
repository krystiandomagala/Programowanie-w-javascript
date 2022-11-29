// Request mobile user
const btn = document.getElementById("request");
btn.addEventListener("click", getPermission);

function getPermission() {
  if (typeof DeviceMotionEvent.requestPermission === "function") {
    // Handle iOS 13+ devices.
    DeviceMotionEvent.requestPermission()
      .then((state) => {
        if (state === "granted") {
          window.addEventListener("deviceorientation", onDeviceMove);
          setUpTheField();
        } else {
          console.error("Request to access the orientation was rejected");
        }
      })
      .catch(console.error);
  } else {
    // Handle regular non iOS 13+ devices.
    window.addEventListener("deviceorientation", onDeviceMove);
    setUpTheField();
  }
}

let x, y;
let maxX, maxY;

function onDeviceMove(event) {
  console.log(`(x: ${event.gamma}, y: ${event.beta})`);

  x = Math.round(event.gamma);
  y = Math.round(event.beta);
}

const gameField = document.querySelector(".game-field");
const ball = document.querySelector("#ball");
const hole = document.querySelector(".hole");


function setUpTheField() {

  ball.style.display = "block";
  hole.style.display = "block";
  btn.style.display = "none";

  maxX = gameField.clientWidth - ball.clientWidth;
  maxY = gameField.clientHeight - ball.clientHeight;
  console.log(`max x: ${maxX}, max y: ${maxY}`);

  ball.style.left = `${gameField.clientWidth / 2 - 25}px`;
  ball.style.top = `${gameField.clientHeight / 2 - 25}px`;

  hole.style.left = `${randomCoordinate(maxX - 70)}px`;
  hole.style.top = `${randomCoordinate(maxY - 70)}px`;

  x = 0;
  y = 0;
}

function randomCoordinate(max) {
  return Math.floor(Math.random() * (max + 1));
}

let lastTime;

function update(time) {
  if (lastTime != null) {
    moveTheBall();
  }

  lastTime = time;
  window.requestAnimationFrame(update);
}

window.requestAnimationFrame(update);

function moveTheBall() {
  let ballX = ball.style.left.slice(0, -2);
  let ballY = ball.style.top.slice(0, -2);

  if (x < 5) ballX--;
  if (y < 5) ballY--;

  if (x > 5) ballX++;
  if (y > 5) ballY++;

  if(ballX>0 && ballX<maxX)
    ball.style.left = `${ballX}px`;
  if(ballY>0 && ballY<maxY)
    ball.style.top = `${ballY}px`;


}
