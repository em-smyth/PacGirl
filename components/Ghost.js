class Ghost {
  static speed = 2;
  constructor(canvas, { position, velocity, image }) {
    this.canvas = canvas;
    this.position = position;
    this.velocity = velocity;
    this.image = image;
    this.radius = 16;
    this.prevCollisions = [];
    this.speed = 2;
    this.scared = false;
  }

  draw() {
    const drawX = this.image.width / 2;
    const drawY = this.image.height / 2;
    this.canvas.beginPath();
    this.canvas.drawImage(
      this.image,
      this.position.x - drawX,
      this.position.y - drawY
    );
    this.canvas.arc(
      this.position.x,
      this.position.y,
      this.radius,
      0,
      Math.PI * 2
    );
  }

  // Moving the Ghost
  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }

  setGhostScared(isScared) {
    if (isScared) {
      (this.image = createImage(ghostScaredImage)), this.canvas.closePath();
    } else {
      (this.image = createImage(ghostImage)), this.canvas.closePath();
    }
  }
}

export default Ghost;
