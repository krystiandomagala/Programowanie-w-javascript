

let alpha = document.querySelector("#alpha");
let beta = document.querySelector("#beta");
let gamma = document.querySelector("#gamma");

function onDeviceMove(event) {
    console.log(event)
    alpha.innerHTML = event.alpha;
    beta.innerHTML = event.beta;
    gamma.innerHTML = event.gamma;
}

if ( location.protocol != "http:" ) {
    location.href = "http:" + window.location.href.substring( window.location.protocol.length );
    }
    function permission () {
        if ( typeof( DeviceMotionEvent ) !== "undefined" && typeof( DeviceMotionEvent.requestPermission ) === "function" ) {
            // (optional) Do something before API request prompt.
            DeviceMotionEvent.requestPermission()
                .then( response => {
                // (optional) Do something after API prompt dismissed.
                if ( response == "granted" ) {
                    window.addEventListener( "devicemotion", (e) => {
                        // do something for 'e' here.
                    })
                }
            })
                .catch( console.error )
        } else {
            alert( "DeviceMotionEvent is not defined" );
        }
    }
    const btn = document.getElementById( "request" );
    btn.addEventListener( "click", permission );