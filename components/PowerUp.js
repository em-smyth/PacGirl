class PowerUp {
  constructor(canvas, { position }) {
    this.canvas = canvas;
    this.position = position;
    this.radius = 8;
  }

  draw() {
    this.canvas.beginPath();
    this.canvas.arc(
      this.position.x,
      this.position.y,
      this.radius,
      0,
      Math.PI * 2
    );
    this.canvas.fillStyle = "white";
    this.canvas.fill();
    this.canvas.closePath();
  }
}
export default PowerUp;
