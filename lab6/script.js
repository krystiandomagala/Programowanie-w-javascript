const GAME_TIME = 60000;
let GRAVITY = 15;

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
          window.addEventListener(
            "deviceorientation",
            setInitialPosition,
            false
          );

          setTimeout(function () {
            window.removeEventListener(
              "deviceorientation",
              setInitialPosition,
              false
            );
            window.addEventListener("deviceorientation", onDeviceMove);
          }, 200);
        } else {
          console.error("Request to access the orientation was rejected");
        }
      })
      .catch(console.error);
  } else {
    // Handle regular non iOS 13+ devices.
    startGame();
    window.addEventListener(
      "deviceorientation",
      setInitialPosition,
      false
    );

    setTimeout(function () {
      window.removeEventListener(
        "deviceorientation",
        setInitialPosition,
        false
      );
      window.addEventListener("deviceorientation", onDeviceMove);
    }, 200);
    
  }
}

// getting initial device position

let initialX = 0, initialY = 0;

function setInitialPosition(event) {
  initialX = event.gamma;
  initialY = event.beta;
  console.log(initialX,initialY)
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

const highScoreCommunicate = document.querySelector("#highscore-communicate");
const timerBoard = document.querySelector("#timer");
const timerContainer = document.querySelector("#timer-container");
const scoreBorad = document.querySelector("#score");
const highscoreBorad = document.querySelector("#highscore");
const gameField = document.querySelector(".game-field");
const ball = document.querySelector("#ball");
const hole = document.querySelector(".hole");
let maxY, maxX;

let holePosition = {
  x: 0,
  y: 0,
  endX: function () {
    return this.x + 70;
  },
  endY: function () {
    return this.y + 70;
  },
};

let ballPosition = {
  x: 0,
  y: 0,
  endX: function () {
    return this.x + 50;
  },
  endY: function () {
    return this.y + 50;
  },
};
function setUpTheField() {
  ball.style.display = "block";
  hole.style.display = "block";
  btn.style.display = "none";

  // gameField bounds

  maxX = gameField.clientWidth - ball.clientWidth;
  maxY = gameField.clientHeight - ball.clientHeight;

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

  if (y < 0) ballPosition.y = parseFloat(ballPosition.y) + accelerationY;
  if (x < 0) ballPosition.x = parseFloat(ballPosition.x) + accelerationX;

  if (x > 0) ballPosition.x = parseFloat(ballPosition.x) + accelerationX;
  if (y > 0) ballPosition.y = parseFloat(ballPosition.y) + accelerationY;

  if (ballPosition.x >= 0 && ballPosition.x <= maxX)
    ball.style.left = `${ballPosition.x}px`;
  if (ballPosition.y >= 0 && ballPosition.y <= maxY)
    ball.style.top = `${ballPosition.y}px`;

  if (ballPosition.x < 0) ballPosition.x = 0;
  if (ballPosition.x > maxX) ballPosition.x = maxX;

  ball.style.left = `${ballPosition.x}px`;

  if (ballPosition.y < 0) ballPosition.y = 0;
  if (ballPosition.y > maxY) ballPosition.y = maxY;

  ball.style.top = `${ballPosition.y}px`;
}

// main updating function

let lastTime;
function main(time) {
  if (lastTime != null) {
    if (isStarted) {
      moveTheBall();

      if (detectIfScored()) {
        score++;
        scoreBorad.innerHTML = score;
        setUpTheField();
      }

      changeColorTheme();
    }
  }
  lastTime = time;
  window.requestAnimationFrame(main);
}
window.requestAnimationFrame(main);

let score,
highscore = localStorage.getItem("highscore") == undefined ? 0 : localStorage.getItem("highscore");
highscoreBorad.innerHTML = highscore;

function startGame() {
  isStarted = true;

  ballPosition.x = 0, 
  ballPosition.y = 0;

  ballPosition.x = gameField.clientWidth / 2 - 25;
  ballPosition.y = gameField.clientHeight / 2 - 25;
  ball.style.left = `${ballPosition.x}px`;
  ball.style.top = `${ballPosition.y}px`;
  seconds = GAME_TIME;
  score = 0;
  highScoreCommunicate.style.display = "none";
  scoreBorad.innerHTML = score;
  highscoreBorad.innerHTML = highscore;


  countDown();
  setUpTheField();
  setTimeout(stopGame, GAME_TIME);
}

let isStarted;

function stopGame() {
  isStarted = false;

  ball.style.display = "none";
  hole.style.display = "none";
  btn.style.display = "block";
  timerContainer.classList.remove("time-running-out");

  if (score > highscore) {
    window.localStorage.setItem("highscore", JSON.stringify(score));
    highScoreCommunicate.style.display = "block";
    highscore = localStorage.getItem("highscore");
  }

  window.removeEventListener("deviceorientation", onDeviceMove, false);
  highscoreBorad.innerHTML = highscore;

  alert(`initial x: ${initialX} ${initialY}`);
}

// game timer

var seconds, time;
function countDown() {
  if (seconds == GAME_TIME) timer = setInterval(countDown, 1000);
  seconds -= 1000;
  if (seconds == 10000) timerContainer.classList.add("time-running-out");

  if (seconds < 10000) {
    timerBoard.innerHTML = "00:0" + seconds / 1000;
  } else document.getElementById("timer").innerHTML = "00:" + seconds / 1000;

  if (seconds <= 0) clearInterval(timer);
}

// score detection

function detectIfScored() {
  if (
    ballPosition.x > holePosition.x &&
    ballPosition.endX() < holePosition.endX()
  )
    if (
      ballPosition.y > holePosition.y &&
      ballPosition.endY() < holePosition.endY()
    )
      return true;

  return false;
}

function changeColorTheme() {
  let root = document.querySelector(":root");
  let bg = window.getComputedStyle(root).getPropertyValue("--bg");
  let ball = window.getComputedStyle(root).getPropertyValue("--ball");
  let hole = window.getComputedStyle(root).getPropertyValue("--hole");

  if (score == 0) {
    root.style.setProperty("--bg", "#121212");
    root.style.setProperty("--hole", "#fff");
    root.style.setProperty("--ball", "#0f0");
  }

  if (score == 20) {
    root.style.setProperty("--bg", "#00f");
    root.style.setProperty("--hole", "#fff");
    root.style.setProperty("--ball", "#f00");
  }

  if (score == 40) {
    root.style.setProperty("--bg", "#f00");
    root.style.setProperty("--hole", "#fff");
    root.style.setProperty("--ball", "yellow");
  }

  if (score == 60) {
    root.style.setProperty("--bg", "#fff");
    root.style.setProperty("--hole", "#f0f");
    root.style.setProperty("--ball", "#00f");
  }
}
