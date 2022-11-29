const GAME_TIME = 60000;
const GRAVITY = 8;

// requesting mobile user

const btn = document.getElementById("request");
btn.addEventListener("click", getPermission);

function getPermission() {
  if (typeof DeviceMotionEvent.requestPermission === "function") {
    // Handle iOS 13+ devices.
    DeviceMotionEvent.requestPermission()
      .then((state) => {
        if (state === "granted") {
          startGame();
          window.addEventListener("deviceorientation", setInitialPosition, false);
  
          setTimeout(function () {
            window.removeEventListener("deviceorientation", setInitialPosition, false);
            window.addEventListener("deviceorientation", onDeviceMove);
          }, 100);
        
        } else {
          console.error("Request to access the orientation was rejected");
        }
      })
      .catch(console.error);
  } else {
    // Handle regular non iOS 13+ devices.
    startGame();
    window.addEventListener("deviceorientation", onDeviceMove);
  }
}

// getting initial device position

let initialX = 0, initialY = 0;
function setInitialPosition(event) {
  initialX = event.gamma;
  initialY = event.beta;
}

// collecting device position
// counting ball acceleration

let x, y, accelerationX, accelerationY;

function onDeviceMove(event) {
  x = event.gamma;
  y = event.beta;
  accelerationX = GRAVITY * Math.sin((x / 180) * Math.PI);
  accelerationY = GRAVITY * Math.sin((y / 180) * Math.PI);
}

const gameField = document.querySelector(".game-field");
const ball = document.querySelector("#ball");
const hole = document.querySelector(".hole");
let maxY, maxX;

let holePosition = {
  x: 0,
  y: 0,
};

let ballPosition = {
  x: 0,
  y: 0,
};

function setUpTheField() {
  ball.style.display = "block";
  hole.style.display = "block";
  btn.style.display = "none";

  // gameField bounds

  maxX = gameField.clientWidth - ball.clientWidth;
  maxY = gameField.clientHeight - ball.clientHeight;

  // initial ball positioning

  ball.style.left = `${gameField.clientWidth / 2 - 25}px`;
  ball.style.top = `${gameField.clientHeight / 2 - 25}px`;

  // initial hole positioning

  holePosition.x = randomCoordinate(maxX - 70);
  holePosition.y = randomCoordinate(maxY - 70);

  hole.style.left = `${holePosition.x}px`;
  hole.style.top = `${holePosition.y}px`;
}

// random position of a hole

function randomCoordinate(max) {
  return Math.floor(Math.random() * (max + 1));
}

// moving the ball

function moveTheBall() {
  ballPosition.x = ball.style.left.slice(0, -2);
  ballPosition.y = ball.style.top.slice(0, -2);

  if (x < initialX) ballPosition.x = parseFloat(ballPosition.x) + accelerationX;
  if (y < initialY) ballPosition.y = parseFloat(ballPosition.y) + accelerationY;

  if (x > initialX) ballPosition.x = parseFloat(ballPosition.x) + accelerationX;
  if (y > initialY) ballPosition.y = parseFloat(ballPosition.y) + accelerationY;

  if (ballPosition.x > 0 && ballPosition.x < maxX)
    ball.style.left = `${ballPosition.x}px`;
  if (ballPosition.y > 0 && ballPosition.y < maxY)
    ball.style.top = `${ballPosition.y}px`;
}

// main updating function

let lastTime;

function main(time) {
  if (lastTime != null) {
    moveTheBall();
  }

  lastTime = time;
  window.requestAnimationFrame(main);
}

function startGame(e) {

  window.requestAnimationFrame(main);
  seconds = GAME_TIME;

  console.log(initialX,initialY);

  countDown();
  setUpTheField();
  setTimeout(stopGame, GAME_TIME);
}

function stopGame() {
  ball.style.display = "none";
  hole.style.display = "none";
  btn.style.display = "block";
}

// game timer

var seconds, time;
function countDown() {
  if (seconds == GAME_TIME) timer = setInterval(countDown, 1000);
  seconds -= 1000;

  if (seconds < 10000)
    document.getElementById("timer").innerHTML = "00:0" + seconds / 1000;
  else document.getElementById("timer").innerHTML = "00:" + seconds / 1000;

  if (seconds <= 0) clearInterval(timer);
}

