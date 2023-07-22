class Player {
  constructor(canvas, { position, velocity }) {
    this.canvas = canvas;
    this.position = position;
    this.velocity = velocity;
    this.radius = 16;
    this.radians = 0.75;
    this.openRate = 0.12;
    this.rotation = 0;
  }

  draw() {
    this.canvas.save();
    this.canvas.translate(this.position.x, this.position.y);
    this.canvas.rotate(this.rotation);
    this.canvas.translate(-this.position.x, -this.position.y);
    this.canvas.beginPath();
    this.canvas.arc(
      this.position.x,
      this.position.y,
      this.radius,
      this.radians,
      Math.PI * 2 - this.radians
    );
    this.canvas.lineTo(this.position.x, this.position.y);
    this.canvas.fillStyle = "yellow";
    this.canvas.fill();
    this.canvas.closePath();
    this.canvas.restore();
  }

  // Moving Pacman
  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    if (this.radians < 0 || this.radians > 0.75) {
      this.openRate = -this.openRate;
    }
    this.radians += this.openRate;
  }

  reset() {
    (this.position.x = 40 + 40 / 2),
      (this.position.y = 40 + 40 / 2),
      (this.velocity.x = 0),
      (this.velocity.y = 0);
    this.rotation = 0;
  }
}
export default Player;
