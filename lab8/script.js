const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];

let mouse = {
    x: undefined,
    y: undefined,
    radius: canvas.width*(10/100)
};

class Particle {
  constructor() {
    this.size = Math.random() * 5 + 3;
    this.x = Math.random() * (canvas.width - 50) + (this.size + 10);
    this.y = Math.random() * (canvas.height - 50) + (this.size + 10);
    this.directionX = Math.random() * 5 - 2.5;
    this.directionY = Math.random() * 5 - 2.5;
    this.color = "#ff0000";
  }

  update() {
    this.x -= this.directionX;
    this.y -= this.directionY;

    if (this.x - this.size < 0 || this.x + this.size > canvas.width) {
      this.directionX = -this.directionX;
    }

    if (this.y - this.size < 0 || this.y + this.size > canvas.height) {
      this.directionY = -this.directionY;
    }

    let dx = this.x - mouse.x;
    let dy = this.y - mouse.y;
    let distance = Math.sqrt(dx*dx + dy*dy);

    if(distance < this.size + mouse.radius){
        if(this.x < mouse.x && this.x > this.size + 10){
            this.x -= 10;
        }

        if(this.x > mouse.x && this.x < canvas.width - (this.size + 10)){
            this.x += 10;
        }

        if(this.y < mouse.y && this.y > this.size + 10){
            this.y -= 10;
        }

        if(this.y > mouse.y && this.y < canvas.height - (this.size + 10)){
            this.y += 10;
        }
    }
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = "#ff0000";
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

const init = () => {
    particlesArray = [];
  let noOfParticle = (canvas.width * canvas.height) / 6000;
  for (let i = 0; i < noOfParticle; i++) {
    particlesArray.push(new Particle());
  }
};

init();

const animate = () => {
  let lineOpacity = 0;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for(let i=0; i<particlesArray.length;i++){
    for(let j=i;j<particlesArray.length;j++){
        let dx = particlesArray[j].x - particlesArray[i].x;
        let dy = particlesArray[j].y - particlesArray[i].y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        lineOpacity = 1 - distance/100;
        if(distance < 100){
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = `rgba(255, 0, 0, ${lineOpacity})`;
            ctx.moveTo(particlesArray[j].x, particlesArray[j].y);
            ctx.lineTo(particlesArray[i].x, particlesArray[i].y);
            ctx.stroke();
        }
    }

    particlesArray[i].update();
    particlesArray[i].draw();
  }

  requestAnimationFrame(animate);
};

animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

canvas.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;

});

canvas.addEventListener("mouseout", (e) => {
    mouse.x = undefined;
    mouse.y = undefined;
});