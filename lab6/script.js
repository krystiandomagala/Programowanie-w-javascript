

let alpha = document.querySelector("#alpha");
let beta = document.querySelector("#beta");
let gamma = document.querySelector("#gamma");

function onDeviceMove(event) {
    console.log(event)
    alpha.innerHTML = event.alpha;
    beta.innerHTML = event.beta;
    gamma.innerHTML = event.gamma;
}

function permission(){

DeviceOrientationEvent.requestPermission()
.then(response => {
  if (response == 'granted') {
    window.addEventListener('deviceorientation', (e) => {
      // do something with e
    })
  }
})
.catch(console.error)

}

    const btn = document.getElementById( "request" );
    btn.addEventListener( "click", permission );