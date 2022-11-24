

let alpha = document.querySelector("#alpha");
let beta = document.querySelector("#beta");
let gamma = document.querySelector("#gamma");

function onDeviceMove(event) {
    console.log(event)
    alpha.innerHTML = (event.alpha).toFixed(2);
    beta.innerHTML = (event.beta).toFixed(2);
    gamma.innerHTML = (event.gamma).toFixed(2);
}


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
    const btn = document.getElementById( "request" );
    btn.addEventListener( "click", permission );