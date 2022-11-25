let alpha = document.querySelector("#alpha");
let beta = document.querySelector("#beta");
let gamma = document.querySelector("#gamma");

const ballContainer = document.querySelector("#ball");
const holeContainer = document.querySelector(".hole");
const gameFieldContainer = document.querySelector(".game-field");

function onDeviceMove(event) {
  alpha.innerHTML = Math.round(event.alpha);
  beta.innerHTML = Math.round(event.beta);
  gamma.innerHTML = Math.round(event.gamma);
}

const hole = {
  x: 0,
  y: 0
};

const ball = {
    x: 0,
    y: 0
  };
  

function getRandomCoordinate(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

function initializeGame() {
  btn.style.display = "none";
  ballContainer.style.display = "block";
  holeContainer.style.display = "block";

  // display hole randomly
  const MaxX = gameFieldContainer.clientWidth - holeContainer.clientWidth + 18;
  const MaxY = gameFieldContainer.clientHeight - holeContainer.clientHeight + 158;

  console.log("maxY:" + MaxY);
  console.log("maxX:" + MaxX);

  //setting position
  const holeX = holeContainer.style.left = `${getRandomCoordinate(18, MaxX)}px`;
  const holeY = holeContainer.style.top = `${getRandomCoordinate(158, MaxY)}px`;

  const ballX = ballContainer.getBoundingClientRect().left + 'px';
  const ballY = ballContainer.getBoundingClientRect().top + 'px';
  
  hole.x = holeX;
  hole.y = holeY;

  ball.x = ballX;
  ball.y = ballY;

  console.log(hole);
  console.log(ball);
}


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
          initializeGame();
        } else {
          console.error("Request to access the orientation was rejected");
        }
      })
      .catch(console.error);
  } else {
    // Handle regular non iOS 13+ devices.
    window.addEventListener("deviceorientation", onDeviceMove);
    initializeGame();
  }
}
