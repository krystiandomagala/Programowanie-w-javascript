

let alpha = document.querySelector("#alpha");
let beta = document.querySelector("#beta");
let gamma = document.querySelector("#gamma");
const ball = document.querySelector(".ball");
const garden = document.querySelector(".garden");

const maxX = garden.clientWidth - ball.clientWidth;
const maxY = garden.clientHeight - ball.clientHeight;

// get position values

function onDeviceMove(event) {
    console.log(event)
    alpha.innerHTML = (event.alpha).toFixed(2);
    beta.innerHTML = (event.beta).toFixed(2);
    gamma.innerHTML = (event.gamma).toFixed(2);

    let x = event.gamma; // In degree in the range [-180,180)
    let y = event.beta; // In degree in the range [-90,90)
  
    // Because we don't want to have the device upside down
    // We constrain the x value to the range [-90,90]
    if (x > 90) {
      x = 90;
    }
    if (x < -90) {
      x = -90;
    }
  
    // To make computation easier we shift the range of
    // x and y to [0,180]
    x += 90;
    y += 90;
  
    // 10 is half the size of the ball
    // It center the positioning point to the center of the ball
    ball.style.top = `${(maxY * y) / 180 - 10}px`;
    ball.style.left = `${(maxX * x) / 180 - 10}px`;
}

const btn = document.getElementById( "request" );
btn.addEventListener( "click", permission );

// get permission to use orientation

function permission() {
    if (typeof DeviceMotionEvent.requestPermission === 'function') {
      // Handle iOS 13+ devices.
      DeviceMotionEvent.requestPermission()
        .then((state) => {
          if (state === 'granted') {
            window.addEventListener('deviceorientation', onDeviceMove);
          } else {
            console.error('Request to access the orientation was rejected');
          }
        })
        .catch(console.error);
    } else {
      // Handle regular non iOS 13+ devices.
      window.addEventListener('deviceorientation', onDeviceMove);
    }
  }
